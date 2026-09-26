// Gandi Format (from RemixWarp, id=sprendercontrol)
(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Render Control must run unsandboxed!");

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;
  const Cast = Scratch.Cast;
  const twgl = render.exports.twgl;

  let autoRedraw = true;
  const ogDraw = render.draw;
  render.draw = function (...args) {
    if (autoRedraw) ogDraw.call(this, ...args);
  }

  // ========== 自定义效果系统 ==========
  const drawableKey = Symbol("SPrenderControlKey");
  const MAX_REPLACERS = 15;
  const newUniforms = [
      "u_replaceColorFromSP", "u_replaceColorToSP", "u_replaceThresholdSP", "u_numReplacersSP",
      "u_warpSP", "u_maskTextureSP", "u_shouldMaskSP",
      "u_tintColorSP", "u_saturateSP", "u_opaqueSP", "u_contrastSP",
      "u_posterizeSP", "u_sepiaSP", "u_bloomSP","u_blurSP",
      "u_greenscreenSP", "u_lowblurSP"
  ];
  
  const newSingleEffects = {
      saturation: 1, opaque: 0, contrast: 1,
      posterize: 0, sepia: 0, bloom: 0, blur: 0,
      greenscreen: 0, lowblur: 0
  };

  const genEffectFactory = () => {
    return {
      warp: [0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5],
      tint: [1, 1, 1, 1],
      replacers: [],
      maskTexture: "",
      oldMask: "",
      shouldMask: 0,
      newEffects: { ...newSingleEffects },
      // 新增：强制使用自定义着色器的标志
      forceCustomShader: false
    };
  };

  const defaultWarpCache = "0.5,-0.5,-0.5,-0.5,-0.5,0.5,0.5,0.5";
  const replaceFrom = new Float32Array(MAX_REPLACERS * 3).fill(0);
  const replaceTo = new Float32Array(MAX_REPLACERS * 4).fill(0);
  const replaceThresh = new Float32Array(MAX_REPLACERS).fill(1);

  let currentShader;

  function initDrawable(drawable) {
    if (!drawable[drawableKey]) drawable[drawableKey] = genEffectFactory();
  }

  // ========== 延迟初始化系统 ==========
  let shadersInitialized = false;
  let patchShaders = false;

  function initializeCustomShaders() {
    if (shadersInitialized) return;
    
    console.log("初始化自定义着色器...");
    
    // 保存原始函数
    const ogCreateProgramInfo = twgl.createProgramInfo;
    const ogBuildShader = render._shaderManager._buildShader;
    const ogGetUniforms = render.exports.Drawable.prototype.getUniforms;
    
    // 修改着色器创建 - 强制对所有着色器应用修改
    twgl.createProgramInfo = function (...args) {
      if (patchShaders && args[1] && args[1][0] && args[1][1]) {
        args[1][0] = args[1][0]
          .replaceAll("vec4(a_position", "vec4(positionSP")
          .replace("v_texCoord = a_texCoord;", "")
          .replace("#if !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))", "#if 1")
          .replace(
          `void main() {`,
          `uniform vec2 u_warpSP[4];

void main() {
  vec2 positionSP = a_position;
  #ifndef DRAW_MODE_background
  v_texCoord = a_texCoord;
  #endif

  float u = v_texCoord.x;
  float v = v_texCoord.y;

  vec2 warpedPos = 
    (1.0 - u) * (1.0 - v) * u_warpSP[0] + u * (1.0 - v) * u_warpSP[1] +
    u * v * u_warpSP[2] + (1.0 - u) * v * u_warpSP[3];

  float w = (1.0 - u) * (1.0 - v) + u * (1.0 - v) + u * v + (1.0 - u) * v;

  positionSP = warpedPos / max(w, 1e-5);

  #ifdef DRAW_MODE_background
  gl_Position = vec4(positionSP * 2.0, 0, 1);
  #else
  gl_Position = u_projectionMatrix * u_modelMatrix * vec4(positionSP, 0, 1);
  #endif`
        );

        args[1][1] = args[1][1].replace(
          `uniform sampler2D u_skin;`,
          `uniform sampler2D u_skin;
uniform sampler2D u_maskTextureSP;
uniform float u_shouldMaskSP;

#define MAX_REPLACERS 15
uniform vec3 u_replaceColorFromSP[MAX_REPLACERS];
uniform vec4 u_replaceColorToSP[MAX_REPLACERS];
uniform float u_replaceThresholdSP[MAX_REPLACERS];
uniform int u_numReplacersSP;

uniform vec4 u_tintColorSP;
uniform float u_saturateSP;
uniform float u_opaqueSP;
uniform float u_contrastSP;
uniform float u_posterizeSP;
uniform float u_sepiaSP;
uniform float u_bloomSP;
uniform float u_blurSP;
uniform float u_greenscreenSP;
uniform float u_lowblurSP;
vec3 spRGB2HSV(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 spHSV2RGB(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}`
        ).replace(
          `gl_FragColor.rgb = clamp(gl_FragColor.rgb / (gl_FragColor.a + epsilon), 0.0, 1.0);`,
          `gl_FragColor.rgb = clamp(gl_FragColor.rgb / (gl_FragColor.a + epsilon), 0.0, 1.0);
vec3 finalColor = gl_FragColor.rgb;
float finalAlpha = gl_FragColor.a;

// 自定义效果处理
if (u_shouldMaskSP > 0.5 && finalAlpha > 0.0) {
  vec4 maskColor = texture2D(u_maskTextureSP, texcoord0);
  maskColor.rgb = clamp(maskColor.rgb / (maskColor.a + epsilon), 0.0, 1.0);
  finalAlpha *= maskColor.a;
}

if (u_blurSP > 0.5) {
    float blurAmount = u_blurSP * 100.0;
    vec2 pixelSize = vec2(blurAmount * 0.0001);
    
    vec4 accumulated = vec4(0.0);
    float totalWeight = 0.0;
    
    for (int x = -3; x <= 3; x++) {
        for (int y = -3; y <= 3; y++) {
            vec2 offset = vec2(float(x), float(y)) * pixelSize;
            vec4 sampleColor = texture2D(u_skin, v_texCoord + offset);
            
            float dist = length(vec2(x, y));
            float weight = exp(-dist * dist * 0.3);
            
            accumulated += sampleColor * weight;
            totalWeight += weight;
        }
    }
    
    accumulated /= totalWeight;
    accumulated.rgb = clamp(accumulated.rgb / (accumulated.a + 1e-10), 0.0, 1.0);
    
    finalColor = accumulated.rgb;
    finalAlpha = accumulated.a;
}

if (u_lowblurSP > 0.5) {
    float blurAmount = u_lowblurSP * 1.0;
    vec2 pixelSize = vec2(blurAmount * 0.008);
    
    vec3 blurColor = vec3(0.0);
    float total = 0.0;
    
    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            vec2 offset = vec2(float(x), float(y)) * pixelSize;
            vec4 sampleColor = texture2D(u_skin, v_texCoord + offset);
            sampleColor.rgb = clamp(sampleColor.rgb / (sampleColor.a + 1e-10), 0.0, 1.0);
            blurColor += sampleColor.rgb;
            total += 1.0;
        }
    }
    
    finalColor = blurColor / total;
}

if (u_numReplacersSP > 0) for (int i = 0; i < MAX_REPLACERS; i++) {
  if (i >= u_numReplacersSP) break;

  float dist = distance(finalColor, u_replaceColorFromSP[i]);
  if (dist <= u_replaceThresholdSP[i]) {
    float strength = 1.0 - (dist / (u_replaceThresholdSP[i] + 1.0));
    finalColor = mix(finalColor, u_replaceColorToSP[i].rgb, strength);
    if (u_replaceColorToSP[i].a < 1.0 && strength > 0.01) {
      finalAlpha = clamp(mix(finalAlpha, u_replaceColorToSP[i].a, strength), 0.0, 1.0);
    }
  }
}

if (u_saturateSP > 1.001 || u_saturateSP < 0.999) {
  vec3 hsv = spRGB2HSV(finalColor);
  if (u_saturateSP < 0.0) {
    hsv.x = mod(hsv.x + 0.5, 1.0);
    hsv.y *= -u_saturateSP;
  } else {
    hsv.y *= u_saturateSP;
  }
  finalColor = spHSV2RGB(hsv);
}

if (u_contrastSP > 1.001 || u_contrastSP < 0.999) {
  finalColor = (finalColor - 0.5) * u_contrastSP + 0.5;
}

if (u_posterizeSP > 0.5) {
    float invertStrength = u_posterizeSP;
    vec3 invertedColor = 1.0 - finalColor;
    finalColor = mix(finalColor, invertedColor, invertStrength);
}

if (u_sepiaSP > 0.5) {
  vec3 sepiaColor = vec3(
    dot(finalColor, vec3(0.393, 0.769, 0.189)),
    dot(finalColor, vec3(0.349, 0.686, 0.168)),
    dot(finalColor, vec3(0.272, 0.534, 0.131))
  );
  finalColor = mix(finalColor, sepiaColor, u_sepiaSP);
}

if (u_bloomSP > 0.5) {
  vec3 bloom = max(finalColor - 0.4, 0.0);

  bloom += texture2D(u_skin, v_texCoord + vec2( 0.001,  0.001)).rgb;
  bloom += texture2D(u_skin, v_texCoord + vec2(-0.001,  0.001)).rgb;
  bloom += texture2D(u_skin, v_texCoord + vec2( 0.001, -0.001)).rgb;
  bloom += texture2D(u_skin, v_texCoord + vec2(-0.001, -0.001)).rgb;
  bloom *= 0.25;

  finalColor += bloom * u_bloomSP;
  finalColor = clamp(finalColor, 0.0, 1.0);
}

if (u_greenscreenSP > 0.5) {
    vec3 hsv = spRGB2HSV(finalColor);
    float hue = hsv.x;
    float saturation = hsv.y;
    
    float greenHueMin = 0.22;
    float greenHueMax = 0.44;
    
    float greenDistance = 0.0;
    if (hue >= greenHueMin && hue <= greenHueMax) {
        float greenCenter = (greenHueMin + greenHueMax) * 0.5;
        greenDistance = 1.0 - abs(hue - greenCenter) / ((greenHueMax - greenHueMin) * 0.5);
    }
    
    float greenness = greenDistance * saturation;
    float threshold = 0.9 - (u_greenscreenSP * 0.08);
    
    if (greenness > threshold) {
        finalAlpha = 0.0;
    }
}

// 应用色调和透明度
gl_FragColor.rgb = finalColor * u_tintColorSP.rgb;
float baseAlpha = finalAlpha;
if (baseAlpha > 0.0 && baseAlpha < 1.0) baseAlpha = mix(baseAlpha, 1.0, u_opaqueSP);
gl_FragColor.a = baseAlpha;`
        ).replaceAll(
          "#if defined(ENABLE_color) || defined(ENABLE_brightness)",
          "#if defined(MAX_REPLACERS)"
        );
      }
      return ogCreateProgramInfo.apply(this, args);
    };

    // 修改着色器构建
    render._shaderManager._buildShader = function (...args) {
      try {
        patchShaders = true;
        return ogBuildShader.apply(this, args);
      } finally {
        patchShaders = false;
      }
    };

    // 修改uniform获取 - 总是设置自定义uniform，但使用默认值
    render.exports.Drawable.prototype.getUniforms = function() {
      const gl = render.gl;
      const uniforms = ogGetUniforms.call(this);
      if (!currentShader) return uniforms;

      initDrawable(this);
      const effectData = this[drawableKey];
      
      // 总是设置自定义uniform，确保自定义效果始终可用
      if (currentShader.uniformSetters.u_replaceColorFromSP) {
        const replacers = effectData.replacers;
        if (replacers.length > 0) {
          for (let i = 0; i < Math.min(replacers.length, MAX_REPLACERS); i++) {
            replaceFrom.set(replacers[i].targetVert, i * 3);
            replaceTo.set(replacers[i].replaceVert, i * 4);
            replaceThresh[i] = replacers[i].soft;
          }
        } else {
          // 即使没有替换器，也要设置默认值
          replaceFrom.fill(0);
          replaceTo.fill(0);
          replaceThresh.fill(1);
        }

        if (effectData.shouldMask && effectData._maskTexture) {
          gl.activeTexture(gl.TEXTURE30);
          gl.bindTexture(gl.TEXTURE_2D, effectData._maskTexture);
          gl.uniform1i(currentShader.uniformSetters["u_maskTextureSP"], 30);
          gl.activeTexture(gl.TEXTURE0);
        } else {
          gl.uniform1f(currentShader.uniformSetters.u_shouldMaskSP, 0);
        }

        const newEffects = effectData.newEffects;
        gl.uniform3fv(currentShader.uniformSetters.u_replaceColorFromSP, replaceFrom);
        gl.uniform4fv(currentShader.uniformSetters.u_replaceColorToSP, replaceTo);
        gl.uniform1fv(currentShader.uniformSetters.u_replaceThresholdSP, replaceThresh);
        gl.uniform1i(currentShader.uniformSetters.u_numReplacersSP, replacers ? Math.min(replacers.length, MAX_REPLACERS) : 0);
        gl.uniform4fv(currentShader.uniformSetters.u_tintColorSP, effectData.tint);
        gl.uniform2fv(currentShader.uniformSetters.u_warpSP, effectData.warp);
        gl.uniform1f(currentShader.uniformSetters.u_shouldMaskSP, effectData.shouldMask);
        gl.uniform1f(currentShader.uniformSetters.u_saturateSP, newEffects.saturation);
        gl.uniform1f(currentShader.uniformSetters.u_opaqueSP, newEffects.opaque);
        gl.uniform1f(currentShader.uniformSetters.u_contrastSP, newEffects.contrast);
        gl.uniform1f(currentShader.uniformSetters.u_posterizeSP, newEffects.posterize);
        gl.uniform1f(currentShader.uniformSetters.u_sepiaSP, newEffects.sepia);
        gl.uniform1f(currentShader.uniformSetters.u_bloomSP, newEffects.bloom);
        gl.uniform1f(currentShader.uniformSetters.u_blurSP, newEffects.blur);
        gl.uniform1f(currentShader.uniformSetters.u_greenscreenSP, newEffects.greenscreen);
        gl.uniform1f(currentShader.uniformSetters.u_lowblurSP, newEffects.lowblur);
      }
      
      return uniforms;
    };

    // 着色器修改
    const ogGetShader = render._shaderManager.getShader;
    render._shaderManager.getShader = function (drawMode, effectBits) {
      const shader = ogGetShader.call(this, drawMode, effectBits);
      if (!shader._patched) {
        shader._patched = true;
        const gl = render._gl;
        for (const name of newUniforms) {
          shader.uniformSetters[name] = gl.getUniformLocation(shader.program, name);
        }
      }
      currentShader = shader;
      return shader;
    };

    shadersInitialized = true;
  }

  // 辅助函数：检查数组是否匹配
  function arrayMatches(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((val, i) => Math.abs(val - arr2[i]) < 0.001);
  }

  // 重置效果
  const ogClearEffects = vm.exports.RenderedTarget.prototype.clearEffects;
  vm.exports.RenderedTarget.prototype.clearEffects = function() {
    const drawable = render._allDrawables[this.drawableID];
    if (drawable[drawableKey]) {
      drawable[drawableKey] = genEffectFactory();
    }
    ogClearEffects.call(this);
  };

  class SPrenderControl {
    getInfo() {
      return {
        id: "sprendercontrol",
        name: "渲染器控制",
        color1: "#007AFF",
        color2: "#007AFF",
        blockIconURI: '',
        blocks: [
          // 渲染器控制部分
          {
            opcode: "getID",
            blockType: Scratch.BlockType.REPORTER,
            text: "获取[TARGET]的ID图层",
            arguments: {
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
{
  opcode: "getIDFromName",
  blockType: Scratch.BlockType.REPORTER,
  text: "获取名称为 [NAME] 的图层ID",
  arguments: {
    NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "自己" }
  }
},
          {
            opcode: "getOwner",
            blockType: Scratch.BlockType.REPORTER,
            text: "获取图层ID [ID]的所有者",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "exportID",
            blockType: Scratch.BlockType.REPORTER,
            text: "将ID [ID]导出为data.uri",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "setQuality",
            blockType: Scratch.BlockType.COMMAND,
            text: "将ID [ID]的质量设置为[NUM]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          "---",
          {
            opcode: "effectID",
            blockType: Scratch.BlockType.COMMAND,
            text: "将ID [ID]的[EFFECT]设置为[NUM]",
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "resetID",
            blockType: Scratch.BlockType.COMMAND,
            text: "重置ID [ID]的效果",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "resetAllCustomEffectsID",
            blockType: Scratch.BlockType.COMMAND,
            text: "重置ID [ID]的所有自定义效果",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "getEffectValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "ID [ID]的[EFFECT]效果值",
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          "---",
          {
            opcode: "scaleID",
            blockType: Scratch.BlockType.COMMAND,
            text: "将ID [ID]的缩放设置为 x [x] y [y]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            }
          },
          {
            opcode: "scaleOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: "ID [ID]的[XY]缩放",
            arguments: {
              XY: { type: Scratch.ArgumentType.STRING, menu: "XY" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "positionID",
            blockType: Scratch.BlockType.COMMAND,
            text: "将ID [ID]的位置设置为 x [x] y [y]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "posOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: "ID [ID]的[XY]位置",
            arguments: {
              XY: { type: Scratch.ArgumentType.STRING, menu: "XY" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "directID",
            blockType: Scratch.BlockType.COMMAND,
            text: "将ID [ID]的方向设置为[ANGLE]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              ANGLE: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 }
            }
          },
          {
            opcode: "dirOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: "ID [ID]的方向",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "rotateID",
            blockType: Scratch.BlockType.COMMAND,
            text: "将ID [ID]的旋转中心设置为 x [x] y [y]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "rotateOfID",
            blockType: Scratch.BlockType.REPORTER,
            text: "ID [ID]的旋转中心[XY]",
            arguments: {
              XY: { type: Scratch.ArgumentType.STRING, menu: "XY" },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            }
          },
          "---",
          {
            opcode: "toggleAutoRedraw",
            blockType: Scratch.BlockType.COMMAND,
            text: "切换自动重绘[TYPE]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "TOGGLER" },
            }
          },
          {
            opcode: "forceRedraw",
            blockType: Scratch.BlockType.COMMAND,
            text: "强制重绘"
          },
          "---",
          // 修改为使用ID的功能
          {
            opcode: "tintID",
            blockType: Scratch.BlockType.COMMAND,
            text: "设置ID [ID]的色调为[COLOR]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              COLOR: { type: Scratch.ArgumentType.COLOR }
            }
          },
          "---",
          {
            opcode: "replaceColorID",
            blockType: Scratch.BlockType.COMMAND,
            text: "在ID [ID]中将[COLOR1]替换为[COLOR2]，柔和度[VALUE]",
            arguments: {
              COLOR1: { type: Scratch.ArgumentType.COLOR },
              COLOR2: { type: Scratch.ArgumentType.COLOR },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            }
          },
          {
            opcode: "resetColorID",
            blockType: Scratch.BlockType.COMMAND,
            text: "重置ID [ID]中的[COLOR1]颜色替换器",
            arguments: {
              COLOR1: { type: Scratch.ArgumentType.COLOR },
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "resetReplacersID",
            blockType: Scratch.BlockType.COMMAND,
            text: "重置ID [ID]中的颜色替换器",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          "---",
          {
            opcode: "warpID",
            blockType: Scratch.BlockType.COMMAND,
            text: "扭曲ID [ID]到 x1: [x1] y1: [y1] x2: [x2] y2: [y2] x3: [x3] y3: [y3] x4: [x4] y4: [y4]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              x4: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y4: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 }
            },
          },
          {
            opcode: "maskID",
            blockType: Scratch.BlockType.COMMAND,
            text: "用图像[IMAGE]遮罩ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              IMAGE: { type: Scratch.ArgumentType.STRING, defaultValue: "https://extensions.turbowarp.org/dango.png" }
            },
          },
          "---",
          {
            opcode: "showID",
            blockType: Scratch.BlockType.COMMAND,
            text: "显示ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "hideID",
            blockType: Scratch.BlockType.COMMAND,
            text: "隐藏ID [ID]",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "idShowing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "ID [ID]是否[TYPE]？",
            arguments: {
              ID: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "SHOW_HIDE" }
            },
          }
        ],
        menus: {
          XY: ["x", "y"],
          TOGGLER: [
            { text: "开启", value: "on" },
            { text: "关闭", value: "off" }
          ],
          SHOW_HIDE: [
            { text: "显示", value: "showing" },
            { text: "隐藏", value: "hidden" }
          ],
          TARGETS: { acceptReporters: true, items: "_getTargets" },
          EFFECTS: { acceptReporters: true, items: "_getEffects" },
        }
      };
    }
    
    // 辅助函数
    _getTargets() {
      const spriteNames = [
        { text: "自己", value: "_myself_" },
        { text: "舞台", value: "_stage_" },
        { text: "视频图层", value: "_video_" },
        { text: "画笔图层", value: "_pen_" }
      ];
      for (const i of render._drawList) {
        const drawable = render._allDrawables[i];
        if (drawable !== undefined && drawable.customDrawableName !== undefined) spriteNames.push({
          text: drawable.customDrawableName, value: `${i}=SP-custLayer`
        });
      }
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) spriteNames.push({ text: target.getName(), value: target.getName() });
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }
getIDFromName(args, util) {
  const name = Scratch.Cast.toString(args.NAME).trim();
  if (!name) return "";
  
  // 搜索所有可绘制对象
  for (let i = 0; i < render._allDrawables.length; i++) {
    const drawable = render._allDrawables[i];
    if (!drawable) continue;
    
    // 检查自定义图层名称
    if (drawable.customDrawableName === name) {
      return i;
    }
    
    // 检查精灵名称
    for (const target of runtime.targets) {
      if (target.drawableID === i && target.getName() === name) {
        return i;
      }
    }
  }
  
  // 特殊图层检查
  if (name === "舞台") return runtime.getTargetForStage().drawableID;
  if (name === "画笔") return runtime.ext_pen?._penDrawableId || "";
  
  const videoL = runtime.ioDevices.video._drawable;
  if (name === "视频" && videoL !== -1) return videoL;
  
  return ""; // 未找到
}

    _getEffects() {
      const standardEffects = Object.keys(vm.editingTarget?.effects || {});
      
      const effectTranslations = {
        "color": "颜色",
        "fisheye": "鱼眼", 
        "whirl": "漩涡",
        "pixelate": "像素化",
        "mosaic": "马赛克",
        "brightness": "亮度",
        "ghost": "透明",
        "saturation": "饱和度",
        "opaque": "不透明度",
        "contrast": "对比度", 
        "posterize": "反色",
        "sepia": "复古色",
        "bloom": "泛光",
        "blur": "模糊",
        "lowblur": "低效率模糊",
        "greenscreen": "绿幕抠图"
      };
      
      const allEffects = [
        ...standardEffects,
        "saturation", "opaque", "contrast", "posterize", "sepia", "bloom", "blur", "greenscreen", "lowblur"
      ];
      
      return allEffects.map(effect => ({
        text: effectTranslations[effect] || effect,
        value: effect
      }));
    }

    // Block Funcs - 渲染器控制
    getID(args, util) {
      if (args.TARGET === "_myself_") return util.target.drawableID;
      if (args.TARGET === "_stage_") return runtime.getTargetForStage().drawableID;
      if (args.TARGET === "_pen_") return runtime.ext_pen?._penDrawableId || "";
      const videoL = runtime.ioDevices.video._drawable;
      if (args.TARGET === "_video_") return videoL !== -1 ? videoL : "";
      if (args.TARGET.includes("=SP-custLayer")) {
        const layerID = parseInt(args.TARGET);
        if (render._allDrawables[layerID]?.customDrawableName !== undefined) return layerID;
      }
      const target = runtime.getSpriteTargetByName(args.TARGET);
      return target ? target.drawableID : "";
    }

    getOwner(args, util) {
      const ID = Scratch.Cast.toNumber(args.ID);
      if (ID < 0) return "";
      const penID = runtime.ext_pen?._penDrawableId || "";
      const videoL = runtime.ioDevices.video._drawable;
      const vidID = videoL !== -1 ? videoL : "";
      if (ID === penID) return "Pen Layer";
      if (ID === vidID) return "Video Layer";
      for (const target of runtime.targets) {
        if (target.drawableID === ID) return `${target.getName()}${target.isOriginal ? "" : " (Clone)"}`;
      }
      for (const i of render._drawList) {
        const drawable = render._allDrawables[i];
        if (drawable.customDrawableName !== undefined && i === ID) return drawable.customDrawableName;
      }
      return "";
    }

    exportID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      if (render._drawList.indexOf(ID) === -1) return "";
      const imageData = render.extractDrawableScreenSpace(ID).imageData;
      var canvas = document.createElement("canvas");
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      canvas.getContext("2d").putImageData(imageData, 0, 0);
      return canvas.toDataURL("image/png");
    }

    setQuality(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      if (render._drawList.indexOf(ID) === -1) return;
      const value = Scratch.Cast.toNumber(args.NUM);
      const drawable = render._allDrawables[ID];
      const penID = runtime.ext_pen?._penDrawableId || "";
      drawable.setHighQuality(true);
      if (penID === ID) drawable.skin.setRenderQuality(Math.max(0.05, Math.min(34, value / 3)));
      else drawable.skin._maxTextureScale = Math.max(1, Math.min(100, Math.round(value)));
      drawable.skin.emitWasAltered();
    }

    effectID(args) {
      initializeCustomShaders(); // 延迟初始化
      const num = Scratch.Cast.toNumber(args.NUM);
      const effectName = args.EFFECT;
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;
      
      const drawable = render._allDrawables[ID];
      initDrawable(drawable);
      
      const customEffects = ["contrast", "posterize", "sepia", "bloom", "blur", "greenscreen", "saturation", "opaque", "lowblur"];
      if (customEffects.includes(effectName)) {
        const value = num / 100;
        const oldValue = drawable[drawableKey].newEffects[effectName];
        drawable[drawableKey].newEffects[effectName] = value;
        if (oldValue !== value) render.dirty = true;
      } else {
        // 设置原版效果时，强制标记使用自定义着色器
        drawable[drawableKey].forceCustomShader = true;
        drawable.updateEffect(effectName, num);
      }
    }
    
    resetID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;
      
      const drawable = render._allDrawables[ID];
      
      const standardEffects = Object.keys(vm.editingTarget?.effects || {});
      for (const effectName of standardEffects) {
        drawable.updateEffect(effectName, 0);
      }
      
      if (drawable[drawableKey]) {
        drawable[drawableKey].newEffects.saturation = 1;
        drawable[drawableKey].newEffects.contrast = 1;
        drawable[drawableKey].newEffects.opaque = 0;
        drawable[drawableKey].newEffects.posterize = 0;
        drawable[drawableKey].newEffects.sepia = 0;
        drawable[drawableKey].newEffects.bloom = 0;
        drawable[drawableKey].newEffects.blur = 0;
        drawable[drawableKey].newEffects.greenscreen = 0;
        drawable[drawableKey].newEffects.lowblur = 0;
        // 重置强制标记
        drawable[drawableKey].forceCustomShader = false;
      }
      
      render.dirty = true;
    }

    scaleID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      if (allLay.indexOf(ID) !== -1) render._allDrawables[ID].updateScale([
        Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y)
      ]);
    }

    scaleOfID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = vm.renderer._drawList;
      const isX = args.XY === "x" ? 0 : 1;
      if (allLay.indexOf(ID) === -1) return 0;
      return render._allDrawables[ID]._scale[isX];
    }

    directID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const dir = Scratch.Cast.toNumber(args.ANGLE);
      const allLay = render._drawList;
      if (allLay.indexOf(ID) !== -1) render._allDrawables[ID].updateDirection(dir);
    }

    dirOfID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      if (allLay.indexOf(ID) === -1) return 0;
      return render._allDrawables[ID]._direction;
    }

    rotateID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const x = Scratch.Cast.toNumber(args.x);
      const y = Scratch.Cast.toNumber(args.y);
      const allLay = render._drawList;
      if (allLay.indexOf(ID) !== -1) {
        render._allDrawables[ID].skin._rotationCenter = new Float32Array([x, y, 0]);
        render._allDrawables[ID]._skinWasAltered();
      }
    }

    rotateOfID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      const isX = args.XY === "x" ? 0 : 1;
      if (allLay.indexOf(ID) === -1) return 0;
      return render._allDrawables[ID]._skinScale[isX] / 2;
    }

    positionID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const x = Scratch.Cast.toNumber(args.x);
      const y = Scratch.Cast.toNumber(args.y);
      const allLay = render._drawList;
      if (allLay.indexOf(ID) !== -1) {
        render._allDrawables[ID].updatePosition([x, y]);
      }
    }

    posOfID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      const isX = args.XY === "x" ? 0 : 1;
      if (allLay.indexOf(ID) === -1) return 0;
      return render._allDrawables[ID]._position[isX];
    }

    toggleAutoRedraw(args) {
      autoRedraw = args.TYPE === "on";
    }

    forceRedraw() {
      const ogAutoRedraw = autoRedraw;
      autoRedraw = true;
      render.dirty = true;
      render.draw();
      autoRedraw = ogAutoRedraw;
    }

    // 辅助函数
    hex2Vec4(hex) {
      hex = hex.startsWith("#") ? hex.slice(1) : hex;
      let a = 255;
      if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16);
      return [
        parseInt(hex.slice(0, 2), 16) / 255,
        parseInt(hex.slice(2, 4), 16) / 255,
        parseInt(hex.slice(4, 6), 16) / 255,
        a / 255
      ];
    }

    arrayMatches(arr1, arr2) {
      return arr1.every((val, i) => val === arr2[i]);
    }

    // 新的基于ID的功能
    tintID(args) {
      initializeCustomShaders(); // 延迟初始化
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;

      const drawable = render._allDrawables[ID];
      initDrawable(drawable);
      // 设置色调时强制使用自定义着色器
      drawable[drawableKey].forceCustomShader = true;
      const oldTint = drawable[drawableKey].tint;
      drawable[drawableKey].tint = this.hex2Vec4(args.COLOR);
      if (!this.arrayMatches(oldTint, drawable[drawableKey].tint)) render.dirty = true;
    }

    replaceColorID(args) {
      initializeCustomShaders(); // 延迟初始化
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;

      this.resetColorID({ COLOR1: args.COLOR1, ID: args.ID });
      const drawable = render._allDrawables[ID];
      initDrawable(drawable);
      // 设置颜色替换时强制使用自定义着色器
      drawable[drawableKey].forceCustomShader = true;
      drawable[drawableKey].replacers.push({
        targetHex: args.COLOR1,
        targetVert: this.hex2Vec4(args.COLOR1),
        replaceVert: this.hex2Vec4(args.COLOR2),
        soft: Math.max(Cast.toNumber(args.VALUE), 1) / 100
      });
      render.dirty = true;
    }

    resetColorID(args) {
      initializeCustomShaders(); // 延迟初始化
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;

      const drawable = render._allDrawables[ID];
      initDrawable(drawable);
      const index = drawable[drawableKey].replacers.findIndex((i) => { return i.targetHex === args.COLOR1 });
      if (index > -1) drawable[drawableKey].replacers.splice(index, 1);
      render.dirty = true;
    }

    resetReplacersID(args) {
      initializeCustomShaders(); // 延迟初始化
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;

      const drawable = render._allDrawables[ID];
      initDrawable(drawable);
      if (drawable[drawableKey].replacers.length > 0) {
        drawable[drawableKey].replacers = [];
        render.dirty = true;
      }
    }

    warpID(args) {
      initializeCustomShaders(); // 延迟初始化
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;

      const drawable = render._allDrawables[ID];
      initDrawable(drawable);
      const oldWarp = drawable[drawableKey].warp;
      drawable[drawableKey].warp = [
        Cast.toNumber(args.x1) / -200, Cast.toNumber(args.y1) / -200,
        Cast.toNumber(args.x2) / -200, Cast.toNumber(args.y2) / -200,
        Cast.toNumber(args.x4) / -200, Cast.toNumber(args.y4) / -200,
        Cast.toNumber(args.x3) / -200, Cast.toNumber(args.y3) / -200
      ];
      if (!this.arrayMatches(oldWarp, drawable[drawableKey].warp)) render.dirty = true;
    }

    maskID(args) {
      initializeCustomShaders(); // 延迟初始化
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;

      const drawable = render._allDrawables[ID];
      initDrawable(drawable);

      const url = Cast.toString(args.IMAGE);
      if (drawable[drawableKey].oldMask === url) return;
      if (!url || !(url.startsWith("data:image/") || url.startsWith("https://"))) {
        drawable[drawableKey].maskTexture = "";
        drawable[drawableKey].oldMask = "";
        drawable[drawableKey].shouldMask = 0;
        render.dirty = true;
        return;
      }
      return new Promise((resolve) => {
        const gl = render._gl;
        if (!drawable[drawableKey]._maskTexture) {
          drawable[drawableKey]._maskTexture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, drawable[drawableKey]._maskTexture);

          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        }

        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, drawable[drawableKey]._maskTexture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

          drawable[drawableKey].maskTexture = drawable[drawableKey]._maskTexture;
          drawable[drawableKey].shouldMask = 1;
          drawable[drawableKey].oldMask = url;
          render.dirty = true;
          resolve();
        };
        image.onerror = (e) => {
          console.warn(e);
          resolve();
        };
        image.src = url;
      });
    }

    showID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;

      for (const target of runtime.targets) {
        if (target.drawableID === ID) {
          target.setVisible(true);
          return;
        }
      }
      
      const drawable = render._allDrawables[ID];
      if (drawable) {
        drawable.visible = true;
        render.dirty = true;
      }
    }

    hideID(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;

      for (const target of runtime.targets) {
        if (target.drawableID === ID) {
          target.setVisible(false);
          return;
        }
      }
      
      const drawable = render._allDrawables[ID];
      if (drawable) {
        drawable.visible = false;
        render.dirty = true;
      }
    }

    idShowing(args) {
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return false;

      let target = null;
      for (const t of runtime.targets) {
        if (t.drawableID === ID) {
          target = t;
          break;
        }
      }

      if (!target) {
        const drawable = render._allDrawables[ID];
        if (drawable) {
          if (args.TYPE === "showing") return drawable.visible;
          return !drawable.visible;
        }
        return false;
      }

      if (!target.visible) return false;
      if (args.TYPE === "showing") return true;
      else {
        if (target.effects.ghost === 100) return false;

        const bounds = target.getBounds();
        if (bounds.left > runtime.stageWidth / 2 || bounds.right < runtime.stageWidth / -2) return false;
        if (bounds.bottom > runtime.stageHeight / 2 || bounds.top < runtime.stageHeight / -2) return false;

        const layerInd = target.getLayerOrder() + 1;
        const rangeIds = new Array(render._allDrawables.length - layerInd);
        for (let i = 0; i < rangeIds.length; i++) { rangeIds[i] = layerInd + i }
        return !render.isTouchingDrawables(target.drawableID, rangeIds);
      }
    }

    getEffectValue(args) {
      initializeCustomShaders(); // 延迟初始化
      const effectName = args.EFFECT;
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return 0;
      
      const drawable = render._allDrawables[ID];
      if (!drawable) return 0;
      
      const customEffects = ["contrast", "posterize", "sepia", "bloom", "blur", "greenscreen", "saturation", "opaque", "lowblur"];
      
      if (customEffects.includes(effectName)) {
        initDrawable(drawable);
        const value = drawable[drawableKey].newEffects[effectName];
        return effectName === "posterize" ? value : value * 100;
      } else {
        return "false";
      }
    }

    resetAllCustomEffectsID(args) {
      initializeCustomShaders(); // 延迟初始化
      const ID = Scratch.Cast.toNumber(args.ID);
      const allLay = render._drawList;
      
      if (allLay.indexOf(ID) === -1) return;
      
      const drawable = render._allDrawables[ID];
      initDrawable(drawable);
      
      let changed = false;
      
      if (!this.arrayMatches(drawable[drawableKey].tint, [1, 1, 1, 1])) {
        drawable[drawableKey].tint = [1, 1, 1, 1];
        changed = true;
      }
      
      if (drawable[drawableKey].replacers.length > 0) {
        drawable[drawableKey].replacers = [];
        changed = true;
      }
      
      const defaultWarp = [0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5];
      if (!this.arrayMatches(drawable[drawableKey].warp, defaultWarp)) {
        drawable[drawableKey].warp = defaultWarp;
        changed = true;
      }
      
      if (drawable[drawableKey].shouldMask !== 0) {
        drawable[drawableKey].maskTexture = "";
        drawable[drawableKey].oldMask = "";
        drawable[drawableKey].shouldMask = 0;
        changed = true;
      }
      
      const defaultEffects = { ...newSingleEffects };
      for (const effect in defaultEffects) {
        if (drawable[drawableKey].newEffects[effect] !== defaultEffects[effect]) {
          drawable[drawableKey].newEffects[effect] = defaultEffects[effect];
          changed = true;
        }
      }
      
      // 重置强制标记
      drawable[drawableKey].forceCustomShader = false;
      
      if (changed) {
        render.dirty = true;
      }
    }
  }

  Scratch.extensions.register(new SPrenderControl());
})(Scratch);