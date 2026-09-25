// Gandi Format (from RemixWarp, id=facesensing)
// Name: Face Sensing
// ID: faceSensing
// Description: Sense faces with the camera.
// By: GarboMuffin
// License: MPL-2.0
// Scratch-compatible: true

/* generated l10n code */Scratch.translate.setup({"de":{"_Face Sensing":"Gesichtserkennung","_left":"Links","_right":"Rechts"},"es":{"_Face Sensing":"Sensor de Cara"},"fi":{"_Face Sensing":"Kasvojen tunnistus","_left":"vasemmalle","_right":"oikealle"},"fr":{"_left":"gauche","_right":"droite"},"it":{"_Could not load face detection":"Impossibile caricare sensore volto","_Face Sensing":"Sensore del Volto","_a face is detected?":"volto presente","_between eyes":"tra gli occhi","_face size":"dimensione volto","_face tilt":"inclinazione volto","_go to [PART]":"vai a [PART]","_left":"sinistra","_left ear":"orecchio sinistro","_left eye":"occhio sinistro","_mouth":"bocca","_nose":"naso","_point in direction of face tilt":"punta in direzione inclinazione volto","_right":"destra","_right ear":"orecchio destro","_right eye":"occhio destro","_set size to face size":"porta dimensione a dimensione volto","_top of head":"parte superiore della testa","_when a face is detected":"quando è presente un volto","_when face tilts [DIRECTION]":"quando volto si inclina a [DIRECTION]","_when this sprite touches a [PART]":"quando questo sprite tocca [PART]"},"ja":{"_Face Sensing":"顔検出","_left":"左ボタン","_right":"右ボタン"},"ko":{"_Face Sensing":"안면 인식","_left":"왼쪽","_right":"오른쪽"},"nb":{"_left":"venstre","_right":"høyre"},"nl":{"_Could not load face detection":"Gezichtsherkenning laden mislukt","_Face Sensing":"Gezichtsherkenning","_a face is detected?":"een gezicht wordt herkend?","_between eyes":"tussen ogen","_face size":"gezichtsgrootte","_face tilt":"gezichtskanteling","_go to [PART]":"ga naar [PART]","_left":"links","_left ear":"linkeroor","_left eye":"linkeroog","_mouth":"mond","_nose":"neus","_point in direction of face tilt":"richt naar richting van gezichtskanteling","_right":"rechts","_right ear":"rechteroor","_right eye":"rechteroog","_set size to face size":"maak grootte gelijk aan gezichtsgrootte","_top of head":"bovenkant hoofd","_when a face is detected":"wanneer een gezicht wordt herkend","_when face tilts [DIRECTION]":"wanneer gezicht kantelt naar [DIRECTION]","_when this sprite touches a [PART]":"wanneer deze sprite een [PART] raakt"},"ru":{"_Could not load face detection":"Не удалось загрузить распознавание лиц","_Face Sensing":"Распознавание лиц","_a face is detected?":"обнаружено лицо?","_between eyes":"между глазами","_face size":"размер лица","_face tilt":"наклон лица","_go to [PART]":"перейти на [PART]","_left":"левому краю","_left ear":"левое ухо","_left eye":"левый глаз","_mouth":"рот","_nose":"нос","_point in direction of face tilt":"указать на наклон лица","_right":"правому краю","_right ear":"правое ухо","_right eye":"правый глаз","_set size to face size":"задать размер на размер лица","_top of head":"вершина головы","_when a face is detected":"когда обнаружено лицо","_when face tilts [DIRECTION]":"когда лицо наклоняется на [DIRECTION]","_when this sprite touches a [PART]":"когда этот спрайт касается [PART]"},"uk":{"_left":"ліво","_right":"право"},"zh-cn":{"_Could not load face detection":"无法加载人脸侦测","_Face Sensing":"人脸侦测","_a face is detected?":"检测到人脸？","_between eyes":"双眼之间","_face size":"人脸大小","_face tilt":"人脸倾斜角度","_go to [PART]":"移到[PART]","_left":"左","_left ear":"左耳","_left eye":"左眼","_mouth":"嘴巴","_nose":"鼻子","_point in direction of face tilt":"朝向人脸倾斜方向","_right":"右","_right ear":"右耳","_right eye":"右眼","_set size to face size":"将大小设为人脸大小","_top of head":"头顶","_when a face is detected":"当检测到人脸","_when face tilts [DIRECTION]":"当脸向[DIRECTION]倾斜","_when this sprite touches a [PART]":"当角色碰到[PART]"}});/* end generated l10n code *//* snippet prefix */(function(){var __internal={};__internal_setup();/* end snippet prefix */(async function (Scratch) {
  "use strict";

  const initializeDetector = async () => {
    await import("https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4.1646425229/face_detection.js");
    await import("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.22.0/dist/tf-core.min.js");
    await import("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.22.0/dist/tf-backend-webgl.min.js");
    await import("https://cdn.jsdelivr.net/npm/@turbowarp/tensorflow-models-face-detection@1.0.3-tw1/dist/face-detection.min.js");

    const fileMap = {
      "face_detection_short.binarypb": "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4.1646425229/face_detection_short.binarypb",
      "face_detection_short_range.tflite": "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4.1646425229/face_detection_short_range.tflite",
      "face_detection_solution_simd_wasm_bin.js": "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4.1646425229/face_detection_solution_simd_wasm_bin.js",
      "face_detection_solution_simd_wasm_bin.wasm": "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4.1646425229/face_detection_solution_simd_wasm_bin.wasm",
    };

    const faceDetection = window.faceDetection;
    return faceDetection.createDetector(
      faceDetection.SupportedModels.MediaPipeFaceDetector,
      {
        runtime: "mediapipe",
        /**
         * @param {string} path Name of file to get
         * @returns {string} fetch()-able URL to get it from
         */
        locateFile: (path) => fileMap[path],
      }
    );
  };

  /**
   * @typedef {'rightEye'|'leftEye'|'noseTip'|'mouthCenter'|'rightEarTragion'|'leftEarTragion'} KeypointName
   */

  /**
   * @typedef BlazefaceFace
   * @property {{height: number, width: number, xMax: number, xMin: number, yMax: number, yMin: number}} box
   * @property {Array<{x: number, y: number, name: KeypointName}>} keypoints
   */

  /**
   * @typedef Face
   * @property {number[]} nose Scratch coordinate
   * @property {number[]} mouth Scratch coordinate
   * @property {number[]} leftEye Scratch coordinate
   * @property {number[]} rightEye Scratch coordinate
   * @property {number[]} betweenEyes Scratch coordinate
   * @property {number[]} leftEar Scratch coordinate
   * @property {number[]} rightEar Scratch coordinate
   * @property {number[]} topOfHead Scratch coordinate
   * @property {number} size Scratch size
   * @property {number} tilt Scratch direction
   */

  /** @type {Face|null} */
  let lastFace = null;
  let isFaceCurrentlyDetected = false;

  /**
   * @param {number} x Coordinate in video space (horizontally flipped)
   * @param {number} y Coordinate in video space
   * @returns {number[]} x, y in Scratch space
   */
  const videoSpaceToScratchSpace = (x, y) => [240 - x, 180 - y];

  /**
   * @param {BlazefaceFace} blazefaceFace
   */
  const updateFace = (blazefaceFace) => {
    /**
     * @param {KeypointName} name
     * @returns {number[]} x, y in Scratch space
     */
    const getKeyPointInScratchSpace = (name) => {
      const keypoint = blazefaceFace.keypoints.find((i) => i.name === name);
      return videoSpaceToScratchSpace(keypoint.x, keypoint.y);
    };

    const nose = getKeyPointInScratchSpace("noseTip");
    const mouth = getKeyPointInScratchSpace("mouthCenter");
    const rightEye = getKeyPointInScratchSpace("rightEye");
    const leftEye = getKeyPointInScratchSpace("leftEye");
    const betweenEyes = [
      (rightEye[0] + leftEye[0]) / 2,
      (rightEye[1] + leftEye[1]) / 2,
    ];
    const leftEar = getKeyPointInScratchSpace("leftEarTragion");
    const rightEar = getKeyPointInScratchSpace("rightEarTragion");

    // Not sure how Scratch computes the rest of these as blazeface doesn't just
    // directly tell us. These seem to match close enough based on my personal testing.

    // Not entirely sure how Scratch defines this. But just using the width as the size
    // seems to match whatever they do?
    // TODO: improve this
    const size = Math.round(blazefaceFace.box.width);

    // The ears can tell us the horizontal direction to determine the tilt.
    const horizontalDirection = [
      rightEar[0] - leftEar[0],
      rightEar[1] - leftEar[1],
    ];
    const tiltRadians = Math.atan2(
      horizontalDirection[1],
      horizontalDirection[0]
    );
    const tilt = Math.round(90 - (tiltRadians * 180) / Math.PI);

    // From the horizontal direction we can compute the normalized up direction.
    const upDirection = [-horizontalDirection[1], horizontalDirection[0]];
    const upMagnitude = Math.sqrt(upDirection[0] ** 2 + upDirection[1] ** 2);
    upDirection[0] /= upMagnitude;
    upDirection[1] /= upMagnitude;

    // Approximate the top of the head by going up from the center of the eyes.
    // TODO: improve this
    const topOfHead = [
      betweenEyes[0] + upDirection[0] * size * 0.35,
      betweenEyes[1] + upDirection[1] * size * 0.35,
    ];

    lastFace = {
      nose,
      mouth,
      rightEar,
      leftEar,
      betweenEyes,
      leftEye,
      rightEye,
      topOfHead,
      size,
      tilt,
    };
  };

  const estimationLoop = () => {
    // Goal is 15 estimations per second, which seems to match Scratch.
    // Going faster or slower makes the "when touching x" blocks behave differently,
    // so want to match if possible.

    let timeoutFinished = false;
    let estimationFinished = false;
    setTimeout(() => {
      timeoutFinished = true;
      if (estimationFinished) {
        estimationLoop();
      }
    }, 1000 / 15);

    const frame = videoDevice.getFrame({
      format: "canvas",
    });

    if (!frame) {
      isFaceCurrentlyDetected = false;
      estimationFinished = true;
      return;
    }

    detector
      .estimateFaces(frame, {
        flipHorizontal: true,
      })
      .then((faces) => {
        if (faces.length > 0) {
          isFaceCurrentlyDetected = true;
          updateFace(faces[0]);
        } else {
          isFaceCurrentlyDetected = false;
        }
      })
      .catch((error) => {
        console.error(error);
        isFaceCurrentlyDetected = false;
      })
      .then(() => {
        estimationFinished = true;
        if (timeoutFinished) {
          estimationLoop();
        }
      });
  };

  const videoDevice = Scratch.vm.runtime.ioDevices.video;
  const renderer = Scratch.vm.renderer;

  let detector = null;
  try {
    detector = await initializeDetector();
    estimationLoop();
  } catch (e) {
    console.error("Face sensing detector could not load", e);
  }

  /**
   * @param {unknown} part Part from Scratch blocks
   * @returns {number[]|null}
   */
  const getPart = (part) => {
    part = Scratch.Cast.toNumber(part);
    if (part === 0) {
      return lastFace.leftEye;
    } else if (part === 1) {
      return lastFace.rightEye;
    } else if (part === 2) {
      return lastFace.nose;
    } else if (part === 3) {
      return lastFace.mouth;
    } else if (part === 4) {
      return lastFace.leftEar;
    } else if (part === 5) {
      return lastFace.rightEar;
    } else if (part === 6) {
      return lastFace.betweenEyes;
    } else if (part === 7) {
      return lastFace.topOfHead;
    } else {
      return null;
    }
  };

  const checkIfShouldTurnOnVideoForFirstRun = () => {
    const stage = Scratch.vm.runtime.getTargetForStage();
    if (!stage) {
      // project is still loading
      Scratch.vm.runtime.once(
        "PROJECT_LOADED",
        checkIfShouldTurnOnVideoForFirstRun
      );
      return;
    }

    if (stage.videoState !== "off") {
      videoDevice.enableVideo();
    }
  };

  checkIfShouldTurnOnVideoForFirstRun();

  // made by https://scratch.mit.edu/users/man-o-valor/
  const blockIconURI = `data:image/svg+xml;,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="79.639" height="79.771">
      <g stroke-miterlimit="10"><path fill="none" stroke="#0b8e69" stroke-width="9.5" d="M18.691 39.915c0-11.668 9.46-21.128 21.128-21.128 11.67 0 21.129 9.46 21.129 21.128 0 11.67-9.46 21.129-21.129 21.129-11.668 0-21.128-9.46-21.128-21.129z"/>
      <path fill="none" stroke="#0b8e69" stroke-linecap="round" stroke-width="10" d="M16.204 53.288s-1.038 5.33-2.207 6.997c-1.161 1.657-4.782 2.973-4.782 2.973M23.234 63.258s-3.62-1.316-4.782-2.973c-1.168-1.667-2.207-6.997-2.207-6.997M9.215 63.317s3.621 1.316 4.782 2.973c1.169 1.667 2.207 6.997 2.207 6.997"/>
      <path fill="none" stroke="#0b8e69" stroke-linecap="round" stroke-width="10" d="M16.245 73.037s1.04-5.33 2.207-6.997c1.162-1.657 4.782-2.973 4.782-2.973"/>
      <path fill="none" stroke="#ffbf00" stroke-linecap="round" stroke-width="5" d="M16.204 53.499s-1.038 5.33-2.207 6.997c-1.161 1.656-4.782 2.973-4.782 2.973M23.234 63.47s-3.62-1.318-4.782-2.974c-1.168-1.667-2.207-6.997-2.207-6.997M9.215 63.528s3.621 1.316 4.782 2.973c1.169 1.667 2.207 6.997 2.207 6.997"/>
      <path fill="none" stroke="#ffbf00" stroke-linecap="round" stroke-width="5" d="M16.245 73.287s1.04-5.33 2.207-6.997c1.162-1.657 4.782-2.973 4.782-2.973"/>
      <path fill="#ffbf00" d="m11.406 63.608 4.84-6.904 4.839 6.904-4.84 6.904z"/>
      <g fill="none" stroke="#0b8e69" stroke-linecap="round" stroke-width="5">
      <path d="M2.537 2.56h16.92M2.5 19.59V2.67"/></g><g fill="none" stroke="#0b8e69" stroke-linecap="round" stroke-width="5">
      <path d="M77.102 77.271h-16.92M77.139 60.241v16.92"/></g><path fill="#0b8e69" stroke="#fff" stroke-width="5" d="M18.691 39.915c0-11.668 9.46-21.128 21.128-21.128 11.67 0 21.129 9.46 21.129 21.128 0 11.67-9.46 21.129-21.129 21.129-11.668 0-21.128-9.46-21.128-21.129z"/>
      <path fill="none" stroke="#fff" stroke-linecap="round" stroke-width="5" d="M48.47 45.217s-3.828 4.746-8.744 4.65c-5.376-.104-8.185-4.65-8.185-4.65M31.646 34.323v1.418M47.993 35.741v-1.418"/>
      <path fill="none" stroke="#0b8e69" stroke-linecap="round" stroke-width="10" d="M62.56 5s-1.428 7.165-3.032 9.405c-1.595 2.227-6.568 3.997-6.568 3.997M72.214 18.402s-4.972-1.77-6.567-3.997C64.042 12.165 62.615 5 62.615 5M52.96 18.48s4.973 1.77 6.568 3.997c1.604 2.24 3.031 9.405 3.031 9.405M62.615 31.882s1.427-7.165 3.032-9.405c1.595-2.227 6.567-3.997 6.567-3.997"/>
      <path fill="none" stroke="#ffbf00" stroke-linecap="round" stroke-width="5" d="M62.56 5s-1.428 7.165-3.032 9.405c-1.595 2.227-6.568 3.997-6.568 3.997M72.214 18.402s-4.972-1.77-6.567-3.997C64.042 12.165 62.615 5 62.615 5M52.96 18.48s4.973 1.77 6.568 3.997c1.604 2.24 3.031 9.405 3.031 9.405M62.615 31.882s1.427-7.165 3.032-9.405c1.595-2.227 6.567-3.997 6.567-3.997"/>
      <path fill="#ffbf00" d="m55.968 18.872 6.647-9.28 6.647 9.28-6.647 9.28z"/>
    </g>
  </svg>`)}`;

  class FaceSensing {
    getInfo() {
      return {
        id: "facesensing",
        name: Scratch.translate("Face Sensing"),
        blockIconURI,

        blocks: [
          ...(detector
            ? []
            : [
                {
                  blockType: Scratch.BlockType.LABEL,
                  text: Scratch.translate({
                    default: "Could not load face detection",
                    description:
                      "Error message that appears when using unsupported browser",
                  }),
                },
              ]),

          {
            opcode: "goToPart",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("go to [PART]"),
            arguments: {
              PART: {
                type: Scratch.ArgumentType.STRING,
                menu: "part",
              },
            },
          },

          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "pointInFaceTiltDirection",
            text: Scratch.translate("point in direction of face tilt"),
          },

          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "setSizeToFaceSize",
            text: Scratch.translate("set size to face size"),
          },

          "---",

          {
            blockType: Scratch.BlockType.HAT,
            isEdgeActivated: true,
            opcode: "whenTilted",
            text: Scratch.translate("when face tilts [DIRECTION]"),
            arguments: {
              DIRECTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "direction",
              },
            },
          },

          {
            blockType: Scratch.BlockType.HAT,
            isEdgeActivated: true,
            opcode: "whenSpriteTouchesPart",
            text: Scratch.translate("when this sprite touches a [PART]"),
            arguments: {
              PART: {
                type: Scratch.ArgumentType.STRING,
                menu: "part",
              },
            },
          },

          {
            blockType: Scratch.BlockType.HAT,
            isEdgeActivated: true,
            opcode: "whenFaceDetected",
            text: Scratch.translate("when a face is detected"),
          },

          "---",

          {
            blockType: Scratch.BlockType.BOOLEAN,
            opcode: "faceIsDetected",
            text: Scratch.translate("a face is detected?"),
            disableMonitor: true, // parity with Scratch
          },

          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "faceTilt",
            text: Scratch.translate("face tilt"),
          },

          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "faceSize",
            text: Scratch.translate("face size"),
          },
        ],

        menus: {
          // These menus were all designed to be compatible with Scratch
          // That's why no reporters and why the values are somewhat arbitrary
          part: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("nose"),
                value: "2",
              },
              {
                text: Scratch.translate("mouth"),
                value: "3",
              },
              {
                text: Scratch.translate("left eye"),
                value: "0",
              },
              {
                text: Scratch.translate("right eye"),
                value: "1",
              },
              {
                text: Scratch.translate("between eyes"),
                value: "6",
              },
              {
                text: Scratch.translate("left ear"),
                value: "4",
              },
              {
                text: Scratch.translate("right ear"),
                value: "5",
              },
              {
                text: Scratch.translate("top of head"),
                value: "7",
              },
            ],
          },

          direction: {
            acceptReporters: false, // compatibility with Scratch
            items: [
              {
                text: Scratch.translate("left"),
                value: "left",
              },
              {
                text: Scratch.translate("right"),
                value: "right",
              },
            ],
          },
        },
      };
    }

    goToPart(args, util) {
      if (!isFaceCurrentlyDetected) {
        return;
      }

      const part = getPart(args.PART);
      if (!part) {
        return;
      }

      util.target.setXY(part[0], part[1]);
    }

    pointInFaceTiltDirection(args, util) {
      if (isFaceCurrentlyDetected) {
        util.target.setDirection(lastFace.tilt);
      }
    }

    setSizeToFaceSize(args, util) {
      if (isFaceCurrentlyDetected) {
        util.target.setSize(lastFace.size);
      }
    }

    whenTilted(args, util) {
      if (!isFaceCurrentlyDetected) {
        return false;
      }

      const direction = Scratch.Cast.toString(args.DIRECTION);
      if (direction === "left") {
        return lastFace.tilt < 80;
      } else if (direction === "right") {
        return lastFace.tilt > 100;
      } else {
        return false;
      }
    }

    whenSpriteTouchesPart(args, util) {
      if (!isFaceCurrentlyDetected) {
        return false;
      }

      const part = getPart(args.PART);
      if (!part) {
        return false;
      }

      const drawable = renderer._allDrawables[util.target.drawableID];
      if (!drawable) {
        return false;
      }

      drawable.updateCPURenderAttributes();
      return drawable.isTouching(part);
    }

    whenFaceDetected() {
      return isFaceCurrentlyDetected;
    }

    faceIsDetected() {
      return isFaceCurrentlyDetected;
    }

    faceTilt() {
      return lastFace ? lastFace.tilt : 0;
    }

    faceSize() {
      return lastFace ? lastFace.size : 0;
    }
  }

  Scratch.extensions.register(new FaceSensing());
})(Scratch);
/* snippet suffix */function __internal_setup() {/* snippet base85decode */__internal.base85decode = (function () {
  const getBase85DecodeValue = (code) => {
    if (code === 0x28) code = 0x5c;
    return code - 0x2a;
  };
  const base85decode = (str, resultByteLength) => {
    const outBuffer = new ArrayBuffer(Math.ceil(resultByteLength / 4) * 4);
    const view = new DataView(outBuffer, 0, outBuffer.byteLength);
    for (let i = 0, j = 0; i < str.length; i += 5, j += 4) {
      view.setUint32(
        j,
        getBase85DecodeValue(str.charCodeAt(i + 4)) * 85 * 85 * 85 * 85 +
        getBase85DecodeValue(str.charCodeAt(i + 3)) * 85 * 85 * 85 +
        getBase85DecodeValue(str.charCodeAt(i + 2)) * 85 * 85 +
        getBase85DecodeValue(str.charCodeAt(i + 1)) * 85 +
        getBase85DecodeValue(str.charCodeAt(i)),
        true
      );
    }
    return new Uint8Array(outBuffer, 0, resultByteLength);
  };
  return base85decode;
}());
/* end snippet base85decode *//* snippet fzstd *//*!
fzstd v0.1.1 - https://github.com/101arrowz/fzstd

MIT License

Copyright (c) 2020 Arjun Barrett

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(exports) {
"use strict";
// Some numerical data is initialized as -1 even when it doesn't need initialization to help the JIT infer types
// aliases for shorter compressed code (most minifers don't do this)
var ab = ArrayBuffer, u8 = Uint8Array, u16 = Uint16Array, i16 = Int16Array, u32 = Uint32Array, i32 = Int32Array;
var slc = function (v, s, e) {
    if (u8.prototype.slice)
        return u8.prototype.slice.call(v, s, e);
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    var n = new u8(e - s);
    n.set(v.subarray(s, e));
    return n;
};
var fill = function (v, n, s, e) {
    if (u8.prototype.fill)
        return u8.prototype.fill.call(v, n, s, e);
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    for (; s < e; ++s)
        v[s] = n;
    return v;
};
var cpw = function (v, t, s, e) {
    if (u8.prototype.copyWithin)
        return u8.prototype.copyWithin.call(v, t, s, e);
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    while (s < e) {
        v[t++] = v[s++];
    }
};
/**
 * Codes for errors generated within this library
 */
exports.ZstdErrorCode = {
    InvalidData: 0,
    WindowSizeTooLarge: 1,
    InvalidBlockType: 2,
    FSEAccuracyTooHigh: 3,
    DistanceTooFarBack: 4,
    UnexpectedEOF: 5
};
// error codes
var ec = [
    'invalid zstd data',
    'window size too large (>2046MB)',
    'invalid block type',
    'FSE accuracy too high',
    'match distance too far back',
    'unexpected EOF'
];
var err = function (ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
        Error.captureStackTrace(e, err);
    if (!nt)
        throw e;
    return e;
};
var rb = function (d, b, n) {
    var i = 0, o = 0;
    for (; i < n; ++i)
        o |= d[b++] << (i << 3);
    return o;
};
var b4 = function (d, b) { return (d[b] | (d[b + 1] << 8) | (d[b + 2] << 16) | (d[b + 3] << 24)) >>> 0; };
// read Zstandard frame header
var rzfh = function (dat, w) {
    var n3 = dat[0] | (dat[1] << 8) | (dat[2] << 16);
    if (n3 == 0x2FB528 && dat[3] == 253) {
        // Zstandard
        var flg = dat[4];
        //    single segment       checksum             dict flag     frame content flag
        var ss = (flg >> 5) & 1, cc = (flg >> 2) & 1, df = flg & 3, fcf = flg >> 6;
        if (flg & 8)
            err(0);
        // byte
        var bt = 6 - ss;
        // dict bytes
        var db = df == 3 ? 4 : df;
        // dictionary id
        var di = rb(dat, bt, db);
        bt += db;
        // frame size bytes
        var fsb = fcf ? (1 << fcf) : ss;
        // frame source size
        var fss = rb(dat, bt, fsb) + ((fcf == 1) && 256);
        // window size
        var ws = fss;
        if (!ss) {
            // window descriptor
            var wb = 1 << (10 + (dat[5] >> 3));
            ws = wb + (wb >> 3) * (dat[5] & 7);
        }
        if (ws > 2145386496)
            err(1);
        var buf = new u8((w == 1 ? (fss || ws) : w ? 0 : ws) + 12);
        buf[0] = 1, buf[4] = 4, buf[8] = 8;
        return {
            b: bt + fsb,
            y: 0,
            l: 0,
            d: di,
            w: (w && w != 1) ? w : buf.subarray(12),
            e: ws,
            o: new i32(buf.buffer, 0, 3),
            u: fss,
            c: cc,
            m: Math.min(131072, ws)
        };
    }
    else if (((n3 >> 4) | (dat[3] << 20)) == 0x184D2A5) {
        // skippable
        return b4(dat, 4) + 8;
    }
    err(0);
};
// most significant bit for nonzero
var msb = function (val) {
    var bits = 0;
    for (; (1 << bits) <= val; ++bits)
        ;
    return bits - 1;
};
// read finite state entropy
var rfse = function (dat, bt, mal) {
    // table pos
    var tpos = (bt << 3) + 4;
    // accuracy log
    var al = (dat[bt] & 15) + 5;
    if (al > mal)
        err(3);
    // size
    var sz = 1 << al;
    // probabilities symbols  repeat   index   high threshold
    var probs = sz, sym = -1, re = -1, i = -1, ht = sz;
    // optimization: single allocation is much faster
    var buf = new ab(512 + (sz << 2));
    var freq = new i16(buf, 0, 256);
    // same view as freq
    var dstate = new u16(buf, 0, 256);
    var nstate = new u16(buf, 512, sz);
    var bb1 = 512 + (sz << 1);
    var syms = new u8(buf, bb1, sz);
    var nbits = new u8(buf, bb1 + sz);
    while (sym < 255 && probs > 0) {
        var bits = msb(probs + 1);
        var cbt = tpos >> 3;
        // mask
        var msk = (1 << (bits + 1)) - 1;
        var val = ((dat[cbt] | (dat[cbt + 1] << 8) | (dat[cbt + 2] << 16)) >> (tpos & 7)) & msk;
        // mask (1 fewer bit)
        var msk1fb = (1 << bits) - 1;
        // max small value
        var msv = msk - probs - 1;
        // small value
        var sval = val & msk1fb;
        if (sval < msv)
            tpos += bits, val = sval;
        else {
            tpos += bits + 1;
            if (val > msk1fb)
                val -= msv;
        }
        freq[++sym] = --val;
        if (val == -1) {
            probs += val;
            syms[--ht] = sym;
        }
        else
            probs -= val;
        if (!val) {
            do {
                // repeat byte
                var rbt = tpos >> 3;
                re = ((dat[rbt] | (dat[rbt + 1] << 8)) >> (tpos & 7)) & 3;
                tpos += 2;
                sym += re;
            } while (re == 3);
        }
    }
    if (sym > 255 || probs)
        err(0);
    var sympos = 0;
    // sym step (coprime with sz - formula from zstd source)
    var sstep = (sz >> 1) + (sz >> 3) + 3;
    // sym mask
    var smask = sz - 1;
    for (var s = 0; s <= sym; ++s) {
        var sf = freq[s];
        if (sf < 1) {
            dstate[s] = -sf;
            continue;
        }
        // This is split into two loops in zstd to avoid branching, but as JS is higher-level that is unnecessary
        for (i = 0; i < sf; ++i) {
            syms[sympos] = s;
            do {
                sympos = (sympos + sstep) & smask;
            } while (sympos >= ht);
        }
    }
    // After spreading symbols, should be zero again
    if (sympos)
        err(0);
    for (i = 0; i < sz; ++i) {
        // next state
        var ns = dstate[syms[i]]++;
        // num bits
        var nb = nbits[i] = al - msb(ns);
        nstate[i] = (ns << nb) - sz;
    }
    return [(tpos + 7) >> 3, {
            b: al,
            s: syms,
            n: nbits,
            t: nstate
        }];
};
// read huffman
var rhu = function (dat, bt) {
    //  index  weight count
    var i = 0, wc = -1;
    //    buffer             header byte
    var buf = new u8(292), hb = dat[bt];
    // huffman weights
    var hw = buf.subarray(0, 256);
    // rank count
    var rc = buf.subarray(256, 268);
    // rank index
    var ri = new u16(buf.buffer, 268);
    // NOTE: at this point bt is 1 less than expected
    if (hb < 128) {
        // end byte, fse decode table
        var _a = rfse(dat, bt + 1, 6), ebt = _a[0], fdt = _a[1];
        bt += hb;
        var epos = ebt << 3;
        // last byte
        var lb = dat[bt];
        if (!lb)
            err(0);
        //  state1   state2   state1 bits   state2 bits
        var st1 = 0, st2 = 0, btr1 = fdt.b, btr2 = btr1;
        // fse pos
        // pre-increment to account for original deficit of 1
        var fpos = (++bt << 3) - 8 + msb(lb);
        for (;;) {
            fpos -= btr1;
            if (fpos < epos)
                break;
            var cbt = fpos >> 3;
            st1 += ((dat[cbt] | (dat[cbt + 1] << 8)) >> (fpos & 7)) & ((1 << btr1) - 1);
            hw[++wc] = fdt.s[st1];
            fpos -= btr2;
            if (fpos < epos)
                break;
            cbt = fpos >> 3;
            st2 += ((dat[cbt] | (dat[cbt + 1] << 8)) >> (fpos & 7)) & ((1 << btr2) - 1);
            hw[++wc] = fdt.s[st2];
            btr1 = fdt.n[st1];
            st1 = fdt.t[st1];
            btr2 = fdt.n[st2];
            st2 = fdt.t[st2];
        }
        if (++wc > 255)
            err(0);
    }
    else {
        wc = hb - 127;
        for (; i < wc; i += 2) {
            var byte = dat[++bt];
            hw[i] = byte >> 4;
            hw[i + 1] = byte & 15;
        }
        ++bt;
    }
    // weight exponential sum
    var wes = 0;
    for (i = 0; i < wc; ++i) {
        var wt = hw[i];
        // bits must be at most 11, same as weight
        if (wt > 11)
            err(0);
        wes += wt && (1 << (wt - 1));
    }
    // max bits
    var mb = msb(wes) + 1;
    // table size
    var ts = 1 << mb;
    // remaining sum
    var rem = ts - wes;
    // must be power of 2
    if (rem & (rem - 1))
        err(0);
    hw[wc++] = msb(rem) + 1;
    for (i = 0; i < wc; ++i) {
        var wt = hw[i];
        ++rc[hw[i] = wt && (mb + 1 - wt)];
    }
    // huf buf
    var hbuf = new u8(ts << 1);
    //    symbols                      num bits
    var syms = hbuf.subarray(0, ts), nb = hbuf.subarray(ts);
    ri[mb] = 0;
    for (i = mb; i > 0; --i) {
        var pv = ri[i];
        fill(nb, i, pv, ri[i - 1] = pv + rc[i] * (1 << (mb - i)));
    }
    if (ri[0] != ts)
        err(0);
    for (i = 0; i < wc; ++i) {
        var bits = hw[i];
        if (bits) {
            var code = ri[bits];
            fill(syms, i, code, ri[bits] = code + (1 << (mb - bits)));
        }
    }
    return [bt, {
            n: nb,
            b: mb,
            s: syms
        }];
};
// Tables generated using this:
// https://gist.github.com/101arrowz/a979452d4355992cbf8f257cbffc9edd
// default literal length table
var dllt = /*#__PURE__*/ rfse(/*#__PURE__*/ new u8([
    81, 16, 99, 140, 49, 198, 24, 99, 12, 33, 196, 24, 99, 102, 102, 134, 70, 146, 4
]), 0, 6)[1];
// default match length table
var dmlt = /*#__PURE__*/ rfse(/*#__PURE__*/ new u8([
    33, 20, 196, 24, 99, 140, 33, 132, 16, 66, 8, 33, 132, 16, 66, 8, 33, 68, 68, 68, 68, 68, 68, 68, 68, 36, 9
]), 0, 6)[1];
// default offset code table
var doct = /*#__PURE__ */ rfse(/*#__PURE__*/ new u8([
    32, 132, 16, 66, 102, 70, 68, 68, 68, 68, 36, 73, 2
]), 0, 5)[1];
// bits to baseline
var b2bl = function (b, s) {
    var len = b.length, bl = new i32(len);
    for (var i = 0; i < len; ++i) {
        bl[i] = s;
        s += 1 << b[i];
    }
    return bl;
};
// literal length bits
var llb = /*#__PURE__ */ new u8(( /*#__PURE__ */new i32([
    0, 0, 0, 0, 16843009, 50528770, 134678020, 202050057, 269422093
])).buffer, 0, 36);
// literal length baseline
var llbl = /*#__PURE__ */ b2bl(llb, 0);
// match length bits
var mlb = /*#__PURE__ */ new u8(( /*#__PURE__ */new i32([
    0, 0, 0, 0, 0, 0, 0, 0, 16843009, 50528770, 117769220, 185207048, 252579084, 16
])).buffer, 0, 53);
// match length baseline
var mlbl = /*#__PURE__ */ b2bl(mlb, 3);
// decode huffman stream
var dhu = function (dat, out, hu) {
    var len = dat.length, ss = out.length, lb = dat[len - 1], msk = (1 << hu.b) - 1, eb = -hu.b;
    if (!lb)
        err(0);
    var st = 0, btr = hu.b, pos = (len << 3) - 8 + msb(lb) - btr, i = -1;
    for (; pos > eb && i < ss;) {
        var cbt = pos >> 3;
        var val = (dat[cbt] | (dat[cbt + 1] << 8) | (dat[cbt + 2] << 16)) >> (pos & 7);
        st = ((st << btr) | val) & msk;
        out[++i] = hu.s[st];
        pos -= (btr = hu.n[st]);
    }
    if (pos != eb || i + 1 != ss)
        err(0);
};
// decode huffman stream 4x
// TODO: use workers to parallelize
var dhu4 = function (dat, out, hu) {
    var bt = 6;
    var ss = out.length, sz1 = (ss + 3) >> 2, sz2 = sz1 << 1, sz3 = sz1 + sz2;
    dhu(dat.subarray(bt, bt += dat[0] | (dat[1] << 8)), out.subarray(0, sz1), hu);
    dhu(dat.subarray(bt, bt += dat[2] | (dat[3] << 8)), out.subarray(sz1, sz2), hu);
    dhu(dat.subarray(bt, bt += dat[4] | (dat[5] << 8)), out.subarray(sz2, sz3), hu);
    dhu(dat.subarray(bt), out.subarray(sz3), hu);
};
// read Zstandard block
var rzb = function (dat, st, out) {
    var _a;
    var bt = st.b;
    //    byte 0        block type
    var b0 = dat[bt], btype = (b0 >> 1) & 3;
    st.l = b0 & 1;
    var sz = (b0 >> 3) | (dat[bt + 1] << 5) | (dat[bt + 2] << 13);
    // end byte for block
    var ebt = (bt += 3) + sz;
    if (btype == 1) {
        if (bt >= dat.length)
            return;
        st.b = bt + 1;
        if (out) {
            fill(out, dat[bt], st.y, st.y += sz);
            return out;
        }
        return fill(new u8(sz), dat[bt]);
    }
    if (ebt > dat.length)
        return;
    if (btype == 0) {
        st.b = ebt;
        if (out) {
            out.set(dat.subarray(bt, ebt), st.y);
            st.y += sz;
            return out;
        }
        return slc(dat, bt, ebt);
    }
    if (btype == 2) {
        //    byte 3        lit btype     size format
        var b3 = dat[bt], lbt = b3 & 3, sf = (b3 >> 2) & 3;
        // lit src size  lit cmp sz 4 streams
        var lss = b3 >> 4, lcs = 0, s4 = 0;
        if (lbt < 2) {
            if (sf & 1)
                lss |= (dat[++bt] << 4) | ((sf & 2) && (dat[++bt] << 12));
            else
                lss = b3 >> 3;
        }
        else {
            s4 = sf;
            if (sf < 2)
                lss |= ((dat[++bt] & 63) << 4), lcs = (dat[bt] >> 6) | (dat[++bt] << 2);
            else if (sf == 2)
                lss |= (dat[++bt] << 4) | ((dat[++bt] & 3) << 12), lcs = (dat[bt] >> 2) | (dat[++bt] << 6);
            else
                lss |= (dat[++bt] << 4) | ((dat[++bt] & 63) << 12), lcs = (dat[bt] >> 6) | (dat[++bt] << 2) | (dat[++bt] << 10);
        }
        ++bt;
        // add literals to end - can never overlap with backreferences because unused literals always appended
        var buf = out ? out.subarray(st.y, st.y + st.m) : new u8(st.m);
        // starting point for literals
        var spl = buf.length - lss;
        if (lbt == 0)
            buf.set(dat.subarray(bt, bt += lss), spl);
        else if (lbt == 1)
            fill(buf, dat[bt++], spl);
        else {
            // huffman table
            var hu = st.h;
            if (lbt == 2) {
                var hud = rhu(dat, bt);
                // subtract description length
                lcs += bt - (bt = hud[0]);
                st.h = hu = hud[1];
            }
            else if (!hu)
                err(0);
            (s4 ? dhu4 : dhu)(dat.subarray(bt, bt += lcs), buf.subarray(spl), hu);
        }
        // num sequences
        var ns = dat[bt++];
        if (ns) {
            if (ns == 255)
                ns = (dat[bt++] | (dat[bt++] << 8)) + 0x7F00;
            else if (ns > 127)
                ns = ((ns - 128) << 8) | dat[bt++];
            // symbol compression modes
            var scm = dat[bt++];
            if (scm & 3)
                err(0);
            var dts = [dmlt, doct, dllt];
            for (var i = 2; i > -1; --i) {
                var md = (scm >> ((i << 1) + 2)) & 3;
                if (md == 1) {
                    // rle buf
                    var rbuf = new u8([0, 0, dat[bt++]]);
                    dts[i] = {
                        s: rbuf.subarray(2, 3),
                        n: rbuf.subarray(0, 1),
                        t: new u16(rbuf.buffer, 0, 1),
                        b: 0
                    };
                }
                else if (md == 2) {
                    // accuracy log 8 for offsets, 9 for others
                    _a = rfse(dat, bt, 9 - (i & 1)), bt = _a[0], dts[i] = _a[1];
                }
                else if (md == 3) {
                    if (!st.t)
                        err(0);
                    dts[i] = st.t[i];
                }
            }
            var _b = st.t = dts, mlt = _b[0], oct = _b[1], llt = _b[2];
            var lb = dat[ebt - 1];
            if (!lb)
                err(0);
            var spos = (ebt << 3) - 8 + msb(lb) - llt.b, cbt = spos >> 3, oubt = 0;
            var lst = ((dat[cbt] | (dat[cbt + 1] << 8)) >> (spos & 7)) & ((1 << llt.b) - 1);
            cbt = (spos -= oct.b) >> 3;
            var ost = ((dat[cbt] | (dat[cbt + 1] << 8)) >> (spos & 7)) & ((1 << oct.b) - 1);
            cbt = (spos -= mlt.b) >> 3;
            var mst = ((dat[cbt] | (dat[cbt + 1] << 8)) >> (spos & 7)) & ((1 << mlt.b) - 1);
            for (++ns; --ns;) {
                var llc = llt.s[lst];
                var lbtr = llt.n[lst];
                var mlc = mlt.s[mst];
                var mbtr = mlt.n[mst];
                var ofc = oct.s[ost];
                var obtr = oct.n[ost];
                cbt = (spos -= ofc) >> 3;
                var ofp = 1 << ofc;
                var off = ofp + (((dat[cbt] | (dat[cbt + 1] << 8) | (dat[cbt + 2] << 16) | (dat[cbt + 3] << 24)) >>> (spos & 7)) & (ofp - 1));
                cbt = (spos -= mlb[mlc]) >> 3;
                var ml = mlbl[mlc] + (((dat[cbt] | (dat[cbt + 1] << 8) | (dat[cbt + 2] << 16)) >> (spos & 7)) & ((1 << mlb[mlc]) - 1));
                cbt = (spos -= llb[llc]) >> 3;
                var ll = llbl[llc] + (((dat[cbt] | (dat[cbt + 1] << 8) | (dat[cbt + 2] << 16)) >> (spos & 7)) & ((1 << llb[llc]) - 1));
                cbt = (spos -= lbtr) >> 3;
                lst = llt.t[lst] + (((dat[cbt] | (dat[cbt + 1] << 8)) >> (spos & 7)) & ((1 << lbtr) - 1));
                cbt = (spos -= mbtr) >> 3;
                mst = mlt.t[mst] + (((dat[cbt] | (dat[cbt + 1] << 8)) >> (spos & 7)) & ((1 << mbtr) - 1));
                cbt = (spos -= obtr) >> 3;
                ost = oct.t[ost] + (((dat[cbt] | (dat[cbt + 1] << 8)) >> (spos & 7)) & ((1 << obtr) - 1));
                if (off > 3) {
                    st.o[2] = st.o[1];
                    st.o[1] = st.o[0];
                    st.o[0] = off -= 3;
                }
                else {
                    var idx = off - (ll != 0);
                    if (idx) {
                        off = idx == 3 ? st.o[0] - 1 : st.o[idx];
                        if (idx > 1)
                            st.o[2] = st.o[1];
                        st.o[1] = st.o[0];
                        st.o[0] = off;
                    }
                    else
                        off = st.o[0];
                }
                for (var i = 0; i < ll; ++i) {
                    buf[oubt + i] = buf[spl + i];
                }
                oubt += ll, spl += ll;
                var stin = oubt - off;
                if (stin < 0) {
                    var len = -stin;
                    var bs = st.e + stin;
                    if (len > ml)
                        len = ml;
                    for (var i = 0; i < len; ++i) {
                        buf[oubt + i] = st.w[bs + i];
                    }
                    oubt += len, ml -= len, stin = 0;
                }
                for (var i = 0; i < ml; ++i) {
                    buf[oubt + i] = buf[stin + i];
                }
                oubt += ml;
            }
            if (oubt != spl) {
                while (spl < buf.length) {
                    buf[oubt++] = buf[spl++];
                }
            }
            else
                oubt = buf.length;
            if (out)
                st.y += oubt;
            else
                buf = slc(buf, 0, oubt);
        }
        else if (out) {
            st.y += lss;
            if (spl) {
                for (var i = 0; i < lss; ++i) {
                    buf[i] = buf[spl + i];
                }
            }
        }
        else if (spl)
            buf = slc(buf, spl);
        st.b = ebt;
        return buf;
    }
    err(2);
};
// concat
var cct = function (bufs, ol) {
    if (bufs.length == 1)
        return bufs[0];
    var buf = new u8(ol);
    for (var i = 0, b = 0; i < bufs.length; ++i) {
        var chk = bufs[i];
        buf.set(chk, b);
        b += chk.length;
    }
    return buf;
};
/**
 * Decompresses Zstandard data
 * @param dat The input data
 * @param buf The output buffer. If unspecified, the function will allocate
 *            exactly enough memory to fit the decompressed data. If your
 *            data has multiple frames and you know the output size, specifying
 *            it will yield better performance.
 * @returns The decompressed data
 */
function decompress(dat, buf) {
    var bufs = [], nb = +!buf;
    var bt = 0, ol = 0;
    for (; dat.length;) {
        var st = rzfh(dat, nb || buf);
        if (typeof st == 'object') {
            if (nb) {
                buf = null;
                if (st.w.length == st.u) {
                    bufs.push(buf = st.w);
                    ol += st.u;
                }
            }
            else {
                bufs.push(buf);
                st.e = 0;
            }
            for (; !st.l;) {
                var blk = rzb(dat, st, buf);
                if (!blk)
                    err(5);
                if (buf)
                    st.e = st.y;
                else {
                    bufs.push(blk);
                    ol += blk.length;
                    cpw(st.w, 0, blk.length);
                    st.w.set(blk, st.w.length - blk.length);
                }
            }
            bt = st.b + (st.c * 4);
        }
        else
            bt = st;
        dat = dat.subarray(bt);
    }
    return cct(bufs, ol);
}
exports.decompress = decompress;
/**
 * Decompressor for Zstandard streamed data
 */
var Decompress = /*#__PURE__*/ (function () {
    /**
     * Creates a Zstandard decompressor
     * @param ondata The handler for stream data
     */
    function Decompress(ondata) {
        this.ondata = ondata;
        this.c = [];
        this.l = 0;
        this.z = 0;
    }
    /**
     * Pushes data to be decompressed
     * @param chunk The chunk of data to push
     * @param final Whether or not this is the last chunk in the stream
     */
    Decompress.prototype.push = function (chunk, final) {
        if (typeof this.s == 'number') {
            var sub = Math.min(chunk.length, this.s);
            chunk = chunk.subarray(sub);
            this.s -= sub;
        }
        var sl = chunk.length;
        var ncs = sl + this.l;
        if (!this.s) {
            if (final) {
                if (!ncs) {
                    this.ondata(new u8(0), true);
                    return;
                }
                // min for frame + one block
                if (ncs < 5)
                    err(5);
            }
            else if (ncs < 18) {
                this.c.push(chunk);
                this.l = ncs;
                return;
            }
            if (this.l) {
                this.c.push(chunk);
                chunk = cct(this.c, ncs);
                this.c = [];
                this.l = 0;
            }
            if (typeof (this.s = rzfh(chunk)) == 'number')
                return this.push(chunk, final);
        }
        if (typeof this.s != 'number') {
            if (ncs < (this.z || 3)) {
                if (final)
                    err(5);
                this.c.push(chunk);
                this.l = ncs;
                return;
            }
            if (this.l) {
                this.c.push(chunk);
                chunk = cct(this.c, ncs);
                this.c = [];
                this.l = 0;
            }
            if (!this.z && ncs < (this.z = (chunk[this.s.b] & 2) ? 4 : 3 + ((chunk[this.s.b] >> 3) | (chunk[this.s.b + 1] << 5) | (chunk[this.s.b + 2] << 13)))) {
                if (final)
                    err(5);
                this.c.push(chunk);
                this.l = ncs;
                return;
            }
            else
                this.z = 0;
            for (;;) {
                var blk = rzb(chunk, this.s);
                if (!blk) {
                    if (final)
                        err(5);
                    var adc = chunk.subarray(this.s.b);
                    this.s.b = 0;
                    this.c.push(adc), this.l += adc.length;
                    return;
                }
                else {
                    this.ondata(blk, false);
                    cpw(this.s.w, 0, blk.length);
                    this.s.w.set(blk, this.s.w.length - blk.length);
                }
                if (this.s.l) {
                    var rest = chunk.subarray(this.s.b);
                    this.s = this.s.c * 4;
                    this.push(rest, final);
                    return;
                }
            }
        }
        else if (final)
            err(5);
    };
    return Decompress;
}());
exports.Decompress = Decompress;

}(__internal.fzstd = {}));/* end snippet fzstd */}}({}));/* end snippet suffix */