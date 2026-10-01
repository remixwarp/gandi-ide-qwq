// Gandi Format (from RemixWarp, id=textplus)
(function (Scratch) {
  'use strict';

  Scratch.translate.setup({
    'zh-cn': {
      '_Text Plus': '艺术字++',
      '_Requires TurboWarp Animated Text': '需要TurboWarp艺术字搭配使用',
      '_Line Text Control': '行字设置',
      '_Line Control': '行字控制',
      '_Font Control': '字体控制',
      '_Debug': '调试',
      '_Art Text Animation': '艺术字动画',
      '_set line [LINE] text to [TEXT]': '设置第 [LINE] 行字的内容为 [TEXT]',
      '_get line [LINE] text': '获取第 [LINE] 行字的内容',
      '_total lines': '总行数',
      '_set line [LINE] size to [PERCENT]%': '设置第 [LINE] 行字号为 [PERCENT]%',
      '_set all lines size to [PERCENT]%': '设置所有行字号为 [PERCENT]%',
      '_reset line sizes': '重置所有行字号',
      '_line [LINE] size percent': '第 [LINE] 行字号百分比',
      '_set char [CHAR] x offset [X]%': '设置第 [CHAR] 个字 x 偏移 [X]%',
      '_set char [CHAR] y offset [Y]%': '设置第 [CHAR] 个字 y 偏移 [Y]%',
      '_reset all char offsets': '重置所有字偏移',
      '_set char [CHAR] rotation [ANGLE] degrees': '设置第 [CHAR] 个字旋转 [ANGLE] 度',
      '_reset all char rotations': '重置所有字旋转',
      '_set text blur [AMOUNT]': '设置文本高斯模糊 [AMOUNT] 像素',
      '_set art text display [PERCENT]% feather [FEATHER] exclude [EXCLUDE]': '设置艺术字显示 [PERCENT]% 羽化 [FEATHER] 排除第 [EXCLUDE] 行',
      '_set art text touch area expanded [EXPAND]': '扩大艺术字触碰范围 [EXPAND]',
      '_load font from URL [URL] as [FONT_NAME]': '从 [URL] 加载字体，命名为 [FONT_NAME]',
      '_set art text font to [FONT]': '设置艺术字字体为 [FONT]',
      '_remove loaded font [FONT_NAME]': '删除已加载字体 [FONT_NAME]',
      '_noLoadedFonts': '（无已加载字体）',
      '_remove all external fonts': '删除所有外部字体',
      '_font [FONT_NAME] exists?': '字体 [FONT_NAME] 是否存在？',
      '_refresh art text': '刷新艺术字',
      '_last error report': '最近一次异常错误报告',
      '_set art text from JSON [JSON]': '从 JSON 设置艺术字 [JSON]',
      '_yes': '是',
      '_no': '否',
    },
    'en': {
      '_Text Plus': 'Text Plus',
      '_Requires TurboWarp Animated Text': 'Requires TurboWarp Animated Text',
      '_Line Text Control': 'Line Text Control',
      '_Line Control': 'Line Control',
      '_Font Control': 'Font Control',
      '_Debug': 'Debug',
      '_Art Text Animation': 'Art Text Animation',
      '_set line [LINE] text to [TEXT]': 'set line [LINE] text to [TEXT]',
      '_get line [LINE] text': 'get line [LINE] text',
      '_total lines': 'total lines',
      '_set line [LINE] size to [PERCENT]%': 'set line [LINE] size to [PERCENT]%',
      '_set all lines size to [PERCENT]%': 'set all lines size to [PERCENT]%',
      '_reset line sizes': 'reset line sizes',
      '_line [LINE] size percent': 'line [LINE] size percent',
      '_set char [CHAR] x offset [X]%': 'set char [CHAR] x offset [X]%',
      '_set char [CHAR] y offset [Y]%': 'set char [CHAR] y offset [Y]%',
      '_reset all char offsets': 'reset all char offsets',
      '_set char [CHAR] rotation [ANGLE] degrees': 'set char [CHAR] rotation [ANGLE] degrees',
      '_reset all char rotations': 'reset all char rotations',
      '_set text blur [AMOUNT]': 'set text blur [AMOUNT] pixels',
      '_set art text display [PERCENT]% feather [FEATHER] exclude [EXCLUDE]': 'set art text display [PERCENT]% feather [FEATHER] exclude line [EXCLUDE]',
      '_set art text touch area expanded [EXPAND]': 'expand art text touch area [EXPAND]',
      '_load font from URL [URL] as [FONT_NAME]': 'load font from URL [URL] as [FONT_NAME]',
      '_set art text font to [FONT]': 'set art text font to [FONT]',
      '_remove loaded font [FONT_NAME]': 'remove loaded font [FONT_NAME]',
      '_noLoadedFonts': '(No loaded fonts)',
      '_remove all external fonts': 'remove all external fonts',
      '_font [FONT_NAME] exists?': 'font [FONT_NAME] exists?',
      '_refresh art text': 'refresh art text',
      '_last error report': 'last error report',
      '_set art text from JSON [JSON]': 'set art text from JSON [JSON]',
      '_yes': 'true',
      '_no': 'false',
    },
  });

  Scratch = { ...Scratch };
  const renderer2 = Scratch.vm.runtime.renderer;
  if (!Scratch.vm.renderer) Scratch.vm.renderer = renderer2;

  const TextBubbleSkin = renderer2.exports.TextBubbleSkin;
  const RenderedTarget = Scratch.vm.exports.RenderedTarget;

  if (!renderer2.exports || !renderer2.exports.Skin || !Scratch.vm.exports) {
    alert('VM is too old for Line Size Control extension');
    throw new Error('VM is too old');
  }

  const rendererProto = Object.getPrototypeOf(renderer2);
  if (!rendererProto.skinWasAltered) {
    rendererProto.skinWasAltered = function skinWasAltered(skin) {
      for (let i = 0; i < this._drawList.length; i++) {
        const drawableId = this._drawList[i];
        const drawable = this._allDrawables[drawableId];
        if (drawable._skin === skin) {
          drawable._skinWasAltered();
        }
      }
    };
  }

  const vm = Scratch.vm;
  const renderer = vm.renderer;
  const gl = renderer.gl;
  const twgl = renderer.exports.twgl;
  const CanvasMeasurementProvider = renderer.exports.CanvasMeasurementProvider;

  const CUSTOM_STATE_KEY = Symbol('lineSizeControlState');
  const PATCHED_PROTO_KEY = Symbol('lineSizeControlPatched');

  const DEFAULT_LINE_SIZE_PERCENT = 100;

  const ALIGN_LEFT = 0;
  const ALIGN_RIGHT = 1;
  const ALIGN_CENTER = 2;

  const blockIconURI =
    'data:image/svg+xml;,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22284.242%22%20height%3D%22284.242%22%3E%3Cg%20fill-rule%3D%22evenodd%22%20stroke-miterlimit%3D%2210%22%20data-paper-data%3D%22%7B%26quot%3BisPaintingLayer%26quot%3B%3Atrue%7D%22%20style%3D%22mix-blend-mode%3Anormal%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M188.894%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.48%209.888a1671.47%201671.47%200%200%200-4.174%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.83%20522.83%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.329%20157.508H225.43l-9.636-26.111h-54.08l-9.636%2026.11h-43.432l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22%2396f%22%20stroke%3D%22%237240d6%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%2229%22%20d%3D%22M188.894%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.48%209.888a1671.47%201671.47%200%200%200-4.174%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.83%20522.83%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.329%20157.508H225.43l-9.636-26.111h-54.08l-9.636%2026.11h-43.432l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M188.894%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.48%209.888a1671.47%201671.47%200%200%200-4.174%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.83%20522.83%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.329%20157.508H225.43l-9.636-26.111h-54.08l-9.636%2026.11h-43.432l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22%23ffa24d%22%20stroke%3D%22%23fff%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%229%22%20d%3D%22M188.894%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.48%209.888a1671.47%201671.47%200%200%200-4.174%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.83%20522.83%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.329%20157.508H225.43l-9.636-26.111h-54.08l-9.636%2026.11h-43.432l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M143.696%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888a1671.47%201671.47%200%200%200-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.827%20522.827%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.33%20157.508h-44.312l-9.637-26.111h-54.08l-9.636%2026.11H63.448l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22%2396f%22%20stroke%3D%22%237240d6%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%2229%22%20d%3D%22M143.696%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888a1671.47%201671.47%200%200%200-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.827%20522.827%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.33%20157.508h-44.312l-9.637-26.111h-54.08l-9.636%2026.11H63.448l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22%23ff774d%22%20stroke%3D%22%23fff%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%229%22%20d%3D%22M143.696%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888a1671.47%201671.47%200%200%200-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.827%20522.827%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.519-56.092%2062.33%20157.508h-44.312l-9.637-26.111h-54.08l-9.636%2026.11H63.448l62.768-157.507Z%22%2F%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M94.748%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888-1.27%203.442-2.66%207.263-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.885%20522.885%200%200%201-4.065-11.242%20408.343%20408.343%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.52-56.092%2062.328%20157.508h-44.311l-9.637-26.111h-54.08l-9.635%2026.11H14.5L77.269%2063.368Z%22%2F%3E%3Cpath%20fill%3D%22%2396f%22%20stroke%3D%22%237240d6%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%2229%22%20d%3D%22M94.748%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888-1.27%203.442-2.66%207.263-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.885%20522.885%200%200%201-4.065-11.242%20408.302%20408.302%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.52-56.092%2062.328%20157.508h-44.311l-9.637-26.111h-54.08l-9.635%2026.11H14.5L77.269%2063.368Z%22%2F%3E%3Cpath%20fill%3D%22%23ff4c4c%22%20stroke%3D%22%23fff%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%229%22%20d%3D%22M94.748%20119.459c-.706%202.378-1.43%204.69-2.172%206.933-1.05%203.15-2.21%206.445-3.479%209.888-1.27%203.442-2.66%207.263-4.175%2011.462l-5.73%2015.528h30.833l-5.73-15.528a522.885%20522.885%200%200%201-4.065-11.242%20408.302%20408.302%200%200%201-3.37-10.108%20350.767%20350.767%200%200%201-2.112-6.933zm18.52-56.092%2062.328%20157.508h-44.311l-9.637-26.111h-54.08l-9.635%2026.11H14.5L77.269%2063.368Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E';
  const Picture = 
    'https://workspace-zb-cdn.qianwen.com/9298ea3e4e9a43f1b54a7e8f3329f29c%2Fo%2F1787228015285-c.png?auth_key=1818767460-0-0-9b98bea1df006c595d39a8ce39caf487';
    
  function isArtTextSkin(skin) {
    return (
      skin &&
      typeof skin.text === 'string' &&
      typeof skin.setText === 'function' &&
      typeof skin._updateFontDimensions === 'function' &&
      typeof skin._invalidateText === 'function'
    );
  }

  function patchAnimatedTextPrototype(proto) {
    if (proto[PATCHED_PROTO_KEY]) return;
    proto[PATCHED_PROTO_KEY] = true;

    proto._reflowText = function _reflowTextWithLineSizes() {
      this._textDirty = false;
      this._textureDirty = true;
      this._reflowTime = Date.now();
      this._previousDrawableXScale = Math.abs(this.drawable.scale[0]);

      this._updateFontDimensions();

      if (!this.lineSizePercents) {
        this.lineSizePercents = [];
        this.defaultLineSizePercent = DEFAULT_LINE_SIZE_PERCENT;
      }
      if (!this.charXOffsets) this.charXOffsets = [];
      if (!this.charYOffsets) this.charYOffsets = [];
      if (!this.charSizePercents) this.charSizePercents = [];
      if (!this.charRotations) this.charRotations = [];
      if (this.textBlur === undefined) this.textBlur = 0;

      if (this.animationPercent === undefined) this.animationPercent = 100;
      if (this.animationFeather === undefined) this.animationFeather = 0;
      if (this.touchAreaExpanded === undefined) this.touchAreaExpanded = false;
      if (this.animationExcludeLine === undefined) this.animationExcludeLine = 0;

      let measurementProvider = this.measurementProvider;
      let textWrapper = this.textWrapper;
      if (!measurementProvider || !textWrapper) {
        measurementProvider = new CanvasMeasurementProvider(this.ctx);
        textWrapper = renderer.createTextWrapper(measurementProvider);
        this.measurementProvider = measurementProvider;
        this.textWrapper = textWrapper;
      }

      measurementProvider._cache = {};

      this.ctx.font = this._getFontStyleForSize(this.baseFontSize);
      const wrappedLines = textWrapper.wrapText(this.wrapWidth, this.text);

      this.lines = wrappedLines.map((line, i) => {
        const trimmed = line.trimEnd();
        const percent =
          i < this.lineSizePercents.length
            ? this.lineSizePercents[i]
            : this.defaultLineSizePercent;
        const fontSize = Math.max(0.01, (this.baseFontSize * percent) / 100);

        this.ctx.font = this._getFontStyleForSize(fontSize);
        const width = measurementProvider.measureText(trimmed);

        return {
          text: trimmed,
          width,
          fontSize,
          lineHeight: (fontSize * 8) / 7,
        };
      });

      let totalHeight = 2 * this.verticalPadding + 2 * this.outlineWidth;
      for (const line of this.lines) {
        totalHeight += line.lineHeight;
      }

      const blurPadding = this.textBlur > 0 ? Math.ceil(this.textBlur * 2) : 0;
      this._blurPadding = blurPadding;

      this._size[0] = this.wrapWidth + 2 * this.outlineWidth + 2 * blurPadding;
      this._size[1] = totalHeight + 2 * blurPadding;

      this._rotationCenter[0] = this._size[0] / 2;
      this._rotationCenter[1] = this._size[1] / 2;

      this._extraX = 0;
      this._extraY = 0;
    };

    proto._renderAtScale = function _renderAtScaleWithLineSizes(requestedScale) {
      this._renderedAtScale = requestedScale;
      this._textureDirty = false;
      this._renderTime = Date.now();

      const scratchWidth = this._size[0];
      const scratchHeight = this._size[1];

      this.canvas.width = Math.ceil(scratchWidth * requestedScale);
      this.canvas.height = Math.ceil(scratchHeight * requestedScale);
      this.ctx.scale(requestedScale, requestedScale);
      this.ctx.translate(this.outlineWidth + this._blurPadding, this.outlineWidth + this._blurPadding);

      this.ctx.fillStyle = this.color;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';

      let currentY = this.verticalPadding;
      let globalCharIndex = 0;
      let lineIndex = 0;
      const totalLines = this.lines.length;

      const excludeLine = Math.max(0, Math.floor(this.animationExcludeLine || 0));
      const hasExclusion = excludeLine > 0 && excludeLine <= totalLines;
      const effectiveTotalLines = hasExclusion ? (excludeLine - 1) : totalLines;
      const applyAnimation = (this.animationPercent < 100 - 1e-6) || hasExclusion;

      const hasCharOffsets =
        (this.charXOffsets && this.charXOffsets.some((v) => v !== 0)) ||
        (this.charYOffsets && this.charYOffsets.some((v) => v !== 0)) ||
        (this.charSizePercents && this.charSizePercents.some((v) => v !== 100)) ||
        (this.charRotations && this.charRotations.some((v) => v !== 0));

      for (const line of this.lines) {
        this.ctx.font = this._getFontStyleForSize(line.fontSize);

        let xOffset;
        if (this.align === ALIGN_LEFT) {
          xOffset = 0;
        } else if (this.align === ALIGN_CENTER) {
          xOffset = (this.wrapWidth - line.width) / 2;
        } else {
          xOffset = this.wrapWidth - line.width;
        }

        const yOffset = currentY + line.fontSize;

        this.ctx.filter = this.textBlur > 0 ? `blur(${this.textBlur}px)` : 'none';

        // 动态测量文本实际边界（用于遮罩垂直范围）
        let maskTopY = currentY - line.fontSize * 0.2;
        let maskHeight = line.lineHeight + line.fontSize * 0.4;
        try {
          const metrics = this.ctx.measureText(line.text);
          if (metrics && typeof metrics.actualBoundingBoxAscent === 'number' && typeof metrics.actualBoundingBoxDescent === 'number') {
            const ascent = metrics.actualBoundingBoxAscent || line.fontSize * 0.8;
            const descent = metrics.actualBoundingBoxDescent || line.fontSize * 0.2;
            maskTopY = yOffset - ascent - 2;
            maskHeight = ascent + descent + 4;
          }
        } catch (e) {
          // 回退到默认扩展
        }

        if (!hasCharOffsets) {
          if (this.outlineWidth > 0) {
            this.ctx.lineWidth = this.outlineWidth;
            this.ctx.strokeStyle = this.outlineColor;
            this.ctx.strokeText(line.text, xOffset, yOffset);
          }
          this.ctx.fillText(line.text, xOffset, yOffset);
        } else {
          let cursorX = xOffset;
          for (const char of line.text) {
            const idx = globalCharIndex;
            const xPercent = (this.charXOffsets && this.charXOffsets[idx]) || 0;
            const yPercent = (this.charYOffsets && this.charYOffsets[idx]) || 0;
            const sizePercent = (this.charSizePercents && this.charSizePercents[idx]) || 100;
            const rotation = (this.charRotations && this.charRotations[idx]) || 0;

            const charFontSize = line.fontSize * (sizePercent / 100);
            this.ctx.font = this._getFontStyleForSize(charFontSize);

            const charWidth = this.ctx.measureText(char).width;
            const x = cursorX + (xPercent / 100) * charFontSize;
            const y = yOffset - (yPercent / 100) * charFontSize;

            const centerX = x + charWidth / 2;
            const centerY = y - charFontSize * 0.35;

            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate((rotation * Math.PI) / 180);
            this.ctx.translate(-centerX, -centerY);

            if (this.outlineWidth > 0) {
              this.ctx.lineWidth = this.outlineWidth;
              this.ctx.strokeStyle = this.outlineColor;
              this.ctx.strokeText(char, x, y);
            }
            this.ctx.fillText(char, x, y);

            this.ctx.restore();

            cursorX += charWidth;
            globalCharIndex++;
          }
        }

        if (applyAnimation) {
          let localPercent;
          if (effectiveTotalLines <= 0) {
            localPercent = 0;
          } else if (lineIndex < effectiveTotalLines) {
            const rowStart = (lineIndex / effectiveTotalLines) * 100;
            const rowEnd = ((lineIndex + 1) / effectiveTotalLines) * 100;
            localPercent = Math.max(0, Math.min(100, ((this.animationPercent - rowStart) / (rowEnd - rowStart)) * 100));
          } else {
            localPercent = 0; // 排除行及之后始终透明
          }

          this.ctx.filter = 'none';

          const threshold = 0.5;
          if (localPercent <= threshold) {
            this._applyAnimationMask(xOffset, line.width, maskHeight, maskTopY, 0, 0);
          } else if (localPercent >= 100 - threshold) {
            // 完全显示，不应用遮罩
          } else {
            this._applyAnimationMask(xOffset, line.width, maskHeight, maskTopY, localPercent, this.animationFeather);
          }
        }

        currentY += line.lineHeight;
        lineIndex++;
      }

      this.ctx.filter = 'none';

      // 如果开启触碰范围扩大，绘制一个几乎不可见的矩形覆盖整个纹理区域
      if (this.touchAreaExpanded) {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.01)'; // 1% 不透明度，几乎不可见但能被碰撞检测识别
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
      }

      if (!this._texture) {
        this._texture = twgl.createTexture(gl, {
          auto: false,
          wrap: gl.CLAMP_TO_EDGE,
        });
      }
      this._setTexture(this.canvas);
    };

    proto._applyAnimationMask = function _applyAnimationMask(xOffset, lineWidth, lineHeight, topY, percent, feather) {
      if (lineWidth <= 0) return;
      if (percent >= 100 && feather <= 0) return;

      const ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.rect(xOffset, topY, lineWidth, lineHeight);
      ctx.clip();

      const clipX = xOffset + lineWidth * (percent / 100);
      const featherWidth = (feather / 100) * lineWidth;
      const grad = ctx.createLinearGradient(xOffset, 0, xOffset + lineWidth, 0);

      if (featherWidth > 0) {
        const start = Math.max(0, Math.min(1, (clipX - featherWidth - xOffset) / lineWidth));
        const end = Math.max(0, Math.min(1, (clipX - xOffset) / lineWidth));
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(start, 'rgba(255,255,255,1)');
        grad.addColorStop(end, 'rgba(255,255,255,0)');
        if (end < 1) grad.addColorStop(1, 'rgba(255,255,255,0)');
      } else {
        const stop = Math.max(0, Math.min(1, (clipX - xOffset) / lineWidth));
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(Math.max(0, stop - 0.001), 'rgba(255,255,255,1)');
        grad.addColorStop(Math.min(1, stop + 0.001), 'rgba(255,255,255,0)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
      }

      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = grad;
      ctx.fillRect(xOffset, topY, lineWidth, lineHeight);

      ctx.globalCompositeOperation = 'source-over';
      ctx.restore();
    };

    proto._getFontStyleForSize = function _getFontStyleForSize(size) {
      return `${size}px ${this.fontFamily}, sans-serif`;
    };
  }

  class LineSizeControl {
    constructor() {
      this.loadedFonts = [];
      this.lastError = '';

      const originalMakeClone = RenderedTarget.prototype.makeClone;
      RenderedTarget.prototype.makeClone = function () {
        const newClone = originalMakeClone.call(this);
        if (this[CUSTOM_STATE_KEY]) {
          const originalState = this[CUSTOM_STATE_KEY];
          const newState = {
            lineSizePercents: originalState.lineSizePercents.slice(),
            defaultLineSizePercent: originalState.defaultLineSizePercent,
            charXOffsets: originalState.charXOffsets.slice(),
            charYOffsets: originalState.charYOffsets.slice(),
            charSizePercents: originalState.charSizePercents.slice(),
            charRotations: originalState.charRotations.slice(),
            textBlur: originalState.textBlur,
            animationPercent: originalState.animationPercent,
            animationFeather: originalState.animationFeather,
            animationExcludeLine: originalState.animationExcludeLine,
            touchAreaExpanded: originalState.touchAreaExpanded,
            skin: null,
          };
          newClone[CUSTOM_STATE_KEY] = newState;
        }
        return newClone;
      };

      vm.runtime.on('PROJECT_STARTED', () => {
        for (const target of vm.runtime.targets) {
          const state = target[CUSTOM_STATE_KEY];
          if (!state) continue;
          state.charXOffsets = [];
          state.charYOffsets = [];
          state.charSizePercents = [];
          state.charRotations = [];
          state.textBlur = 0;
          state.animationPercent = 100;
          state.animationFeather = 0;
          state.animationExcludeLine = 0;
          state.touchAreaExpanded = false;
          const skin = this._getCurrentSkin(target);
          if (skin) {
            this._ensureSkinPatched(skin);
            skin.charXOffsets = [];
            skin.charYOffsets = [];
            skin.charSizePercents = [];
            skin.charRotations = [];
            skin.textBlur = 0;
            skin.animationPercent = 100;
            skin.animationFeather = 0;
            skin.animationExcludeLine = 0;
            skin.touchAreaExpanded = false;
            skin._invalidateText();
          }
        }
      });

      vm.runtime.on('BEFORE_EXECUTE', () => {
        for (const target of vm.runtime.targets) {
          const skin = this._getCurrentSkin(target);
          if (!skin) continue;
          this._ensureSkinPatched(skin);

          if (target[CUSTOM_STATE_KEY]) {
            const state = target[CUSTOM_STATE_KEY];
            if (skin !== state.skin) {
              state.skin = skin;
              this._applyStateToSkin(state, skin);
            }
          } else {
            let needInvalidate = false;
            if (skin.defaultLineSizePercent !== DEFAULT_LINE_SIZE_PERCENT) {
              skin.defaultLineSizePercent = DEFAULT_LINE_SIZE_PERCENT;
              needInvalidate = true;
            }
            if (skin.lineSizePercents && skin.lineSizePercents.length > 0) {
              skin.lineSizePercents = [];
              needInvalidate = true;
            }
            if (skin.charXOffsets && skin.charXOffsets.length > 0) {
              skin.charXOffsets = [];
              needInvalidate = true;
            }
            if (skin.charYOffsets && skin.charYOffsets.length > 0) {
              skin.charYOffsets = [];
              needInvalidate = true;
            }
            if (skin.charSizePercents && skin.charSizePercents.length > 0) {
              skin.charSizePercents = [];
              needInvalidate = true;
            }
            if (skin.charRotations && skin.charRotations.length > 0) {
              skin.charRotations = [];
              needInvalidate = true;
            }
            if (skin.textBlur !== 0) {
              skin.textBlur = 0;
              needInvalidate = true;
            }
            if (skin.animationPercent !== 100) {
              skin.animationPercent = 100;
              needInvalidate = true;
            }
            if (skin.animationFeather !== 0) {
              skin.animationFeather = 0;
              needInvalidate = true;
            }
            if (skin.animationExcludeLine !== 0) {
              skin.animationExcludeLine = 0;
              needInvalidate = true;
            }
            if (skin.touchAreaExpanded !== false) {
              skin.touchAreaExpanded = false;
              needInvalidate = true;
            }
            if (needInvalidate) {
              skin._invalidateText();
            }
          }
        }

        this._patchOriginalGetFontsIfNeeded();
      });
    }

    getInfo() {
      return {
        id: 'textplus',
        name: Scratch.translate('Text Plus'),
        color1: '#9966FF',
        blockIconURI: blockIconURI,
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate('Requires TurboWarp Animated Text'),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate('Line Text Control'),
          },
          {
            opcode: 'setTouchAreaExpanded',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set art text touch area expanded [EXPAND]'),
            arguments: {
              EXPAND: { type: Scratch.ArgumentType.STRING, menu: 'textPlusTouchAreaMenu' },
            },
          },
          {
            opcode: 'setLineText',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set line [LINE] text to [TEXT]'),
            arguments: {
              LINE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'abc' },
            },
          },
          {
            opcode: 'getLineText',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('get line [LINE] text'),
            disableMonitor: true,
            arguments: {
              LINE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: 'getTotalLines',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('total lines'),
            disableMonitor: true,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate('Line Control'),
          },
          {
            opcode: 'setLineSize',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set line [LINE] size to [PERCENT]%'),
            arguments: {
              LINE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              PERCENT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: 'setAllLineSizes',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set all lines size to [PERCENT]%'),
            arguments: {
              PERCENT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: 'resetLineSizes',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('reset line sizes'),
          },
          {
            opcode: 'getLineSize',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('line [LINE] size percent'),
            disableMonitor: true,
            arguments: {
              LINE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: 'setCharXOffset',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set char [CHAR] x offset [X]%'),
            arguments: {
              CHAR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: 'setCharYOffset',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set char [CHAR] y offset [Y]%'),
            arguments: {
              CHAR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: 'resetCharOffsets',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('reset all char offsets'),
          },
          {
            opcode: 'setCharRotation',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set char [CHAR] rotation [ANGLE] degrees'),
            arguments: {
              CHAR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              ANGLE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: 'resetCharRotations',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('reset all char rotations'),
          },
          {
            opcode: 'setTextBlur',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set text blur [AMOUNT]'),
            arguments: {
              AMOUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: 'setArtTextFromJSON',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set art text from JSON [JSON]'),
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"a":{"x":0,"y":0,"size":100,"rotation":0},"bc":{"x":20,"y":10,"size":80,"rotation":90},"blur":3}',
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate('Art Text Animation'),
          },
          {
            opcode: 'setArtTextAnimation',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set art text display [PERCENT]% feather [FEATHER] exclude [EXCLUDE]'),
            arguments: {
              PERCENT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              FEATHER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              EXCLUDE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate('Font Control'),
          },
          {
            opcode: 'loadFontFromURL',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('load font from URL [URL] as [FONT_NAME]'),
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: 'https://example.com/font.woff2' },
              FONT_NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'MyFont' },
            },
          },
          {
            opcode: 'setArtTextFont',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set art text font to [FONT]'),
            arguments: {
              FONT: { type: Scratch.ArgumentType.STRING, menu: 'textPlusFontMenu' },
            },
          },
          {
            opcode: 'removeFont',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('remove loaded font [FONT_NAME]'),
            arguments: {
              FONT_NAME: { type: Scratch.ArgumentType.STRING, menu: 'customFontMenu' },
            },
          },
          {
            opcode: 'removeAllFonts',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('remove all external fonts'),
          },
          {
            opcode: 'fontExists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate('font [FONT_NAME] exists?'),
            arguments: {
              FONT_NAME: { type: Scratch.ArgumentType.STRING, menu: 'customFontMenu' },
            },
            disableMonitor: true,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate('Debug'),
          },
          {
            opcode: 'refreshArtText',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('refresh art text'),
          },
          {
            opcode: 'getLastError',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('last error report'),
            disableMonitor: true,
          },
        ],
        menus: {
          textPlusFontMenu: {
            acceptReporters: true,
            items: 'getTextPlusFontMenuItems',
          },
          customFontMenu: {
            acceptReporters: true,
            items: 'getCustomFontMenuItems',
          },
          textPlusTouchAreaMenu: {
            acceptReporters: true,
            items: 'getTextPlusTouchAreaMenuItems',
          },
        },
      };
    }

    getTextPlusTouchAreaMenuItems() {
      let locale = 'en';
      try {
        if (Scratch.vm && Scratch.vm.runtime && typeof Scratch.vm.runtime.getCurrentLocale === 'function') {
          locale = Scratch.vm.runtime.getCurrentLocale();
        } else {
          locale = navigator.language || 'en';
        }
      } catch (e) {
        locale = 'en';
      }

      const isChinese = String(locale).toLowerCase().startsWith('zh');

      return [
        { text: isChinese ? '是' : 'true', value: 'true' },
        { text: isChinese ? '否' : 'false', value: 'false' }
      ];
    }

    _getState(target) {
      let state = target[CUSTOM_STATE_KEY];
      if (!state) {
        state = {
          lineSizePercents: [],
          defaultLineSizePercent: DEFAULT_LINE_SIZE_PERCENT,
          charXOffsets: [],
          charYOffsets: [],
          charSizePercents: [],
          charRotations: [],
          textBlur: 0,
          animationPercent: 100,
          animationFeather: 0,
          animationExcludeLine: 0,
          touchAreaExpanded: false,
          skin: null,
        };
        target[CUSTOM_STATE_KEY] = state;
      }
      return state;
    }

    _getCurrentSkin(target) {
      const drawable = renderer._allDrawables && renderer._allDrawables[target.drawableID];
      if (!drawable) return null;
      const skin = drawable.skin;
      return isArtTextSkin(skin) ? skin : null;
    }

    _ensureSkinPatched(skin) {
      if (!skin) return;
      const proto = Object.getPrototypeOf(skin);
      if (!proto[PATCHED_PROTO_KEY]) {
        patchAnimatedTextPrototype(proto);
      }
    }

    _applyStateToSkin(state, skin) {
      if (!skin) return;
      this._ensureSkinPatched(skin);

      let changed = false;

      if (skin.defaultLineSizePercent !== state.defaultLineSizePercent) {
        skin.defaultLineSizePercent = state.defaultLineSizePercent;
        changed = true;
      }

      const currentLine = skin.lineSizePercents || [];
      const nextLine = state.lineSizePercents.slice();
      if (
        currentLine.length !== nextLine.length ||
        currentLine.some((v, i) => v !== nextLine[i])
      ) {
        skin.lineSizePercents = nextLine;
        changed = true;
      }

      const currentX = skin.charXOffsets || [];
      const nextX = state.charXOffsets.slice();
      if (
        currentX.length !== nextX.length ||
        currentX.some((v, i) => v !== nextX[i])
      ) {
        skin.charXOffsets = nextX;
        changed = true;
      }

      const currentY = skin.charYOffsets || [];
      const nextY = state.charYOffsets.slice();
      if (
        currentY.length !== nextY.length ||
        currentY.some((v, i) => v !== nextY[i])
      ) {
        skin.charYOffsets = nextY;
        changed = true;
      }

      const currentSize = skin.charSizePercents || [];
      const nextSize = state.charSizePercents.slice();
      if (
        currentSize.length !== nextSize.length ||
        currentSize.some((v, i) => v !== nextSize[i])
      ) {
        skin.charSizePercents = nextSize;
        changed = true;
      }

      const currentRot = skin.charRotations || [];
      const nextRot = state.charRotations.slice();
      if (
        currentRot.length !== nextRot.length ||
        currentRot.some((v, i) => v !== nextRot[i])
      ) {
        skin.charRotations = nextRot;
        changed = true;
      }

      if (skin.textBlur !== state.textBlur) {
        skin.textBlur = state.textBlur;
        changed = true;
      }

      if (skin.animationPercent !== state.animationPercent) {
        skin.animationPercent = state.animationPercent;
        changed = true;
      }

      if (skin.animationFeather !== state.animationFeather) {
        skin.animationFeather = state.animationFeather;
        changed = true;
      }

      if (skin.animationExcludeLine !== state.animationExcludeLine) {
        skin.animationExcludeLine = state.animationExcludeLine;
        changed = true;
      }

      if (skin.touchAreaExpanded !== state.touchAreaExpanded) {
        skin.touchAreaExpanded = state.touchAreaExpanded;
        changed = true;
      }

      if (changed) {
        skin._invalidateText();
      }
    }

    _updateCurrentSkin(target, state) {
      const skin = this._getCurrentSkin(target);
      if (skin) {
        this._applyStateToSkin(state, skin);
        state.skin = skin;
      }
    }

    _clearCharEffects(state) {
      state.charXOffsets = [];
      state.charYOffsets = [];
      state.charSizePercents = [];
      state.charRotations = [];
      state.textBlur = 0;
    }

    setTouchAreaExpanded({ EXPAND }, util) {
      const state = this._getState(util.target);
      const raw = Scratch.Cast.toString(EXPAND).toLowerCase();
      const expanded = raw === 'true' || raw === '是' || raw === 'yes';
      state.touchAreaExpanded = expanded;
      this._updateCurrentSkin(util.target, state);
    }

    setLineText({ LINE, TEXT }, util) {
      const skin = this._getCurrentSkin(util.target);
      if (!skin) {
        this.lastError = 'Current sprite is not displaying art text';
        return;
      }

      const lineNumber = Math.floor(Scratch.Cast.toNumber(LINE));
      if (lineNumber < 1) {
        this.lastError = 'Line number must be greater than 0';
        return;
      }

      const text = Scratch.Cast.toString(TEXT);
      const lines = skin.text ? skin.text.split('\n') : [];
      if (lineNumber > lines.length) {
        this.lastError = 'Line number out of range';
        return;
      }

      lines[lineNumber - 1] = text;
      skin.setText(lines.join('\n'));

      const state = this._getState(util.target);
      this._clearCharEffects(state);
      this._updateCurrentSkin(util.target, state);

      util.runtime.requestRedraw();
    }

    getLineText({ LINE }, util) {
      const skin = this._getCurrentSkin(util.target);
      if (!skin) return '';
      const lineNumber = Math.floor(Scratch.Cast.toNumber(LINE));
      if (lineNumber < 1) return '';
      const lines = skin.text ? skin.text.split('\n') : [];
      if (lineNumber <= lines.length) {
        return lines[lineNumber - 1];
      }
      return '';
    }

    getTotalLines(args, util) {
      const skin = this._getCurrentSkin(util.target);
      if (!skin) return 0;
      if (!skin.text) return 0;
      return skin.text.split('\n').length;
    }

    setLineSize({ LINE, PERCENT }, util) {
      const state = this._getState(util.target);
      const lineNumber = Math.floor(Scratch.Cast.toNumber(LINE));
      if (lineNumber < 1) return;
      const index = lineNumber - 1;
      const percent = Math.max(0.01, Scratch.Cast.toNumber(PERCENT));

      while (state.lineSizePercents.length <= index) {
        state.lineSizePercents.push(state.defaultLineSizePercent);
      }
      state.lineSizePercents[index] = percent;
      this._updateCurrentSkin(util.target, state);
    }

    setAllLineSizes({ PERCENT }, util) {
      const state = this._getState(util.target);
      const percent = Math.max(0.01, Scratch.Cast.toNumber(PERCENT));
      state.defaultLineSizePercent = percent;
      state.lineSizePercents = [];
      this._updateCurrentSkin(util.target, state);
    }

    resetLineSizes(args, util) {
      const state = this._getState(util.target);
      state.defaultLineSizePercent = DEFAULT_LINE_SIZE_PERCENT;
      state.lineSizePercents = [];
      this._updateCurrentSkin(util.target, state);
    }

    getLineSize({ LINE }, util) {
      const state = this._getState(util.target);
      const lineNumber = Math.floor(Scratch.Cast.toNumber(LINE));
      if (lineNumber < 1) return state.defaultLineSizePercent;
      const index = lineNumber - 1;
      if (index < state.lineSizePercents.length) {
        return state.lineSizePercents[index];
      }
      return state.defaultLineSizePercent;
    }

    setCharXOffset({ CHAR, X }, util) {
      const state = this._getState(util.target);
      const charIndex = Math.floor(Scratch.Cast.toNumber(CHAR));
      if (charIndex < 1) return;
      const x = Scratch.Cast.toNumber(X);

      while (state.charXOffsets.length < charIndex) state.charXOffsets.push(0);
      state.charXOffsets[charIndex - 1] = x;
      this._updateCurrentSkin(util.target, state);
    }

    setCharYOffset({ CHAR, Y }, util) {
      const state = this._getState(util.target);
      const charIndex = Math.floor(Scratch.Cast.toNumber(CHAR));
      if (charIndex < 1) return;
      const y = Scratch.Cast.toNumber(Y);

      while (state.charYOffsets.length < charIndex) state.charYOffsets.push(0);
      state.charYOffsets[charIndex - 1] = y;
      this._updateCurrentSkin(util.target, state);
    }

    setCharRotation({ CHAR, ANGLE }, util) {
      const state = this._getState(util.target);
      const charIndex = Math.floor(Scratch.Cast.toNumber(CHAR));
      if (charIndex < 1) return;
      const angle = Scratch.Cast.toNumber(ANGLE);

      while (state.charRotations.length < charIndex) state.charRotations.push(0);
      state.charRotations[charIndex - 1] = angle;
      this._updateCurrentSkin(util.target, state);
    }

    setTextBlur({ AMOUNT }, util) {
      const state = this._getState(util.target);
      const blur = Math.max(0, Scratch.Cast.toNumber(AMOUNT));
      state.textBlur = blur;
      this._updateCurrentSkin(util.target, state);
    }

    resetCharOffsets(args, util) {
      const state = this._getState(util.target);
      state.charXOffsets = [];
      state.charYOffsets = [];
      state.charSizePercents = [];
      this._updateCurrentSkin(util.target, state);
    }

    resetCharRotations(args, util) {
      const state = this._getState(util.target);
      state.charRotations = [];
      this._updateCurrentSkin(util.target, state);
    }

    setArtTextAnimation({ PERCENT, FEATHER, EXCLUDE }, util) {
      const state = this._getState(util.target);
      const percent = Math.max(0, Math.min(100, Scratch.Cast.toNumber(PERCENT)));
      const feather = Math.max(0, Math.min(100, Scratch.Cast.toNumber(FEATHER)));
      const excludeLine = Math.max(0, Math.floor(Scratch.Cast.toNumber(EXCLUDE) || 0));
      state.animationPercent = percent;
      state.animationFeather = feather;
      state.animationExcludeLine = excludeLine;
      this._updateCurrentSkin(util.target, state);
      util.runtime.requestRedraw();
    }

    setArtTextFromJSON({ JSON: jsonStr }, util) {
      const state = this._getState(util.target);
      let parsed;
      try {
        parsed = JSON.parse(Scratch.Cast.toString(jsonStr));
      } catch (err) {
        this.lastError = 'JSON format error: ' + err.message;
        return;
      }

      let text = '';
      const xOffsets = [];
      const yOffsets = [];
      const sizePercents = [];
      const rotations = [];
      let textBlur = 0;

      const processChar = (char, props) => {
        if (char === '\n') {
          text += '\n';
          return;
        }
        const chars = Array.from(char);
        for (const c of chars) {
          text += c;
          const x = Number(props.x) || 0;
          const y = Number(props.y) || 0;
          const size = Number(props.size) || 100;
          const rotation = Number(props.rotation) || 0;
          xOffsets.push(x);
          yOffsets.push(y);
          sizePercents.push(Math.max(0.01, size));
          rotations.push(rotation);
        }
      };

      const processObject = (obj) => {
        for (const key of Object.keys(obj)) {
          if (key === 'blur') {
            const blurValue = Number(obj[key]);
            if (Number.isFinite(blurValue) && blurValue > 0) {
              textBlur = blurValue;
            }
            continue;
          }
          if (key === '\n') {
            text += '\n';
            continue;
          }
          processChar(key, obj[key] || {});
        }
      };

      if (Array.isArray(parsed)) {
        for (let i = 0; i < parsed.length; i++) {
          const item = parsed[i];
          if (item && item.newline === true && Object.keys(item).length === 1) {
            text += '\n';
            continue;
          }
          if (item && typeof item.char === 'string') {
            processChar(item.char, item);
            continue;
          }
          if (item && typeof item === 'object') {
            processObject(item);
            if (i < parsed.length - 1 && !(parsed[i+1] && parsed[i+1].char)) {
              if (!(parsed[i+1] && parsed[i+1].newline)) {
                text += '\n';
              }
            }
          }
        }
        if (text.endsWith('\n')) {
          text = text.slice(0, -1);
        }
      } else if (typeof parsed === 'object' && parsed !== null) {
        processObject(parsed);
      } else {
        this.lastError = 'JSON must be an object or array';
        return;
      }

      const skin = this._getCurrentSkin(util.target);
      if (!skin) {
        this.lastError = 'Current sprite is not displaying art text';
        return;
      }
      skin.setText(text);

      state.charXOffsets = xOffsets;
      state.charYOffsets = yOffsets;
      state.charSizePercents = sizePercents;
      state.charRotations = rotations;
      state.textBlur = textBlur;

      this._updateCurrentSkin(util.target, state);
      util.runtime.requestRedraw();
      this.lastError = '';
    }

    getTextPlusFontMenuItems() {
      const builtInFonts = [
        { text: 'Sans Serif', value: 'Sans Serif' },
        { text: 'Serif', value: 'Serif' },
        { text: 'Handwriting', value: 'Handwriting' },
        { text: 'Marker', value: 'Marker' },
        { text: 'Curly', value: 'Curly' },
        { text: 'Pixel', value: 'Pixel' },
        { text: 'Scratch', value: 'Scratch' },
      ];
      const customFonts = this.loadedFonts.map((f) => ({
        text: f.name,
        value: f.name,
      }));
      return [...builtInFonts, ...customFonts];
    }

    getCustomFontMenuItems() {
      const items = this.loadedFonts.map((f) => ({
        text: f.name,
        value: f.name,
      }));
      if (items.length === 0) {
        return [{ text: Scratch.translate('noLoadedFonts'), value: '' }];
      }
      return items;
    }

    async loadFontFromURL({ URL, FONT_NAME }, util) {
      const url = Scratch.Cast.toString(URL).trim();
      const fontName = Scratch.Cast.toString(FONT_NAME).trim();

      if (!url || !fontName) {
        this.lastError = 'URL and font name cannot be empty';
        return;
      }

      try {
        const cleanUrl = url.split('?')[0].split('#')[0];
        const ext = cleanUrl.split('.').pop().toLowerCase();
        let format = '';
        if (ext === 'woff2') format = 'woff2';
        else if (ext === 'woff') format = 'woff';
        else if (ext === 'ttf') format = 'truetype';
        else if (ext === 'otf') format = 'opentype';

        const src = format ? `url(${url}) format('${format}')` : `url(${url})`;
        const face = new FontFace(fontName, src);
        await face.load();
        document.fonts.add(face);

        if (!this.loadedFonts.some((f) => f.name === fontName)) {
          this.loadedFonts.push({ name: fontName, url, face });
        } else {
          const existing = this.loadedFonts.find((f) => f.name === fontName);
          if (existing) {
            existing.url = url;
            existing.face = face;
          }
        }

        this.lastError = '';
        this._patchOriginalGetFontsIfNeeded();
        this._refreshBlockMenus();
        vm.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE');
      } catch (err) {
        this.lastError = err.message || String(err);
        console.error('Font loading failed:', err);
        alert('Font loading failed: ' + this.lastError);
      }
    }

    setArtTextFont({ FONT }, util) {
      const font = Scratch.Cast.toString(FONT);
      if (!font) return;
      const skin = this._getCurrentSkin(util.target);
      if (skin && typeof skin.setFontFamily === 'function') {
        skin.setFontFamily(font);
      } else {
        this.lastError = 'Current sprite is not displaying art text';
      }
    }

    _resetSkinsUsingFonts(fontNames) {
      const defaultFont = this.getTextPlusFontMenuItems()[0]?.value || 'Sans Serif';
      for (const target of vm.runtime.targets) {
        const skin = this._getCurrentSkin(target);
        if (!skin) continue;

        let currentFont = null;
        if (typeof skin.fontFamily === 'string') currentFont = skin.fontFamily;
        else if (typeof skin._fontFamily === 'string') currentFont = skin._fontFamily;
        else if (typeof skin.getFontFamily === 'function') currentFont = skin.getFontFamily();

        if (currentFont && fontNames.includes(currentFont)) {
          if (typeof skin.setFontFamily === 'function') {
            skin.setFontFamily(defaultFont);
            skin._invalidateText();
          }
        }
      }
    }

    removeFont({ FONT_NAME }, util) {
      const fontName = Scratch.Cast.toString(FONT_NAME);
      if (!fontName) return;

      const targetEntry = this.loadedFonts.find((f) => f.name === fontName);
      if (!targetEntry) return;

      const sameUrlFonts = this.loadedFonts.filter((f) => f.url === targetEntry.url);
      const removedNames = sameUrlFonts.map((f) => f.name);

      for (const fontEntry of sameUrlFonts) {
        if (fontEntry.face && document.fonts && document.fonts.delete) {
          document.fonts.delete(fontEntry.face);
        }
      }

      this.loadedFonts = this.loadedFonts.filter((f) => f.url !== targetEntry.url);
      this._resetSkinsUsingFonts(removedNames);
      this._refreshBlockMenus();
      vm.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE');
    }

    removeAllFonts(args, util) {
      if (this.loadedFonts.length === 0) return;

      const removedNames = this.loadedFonts.map((f) => f.name);

      for (const fontEntry of this.loadedFonts) {
        if (fontEntry.face && document.fonts && document.fonts.delete) {
          document.fonts.delete(fontEntry.face);
        }
      }
      this.loadedFonts = [];
      this._resetSkinsUsingFonts(removedNames);
      this._refreshBlockMenus();
      vm.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE');
    }

    fontExists({ FONT_NAME }, util) {
      const fontName = Scratch.Cast.toString(FONT_NAME);
      if (!fontName) return false;
      return this.loadedFonts.some((f) => f.name === fontName);
    }

    refreshArtText(args, util) {
      for (const target of vm.runtime.targets) {
        const skin = this._getCurrentSkin(target);
        if (!skin) continue;

        this._ensureSkinPatched(skin);

        skin.defaultLineSizePercent = DEFAULT_LINE_SIZE_PERCENT;
        skin.lineSizePercents = [];
        skin.charXOffsets = [];
        skin.charYOffsets = [];
        skin.charSizePercents = [];
        skin.charRotations = [];
        skin.textBlur = 0;
        skin.animationPercent = 100;
        skin.animationFeather = 0;
        skin.animationExcludeLine = 0;
        skin.touchAreaExpanded = false;
        skin._blurPadding = 0;

        const state = target[CUSTOM_STATE_KEY];
        if (state) {
          state.defaultLineSizePercent = DEFAULT_LINE_SIZE_PERCENT;
          state.lineSizePercents = [];
          state.charXOffsets = [];
          state.charYOffsets = [];
          state.charSizePercents = [];
          state.charRotations = [];
          state.textBlur = 0;
          state.animationPercent = 100;
          state.animationFeather = 0;
          state.animationExcludeLine = 0;
          state.touchAreaExpanded = false;
          state.skin = skin;
        }

        skin._invalidateText();
      }

      if (typeof vm.runtime.requestRedraw === 'function') {
        vm.runtime.requestRedraw();
      } else if (util && typeof util.runtime.requestRedraw === 'function') {
        util.runtime.requestRedraw();
      }
      this.lastError = '';
    }

    getLastError(args, util) {
      return this.lastError;
    }

    _refreshBlockMenus() {
      if (typeof Blockly === 'undefined') return;
      const workspace = Blockly.getMainWorkspace();
      if (!workspace) return;

      const allBlocks = workspace.getAllBlocks(false);
      for (const block of allBlocks) {
        if (block.type === 'textplus_setArtTextFont') {
          const field = block.getField('FONT');
          if (field) {
            field.menuGenerator_ = this.getTextPlusFontMenuItems.bind(this);
            const options = this.getTextPlusFontMenuItems();
            const currentValue = field.getValue();
            if (!options.some((opt) => opt.value === currentValue)) {
              field.setValue(options[0].value);
            } else {
              const matchingOption = options.find((opt) => opt.value === currentValue);
              if (matchingOption) {
                field.setText(matchingOption.text);
              }
            }
            field.forceRerender();
          }
        } else if (block.type === 'textplus_removeFont' || block.type === 'textplus_fontExists') {
          const field = block.getField('FONT_NAME');
          if (field) {
            field.menuGenerator_ = this.getCustomFontMenuItems.bind(this);
            const options = this.getCustomFontMenuItems();
            const currentValue = field.getValue();
            if (!options.some((opt) => opt.value === currentValue)) {
              field.setValue(options[0].value);
            } else {
              const matchingOption = options.find((opt) => opt.value === currentValue);
              if (matchingOption) {
                field.setText(matchingOption.text);
              }
            }
            field.forceRerender();
          }
        }
      }
    }

    _getOriginalTextExtension() {
      const extManager = Scratch.vm.extensionManager;
      if (extManager && extManager._loadedExtensions) {
        for (const ext of extManager._loadedExtensions) {
          const info = ext && ext.getInfo && ext.getInfo();
          const id = info && info.id;
          if (id === 'text' || id === 'text2') {
            return ext;
          }
        }
      }
      return null;
    }

    _patchOriginalGetFontsIfNeeded() {
      const ext = this._getOriginalTextExtension();
      if (!ext || ext._textplusFontsPatched) return;

      const originalGetFonts = ext.getFonts.bind(ext);
      ext.getFonts = () => {
        const originalFonts = originalGetFonts();
        const customFonts = this.loadedFonts.map((f) => ({
          text: f.name,
          value: f.name,
        }));
        return [...originalFonts, ...customFonts];
      };

      ext._textplusFontsPatched = true;
    }
  }

  Scratch.extensions.register(new LineSizeControl());

  window.tempExt = {
    Extension: LineSizeControl,
    info: {
      name: "艺术字++",
      description: "解锁艺术字的更多功能。",
      extensionId: 'textplus',
      iconURL: Picture,
      insetIconURL: blockIconURI,
      featured: true,
      disabled: false,
      collaborator: "三明治",
      collaboratorURL: 'https://www.ccw.site/student/6381752c5de2ac6d29b741f6',
    },
    l10n: {
      "zh-cn": {
        "name": "艺术字++",
        "descp": "解锁艺术字的更多功能。"
      },
      en: {
        "name": "Text Plus",
        "descp": "Unlock more features of Animated Text."
      }
    }
  };
})(Scratch);