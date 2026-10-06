// Gandi Format (from RemixWarp, id=docviewer)
// Name: Document Viewer
// ID: docviewer
// Description: 上传并显示Word/PDF/Excel文档转换为HTML，支持多窗口管理和多种文档操作功能
// License: MIT

(function (Scratch) {
  "use strict";

  /** @type {Object.<string, {iframe: HTMLIFrameElement, overlay: any, name: string, content: string, visible: boolean, interactive: boolean, resizeBehavior: string, x: number, y: number, width: number, height: number, fontFamily: string, zoomLevel: number, rotation: number, numPages: number, wordCount: number, pageContents: Array}>} */
  let viewers = {};
  let uploadedFiles = {};

  // 存储原始文件数据以便重新处理
  let originalFileData = {};

  // 库加载状态
  let mammothLoaded = false;
  let pdfjsLoaded = false;
  let sheetjsLoaded = false;

  const featurePolicy = {
    accelerometer: "'none'",
    "ambient-light-sensor": "'none'",
    battery: "'none'",
    camera: "'none'",
    "display-capture": "'none'",
    "document-domain": "'none'",
    "encrypted-media": "'none'",
    fullscreen: "'none'",
    geolocation: "'none'",
    gyroscope: "'none'",
    magnetometer: "'none'",
    microphone: "'none'",
    midi: "'none'",
    payment: "'none'",
    "picture-in-picture": "'none'",
    "publickey-credentials-get": "'none'",
    "speaker-selection": "'none'",
    usb: "'none'",
    vibrate: "'none'",
    vr: "'none'",
    "screen-wake-lock": "'none'",
    "web-share": "'none'",
    "interest-cohort": "'none'",
  };

  const SANDBOX = [
    "allow-same-origin",
    "allow-scripts",
    "allow-forms",
    "allow-modals",
    "allow-popups",
    "allow-downloads",
    "allow-pointer-lock"
  ];

  const getOverlayMode = (resizeBehavior) =>
    resizeBehavior === "scale" ? "scale-centered" : "manual";

  // 动态加载库
  const loadMammoth = () => {
    if (mammothLoaded) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mammoth@1.4.2/mammoth.browser.min.js";
      script.onload = () => {
        mammothLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const loadPDFJS = () => {
    if (pdfjsLoaded) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
      script.onload = () => {
        pdfjsLoaded = true;
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const loadSheetJS = () => {
    if (sheetjsLoaded) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
      script.onload = () => {
        sheetjsLoaded = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // 创建iframe来显示转换后的HTML内容
  const createViewer = (content, name, numPages = 0, wordCount = 0, pageContents = []) => {
    // 如果同名的viewer已存在，先关闭它
    if (viewers[name]) {
      closeViewer(name);
    }

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "absolute";
    
    // 设置sandbox属性
    iframe.setAttribute("sandbox", SANDBOX.join(" "));
    iframe.setAttribute(
      "allow",
      Object.entries(featurePolicy)
        .map(([name, permission]) => `${name} ${permission}`)
        .join("; ")
    );
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("allowfullscreen", "false");
    
    // 设置srcdoc属性来显示HTML内容
    iframe.setAttribute("srcdoc", content);

    const overlay = Scratch.renderer.addOverlay(iframe, getOverlayMode("scale"));
    
    viewers[name] = {
      iframe,
      overlay,
      name,
      content,
      visible: true,
      interactive: true,
      resizeBehavior: "scale",
      x: 0,
      y: 0,
      width: Scratch.vm.runtime.stageWidth,
      height: Scratch.vm.runtime.stageHeight,
      fontFamily: "Arial, sans-serif", // 默认字体
      zoomLevel: 1.0, // 默认缩放级别
      rotation: 0, // 默认旋转角度
      numPages,
      wordCount,
      pageContents
    };

    updateViewerAttributes(name);
  };

  const closeViewer = (name) => {
    if (viewers[name]) {
      Scratch.renderer.removeOverlay(viewers[name].iframe);
      delete viewers[name];
    }
  };

  const updateViewerAttributes = (name) => {
    if (!viewers[name]) return;

    const { iframe, x, y, width, height, interactive, resizeBehavior, zoomLevel, rotation } = viewers[name];
    
    iframe.style.pointerEvents = interactive ? "auto" : "none";
    iframe.style.display = viewers[name].visible ? "" : "none";

    const { stageWidth, stageHeight } = Scratch.vm.runtime;
    const effectiveWidth = width >= 0 ? width : stageWidth;
    const effectiveHeight = height >= 0 ? height : stageHeight;

    // 应用缩放和旋转
    const scaleX = zoomLevel;
    const scaleY = zoomLevel;
    const transformParts = [];
    transformParts.push(`translate(${-effectiveWidth / 2 + x}px, ${-effectiveHeight / 2 - y}px)`);
    if (rotation !== 0) {
      transformParts.push(`rotate(${rotation}deg)`);
    }
    if (scaleX !== 1 || scaleY !== 1) {
      transformParts.push(`scale(${scaleX}, ${scaleY})`);
    }

    if (resizeBehavior === "scale") {
      iframe.style.width = `${effectiveWidth}px`;
      iframe.style.height = `${effectiveHeight}px`;

      iframe.style.transform = transformParts.join(' ');
      iframe.style.top = "0";
      iframe.style.left = "0";
    } else {
      // 使用百分比以适应全屏模式
      iframe.style.width = `${(effectiveWidth / stageWidth) * 100}%`;
      iframe.style.height = `${(effectiveHeight / stageHeight) * 100}%`;

      iframe.style.transform = transformParts.join(' ');
      iframe.style.top = `${
        (0.5 - effectiveHeight / 2 / stageHeight - y / stageHeight) * 100
      }%`;
      iframe.style.left = `${
        (0.5 - effectiveWidth / 2 / stageWidth + x / stageWidth) * 100
      }%`;
    }
    
    if (viewers[name].overlay) {
      viewers[name].overlay.mode = getOverlayMode(resizeBehavior);
      Scratch.renderer._updateOverlays();
    }
  };

  const updateAllViewers = () => {
    Object.keys(viewers).forEach(name => {
      updateViewerAttributes(name);
    });
  };

  Scratch.vm.on("STAGE_SIZE_CHANGED", updateAllViewers);

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
    Object.keys(viewers).forEach(name => {
      closeViewer(name);
    });
  });

  // 检测文件类型
  const detectFileType = (filename) => {
    const ext = filename.toLowerCase().split('.').pop();
    switch(ext) {
      case 'pdf':
        return 'pdf';
      case 'docx':
        return 'docx';
      case 'xlsx':
      case 'xls':
        return 'excel';
      default:
        return 'unsupported';
    }
  };

  // 转换PDF为HTML
  const convertPdfToHtml = async (arrayBuffer, enableDoublePage = false, fontFamily = "Arial, sans-serif") => {
    await loadPDFJS();

    try {
      // 创建副本以避免detach ArrayBuffer错误
      const bufferCopy = arrayBuffer.slice(0); // 使用slice方法创建副本
      const loadingTask = window.pdfjsLib.getDocument({ data: bufferCopy });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;
      // 限制最大页数以提高性能
      const maxPages = Math.min(totalPages, 50);
      let htmlContent = `<div style="font-family: ${fontFamily}; padding: 20px;">`;
      htmlContent += `<h2>PDF文档（共${totalPages}页）</h2>`;

      // 准备页面内容数组
      const pageContents = [];
      let totalWordCount = 0;

      if (enableDoublePage) {
        // 双页显示模式
        for (let i = 1; i <= maxPages; i += 2) {
          htmlContent += `<h3>第${i}页 - 第${Math.min(i+1, maxPages)}页</h3>`;
          htmlContent += '<div style="display: flex; gap: 20px; margin-bottom: 20px;">';
          
          // 第一页
          const page1 = await pdf.getPage(i);
          const viewport1 = page1.getViewport({ scale: 0.8 });
          const canvas1 = document.createElement('canvas');
          const context1 = canvas1.getContext('2d');
          canvas1.width = viewport1.width;
          canvas1.height = viewport1.height;
          const renderContext1 = { canvasContext: context1, viewport: viewport1 };
          await page1.render(renderContext1).promise;
          const imgDataUrl1 = canvas1.toDataURL('image/png');
          htmlContent += `<img src="${imgDataUrl1}" alt="PDF Page ${i}" style="max-width: 100%; height: auto; border: 1px solid #ccc;">`;
          
          // 提取文本内容用于计算字数
          const textContent1 = await page1.getTextContent();
          const text1 = textContent1.items.map(item => item.str).join(' ');
          pageContents.push(text1);
          totalWordCount += text1.split(/\s+/).filter(word => word.length > 0).length;
          
          // 第二页（如果存在）
          if (i + 1 <= maxPages) {
            const page2 = await pdf.getPage(i + 1);
            const viewport2 = page2.getViewport({ scale: 0.8 });
            const canvas2 = document.createElement('canvas');
            const context2 = canvas2.getContext('2d');
            canvas2.width = viewport2.width;
            canvas2.height = viewport2.height;
            const renderContext2 = { canvasContext: context2, viewport: viewport2 };
            await page2.render(renderContext2).promise;
            const imgDataUrl2 = canvas2.toDataURL('image/png');
            htmlContent += `<img src="${imgDataUrl2}" alt="PDF Page ${i+1}" style="max-width: 100%; height: auto; border: 1px solid #ccc;">`;
            
            // 提取第二页文本内容
            const textContent2 = await page2.getTextContent();
            const text2 = textContent2.items.map(item => item.str).join(' ');
            pageContents.push(text2);
            totalWordCount += text2.split(/\s+/).filter(word => word.length > 0).length;
          }
          
          htmlContent += '</div>';
        }
      } else {
        // 单页显示模式
        for (let i = 1; i <= maxPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.0 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const renderContext = { canvasContext: context, viewport: viewport };
          await page.render(renderContext).promise;
          const imgDataUrl = canvas.toDataURL('image/png');
          htmlContent += `<h3>第${i}页</h3>`;
          htmlContent += `<img src="${imgDataUrl}" alt="PDF Page ${i}" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-bottom: 20px;">`;
          
          // 提取文本内容用于计算字数
          const textContent = await page.getTextContent();
          const text = textContent.items.map(item => item.str).join(' ');
          pageContents.push(text);
          totalWordCount += text.split(/\s+/).filter(word => word.length > 0).length;
        }
      }

      htmlContent += '</div>';

      return {
        html: `
<!DOCTYPE html>
<html>
<head>
  <title>PDF Viewer</title>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; font-family: ${fontFamily}; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`,
        numPages: totalPages,
        wordCount: totalWordCount,
        pageContents: pageContents
      };
    } catch (error) {
      console.error("Error converting PDF:", error);
      return {
        html: `
<!DOCTYPE html>
<html>
<head>
  <title>Error</title>
  <style>
    body { margin: 20px; font-family: ${fontFamily}; color: red; }
  </style>
</head>
<body>
  <p>Error processing PDF file: ${error.message}</p>
</body>
</html>`,
        numPages: 0,
        wordCount: 0,
        pageContents: []
      };
    }
  };

  // 转换Word文档为HTML
  const convertDocxToHtml = async (arrayBuffer, fontFamily = "Arial, sans-serif") => {
    await loadMammoth();

    try {
      const result = await mammoth.convertToHtml({
        arrayBuffer: arrayBuffer,
        styleMap: [
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "r[style-name='Strong'] => strong"
        ]
      });

      // 计算字数
      const textContent = result.value.replace(/<[^>]*>/g, ' ');
      const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
      const pageContents = [textContent]; // 简单处理，整个文档作为一页内容

      return {
        html: `
<!DOCTYPE html>
<html>
<head>
  <title>DOCX Viewer</title>
  <meta charset="utf-8">
  <style>
    body { margin: 20px; padding: 0; font-family: ${fontFamily}; line-height: 1.6; }
    h1, h2, h3 { color: #333; margin-top: 1.5em; margin-bottom: 0.5em; }
    p { margin-bottom: 1em; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    ul, ol { margin: 1em 0; padding-left: 2em; }
    li { margin: 0.5em 0; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <div class="container">
    ${result.value}
  </div>
</body>
</html>`,
        numPages: 1, // Word文档暂时视为1页
        wordCount: wordCount,
        pageContents: pageContents
      };
    } catch (error) {
      console.error("Error converting DOCX:", error);
      return {
        html: `
<!DOCTYPE html>
<html>
<head>
  <title>Error</title>
  <style>
    body { margin: 20px; font-family: ${fontFamily}; color: red; }
  </style>
</head>
<body>
  <p>Error processing DOCX file: ${error.message}</p>
</body>
</html>`,
        numPages: 0,
        wordCount: 0,
        pageContents: []
      };
    }
  };

  // 转换Excel为HTML（优化性能）
  const convertExcelToHtml = async (arrayBuffer, fontFamily = "Arial, sans-serif") => {
    await loadSheetJS();

    try {
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array', cellDates: true });
      const sheetNames = workbook.SheetNames;
      let htmlContent = `<div style="font-family: ${fontFamily}; padding: 10px;">`;

      let totalWordCount = 0;
      const pageContents = [];

      for (let i = 0; i < Math.min(sheetNames.length, 5); i++) { // 限制最多5个工作表以提高性能
        const sheetName = sheetNames[i];
        const worksheet = workbook.Sheets[sheetName];

        // 获取范围
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        // 限制最大行列数以提高性能
        const maxRows = Math.min(range.e.r + 1, 200);
        const maxCols = Math.min(range.e.c + 1, 50);

        // 重新定义范围
        const limitedRange = {
          s: { r: 0, c: 0 },
          e: { r: maxRows - 1, c: maxCols - 1 }
        };

        // 转换有限范围的数据
        const limitedWS = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          range: XLSX.utils.encode_range(limitedRange),
          defval: ""
        });

        htmlContent += `<h2>${sheetName}</h2>`;
        htmlContent += '<table style="border-collapse: collapse; width: 100%; table-layout: fixed; margin-bottom: 20px;">';

        let sheetText = '';
        for (let rowIdx = 0; rowIdx < limitedWS.length; rowIdx++) {
          htmlContent += '<tr>';
          for (let colIdx = 0; colIdx < limitedWS[rowIdx].length; colIdx++) {
            const cellValue = limitedWS[rowIdx][colIdx];
            const cellType = typeof cellValue;
            
            let displayValue = cellValue;
            if (cellType === 'object' && cellValue instanceof Date) {
              displayValue = cellValue.toLocaleDateString();
            } else if (cellType === 'number') {
              displayValue = Number.isInteger(cellValue) ? cellValue : cellValue.toFixed(2);
            } else if (cellValue === null || cellValue === undefined) {
              displayValue = '';
            }
            
            htmlContent += `<td style="border: 1px solid #ccc; padding: 5px; word-wrap: break-word; text-align: left;">${String(displayValue)}</td>`;
            sheetText += String(displayValue) + ' ';
          }
          htmlContent += '</tr>';
        }

        htmlContent += '</table>';
        pageContents.push(sheetText);
        totalWordCount += sheetText.split(/\s+/).filter(word => word.length > 0).length;
      }

      htmlContent += '</div>';

      return {
        html: `
<!DOCTYPE html>
<html>
<head>
  <title>Excel Viewer</title>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; font-family: ${fontFamily}; }
    table { border-collapse: collapse; width: 100%; table-layout: fixed; }
    th, td { border: 1px solid #ccc; padding: 8px; word-wrap: break-word; text-align: left; }
    th { background-color: #f2f2f2; }
    h2 { margin-top: 1.5em; margin-bottom: 0.5em; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`,
        numPages: sheetNames.length,
        wordCount: totalWordCount,
        pageContents: pageContents
      };
    } catch (error) {
      console.error("Error converting Excel:", error);
      return {
        html: `
<!DOCTYPE html>
<html>
<head>
  <title>Error</title>
  <style>
    body { margin: 20px; font-family: ${fontFamily}; color: red; }
  </style>
</head>
<body>
  <p>Error processing Excel file: ${error.message}</p>
</body>
</html>`,
        numPages: 0,
        wordCount: 0,
        pageContents: []
      };
    }
  };

  // 重新处理文档（用于双页模式切换或字体设置）
  const reprocessDocument = async (name) => {
    if (!originalFileData[name]) {
      console.error(`No original file data found for ${name}`);
      return;
    }

    const { file, enableDoublePage } = originalFileData[name];
    const fileType = detectFileType(file.name);
    const fontFamily = viewers[name]?.fontFamily || "Arial, sans-serif";

    try {
      let result;
      switch(fileType) {
        case 'pdf':
          result = await convertPdfToHtml(file.arrayBuffer, enableDoublePage, fontFamily);
          break;
        case 'docx':
          result = await convertDocxToHtml(file.arrayBuffer, fontFamily);
          break;
        case 'excel':
          result = await convertExcelToHtml(file.arrayBuffer, fontFamily);
          break;
        default:
          console.error('Unsupported file type');
          return;
      }

      // 更新viewer内容和元数据
      if (viewers[name]) {
        viewers[name].content = result.html;
        viewers[name].numPages = result.numPages;
        viewers[name].wordCount = result.wordCount;
        viewers[name].pageContents = result.pageContents;
        viewers[name].iframe.setAttribute("srcdoc", result.html);
      }
    } catch (err) {
      console.error('Error reprocessing file:', err);
    }
  };

  // 处理文件上传
  const processFile = async (file, name, enableDoublePage = false, fontFamily = "Arial, sans-serif") => {
    return new Promise(async (resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async function(e) {
        const arrayBuffer = e.target.result;
        const fileType = detectFileType(file.name);

        // 保存原始文件数据以便后续重新处理
        originalFileData[name] = {
          file: { arrayBuffer, name: file.name, type: fileType },
          enableDoublePage
        };

        try {
          let result;
          switch(fileType) {
            case 'pdf':
              result = await convertPdfToHtml(arrayBuffer, enableDoublePage, fontFamily);
              break;
            case 'docx':
              result = await convertDocxToHtml(arrayBuffer, fontFamily);
              break;
            case 'excel':
              result = await convertExcelToHtml(arrayBuffer, fontFamily);
              break;
            default:
              reject(new Error('Unsupported file type'));
              return;
          }

          // 保存处理结果
          uploadedFiles[name] = {
            fileName: file.name,
            fileType: fileType,
            processed: true,
            timestamp: Date.now(),
            size: file.size,
            lastModified: file.lastModified
          };

          resolve(result);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsArrayBuffer(file);
    });
  };

  class DocumentViewerExtension {
    constructor() {
      this.doublePageMode = {};
    }

    getInfo() {
      return {
        name: "zx的文档读取",
        id: "docviewer",
        color1: "#fc5558",
        color2: "#e63c3c",
        blocks: [
          {
            opcode: "uploadAndDisplay",
            blockType: Scratch.BlockType.COMMAND,
            text: "从本地上传文件并且命名成 [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              }
            },
          },
          "---",
          {
            opcode: "show",
            blockType: Scratch.BlockType.COMMAND,
            text: "显示名字为 [NAME] 的文档",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              }
            },
          },
          {
            opcode: "hide",
            blockType: Scratch.BlockType.COMMAND,
            text: "隐藏名字为 [NAME] 的文档",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              }
            },
          },
          {
            opcode: "close",
            blockType: Scratch.BlockType.COMMAND,
            text: "关闭名字为 [NAME] 的文档",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              }
            },
          },
          {
            opcode: "closeAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "删除所有文档",
          },
          "---",
          {
            opcode: "showAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "显示所有文档",
          },
          {
            opcode: "hideAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "隐藏所有文档",
          },
          "---",
          {
            opcode: "isLoaded",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "名字为 [NAME] 的文档读取成功？",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              }
            },
          },
          "---",
          {
            opcode: "setX",
            blockType: Scratch.BlockType.COMMAND,
            text: "设置名字为 [NAME] 的文档 x 坐标为 [X]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "addX",
            blockType: Scratch.BlockType.COMMAND,
            text: "将名字为 [NAME] 的文档 x 坐标增加 [X]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
            },
          },
          {
            opcode: "setY",
            blockType: Scratch.BlockType.COMMAND,
            text: "设置名字为 [NAME] 的文档 y 坐标为 [Y]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "addY",
            blockType: Scratch.BlockType.COMMAND,
            text: "将名字为 [NAME] 的文档 y 坐标增加 [Y]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
            },
          },
          {
            opcode: "setWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: "设置名字为 [NAME] 的文档宽度为 [WIDTH]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: Scratch.vm.runtime.stageWidth,
              },
            },
          },
          {
            opcode: "addWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: "将名字为 [NAME] 的文档宽度增加 [WIDTH]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
            },
          },
          {
            opcode: "setHeight",
            blockType: Scratch.BlockType.COMMAND,
            text: "设置名字为 [NAME] 的文档高度为 [HEIGHT]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: Scratch.vm.runtime.stageHeight,
              },
            },
          },
          {
            opcode: "addHeight",
            blockType: Scratch.BlockType.COMMAND,
            text: "将名字为 [NAME] 的文档高度增加 [HEIGHT]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
            },
          },
          {
            opcode: "setZoom",
            blockType: Scratch.BlockType.COMMAND,
            text: "设置名字为 [NAME] 的文档页面缩放度为 [ZOOM]%",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              ZOOM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "addZoom",
            blockType: Scratch.BlockType.COMMAND,
            text: "将名字为 [NAME] 的文档页面缩放度增加 [ZOOM]%",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              ZOOM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
            },
          },
          {
            opcode: "setZoomByValue",
            blockType: Scratch.BlockType.COMMAND,
            text: "将名字为 [NAME] 的文档页面缩放度设置为 [ZOOM]%",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              ZOOM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "setFontFamily",
            blockType: Scratch.BlockType.COMMAND,
            text: "将文档 [NAME] 字体设置为 [FONT_FAMILY]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              FONT_FAMILY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Arial, sans-serif",
              },
            },
          },
          {
            opcode: "getFileProperty",
            blockType: Scratch.BlockType.REPORTER,
            text: "名字为 [NAME] 的[PROPERTY]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              PROPERTY: {
                type: Scratch.ArgumentType.STRING,
                menu: "propertyMenu",
              },
            },
          },
          {
            opcode: "getPageInfo",
            blockType: Scratch.BlockType.REPORTER,
            text: "名字为 [NAME] 的[PAGEINFO]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              PAGEINFO: {
                type: Scratch.ArgumentType.STRING,
                menu: "pageInfoMenu",
              },
            },
          },
          "---",
          {
            opcode: "setPageMode",
            blockType: Scratch.BlockType.COMMAND,
            text: "将名字为 [NAME] 的文档设置为[MODE]显示",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: "pageModeMenu",
              },
            },
          },
          {
            opcode: "setRotation",
            blockType: Scratch.BlockType.COMMAND,
            text: "设置文档 [NAME] 的页面方向为 [ROTATION] 度",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              ROTATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "addRotation",
            blockType: Scratch.BlockType.COMMAND,
            text: "将文档 [NAME] 的页面方向增加 [ROTATION] 度",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "文档1",
              },
              ROTATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "90",
              },
            },
          },
          "---",
          {
            opcode: "getDocumentNames",
            blockType: Scratch.BlockType.REPORTER,
            text: "获取所有文档名称列表",
          },
          {
            opcode: "getDocumentCount",
            blockType: Scratch.BlockType.REPORTER,
            text: "获取已加载文档数量",
          },
        ],
        menus: {
          propertyMenu: {
            acceptReporters: true,
            items: [
              {text: "文件格式", value: "format"},
              {text: "文件名称", value: "name"},
              {text: "文件大小", value: "size"},
              {text: "创建时间", value: "created"},
              {text: "修改时间", value: "modified"},
            ],
          },
          pageInfoMenu: {
            acceptReporters: true,
            items: [
              {text: "总页数", value: "totalPages"},
              {text: "字数", value: "wordCount"},
              {text: "X坐标", value: "x"},
              {text: "Y坐标", value: "y"},
              {text: "宽度", value: "width"},
              {text: "高度", value: "height"},
              {text: "页面缩放度", value: "zoom"},
              {text: "页面方向", value: "rotation"},
            ],
          },
          pageModeMenu: {
            acceptReporters: true,
            items: [
              {text: "单页", value: "single"},
              {text: "双页", value: "double"},
            ],
          },
        },
      };
    }

    async uploadAndDisplay({ NAME }) {
      const name = Scratch.Cast.toString(NAME);
      
      // 创建文件输入元素
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf,.docx,.xlsx,.xls'; // 删除了.pptx支持
      
      // 返回一个Promise来处理文件上传
      return new Promise((resolve) => {
        input.onchange = async (event) => {
          const file = event.target.files[0];
          if (!file) {
            resolve();
            return;
          }
          
          try {
            const enableDoublePage = this.doublePageMode[name] || false;
            const fontFamily = viewers[name]?.fontFamily || "Arial, sans-serif";
            const result = await processFile(file, name, enableDoublePage, fontFamily);
            createViewer(result.html, name, result.numPages, result.wordCount, result.pageContents);
            resolve();
          } catch (error) {
            console.error('Error processing file:', error);
            resolve();
          }
        };
        
        // 触发文件选择对话框
        input.click();
      });
    }

    show({ NAME }) {
      const name = Scratch.Cast.toString(NAME);
      if (viewers[name]) {
        viewers[name].visible = true;
        updateViewerAttributes(name);
      }
      return;
    }

    hide({ NAME }) {
      const name = Scratch.Cast.toString(NAME);
      if (viewers[name]) {
        viewers[name].visible = false;
        updateViewerAttributes(name);
      }
      return;
    }

    close({ NAME }) {
      const name = Scratch.Cast.toString(NAME);
      closeViewer(name);
      if (uploadedFiles[name]) {
        delete uploadedFiles[name];
        delete originalFileData[name]; // 同时删除原始文件数据
      }
      return;
    }

    closeAll() {
      Object.keys(viewers).forEach(name => {
        closeViewer(name);
      });
      Object.keys(uploadedFiles).forEach(name => {
        delete uploadedFiles[name];
        delete originalFileData[name]; // 同时删除原始文件数据
      });
      return;
    }

    showAll() {
      Object.keys(viewers).forEach(name => {
        viewers[name].visible = true;
        updateViewerAttributes(name);
      });
      return;
    }

    hideAll() {
      Object.keys(viewers).forEach(name => {
        viewers[name].visible = false;
        updateViewerAttributes(name);
      });
      return;
    }

    isLoaded({ NAME }) {
      const name = Scratch.Cast.toString(NAME);
      return !!uploadedFiles[name]?.processed;
    }

    setX({ NAME, X }) {
      const name = Scratch.Cast.toString(NAME);
      if (viewers[name]) {
        viewers[name].x = Scratch.Cast.toNumber(X);
        updateViewerAttributes(name);
      }
      return;
    }

    addX({ NAME, X }) {
      const name = Scratch.Cast.toString(NAME);
      if (viewers[name]) {
        viewers[name].x += Scratch.Cast.toNumber(X);
        updateViewerAttributes(name);
      }
      return;
    }

    setY({ NAME, Y }) {
      const name = Scratch.Cast.toString(NAME);
      if (viewers[name]) {
        viewers[name].y = Scratch.Cast.toNumber(Y);
        updateViewerAttributes(name);
      }
      return;
    }

    addY({ NAME, Y }) {
      const name = Scratch.Cast.toString(NAME);
      if (viewers[name]) {
        viewers[name].y += Scratch.Cast.toNumber(Y);
        updateViewerAttributes(name);
      }
      return;
    }

    setWidth({ NAME, WIDTH }) {
      const name = Scratch.Cast.toString(NAME);
      if (viewers[name]) {
        viewers[name].width = Scratch.Cast.toNumber(WIDTH);
        updateViewerAttributes(name);
      }
      return;
    }

    addWidth({ NAME, WIDTH }) {
      const name = Scratch.Cast.toString(NAME);
      if (viewers[name]) {
        viewers[name].width += Scratch.Cast.toNumber(WIDTH);
        updateViewerAttributes(name);
      }
      return;
    }

    setHeight({ NAME, HEIGHT }) {
      const name = Scratch.Cast.toString(NAME);
      if (viewers[name]) {
        viewers[name].height = Scratch.Cast.toNumber(HEIGHT);
        updateViewerAttributes(name);
      }
      return;
    }

    addHeight({ NAME, HEIGHT }) {
      const name = Scratch.Cast.toString(NAME);
      if (viewers[name]) {
        viewers[name].height += Scratch.Cast.toNumber(HEIGHT);
        updateViewerAttributes(name);
      }
      return;
    }

    setZoom({ NAME, ZOOM }) {
      const name = Scratch.Cast.toString(NAME);
      const zoom = Scratch.Cast.toNumber(ZOOM) / 100;
      if (viewers[name]) {
        viewers[name].zoomLevel = zoom;
        updateViewerAttributes(name);
      }
      return;
    }

    addZoom({ NAME, ZOOM }) {
      const name = Scratch.Cast.toString(NAME);
      const zoomChange = Scratch.Cast.toNumber(ZOOM) / 100;
      if (viewers[name]) {
        viewers[name].zoomLevel += zoomChange;
        updateViewerAttributes(name);
      }
      return;
    }

    setZoomByValue({ NAME, ZOOM }) {
      const name = Scratch.Cast.toString(NAME);
      const zoom = Scratch.Cast.toNumber(ZOOM) / 100;
      if (viewers[name]) {
        viewers[name].zoomLevel = zoom;
        updateViewerAttributes(name);
      }
      return;
    }

    setFontFamily({ NAME, FONT_FAMILY }) {
      const name = Scratch.Cast.toString(NAME);
      const fontFamily = Scratch.Cast.toString(FONT_FAMILY);
      
      if (viewers[name]) {
        viewers[name].fontFamily = fontFamily;
        
        // 重新处理文档以应用新字体
        if (uploadedFiles[name]) {
          reprocessDocument(name);
        }
      }
      return;
    }

    getFileProperty({ NAME, PROPERTY }) {
      const name = Scratch.Cast.toString(NAME);
      if (!uploadedFiles[name]) {
        return "未找到文件";
      }
      
      const file = uploadedFiles[name];
      switch (PROPERTY) {
        case "format":
          return file.fileType;
        case "name":
          return file.fileName;
        case "size":
          const sizeKB = file.size / 1024;
          if (sizeKB < 1024) {
            return `${sizeKB.toFixed(2)} KB`;
          } else {
            const sizeMB = sizeKB / 1024;
            return `${sizeMB.toFixed(2)} MB`;
          }
        case "created":
          return new Date(file.timestamp).toLocaleString();
        case "modified":
          return new Date(file.lastModified).toLocaleString();
        default:
          return "未知属性";
      }
    }

    getPageInfo({ NAME, PAGEINFO }) {
      const name = Scratch.Cast.toString(NAME);
      if (!viewers[name]) {
        return 0;
      }
      
      switch (PAGEINFO) {
        case "totalPages":
          return viewers[name].numPages;
        case "wordCount":
          return viewers[name].wordCount;
        case "x":
          return viewers[name].x;
        case "y":
          return viewers[name].y;
        case "width":
          return viewers[name].width;
        case "height":
          return viewers[name].height;
        case "zoom":
          return viewers[name].zoomLevel * 100;
        case "rotation":
          return viewers[name].rotation;
        default:
          return 0;
      }
    }

    async setPageMode({ NAME, MODE }) {
      const name = Scratch.Cast.toString(NAME);
      const enable = MODE === "double";
      
      this.doublePageMode[name] = enable;
      
      // 如果是PDF文件，重新处理以应用双页设置
      if (uploadedFiles[name] && uploadedFiles[name].fileType === 'pdf') {
        await reprocessDocument(name);
      }
      
      return;
    }

    setRotation({ NAME, ROTATION }) {
      const name = Scratch.Cast.toString(NAME);
      const rotation = Scratch.Cast.toNumber(ROTATION);
      if (viewers[name]) {
        viewers[name].rotation = rotation;
        updateViewerAttributes(name);
      }
      return;
    }

    addRotation({ NAME, ROTATION }) {
      const name = Scratch.Cast.toString(NAME);
      const rotationChange = Scratch.Cast.toNumber(ROTATION);
      if (viewers[name]) {
        viewers[name].rotation += rotationChange;
        updateViewerAttributes(name);
      }
      return;
    }

    getDocumentNames() {
      return Object.keys(uploadedFiles).join(',');
    }

    getDocumentCount() {
      return Object.keys(uploadedFiles).length;
    }
  }

  Scratch.extensions.register(new DocumentViewerExtension());

})(Scratch);