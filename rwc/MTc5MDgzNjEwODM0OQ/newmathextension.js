// Gandi Format (from RemixWarp, id=newmathextension)
(function(Scratch) {
	"use strict";
	//初始化
	const {
		runtime,
		Cast,
		ArgumentType,
		BlockType,
		extensions,
		translate
	} = Scratch;
	const vm = Scratch.vm ?? runtime.extensionManager.vm;
	const gandi = Scratch?.gandi
	const gandi3 = Scratch?.gandi?.isGandi3 //可能做兼容

	// ========================= 可扩展模块 ==================
	let a, b;
	{
		// original by Nights
		const INPUT_TYPES_OPTIONS_LABEL = {
			s: 'ADD_TEXT_PARAMETER',
			n: 'ADD_NUM_PARAMETER',
			b: 'ADD_BOOL_PARAMETER',
			r: 'ADD_REGEN_PARAMETER',
			argument_reporter_string_number: 'ADD_PARAMETER',
		};
		const leftArrow = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNy43NzciIGhlaWdodD0iMTE3LjQ3MiI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjIuNDAzIDgyLjM4MiAxLjA2NCA2MS4wNDJhMy4xNDggMy4xNDggMCAwIDEgMC00LjQ1M2wyMS4zNC0yMS4zMzZhMy4xNDggMy4xNDggMCAwIDEgNS4zNzMgMi4yMjZ2NDIuNjc2YTMuMTQ4IDMuMTQ4IDAgMCAxLTUuMzc0IDIuMjI2eiIvPjxwYXRoIGZpbGw9Im5vbmUiIGQ9Ik0wIDExNy40NzJWMGgyNy42MzZ2MTE3LjQ3MnoiLz48L2c+PC9zdmc+';
		const rightArrow = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNy43NzciIGhlaWdodD0iMTE3LjQ3MiI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNS4zNzQgODIuMzgxQTMuMTQ4IDMuMTQ4IDAgMCAxIDAgODAuMTU1VjM3LjQ3OWEzLjE0OCAzLjE0OCAwIDAgMSA1LjM3My0yLjIyNmwyMS4zNCAyMS4zMzZhMy4xNDggMy4xNDggMCAwIDEgMCA0LjQ1M0w1LjM3NCA4Mi4zODJ6Ii8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTS4xNDIgMTE3LjQ3MlYwaDI3LjYzNXYxMTcuNDcyeiIvPjwvZz48L3N2Zz4=';
		const minusButton = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMCc' + 'MC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPS' + 'JNMTggMTFoLTEyYy0xLjEwNCAwLTIgLjg5Ni0yIDJzLjg5NiAyIDIgMmgxMmMxLjEwNCAw' + 'IDItLjg5NiAyLTJzLS44OTYtMi0yLTJ6IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4K';
		const plusButton = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMCc' + '9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBkPSJNMT' + 'ggMTBoLTR2LTRjMC0xLjEwNC0uODk2LTItMi0ycy0yIC44OTYtMiAybC4wNzEgNGgtNC4wNz' + 'FjLTEuMTA0IDAtMiAuODk2LTIgMnMuODk2IDIgMiAybDQuMDcxLS4wNzEtLjA3MSA0LjA3MW' + 'MwIDEuMTA0Ljg5NiAyIDIgMnMyLS44OTYgMi0ydi00LjA3MWw0IC4wNzFjMS4xMDQgMCAyLS' + '44OTYgMi0ycy0uODk2LTItMi0yeiIgZmlsbD0id2hpdGUiIC8+PC9zdmc+Cg==';
		const defaultPlusSelectImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA1NCAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI1MyIgaGVpZ2h0PSIzMSIgcng9IjE1LjUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjIiLz4KPHBhdGggZD0iTTE3Ljk5OTggMTAuMTY0MVYyMS44MzA3TTEyLjE2NjUgMTUuOTk3NEgyMy44MzMyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNjY2NjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMzkuNzYzOCAxOC44Mzg2QzM5LjMyNTQgMTkuMjE4MiAzOC42NzQ2IDE5LjIxODIgMzguMjM2MiAxOC44Mzg2TDM1LjMwMzMgMTYuMjk4NkMzNC40ODY4IDE1LjU5MTQgMzQuOTg2OSAxNC4yNSAzNi4wNjcxIDE0LjI1TDQxLjkzMjkgMTQuMjVDNDMuMDEzMSAxNC4yNSA0My41MTMyIDE1LjU5MTQgNDIuNjk2NyAxNi4yOTg2TDM5Ljc2MzggMTguODM4NloiIGZpbGw9IndoaXRlLz4KPC9zdmc+Cg==';
		if (!window.__ArkosExtendableInfo) {
			window.__ArkosExtendableInfo = {
				enabledDynamicArgBlocksInfo: {},
				extInfo: {},
			};
		}
		const {
			enabledDynamicArgBlocksInfo,
			extInfo
		} = window.__ArkosExtendableInfo;
		function getScratchBlocks(runtime = Scratch?.vm?.runtime) {
			return runtime.scratchBlocks || window.ScratchBlocks;
		}
		function setLocales(Blockly) {
			Object.assign(Blockly.ScratchMsgs.locales.en, {
				ADD_TEXT_PARAMETER: 'Add Text Parameter',
				ADD_NUM_PARAMETER: 'Add Num Parameter',
				ADD_BOOL_PARAMETER: 'Add Booln Parameter',
				DELETE_DYNAMIC_PARAMETER: 'Delete Dynamic Parameter',
				ADD_PARAMETER: 'Add Parameter',
			});
			Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
				ADD_TEXT_PARAMETER: '添加文本参数',
				ADD_NUM_PARAMETER: '添加数字参数',
				ADD_BOOL_PARAMETER: '添加布尔值参数',
				DELETE_DYNAMIC_PARAMETER: '删除动态参数',
				ADD_PARAMETER: '添加参数',
			});
		}
		function translate(Blockly, key) {
			return Blockly.ScratchMsgs.translate(key);
		}
		function createButtons(Blockly, plusImage = rightArrow, minusImage = leftArrow) {
			let w = 28;
			let h = 118;
			let size = 0.35;
			if (plusImage === '+') { plusImage = plusButton; w = 18; h = 18; size = 0.7; }
			if (minusImage === '-') { minusImage = minusButton; w = 18; h = 18; size = 0.7; }
			class FieldButton extends Blockly.FieldImage {
				constructor(src, width = w * size, height = h * size) {
					super(src, width, height, undefined, false);
					this.initialized = false;
				}
				init() {
					super.init();
					if (!this.initialized) {
						this.getSvgRoot().style.cursor = 'pointer';
						Blockly.bindEventWithChecks_(this.getSvgRoot(), 'mousedown', this, (e) => {
							e.stopPropagation();
						});
						Blockly.bindEventWithChecks_(this.getSvgRoot(), 'mouseup', this, (e) => {
							this.handleClick(e);
						});
					}
					this.initialized = true;
				}
				handleClick(e) {
					if (!this.sourceBlock_ || !this.sourceBlock_.workspace) return;
					if (this.sourceBlock_.workspace.isDragging()) return;
					if (this.sourceBlock_.isInFlyout) return;
					this.onClick(e);
				}
				onClick() {}
			}
			class PlusSelectButton extends FieldButton {
				constructor() { super(defaultPlusSelectImage, 54, 32); }
				onClick(e) {
					const menuOptions = this.sourceBlock_.dynamicArgOptionalTypes_.map((i) => ({
						text: translate(Blockly, INPUT_TYPES_OPTIONS_LABEL[i]),
						enabled: true,
						callback: () => { this.sourceBlock_.addDynamicArg(i); },
					}));
					Blockly.ContextMenu.show(e, menuOptions, false);
				}
			}
			class PlusButton extends FieldButton {
				constructor() { super(plusImage); }
				onClick() {
					this.sourceBlock_.addDynamicArg(this.sourceBlock_.dynamicArgOptionalTypes_[0]);
				}
			}
			class MinusButton extends FieldButton {
				constructor() { super(minusImage); }
				onClick() {
					const { dynamicArgumentIds_ } = this.sourceBlock_;
					this.sourceBlock_.removeDynamicArg(dynamicArgumentIds_[dynamicArgumentIds_.length - 1]);
				}
			}
			return { PlusSelectButton, PlusButton, MinusButton };
		}
		function initExpandableBlock(runtime, blockDefinition, dynamicArgInfo) {
			const { PlusSelectButton, PlusButton, MinusButton } = dynamicArgInfo.extInfo;
			const Blockly = getScratchBlocks(runtime);
			function getValue(value, i, defaultValue, valueWhenOutOfRange) {
				if (value === undefined) return defaultValue;
				if (Array.isArray(value)) {
					if (i < value.length) return value[i];
					if (valueWhenOutOfRange !== undefined) return valueWhenOutOfRange;
					return value[value.length - 1];
				}
				return typeof value === 'function' ? value(i) : value;
			}
			function getParamsIncPerClick(i) {
				return getValue(this.dynamicArgInfo_.paramsIncrement, i, 1, 0);
			}
			function getAddClickCount(num) {
				let sum = 0;
				let i = 0;
				while (sum < num) {
					const inc = getParamsIncPerClick.call(this, i);
					if (inc === 0) throw new Error('Unreachable param num');
					sum += inc;
					i++;
				}
				return i;
			}
			function getParamsGroupindexes(num) {
				let sum = 0;
				let i = 0;
				let inc = 0;
				while (sum < num) {
					inc = getParamsIncPerClick.call(this, i);
					if (inc === 0) throw new Error('Unreachable param num');
					sum += inc;
					i++;
				}
				sum -= inc;
				return Array.from({ length: inc }, (_, j) => sum + j + 1);
			}
			function getNextParamInc() {
				return getParamsIncPerClick.call(this, getAddClickCount.call(this, this.dynamicArgumentTypes_.length));
			}
			const moveButtonToTheRightPlace = function() {
				const showPlus = getNextParamInc.call(this) > 0;
				if (showPlus) {
					this.getInput('PLUS').setVisible(true);
					const { afterArg, beforeArg } = this.dynamicArgInfo_;
					if (afterArg) {
						this.moveInputBefore('PLUS', afterArg);
						this.moveInputBefore(afterArg, 'PLUS');
					} else if (beforeArg) {
						this.moveInputBefore('PLUS', beforeArg);
					} else {
						this.moveInputBefore('PLUS', null);
					}
				} else {
					this.getInput('PLUS').setVisible(false);
				}
				if (this.getInput('ENDTEXT')) this.moveInputBefore('ENDTEXT', 'PLUS');
				const cnt = this.dynamicArgumentTypes_.length;
				if (cnt === 0) {
					this.removeInput('MINUS');
				} else {
					if (!this.getInput('MINUS')) {
						this.appendDummyInput('MINUS').appendField(new MinusButton());
					}
					this.moveInputBefore('MINUS', 'PLUS');
				}
			};
			const orgInit = blockDefinition.init;
			blockDefinition.init = function() {
				orgInit.call(this);
				this.dynamicArgumentIds_ = [];
				this.dynamicArgumentTypes_ = [];
				this.dynamicArgInfo_ = dynamicArgInfo;
				this.dynamicArgOptionalTypes_ = dynamicArgInfo.dynamicArgTypes;
				this.specifiedArgTypes = dynamicArgInfo.argType;
				this.plusButton_ = dynamicArgInfo.dynamicArgTypes.length > 1 ? new PlusSelectButton() : new PlusButton();
				this.minusButton_ = new MinusButton();
				const { afterArg, endText, beforeArg, preText } = dynamicArgInfo;
				if (!this.getInput) return;
				const endTxt = getValue(endText, 0, '');
				const preTxt = getValue(preText, 0, '');
				const n = this.dynamicArgumentIds_.length;
				if (n === 0 && preTxt + endTxt !== '') {
					if (beforeArg) this.appendDummyInput('ENDTEXT').appendField(preTxt + endTxt, 'ENDTEXT');
				} else if (endTxt !== '') {
					this.appendDummyInput('ENDTEXT').appendField(endTxt, 'ENDTEXT');
				}
				this.appendDummyInput('PLUS').appendField(this.plusButton_);
				if (afterArg || beforeArg) {
					const plusInput = this.getInput('PLUS');
					const endTxtInput = this.getInput('ENDTEXT');
					const plusIndex = this.inputList.indexOf(plusInput);
					const argInput = this.getInput(afterArg ?? beforeArg);
					let argIdx = this.inputList.indexOf(argInput);
					if (plusIndex > -1 && argIdx > -1) {
						this.inputList.splice(plusIndex, 1);
						argIdx = this.inputList.indexOf(argInput);
						if (afterArg) {
							this.inputList.splice(argIdx + 1, 0, plusInput);
							const endTxtIndex = this.inputList.indexOf(endTxtInput);
							if (endTxtIndex > -1) {
								this.inputList.splice(endTxtIndex, 1);
								argIdx = this.inputList.indexOf(argInput);
								this.inputList.splice(argIdx + 1, 0, endTxtInput);
							}
							updatePreText(this, 0);
						} else if (beforeArg) {
							this.inputList.splice(argIdx, 0, plusInput);
							const endTxtIndex = this.inputList.indexOf(endTxtInput);
							if (endTxtIndex > -1) {
								this.inputList.splice(endTxtIndex, 1);
								argIdx = this.inputList.indexOf(plusInput);
								this.inputList.splice(argIdx, 0, endTxtInput);
							}
						}
					}
				}
			};
			blockDefinition.customContextMenu = function(contextMenu) {
				this.dynamicArgOptionalTypes_.forEach((i) => contextMenu.push({
					text: translate(Blockly, INPUT_TYPES_OPTIONS_LABEL[i]),
					enabled: true,
					callback: () => { this.addDynamicArg(i); },
				}));
			};
			blockDefinition.attachShadow_ = function(input, argumentType, defaultValue = '') {
				if (argumentType === 'b') return;
				let blockType;
				switch (argumentType) {
					case 'n': blockType = 'math_number'; break;
					case 's': blockType = 'text'; break;
					default: blockType = argumentType; break;
				}
				Blockly.Events.disable();
				const newBlock = this.workspace.newBlock(blockType);
				try {
					if (argumentType === 'n') { newBlock.setFieldValue(defaultValue, 'NUM'); }
					else if (argumentType === 's') { newBlock.setFieldValue(defaultValue, 'TEXT'); }
					else if (argumentType === 'argument_reporter_string_number') { newBlock.setFieldValue(defaultValue, 'VALUE'); }
					newBlock.setShadow(true);
					if (!this.isInsertionMarker()) {
						newBlock.initSvg();
						newBlock.render(false);
					}
				} finally {
					Blockly.Events.enable();
				}
				if (Blockly.Events.isEnabled()) {
					Blockly.Events.fire(new Blockly.Events.BlockCreate(newBlock));
				}
				newBlock.outputConnection.connect(input.connection);
			};
			blockDefinition.mutationToDom = function() {
				const container = document.createElement('mutation');
				container.setAttribute('dynamicargids', JSON.stringify(this.dynamicArgumentIds_));
				container.setAttribute('dynamicargtypes', JSON.stringify(this.dynamicArgumentTypes_));
				return container;
			};
			blockDefinition.domToMutation = function(xmlElement) {
				this.dynamicArgumentIds_ = JSON.parse(xmlElement.getAttribute('dynamicargids')) || [];
				this.dynamicArgumentTypes_ = JSON.parse(xmlElement.getAttribute('dynamicargtypes')) || [];
				this.updateDisplay_();
			};
			blockDefinition.addDynamicArg = function(type) {
				const oldMutationDom = this.mutationToDom();
				const oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
				Blockly.Events.setGroup(true);
				let index = 0;
				const lastArgName = this.dynamicArgumentIds_.slice(-1)[0];
				if (lastArgName) { [index] = lastArgName.match(/\d+/g); }
				index = Number(index);
				const cnt = getNextParamInc.call(this);
				for (let i = 0; i < cnt; i++) {
					this.dynamicArgumentIds_.push(`DYNAMIC_ARGS${index + i + 1}`);
					const specifiedType = this.specifiedArgTypes?.[index + i];
					if (specifiedType) { this.dynamicArgumentTypes_.push(specifiedType); }
					else { this.dynamicArgumentTypes_.push(type); }
				}
				this.updateDisplay_();
				const newMutationDom = this.mutationToDom();
				const newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
				if (oldMutation !== newMutation) {
					Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldMutation, newMutation));
				}
				Blockly.Events.setGroup(false);
			};
			blockDefinition.removeDynamicArg = function(id) {
				Blockly.Events.setGroup(true);
				const oldMutationDom = this.mutationToDom();
				const oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
				const matches = id.match(/^([^\d]+)(\d+)$/);
				const name = matches[1];
				const i = Number(matches[2]);
				const paramsToRemove = getParamsGroupindexes.call(this, i);
				paramsToRemove.forEach((it) => {
					const curId = `${name}${it}`;
					const idx = this.dynamicArgumentIds_.indexOf(curId);
					this.dynamicArgumentIds_.splice(idx, 1);
					this.dynamicArgumentTypes_.splice(idx, 1);
					this.removeInput(curId);
				});
				this.updateDisplay_();
				const newMutationDom = this.mutationToDom();
				const newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
				if (oldMutation !== newMutation) {
					Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, oldMutation, newMutation));
					setTimeout(() => {
						const target = runtime.getEditingTarget();
						const block = target.blocks._blocks[this.id];
						Object.keys(block.inputs).forEach((name) => {
							if (/^DYNAMIC_ARGS\d+$/.test(name) && !this.dynamicArgumentIds_.includes(name)) {
								target.blocks.deleteBlock(block.inputs[name].shadow, { source: 'default', targetId: target.id });
								delete block.inputs[name];
								if (runtime.emitTargetBlocksChanged) {
									runtime.emitTargetBlocksChanged(target.id, ['deleteInput', { id: block.id, inputName: name }]);
								}
							}
						});
					}, 0);
				}
				Blockly.Events.setGroup(false);
			};
			blockDefinition.updateDisplay_ = function() {
				const wasRendered = this.rendered;
				this.rendered = false;
				const connectionMap = this.disconnectDynamicArgBlocks_();
				this.removeAllDynamicArgInputs_();
				this.createAllDynamicArgInputs_(connectionMap);
				this.deleteShadows_(connectionMap);
				this.rendered = wasRendered;
				if (wasRendered && !this.isInsertionMarker()) {
					this.initSvg();
					this.render();
				}
			};
			blockDefinition.disconnectDynamicArgBlocks_ = function() {
				const connectionMap = {};
				for (let i = 0; this.inputList[i]; i++) {
					const input = this.inputList[i];
					if (input.connection && /^DYNAMIC_ARGS\d+$/.test(input.name)) {
						const target = input.connection.targetBlock();
						const saveInfo = { shadow: input.connection.getShadowDom(), block: target };
						connectionMap[input.name] = saveInfo;
						input.connection.setShadowDom(null);
						if (target) { input.connection.disconnect(); }
					}
				}
				return connectionMap;
			};
			blockDefinition.removeAllDynamicArgInputs_ = function() {
				const inputList = [];
				for (let i = 0; this.inputList[i]; i++) {
					const input = this.inputList[i];
					if (/^DYNAMIC_ARGS\d+$/.test(input.name)) { input.dispose(); }
					else { inputList.push(input); }
				}
				this.inputList = inputList;
			};
			function updatePreText(block, num) {
				const { preText, afterArg, beforeArg } = block.dynamicArgInfo_;
				if (preText) {
					let txt = getValue(preText, num, '');
					let input;
					if (beforeArg) { return; }
					else if (afterArg) { input = block.inputList.find((i) => i.name === afterArg); }
					else { input = block.inputList.findLast((it) => it.name !== 'PLUS' && it.name !== 'MINUS' && it.name !== 'ENDTEXT'); }
					let field = input.fieldRow.findLast((it) => it instanceof Blockly.FieldLabel);
					field.setText(txt);
				}
			}
			blockDefinition.createAllDynamicArgInputs_ = function(connectionMap) {
				const num = this.dynamicArgumentTypes_.length;
				const { endText, joinCh, afterArg, beforeArg, preText } = this.dynamicArgInfo_;
				updatePreText(this, num);
				for (let i = 0; i < num; i++) {
					const argumentType = this.dynamicArgumentTypes_[i];
					const id = this.dynamicArgumentIds_[i];
					const input = this.appendValueInput(id);
					if (joinCh && (i !== 0 || afterArg)) {
						input.appendField(getValue(joinCh, i, ''));
					}
					if (beforeArg && i === 0) {
						input.appendField(getValue(joinCh, i, preText));
					}
					if (argumentType === 'b') { input.setCheck('Boolean'); }
					this.populateArgument_(argumentType, connectionMap, id, input, i);
				}
				let txt = getValue(endText, num, '');
				if (beforeArg && num === 0) txt = getValue(preText, num, '') + txt;
				if (txt === '') { this.removeInput('ENDTEXT', true); }
				else {
					const field = this.getField('ENDTEXT');
					if (field) field.setValue(txt);
					else this.appendDummyInput('ENDTEXT').appendField(txt, 'ENDTEXT');
				}
				if (afterArg) {
					moveButtonToTheRightPlace.call(this);
					const cnt = this.dynamicArgumentTypes_.length;
					for (let i = cnt - 1; i >= 0; i--) {
						const id = this.dynamicArgumentIds_[i];
						this.moveInputBefore(id, afterArg);
						this.moveInputBefore(afterArg, id);
					}
				} else if (beforeArg) {
					const cnt = this.dynamicArgumentTypes_.length;
					for (let i = 0; i < cnt; i++) {
						const id = this.dynamicArgumentIds_[i];
						this.moveInputBefore(id, beforeArg);
					}
					moveButtonToTheRightPlace.call(this);
				} else {
					moveButtonToTheRightPlace.call(this);
				}
			};
			blockDefinition.populateArgument_ = function(type, connectionMap, id, input, i) {
				let oldBlock = null;
				let oldShadow = null;
				if (connectionMap && id in connectionMap) {
					const saveInfo = connectionMap[id];
					oldBlock = saveInfo.block;
					oldShadow = saveInfo.shadow;
				}
				const getDefaultValue = (id, i) => {
					const { defaultValues, afterArg } = this.dynamicArgInfo_;
					const type = typeof defaultValues;
					if (type === 'function') return defaultValues(i, id);
					if (Array.isArray(defaultValues)) {
						const len = defaultValues.length;
						if (i <= len - 1) return defaultValues[i];
						return `${defaultValues[len - 1]}${i - len + 2}`;
					}
					if (defaultValues === '@PRE_ARG@') {
						let previousArgName = null;
						let previousArgValue = '';
						if (i > 0) { previousArgName = `DYNAMIC_ARGS${i}`; }
						else if (afterArg) { previousArgName = afterArg; }
						if (previousArgName) {
							const previousArgInput = this.getInput(previousArgName);
							if (previousArgInput && previousArgInput.connection) {
								const targetBlock = previousArgInput.connection.targetBlock();
								if (targetBlock && targetBlock.getFieldValue) {
									previousArgValue = targetBlock.getFieldValue('TEXT') || targetBlock.getFieldValue('NUM') || '';
								}
							}
						}
						return previousArgValue;
					}
					return defaultValues;
				};
				if (connectionMap && oldBlock) {
					connectionMap[input.name] = null;
					oldBlock.outputConnection.connect(input.connection);
					if (type !== 'b') {
						const shadowDom = oldShadow || this.buildShadowDom_(type);
						input.connection.setShadowDom(shadowDom);
					}
				} else {
					this.attachShadow_(input, type, getDefaultValue(id, i));
				}
			};
			blockDefinition.deleteShadows_ = Blockly.ScratchBlocks.ProcedureUtils.deleteShadows_;
			blockDefinition.buildShadowDom_ = Blockly.ScratchBlocks.ProcedureUtils.buildShadowDom_;
		}
		function proxyBlocklyBlocksObject(runtime) {
			const Blockly = getScratchBlocks(runtime);
			if (!Blockly) return;
			if (Blockly.Blocks.__proxied) return;
			Blockly.Blocks.__proxied = true;
			setLocales(Blockly);
			Blockly.Blocks = new Proxy(Blockly.Blocks, {
				set(target, opcode, blockDefinition) {
					if (Object.prototype.hasOwnProperty.call(enabledDynamicArgBlocksInfo, opcode)) {
						initExpandableBlock(runtime, blockDefinition, enabledDynamicArgBlocksInfo[opcode]);
					}
					return Reflect.set(target, opcode, blockDefinition);
				},
			});
		}
		function initExpandableBlocks(extension, plusImage = rightArrow, minusImage = leftArrow) {
			const { runtime } = extension;
			if (runtime.isPlayerOnly) return;
			const Blockly = getScratchBlocks(runtime);
			if (!Blockly) return;
			const { PlusSelectButton, PlusButton, MinusButton } = createButtons(Blockly, plusImage, minusImage);
			proxyBlocklyBlocksObject(runtime);
			if (extension.getInfo.__patched) return;
			const origGetInfo = extension.getInfo;
			extension.getInfo = function() {
				const info = origGetInfo.call(this);
				const { id, blocks: blocksInfo } = info;
				extInfo[id] = { id, PlusSelectButton, PlusButton, MinusButton };
				blocksInfo.forEach((i) => {
					const { dynamicArgsInfo } = i;
					if (dynamicArgsInfo) {
						dynamicArgsInfo.dynamicArgTypes = dynamicArgsInfo.dynamicArgTypes || ['s'];
						dynamicArgsInfo.extInfo = extInfo[id];
						enabledDynamicArgBlocksInfo[`${id}_${i.opcode}`] = dynamicArgsInfo;
					}
				});
				return info;
			};
			extension.getInfo.__patched = true;
		}
		function getDynamicArgs(args) {
			const res = [];
			for (let i = 1;; i++) {
				const v = args[`DYNAMIC_ARGS${i}`];
				if (v === undefined) return res;
				res.push(v);
			}
		}
		a = initExpandableBlocks;
		b = getDynamicArgs;
	}
	const initExpandableBlocks = a;
	const getDynamicArgs = b;



	const CodeType = {
		Important:"Important",
		Unimportant:"Unimportant"
	}


	const i18n = {
		"All": {
			"Name": {
				zh: "数学",
				en: "Mathmatics"
			},
			"ErrorPrefix": {
				zh: "【数学扩展 错误】 ",
				en: "【Math Extension Error】 "
			},
			"Setting": {
				zh: "⚙ 设置面板",
				en: "⚙ Setting"
			},
			"BlockClass": {
				zh: "积木分类",
				en: "Blocks Classifaction"
			},
			"BlockChange": {
				zh: "积木调整",
				en: "Change Blocks"
			},
			"OperatorChange": {
				zh: "运算调整",
				en: "Change Operator"
			},
			"Save": {
				zh: "✓ 保存设置",
				en: "✓ Save setting"
			},
			"Close": {
				zh: "取消",
				en: "Cencel"
			},
			"DynamicBlock": {
				zh: "可变参数积木",
				en: "Dynamic Arguments Blocks"
			},
			"ShowTagCount": {
				zh: "标题显示积木数量",
				en: "Show block count in titles"
			},
			"ShowUnimportantBlocks": {
				zh: "展示非重要积木",
				en: "Show unimportant blocks"
			},
			"CacheLargeOp": {
				zh: "为大型运算做缓存",
				en: "Cache large operations"
			},
			"InfinityGuard": {
				zh: "无穷精度保护",
				en: "Infinity precision guard"
			},
			"InfinityFallback": {
				zh: "无穷替换为",
				en: "Replace infinity with"
			},
			"ON": {
				zh: "开启",
				en: "Open"
			},
			"OFF": {
				zh: "关闭",
				en: "Close"
			},
			"Tip": {
				zh: "提示",
				en: "Tip"
			},
			"DecimalInput": {
				zh: "设置精度为",
				en: "Set decimal to"
			},
			"ErrorHandling": {
				zh: "运算出错的时候",
				en: "When operator have error"
			},
			"MenuReturnFalse": {
				zh: "返回 false",
				en: "Return false"
			},
			"MenuReturnJSError": {
				zh: "返回 JavaScript 错误",
				en: "Return JavaScript Error"
			},
			"MenuThrowError": {
				zh: "抛出错误",
				en: "Throw Error"
			},
			"MenuReturnError": {
				zh: "返回错误",
				en: "Return Error"
			},
			"ExtractTruth": {
				zh: "提取真值",
				en: "Extract Truth"
			},
			"ExtractTruthTip": {
				zh: "提取输入内容的真值（数值化）。数字原样返回，非数字返回 0。",
				en: "Extract the truth value of the input (numeric). Numbers are returned as-is; non-numbers return 0."
			},
			"FormatReturn": {
				zh: "格式化返回",
				en: "Format Return"
			},
			"FormatCondition": {
				zh: "格式化显示类型",
				en: "Format type"
			},
			"FormatConditionTip": {
				zh: "在返回值气泡中显示『类型』一栏。",
				en: "Show the 'type' row in the value bubble."
			},
			"FormatValue": {
				zh: "格式化显示值",
				en: "Format value"
			},
			"FormatValueTip": {
				zh: "在返回值气泡中显示『值』一栏。",
				en: "Show the 'value' row in the value bubble."
			},
			"FormatAttribute": {
				zh: "格式化显示属性",
				en: "Format attributes"
			},
			"FormatAttributeTip": {
				zh: "在返回值气泡中显示『符号 / 整数位 / 小数位 / 循环节』表格。",
				en: "Show the 'sign / integer / decimal / repetend' table in the value bubble."
			},
			"Sign": {
				zh: "符号",
				en: "Sign"
			},
			"IntPart": {
				zh: "整数位",
				en: "Integer part"
			},
			"FracPart": {
				zh: "小数位",
				en: "Decimal part"
			},
			"Repetend": {
				zh: "循环节",
				en: "Repetend"
			},
			"Type": {
				zh: "类型",
				en: "Type"
			},
			"Value": {
				zh: "值",
				en: "Value"
			},
			"Category": {
				zh: "分类",
				en: "Category"
			},
			"SmartPrecision": {
				zh: "智能精度补缺",
				en: "Smart precision snap"
			},
		},
		"Tags": {
			"All": {
				zh: "⚙️ 全局工具",
				en: "⚙️ Global Tools"
			},
			"SimpleOperator": {
				zh: "🛠️基础运算",
				en: "🛠️ Simple Operator"
			},
			"AdvancedOperator": {
				zh: "✨高级运算",
				en: "✨Advanced Operator"
			},
			"OtherOperator": {
				zh: "📚其他运算",
				en: "📚Other Operator"
			}
		},
		"TagTip": {
			"All": {
				zh: "全局积木，能够修改全局的运行",
				en: "Global blocks can modify global execution."
			},
			"SimpleOperator": {
				zh: "基本运算，包括加减乘除",
				en: "Basic operations, including addition, subtraction, multiplication, and division."
			},
			"AdvancedOperator": {
				zh: "高级运算，包括幂根对等",
				en: "Advanced operations, including powers, roots, and logarithms."
			},
			"Dynamic": {
				zh: "可变参数。turbowarp不支持，可以关闭节约",
				en: "Dynamic parameters. Not supported by TurboWarp; can be disabled to save resources."
			},
			"Unimportant": {
				zh: "不重要积木会占用积木栏",
				en: "Unimportant building blocks will occupy the building block bar."
			},
			'Count': {
				zh: "对每一个分类进行计数",
				en: "Count each block class."
			},
			"Cache": {
				zh: "缓存幂运算等大型计算的结果，相同输入直接复用，节省时间但占用内存。",
				en: "Cache results of power and other large operations; identical inputs reuse the cache, saving time at the cost of memory."
			},
			"InfinityGuard": {
				zh: "开启后，当精度被设为无穷大时，实际使用下面的数值作为精度，避免无限精度导致浏览器卡死。",
				en: "When on, if precision is set to infinity, the value below is used instead to avoid browser freeze."
			},
			"InfinityFallback": {
				zh: "无穷精度保护开启时，实际使用的精度值。默认 60。",
				en: "The precision actually used when the infinity guard is on. Default 60."
			},
			"FormatReturn": {
				zh: "开启后，返回值气泡按积木自身设置显示（类型/值 或 仅值）；关闭后统一只显示值。",
				en: "When on, value bubbles follow each block's own setting (typed/value or plain value); when off, all bubbles show plain value only."
			},
			"Category": {
				zh: "分类",
				en: "Category"
			},
			"FormatCategory": {
				zh: "格式化显示分类",
				en: "Format category"
			},
			"FormatCategoryTip": {
				zh: "在返回值气泡中显示『分类』一栏。",
				en: "Show the 'category' row in the value bubble."
			},
			"SmartPrecision": {
				zh: "开启后，当计算出现精度断层（如 0.4999...9、2.999...9）时，自动吸附到简单值（0.5、3）。关闭则保留原始残留值。",
				en: "When on, precision gaps like 0.4999...9 or 2.999...9 are snapped to simple values (0.5, 3). When off, raw residual values are kept."
			},
			"OtherOperator": {
				zh: "其他运算，包括取负等辅助运算",
				en: "Other operations, including negation and other auxiliary operations."
			},
		},
		"Blocks": {
			"HandleError": {
				zh: "当运算出错时[Menu]",
				en: "[menu] When operator have error"
			},
			"SetDecimal": {
				zh: "设置精度为[Decimal]",
				en: "Set decimal to [Decimal]"
			},
			"Decimal": {
				zh: "精度",
				en: "Precision"
			},
			"WhenError": {
				zh: "报错时会",
				en: "When error will"
			},
			"Add": {
				zh: "[Addend1] + [Addend2]",
				en: "[Addend1] + [Addend2]"
			},
			"Subtract": {
				zh: "[Minuend] - [Subtrahend]",
				en: "[Minuend] - [Subtrahend]"
			},
			"Multiply": {
				zh: "[Multiplier1] × [Multiplier2]",
				en: "[Multiplier1] × [Multiplier2]"
			},
			"Divide": {
				zh: "[Dividend] ÷ [Divisor]",
				en: "[Dividend] ÷ [Divisor]"
			},
			"Remainder": {
				zh: "[Dividend] ÷ [Divisor] 的余数",
				en: "[Dividend] ÷ [Divisor] remainder"
			},
			"Quotient": {
				zh: "[Dividend] ÷ [Divisor] 的商",
				en: "[Dividend] ÷ [Divisor] quotient"
			},
			"DivideWithPrecision": {
				zh: "[Dividend] ÷ [Divisor] 精度为 [Decimal]",
				en: "[Dividend] ÷ [Divisor] precision [Decimal]"
			},
			"DivBy": {
				zh: "[Dividend] 除 [Divisor]",
				en: "[Dividend] by [Divisor]"
			},
			"Div": {
				zh: "÷",
				en: "divide"
			},
			"Mod": {
				zh: "的余数",
				en: "remainder"
			},
			"Power": {
				zh: "[Base] ^ [Index]",
				en: "[Base] ^ [Index]"
			},
			"ExtractTruth": {
				zh: "提取真值 [VALUE]",
				en: "extract truth [VALUE]"
			},
			"Root": {
				zh: "[Index] √ [Radicand]",
				en: "[Index] √ [Radicand] "
			},
			"LocalScope": {
				zh: "数学局部域",
				en: "Math Local Scope"
			},
			"RootWithPrecision": {
				zh: "[Index] √ [Radicand] 精度为 [Decimal]",
				en: "[Index] √ [Radicand] precision [Decimal]"
			},
			"Logarithm": {
				zh: "log[Base] [Logarithm] ",
				en: "log[Base] [Logarithm] "
			},
			"LogarithmWithPrecision": {
				zh: "log[Base] [Logarithm] 精度为 [Decimal]",
				en: "log[Base] [Logarithm] precision [Decimal]"
			},
			"Logarithm2": {
				zh: "log[Base]( [Logarithm]",
				en: "log[Base]( [Logarithm]"
			},
			"Factorial": {
				zh: "( [Number] )!",
				en: "( [Number] )!"
			},
			"TrigonometricFunction": {
				zh: "[Func] ( [Number] ° )",
				en: "[Func] ( [Number] ° )"
			},
			"TrigFunc": {
				zh: "函数",
				en: "Func"
			},
			"InverseTrigonometricFunction": {
				zh: "[Func] ( [Number] )°",
				en: "[Func] ( [Number] )°"
			},
			"InvTrigFunc": {
				zh: "函数",
				en: "Func"
			},
			"Atan2": {
				zh: "atan2 x:[x] y:[y]",
				en: "atan2 x:[x] y:[y]"
			},
			"CalculateExpression": {
				zh: "计算 [Expression]",
				en: "calculate [Expression]"
			},
			"Expression": {
				zh: "表达式",
				en: "Expression"
			},
			"Summation": {
				zh: "( [Number] ) 的阶加",
				en: "triangular ( [Number] )"
			},
			"DoubleFactorial": {
				zh: "( [Number] )!!",
				en: "( [Number] )!!"
			},
			"Tetration": {
				zh: "[Base] ↑↑ [Index]",
				en: "[Base] ↑↑ [Index]"
			},
			"Negate": {
				zh: "- [Number]",
				en: "- [Number]"
			},
		},
		"Tooltip": {
			"Block": {
				zh: `勾选要显示的积木分区，取消勾选可隐藏。保存后自动刷新积木栏。`,
				en: `Check the building block categories to display; uncheck to hide. The building block panel will automatically refresh after saving.`
			},
			"ChangeDynamic": {
				zh: `控制可扩展积木（动态参数）的显示与行为。`,
				en: `Control the display and behavior of expandable blocks (dynamic parameters).`
			},
			"ChangeDecimal": {
				zh: `调整精度与错误处理方式，修改后立即生效。`,
				en: `Adjust the precision and error handling method; changes take effect immediately.`
			},
			"ChangeDecimal2": {
				zh: `设置精度为`,
				en: `Set decimal to `
			},
			"ChangeDecimal3": {
				zh: `控制计算结果保留的小数位数，默认 15 位。`,
				en: `Controls the number of decimal places retained in calculation results; the default is 15.`
			},
			"IfError": {
				zh: `选择计算出错时的反馈方式。`,
				en: `Select the feedback method when a calculation error occurs.`
			},
			"IfError2": {
				zh: `运算出错的时候`,
				en: `When error then`
			},
			"CacheLargeOp": {
				zh: `开启后，幂运算等大型计算会缓存结果，相同输入直接返回缓存，避免重复计算。默认关闭。`,
				en: `When enabled, large operations like power will cache results and return cached values for identical inputs. Default off.`
			},
			"SetDecimal": {
				zh: `
						【名字】设置精度
						【作用】设置除法等运算结果保留的小数位数。
						【参数】
						【Decimal】精度（小数位数）`,
				en: `
					【Name】Set decimal
					【Do】Set the number of decimal places retained in division and other operations.
					【Argument】
						【Decimal】Precision (decimal places)`
			},
			"HandleError": {
				zh: `
					【名字】当运算出错时
					【作用】设置运算出错时的处理方式。
					【参数】
						【Menu】出错时的处理方式（返回 false / 返回 JavaScript 错误 / 抛出错误 / 返回错误）`,
				en: `
					【Name】When operator have error
					【Do】Set how to handle errors during operations.
					【Argument】
						【Menu】Error handling mode (Return false / Return JavaScript Error / Throw Error / Return Error)`
			},
			"Decimal": {
				zh: `
					【名字】精度
					【作用】返回当前设置的运算精度（小数位数）。`,
				en: `
					【Name】Precision
					【Do】Returns the currently set operation precision (decimal places).`
			},
			"WhenError": {
				zh: `
					【名字】报错时会
					【作用】返回当前设置的出错处理方式。`,
				en: `【Name】When error will
					【Do】Returns the currently set error handling mode.`
			},
			"Add": {
				zh: `
					【名字】加法
					【作用】计算两个数的和。
					【参数】
						【Addend1】被加数
						【Addend2】加数`,
				en: `
					【Name】Addition
					【Do】Calculate the sum of two numbers.
					【Argument】
						【Addend1】First addend
						【Addend2】Second addend`
			},
			"Adds": {
				zh: `
					【名字】加法（可变参数）
					【作用】计算多个数的和，可通过 + 按钮增加参数。`,
				en: `
					【Name】Addition (dynamic arguments)
					【Do】Calculate the sum of multiple numbers; add arguments with the + button.`
			},
			"Subtract": {
				zh: `
					【名字】减法
					【作用】计算两个数的差。`,
				en: `
					【Name】Subtraction
					【Do】Calculate the difference of two numbers.`
			},
			"Subtracts": {
				zh: `
					【名字】减法（可变参数）
					【作用】依次计算多个数的差，可通过 + 按钮增加参数。`,
				en: `
					【Name】Subtraction (dynamic arguments)
					【Do】Subtract multiple numbers in order; add arguments with the + button.`
			},
			"Multiply": {
				zh: `
					【名字】乘法
					【作用】计算两个数的积。`,
				en: `
					【Name】Multiplication
					【Do】Calculate the product of two numbers.`
			},
			"Multiplies": {
				zh: `
					【名字】乘法（可变参数）
					【作用】计算多个数的积，可通过 + 按钮增加参数。`,
				en: `
					【Name】Multiplication (dynamic arguments)
					【Do】Calculate the product of multiple numbers; add arguments with the + button.`
			},
			"Divide": {
				zh: `
					【名字】除法
					【作用】计算两个数的商。`,
				en: `
					【Name】Division
					【Do】Calculate the quotient of two numbers.`
			},
			"Divides": {
				zh: `
					【名字】除法（可变参数）
					【作用】依次计算多个数的商，可通过 + 按钮增加参数。`,
				en: `
					【Name】Division (dynamic arguments)
					【Do】Divide multiple numbers in order; add arguments with the + button.`
			},
			"Remainder": {
				zh: `
					【名字】取余
					【作用】计算两个数相除的余数。`,
				en: `
					【Name】Remainder
					【Do】Calculate the remainder of two numbers.`
			},
			"Remainders": {
				zh: `
					【名字】取余（可变参数）
					【作用】依次计算多个数相除的余数，可通过 + 按钮增加参数。`,
				en: `
					【Name】Remainder (dynamic arguments)
					【Do】Calculate the remainder of multiple numbers in order; add arguments with the + button.`
			},
			"Quotient": {
				zh: `
					【名字】求商
					【作用】计算两个数相除的整数商。`,
				en: `
					【Name】Quotient
					【Do】Calculate the integer quotient of two numbers.`
			},
			"DivideWithPrecision": {
				zh: `
					【名字】指定精度除法
					【作用】按指定精度计算两个数的商。`,
				en: `
					【Name】Division with precision
					【Do】Calculate the quotient of two numbers with the specified precision.`
			},
			"DivBy": {
				zh: `
					【名字】除
					【作用】用第二个数除以第一个数（即 [Dividend] 除 [Divisor] 表示 [Divisor] ÷ [Dividend]）。`,
				en: `
					【Name】By
					【Do】Divide the second number by the first (i.e. [Dividend] by [Divisor] means [Divisor] ÷ [Dividend]).`
			},
			"Power": {
				zh: `
					【名字】幂运算
					【作用】计算 [Base] 的 [Index] 次方。`,
				en: `
					【Name】Power
					【Do】Calculate [Base] raised to the power of [Index].`
			},
			"Powers": {
				zh: `
					【名字】幂运算（可变参数）
					【作用】依次计算多个指数，可通过 + 按钮增加参数。`,
				en: `
					【Name】Power (dynamic arguments)
					【Do】Apply multiple exponents in order; add arguments with the + button.`
			},
			"ExtractTruth": {
				zh: `
					【名字】提取真值
					【作用】提取输入内容的真值（数值化）。数字原样返回，非数字返回 0。`,
				en: `
					【Name】Extract Truth
					【Do】Extract the truth value of the input (numeric). Numbers are returned as-is; non-numbers return 0.`
			},
			"Root": {
				zh: `
					【名字】计算几次根
					【作用】计算 [Radicand] 的 [Index] 次方根。
					【参数】
						【Index】根指数
						【Radicand】被开方数`,
				en: `
					【Name】Root
					【Do】Calculate the [Index]-th root of [Radicand].`
			},
			"Roots": {
				zh: `
					【名字】计算几次根（可变参数）
					【作用】依次进行多次开方，可通过 + 按钮增加参数。`,
				en: `
					【Name】Root (dynamic arguments)
					【Do】Apply roots in order; add arguments with the + button.`
			},
			"LocalScope": {
				zh: `
					【名字】数学局部域
					【作用】在此 C 型积木内部，全局设置类积木（设置精度 / 当运算出错时）只在本域内生效，离开后自动恢复原设置。`,
				en: `
					【Name】Math Local Scope
					【Do】Inside this C-block, global setting blocks (Set decimal / When operator have error) only take effect within the scope, and are restored automatically after leaving.`
			},
			"RootWithPrecision": {
				zh: `
					【名字】指定精度开方
					【作用】按指定精度计算 [Radicand] 的 [Index] 次方根。
					【参数】
						【Index】根指数
						【Radicand】被开方数
						【Decimal】精度（小数位数）`,
				en: `
					【Name】Root with precision
					【Do】Calculate the [Index]-th root of [Radicand] with the specified precision.
					【Argument】
						【Index】Root index
						【Radicand】Radicand
						【Decimal】Precision (decimal places)`
			},
			"Logarithm": {
				zh: `
					【名字】对数
					【作用】计算以 [Base] 为底 [Logarithm] 的对数，高精度计算。
					【参数】
						【Base】底数（> 0 且 ≠ 1）
						【Logarithm】真数（> 0）`,
				en: `
					【Name】Logarithm
					【Do】Calculate the logarithm of [Logarithm] with base [Base], high precision.
					【Argument】
						【Base】Base (> 0 and ≠ 1)
						【Logarithm】Argument (> 0)`
			},
			"LogarithmWithPrecision": {
				zh: `
					【名字】指定精度对数
					【作用】按指定精度计算以 [Base] 为底 [Logarithm] 的对数。
					【参数】
						【Base】底数（> 0 且 ≠ 1）
						【Logarithm】真数（> 0）
						【Decimal】精度（小数位数）`,
				en: `
					【Name】Logarithm with precision
					【Do】Calculate the logarithm of [Logarithm] with base [Base] at the specified precision.
					【Argument】
						【Base】Base (> 0 and ≠ 1)
						【Logarithm】Argument (> 0)
						【Decimal】Precision (decimal places)`
			},
			"Logarithms": {
				zh: `
					【名字】对数（可变参数·套娃版）
					【作用】在内层一层一层叠加对数，可通过 + 按钮增加嵌套层数。
					【参数】
						【Base】最外层底数
						【Logarithm】真数
						【后续】内层底数（可加多个）`,
				en: `
					【Name】Logarithm (dynamic arguments · nesting)
					【Do】Nest logarithms layer by layer; add layers with the + button.
					【Argument】
						【Base】Outermost base
						【Logarithm】Argument
						【More】Inner bases (add more)`
			},
			"Factorial": {
				zh: `
					【名字】阶乘
					【作用】计算 [Number] 的阶乘。正整数直接连乘（精确）；小数/非整数通过 Gamma 函数计算（高精度）。
					【参数】
						【Number】被求阶乘的数`,
				en: `
					【Name】Factorial
					【Do】Calculate the factorial of [Number]. Positive integers use exact repeated multiplication; decimals / non-integers use the Gamma function (high precision).
					【Argument】
						【Number】The number`
			},
			"TrigonometricFunction": {
			zh: `
				【名字】三角函数
				【作用】计算 [Number] 的三角函数值，支持 sin / cos / tan / cot / sec / csc。
				【参数】
					【Func】函数名（sin / cos / tan / cot / sec / csc）
					【Number】弧度`,
			en: `
				【Name】Trigonometric function
				【Do】Calculate the trigonometric value of [Number], supporting sin / cos / tan / cot / sec / csc.
				【Argument】
					【Func】Function name (sin / cos / tan / cot / sec / csc)
					【Number】Radian`
			},
			"InverseTrigonometricFunction": {
				zh: `
					【名字】反三角函数
					【作用】计算 [Number] 的反三角函数值，结果以角度（度）返回。
					【参数】
						【Func】函数名（asin / acos / atan / acot / asec / acsc）
						【Number】比值
					【定义域】
						asin / acos：-1 ≤ x ≤ 1
						atan / acot：全体实数
						asec / acsc：|x| ≥ 1`,
				en: `
					【Name】Inverse trigonometric function
					【Do】Calculate the inverse trigonometric value of [Number], returned in degrees.
					【Argument】
						【Func】Function name (asin / acos / atan / acot / asec / acsc)
						【Number】Ratio
					【Domain】
						asin / acos: -1 ≤ x ≤ 1
						atan / acot: all real numbers
						asec / acsc: |x| ≥ 1`
			},
			"Atan2": {
				zh: `
					【名字】atan2
					【作用】返回从正 x 轴到点 (x, y) 的方位角（角度制）。
					【参数】
						【x】横坐标
						【y】纵坐标
					【值域】(-180°, 180°]
					【定义域】x、y 不同时为 0`,
				en: `
					【Name】atan2
					【Do】Return the azimuth from the positive x-axis to the point (x, y), in degrees.
					【Argument】
						【x】X coordinate
						【y】Y coordinate
					【Range】(-180°, 180°]
					【Domain】x and y must not both be 0`
			},
			"CalculateExpression": {
				zh: `
					【名字】计算表达式
					【作用】对输入的数学表达式求值。
					【支持】
						常数：pi、e
						运算符：+ - * × / ÷ ^ √
						函数：sin cos tan cot sec csc
							asin acos atan acot asec acsc atan2
							abs ceil round floor
					【单位】三角函数与反三角函数均使用角度制`,
				en: `
					【Name】Calculate expression
					【Do】Evaluate the given mathematical expression.
					【Support】
						Constants: pi, e
						Operators: + - * × / ÷ ^ √
						Functions: sin cos tan cot sec csc
								asin acos atan acot asec acsc atan2
								abs ceil round floor
					【Unit】Trigonometric and inverse-trigonometric functions use degrees.`
			},
			"Summation": {
				zh: `
					【名字】阶加（三角数）
					【作用】计算 0 + 1 + 2 + ... + [Number]，支持小数。
					【参数】
						【Number】被求阶加的数
					【公式】T(n) = n(n+1)/2`,
				en: `
					【Name】Triangular number
					【Do】Calculate 0 + 1 + 2 + ... + [Number]; decimals supported.
					【Argument】
						【Number】The number
					【Formula】T(n) = n(n+1)/2`
			},
			"DoubleFactorial": {
				zh: `
					【名字】双阶乘
					【作用】计算 [Number] 的双阶乘。
					【参数】
						【Number】被求双阶乘的数
					【说明】
						偶数：n × (n-2) × (n-4) × ... × 2
						奇数：n × (n-2) × (n-4) × ... × 1
						0!! = 1，(-1)!! = 1
						负偶数无定义`,
				en: `
					【Name】Double factorial
					【Do】Calculate the double factorial of [Number].
					【Argument】
						【Number】The number
					【Note】
						Even: n × (n-2) × (n-4) × ... × 2
						Odd:  n × (n-2) × (n-4) × ... × 1
						0!! = 1, (-1)!! = 1
						Negative even numbers are undefined`
			},
			"Tetration": {
				zh: `
					【名字】重幂（超-4 运算）
					【作用】计算 [Base] 的 [Index] 层指数塔，从最深层向上右结合。
					【参数】
						【Base】底数
						【Index】层数（非负整数）
					【说明】
						a ↑↑ 0 = 1
						a ↑↑ 1 = a
						a ↑↑ 2 = a^a
						a ↑↑ 3 = a^(a^a)
						a ↑↑ n = a^(a ↑↑ (n-1))
					【注意】指数塔增长极快，Index 上限为 100，超出会报错。`,
				en: `
					【Name】Tetration (hyper-4)
					【Do】Calculate an [Index]-level power tower of [Base], right-associative.
					【Argument】
						【Base】Base
						【Index】Height (non-negative integer)
					【Note】
						a ↑↑ 0 = 1
						a ↑↑ 1 = a
						a ↑↑ 2 = a^a
						a ↑↑ 3 = a^(a^a)
						a ↑↑ n = a^(a ↑↑ (n-1))
					【Warning】Power towers grow extremely fast; Index is capped at 100.`
			},
			"Negate": {
				zh: `
					【名字】取负
					【作用】返回 [Number] 的相反数。
					【参数】
						【Number】原数`,
				en: `
					【Name】Negate
					【Do】Return the negation of [Number].
					【Argument】
						【Number】The number`
			},
		},
		"Errors": {
			"FailedExpand": {
				zh: "可扩展积木 加载失败",
				en: "initExpandableBlocks failed"
			},
			"InvalidNumber": {
				zh: "无效的数字: {value}",
				en: "Invalid number: {value}"
			},
			"OperatorError": {
				zh: "在 {value} 时出错",
				en: "{value} When {value}"
			},
			"DivideByZero": {
				zh: "除数为零没有意义",
				en: "Divisor is zero is meaningless"
			},
			"Add": {
				zh: "加法",
				en: "Addition"
			},
			"Subtract": {
				zh: "减法",
				en: "Subtraction"
			},
			"Multiply": {
				zh: "乘法",
				en: "Multiplication"
			},
			"Divide": {
				zh: "除法",
				en: "Division"
			},
			"Remainder": {
				zh: "取余",
				en: "Remainder"
			},
			"Quotient": {
				zh: "求商",
				en: "Quotient"
			},
			"Power": {
				zh: "幂运算",
				en: "Power"
			},
			"Root": {
				zh: "开方",
				en: "Root"
			},
			"Logarithm": {
				zh: "对数",
				en: "Logarithm"
			},
			"TrigonometricFunction": {
				zh: "三角函数",
				en: "Trigonometric function"
			},
			"Expression": {
				zh: "表达式",
				en: "Expression"
			},
			"Summation": {
				zh: "阶加",
				en: "Summation"
			},
			"DoubleFactorial": {
				zh: "双阶乘",
				en: "Double factorial"
			},
			"Tetration": {
				zh: "重幂",
				en: "Tetration"
			},
			"Negate": {
				zh: "取负",
				en: "Negate"
			},
			"UnknownMenu": {
				zh: "不存在的选项",
				en: "Unknown menu option"
			},
			"SetDecimalToInfinte": {
				zh: `
				将精度设为无穷大或许不是一个好事
				精度设为无穷大之后，所有的无限小数运算结果都将是无限精度的
				这可能会导致性能问题，甚至浏览器崩溃
				你确定要这么做吗？
				`,
				en: `
				Setting the precision to infinity may not be a good idea.
				After setting the precision to infinity, all results of infinitesimal operations will be of infinite precision.
				This may cause performance issues, and even crash the browser.
				Are you sure you want to do this?
				`
			},
			
			"TypeError": {
				zh: "错误",
				en: "Error"
			},
			"TypeNaN": {
				zh: "非数字",
				en: "Not a number"
			},
			"TypeReason": {
				zh: "原因",
				en: "Reason"
			},
		},
		"HandleErrorModeText": {
			"false": {
				zh: "返回 false",
				en: "Return false"
			},
			"jsError": {
				zh: "返回 JavaScript 错误",
				en: "Return JavaScript Error"
			},
			"throwError": {
				zh: "抛出错误",
				en: "Throw Error"
			},
			"returnError": {
				zh: "返回错误",
				en: "Return Error"
			}
		},
		"Menus": {
			"ReturnFalse": {
				zh: "返回 false",
				en: "Return false"
			},
			"ReturnJSError": {
				zh: "返回 JavaScript 错误",
				en: "Return JavaScript Error"
			},
			"ThrowError": {
				zh: "抛出错误",
				en: "Throw Error"
			},
			"ReturnError": {
				zh: "返回错误",
				en: "Return Error"
			}
		},
		"Type": {
			"Number": {
				zh: "数字",
				en: "Number"
			},
			"Integer": {
				zh: "整数",
				en: "Integer"
			},
			"Decimal": {
				zh: "小数",
				en: "Decimal"
			},
			"Irrational": {
				zh: "无理数",
				en: "Irrational Number"
			},
			"LoopDecimal": {
				zh: "循环小数",
				en: "Loop Decimal"
			}
		},
		"OperatorErrors": {
			"DivideByZeroError": {
				type: {
					zh: "错误",
					en: "Error"
				},
				cause: {
					zh: "除以零",
					en: "Divide by zero"
				},
				throw: {
					zh: "除法时使用0当除数",
					en: "Use 0 as divisor when dividing"
				}
			},
			"TwoZeroPowerError": {
				type: {
					zh: "错误",
					en: "Error"
				},
				cause: {
					zh: "零的零次幂",
					en: "Zero to the zeroth power"
				},
				throw: {
					zh: "幂运算时两个参数都为0",
					en: "Both arguments are 0 in power operation"
				}
			},
			"ZeroAndNegativePowerError": {
				type: {
					zh: "错误",
					en: "Error"
				},
				cause: {
					zh: "零的负数次幂",
					en: "Zero to a negative power"
				},
				throw: {
					zh: "幂运算时对0开负指数",
					en: "Negative exponent on 0 in power operation"
				}
			},
			"EvenRootHasNegativeError": {
				type: {
					zh: "错误",
					en: "Error"
				},
				cause: {
					zh: "偶次根下为负数",
					en: "Even root of a negative number"
				},
				throw: {
					zh: "偶次根时被开数为负数",
					en: "Radicand is negative for even root"
				}
			},
			"InvalidNumberError": {
				type: {
					zh: "非数字",
					en: "Not a number"
				},
				cause: {
					zh: "无效的数字",
					en: "Invalid number"
				},
				throw: {
					zh: "输入不是有效的数字",
					en: "Input is not a valid number"
				}
			},
			"UnknownOperatorError": {
				type: {
					zh: "错误",
					en: "Error"
				},
				cause: {
					zh: "未知运算错误",
					en: "Unknown operator error"
				},
				throw: {
					zh: "运算时发生未知错误",
					en: "Unknown error during operation"
				}
			},
			"InvalidLogBaseError": {
				type: {
					zh: "错误",
					en: "Error"
				},
				cause: {
					zh: "无效的底数",
					en: "Invalid logarithm base"
				},
				throw: {
					zh: "对数底数必须大于0且不等于1",
					en: "Logarithm base must be > 0 and ≠ 1"
				}
			}, 
			"InvalidLogArgumentError": {
				type: {
					zh: "错误",
					en: "Error"
				},
				cause: {
					zh: "无效的真数",
					en: "Invalid logarithm argument"
				},
				throw: {
					zh: "对数真数必须大于0",
					en: "Logarithm argument must be > 0"
				}
			},
			"TrigDomainError": {
				type: {
					zh: "错误",
					en: "Error"
				},
				cause: {
					zh: "三角函数无定义",
					en: "Trigonometric function undefined"
				},
				throw: {
					zh: "在三角函数【{func}】中使用【{value}】作为参数",
					en: "Using [{value}] as argument in trigonometric function [{func}]"
				}
			},
			"InverseTrigDomainError": {
				type:  { 
					zh: "错误", 
					en: "Error" 
				},
				cause: { 
					zh: "反三角函数无定义", 
					en: "Inverse trigonometric function undefined" 
				},
				throw: {
					zh: "在反三角函数【{func}】中使用【{value}】作为参数",
					en: "Using [{value}] as argument in inverse trigonometric function [{func}]"
				}
			},
			"ExpressionSyntaxError":{
				type:{
					zh: "错误",
					en: "Error"
				},
				cause:{
					zh: "表达式语法错误",
					en: "Expression syntax error"
				},
				throw:{
					zh: "表达式在【{value}】处语法错误",
					en: "Expression syntax error at [{value}]"
				}
			}, 
			"ExpressionUnknownSymbol":{
				type:{
					zh: "错误",
					en: "Error"
				},
				cause:{
					zh: "未知符号",
					en: "Unknown symbol"
				},
				throw:{
					zh: "表达式中存在未知符号【{value}】",
					en: "Unknown symbol [{value}] in expression"
				}
			}, 
			"ExpressionArgCountError":{
				type:{
					zh: "错误",
					en: "Error"
				},
				cause:{
					zh: "参数个数不匹配",
					en: "Argument count mismatch"
				},
				throw:{
					zh: "函数【{func}】需要 {expected} 个参数，实际传入 {got} 个",
					en: "Function [{func}] expects {expected} argument(s), got {got}"
				}
			},
			"TetrationOverflowError": {
				type: {
					zh: "错误",
					en: "Error"
				},
				cause: {
					zh: "重幂层数过大",
					en: "Tetration index too large"
				},
				throw: {
					zh: "重幂【{base}】↑↑【{index}】的层数超出上限（最大 {limit}）",
					en: "Tetration [{base}]↑↑[{index}] exceeds the height limit ({limit})"
				}
			},
			"TetrationInvalidIndexError": {
				type: {
					zh: "错误",
					en: "Error"
				},
				cause: {
					zh: "重幂层数无效",
					en: "Invalid tetration index"
				},
				throw: {
					zh: "重幂【{base}】↑↑【{index}】的层数必须是非负整数",
					en: "Tetration [{base}]↑↑[{index}] requires a non-negative integer index"
				}
			},
		},
	};
	const _flat = {};
	const _flatten = (prefix, obj) => {
		for (const key of Object.keys(obj)) {
			const value = obj[key];
			const id = prefix ? prefix + "." + key : key;
			if (value && typeof value === "object" && (value.zh !== undefined || value.en !== undefined)) {
				_flat[id] = value;
			} else if (value && typeof value === "object") {
				_flatten(id, value);
			}
		}
	};
	_flatten("", i18n);
	const _translations = { zh: {}, en: {} };
	for (const _id of Object.keys(_flat)) {
		const _v = _flat[_id];
		if (_v.zh !== undefined) _translations.zh[_id] = _v.zh;
		if (_v.en !== undefined) _translations.en[_id] = _v.en;
	}
	translate.setup(_translations);
	const _pick = (id) => {
		const v = _flat[id];
		if (v === undefined) return undefined;
		if (typeof v === "string") return v;
		if (v.zh !== undefined) return v.zh;
		if (v.en !== undefined) return v.en;
		return undefined;
	};
	const _t = (id, fallback) => {
		let v = _pick(id);
		if (v === undefined) {
			try { v = translate({ id: id }); } catch (e) { v = undefined; }
		}
		return (v === undefined || v === null) ? fallback : v;
	};
	const lang = (id) => _t("All." + id, id);
	const getText = (id) => _t("Blocks." + id, id);
	const getTips = (id) => _t("Tooltip." + id, id)
	const getError = (id) => _t("Errors." + id, id);
	const getMenu = (id) => _t("Menus." + id, id);
	const getTag = (id) => _t("Tags." + id, id);
	const getTagTip = (id) => _t("TagTip."+id,id);
	const getType = (id) => _t("Type." + id,id);
	const getErrorFromOp = (id) => _t("OperatorErrors." + id, id);

	function makeTag(text) {
		if (gandi) { return `---${getTag(text)}` }
		return { blockType: BlockType.LABEL, text: getTag(text) };
	}
	const Color = {
		Operator: { color1: "#62c22e", color2: "#4e9b25", color3: "#4e9b25" }
	}
	let Mathmatics = null;
	class MathError extends Error {
		constructor(errorId, params, message) {
			if (message === undefined || message === null) {
				const template = _flat["Errors." + errorId];
				let text = template ? (template.zh !== undefined ? template.zh : template.en) : errorId;
				if (params && typeof params === "object") {
					for (const key of Object.keys(params)) {
						const val = params[key];
						text = text.split("{" + key + "}").join(val === undefined || val === null ? "" : String(val));
					}
				}
				message = lang("ErrorPrefix") + text;
			}
			super(message);
			this.name = "MathError";
			this.errorId = errorId;
			
        	this.params = params || {};          // ★ 新增：保存参数
			this.opId = _normalizeOpErrorId(errorId);
		}
	}
	function _currentMode() { return Mathmatics ? Mathmatics.HandleErrorMode : "throwError"; }
	// ═══════════════════════════════════════════════════════════════
	//  ✦ 运算符错误归一化
	// ═══════════════════════════════════════════════════════════════
	const OP_ERROR_MAP = {
		DivideByZeroError: 'DivideByZeroError',
		TwoZeroPowerError: 'TwoZeroPowerError',
		ZeroAndNegativePowerError: 'ZeroAndNegativePowerError',
		EvenRootHasNegativeError: 'EvenRootHasNegativeError',
		InvalidNumberError: 'InvalidNumberError',
		UnknownOperatorError: 'UnknownOperatorError',
		InvalidLogBaseError: 'InvalidLogBaseError',
		InvalidLogArgumentError: 'InvalidLogArgumentError',
    	TrigDomainError: 'TrigDomainError',
		InverseTrigDomainError: 'InverseTrigDomainError',
		ExpressionSyntaxError: 'ExpressionSyntaxError',
		ExpressionUnknownSymbol: 'ExpressionUnknownSymbol',
		ExpressionArgCountError: 'ExpressionArgCountError',
		TetrationOverflowError: 'TetrationOverflowError',
		TetrationInvalidIndexError: 'TetrationInvalidIndexError',
		
	};

	/**
	 * 将内部错误 id 归一化为 OperatorErrors 的 id。
	 */
	function _normalizeOpErrorId(errorId) {
		if (!errorId) return 'UnknownOperatorError';
		if (OP_ERROR_MAP[errorId]) return OP_ERROR_MAP[errorId];
		const s = String(errorId);
		if (/divide.?by.?zero/i.test(s)) return 'DivideByZeroError';
		if (/two.?zero.?power/i.test(s)) return 'TwoZeroPowerError';
		if (/zero.?and.?negative.?power/i.test(s)) return 'ZeroAndNegativePowerError';
		if (/even.?root.?has.?negative/i.test(s)) return 'EvenRootHasNegativeError';
		if (/invalid.?number/i.test(s)) return 'InvalidNumberError';
		if (/invalid.?log.?base/i.test(s)) return 'InvalidLogBaseError';
		if (/invalid.?log.?arg/i.test(s)) return 'InvalidLogArgumentError';
		if (/trig.?domain/i.test(s)) return 'TrigDomainError';
		if (/inverse.?trig.?domain/i.test(s)) return 'InverseTrigDomainError';
		if (/expression.?syntax/i.test(s)) return 'ExpressionSyntaxError';
		if (/expression.?unknown/i.test(s)) return 'ExpressionUnknownSymbol';
		if (/expression.?arg/i.test(s)) return 'ExpressionArgCountError';
		if (/tetration.?overflow/i.test(s)) return 'TetrationOverflowError';
		if (/tetration.?invalid.?index/i.test(s)) return 'TetrationInvalidIndexError';
		return 'UnknownOperatorError';
	}

	/**
	 * 取 OperatorErrors 中的字段（type / cause / throw）。
	 */
	function _getOpErrorField(opId, field) {
		const v = _flat[`OperatorErrors.${opId}.${field}`];
		if (v && typeof v === 'object') {
			return v.zh !== undefined ? v.zh : (v.en !== undefined ? v.en : '');
		}
		return '';
	}

	/**
	 * 根据当前 HandleErrorMode，把“运算符类错误”格式化为统一结果。
	 *
	 * 返回：{ mode, type, cause, value, throwMessage, opId }
	 *  - mode: 'false' | 'jsError' | 'throwError' | 'returnError'
	 *  - type: 错误类型文案（如“错误”“非数字”“原因”）
	 *  - cause: 原因文案（如“除以零”）
	 *  - value: 返回给积木的值（false / NaN / 文本）
	 *  - throwMessage: 抛出时显示的完整消息
	 *  - opId: OperatorErrors 的 id
	 */
	function _normalizeOpError(errorId, bug = '', params = {}) {
		const opId = _normalizeOpErrorId(errorId);
		const mode = _currentMode();

		// 填充 params
		const causeRaw = _getOpErrorField(opId, 'cause');
		const throwRaw = _getOpErrorField(opId, 'throw');
		const typeRaw = _getOpErrorField(opId, 'type');

		const fill = (text) => {
			if (typeof text !== 'string') text = String(text);
			if (params && typeof params === 'object') {
				for (const key of Object.keys(params)) {
					const val = params[key];
					text = text.split('{' + key + '}').join(
						val === undefined || val === null ? '' : String(val)
					);
				}
			}
			return text;
		};

		const cause = fill(causeRaw);
		const throwText = fill(throwRaw);
		const type = fill(typeRaw);

		// 四种模式
		if (mode === 'false') {
			return {
				mode,
				type: getError('TypeError') || type,
				cause,
				value: false,
				throwMessage: lang('ErrorPrefix') + throwText,
				opId
			};
		}

		if (mode === 'jsError') {
			return {
				mode,
				type: getType('Irrational') === '' ? type : (getError('TypeNaN') || type),
				cause,
				value: 'NaN',
				throwMessage: lang('ErrorPrefix') + throwText,
				opId
			};
		}

		if (mode === 'throwError') {
			return {
				mode,
				type: getError('TypeReason') || type,   // “原因”
				cause,
				value: throwText,                       // “除法时使用0作为除数”
				throwMessage:
					lang('ErrorPrefix') + getError('OperatorError') + '\n' +
					lang('ErrorPrefix') + throwText,
				opId
			};
		}

		// returnError
		return {
			mode,
			type: getError('TypeError') || type,
			cause,
			value: lang('ErrorPrefix') + throwText,
			throwMessage: lang('ErrorPrefix') + throwText,
			opId
		};
	}

	function _handleError(errorId, bug = "", params = {}) {
		const mode = _currentMode();

		// 如果是“运算符类错误”，走归一化
		const opId = _normalizeOpErrorId(errorId);
		if (opId !== 'UnknownOperatorError' || /Error$/.test(String(errorId))) {
			const norm = _normalizeOpError(errorId, bug, params);
			if (mode === 'false') return false;
			if (mode === 'jsError') return 'NaN';
			if (mode === 'throwError') {
				Scratch.runtime.logSystem.error(norm.throwMessage);
				throw new MathError(errorId, params, norm.throwMessage);
			}
			if (mode === 'returnError') return norm.value;
			return false;
		}

		// 非运算符类错误，保持原逻辑
		let text = getError(errorId);
		if (typeof text !== "string") text = String(text);
		if (params && typeof params === "object") {
			for (const key of Object.keys(params)) {
				const val = params[key];
				text = text.split("{" + key + "}").join(val === undefined || val === null ? "" : String(val));
			}
		}
		const message = lang("ErrorPrefix") + text;
		if (mode === "false") { return false; }
		if (mode === "jsError") { return bug; }
		if (mode === "throwError") {
			Scratch.runtime.logSystem.error(message);
			throw new MathError(errorId, params, message);
		}
		if (mode === "returnError") { return message; }
		Scratch.runtime.logSystem.error(message);
		return false;
	}

	// ═══════════════════════════════════════════════════════════════
	//  ✦ 数据化面板：ComponentType / makePage / choose
	// ═══════════════════════════════════════════════════════════════
	const ComponentType = {
		Text: 'Text',
		Tip: 'Tip',
		Menu: 'Menu',
		Input: {
			Boolean: 'Input.Boolean',
			Number: 'Input.Number',
			Text: 'Input.Text',
		},
		If: {
			Text: 'If.Text',
			Boolean: 'If.Input.Boolean',
			Number: 'If.Input.Number',
			Menu: 'If.Menu',
		},
	};

	function makePage(title, columns, data, emoji) {
		return { title, columns, data, emoji };
	}

	/**
	 * 条件显示判定工厂。
	 * @param {number|string} index 该页面 data 的第几个元素（从 0 开始）
	 * @param {*} expected 期望的值
	 * @returns {(values:Object, page:Array) => boolean}
	 */
	function choose(index, expected) {
		const fn = function (values, page) {
			const i = Number(index);
			if (!Number.isInteger(i) || i < 0 || i >= page.length) return false;
			const targetRow = page[i];
			// 行可能是单组件对象，也可能是组件数组
			const target = Array.isArray(targetRow)
				? (targetRow.find(c => c && c.key) || targetRow[0])
				: targetRow;
			if (!target || !target.key) return false;
			return values[target.key] === expected;
		};
		fn.__index = Number(index);
		return fn;
	}

	// ── 数据化页面数据 ──
	const BlockClass = [
		[
			{ type: ComponentType.Text, content: getTag("All"), tip: getTagTip("All"), key: "showGlobalTools" },
			{ type: ComponentType.Input.Boolean, content: true, key: "showGlobalTools" }
		],
		[
			{ type: ComponentType.Text, content: getTag("SimpleOperator"), tip: getTagTip("SimpleOperator"), key: "showSimpleOperator" },
			{ type: ComponentType.Input.Boolean, content: true, key: "showSimpleOperator" }
		],
		[
			{ type: ComponentType.Text, content: getTag("AdvancedOperator"), tip: getTagTip("AdvancedOperator"), key: "showAdvancedOperator" },
			{ type: ComponentType.Input.Boolean, content: true, key: "showAdvancedOperator" }
		],
		[
			{ type: ComponentType.Text, content: getTag("OtherOperator"), tip: getTagTip("OtherOperator"), key: "showOtherOperator" },
			{ type: ComponentType.Input.Boolean, content: true, key: "showOtherOperator" }
		],
	];

	const BlockChange = [
		[
			{ type: ComponentType.Tip, content: getTips("ChangeDynamic") }
		],
		// 1
		[
			{ type: ComponentType.Text, content: lang("DynamicBlock"), tip: getTagTip("Dynamic"), key: "showDynamicBlocks" },
			{ type: ComponentType.Input.Boolean, content: true, key: "showDynamicBlocks" }
		],
		// 2
		[
			{ type: ComponentType.Text, content: lang("ShowTagCount"), tip: getTagTip("Count"), key: "showTagCount" },
			{ type: ComponentType.Input.Boolean, content: false, key: "showTagCount" }
		],
		// 3
		[
			{ type: ComponentType.Text, content: lang("ShowUnimportantBlocks"), tip: getTagTip("Unimportant"), key: "showUnimportantBlocks" },
			{ type: ComponentType.Input.Boolean, content: true, key: "showUnimportantBlocks" }
		],
		// 4
		[
			{ type: ComponentType.Text, content: lang("CacheLargeOp"), tip: getTagTip("Cache"), key: "cacheLargeOp" },
			{ type: ComponentType.Input.Boolean, content: false, key: "cacheLargeOp" }
		],
		// 5：格式化返回
		[
			{ type: ComponentType.Text, content: lang("FormatReturn"), tip: getTagTip("FormatReturn"), key: "formatReturn" },
			{ type: ComponentType.Input.Boolean, content: true, key: "formatReturn" }
		],
		// 6：格式化显示条件（依赖第 5 项 = true）
		[
			{
				type: ComponentType.If.Text,
				content: lang("FormatCondition"),
				tip: lang("FormatConditionTip"),
				key: "formatCondition",
				show: choose(5, true)
			},
			{
				type: ComponentType.If.Boolean,
				content: true,
				key: "formatCondition",
				show: choose(5, true)
			}
		],
		// 7：格式化显示值（依赖第 5 项 = true）
		[
			{
				type: ComponentType.If.Text,
				content: lang("FormatValue"),
				tip: lang("FormatValueTip"),
				key: "formatValue",
				show: choose(5, true)
			},
			{
				type: ComponentType.If.Boolean,
				content: true,
				key: "formatValue",
				show: choose(5, true)
			}
		],
		// 8：格式化显示分类（依赖第 5 项 = true，默认 OFF）
		[
			{
				type: ComponentType.If.Text,
				content: getTagTip("FormatCategory"),
				tip: getTagTip("FormatCategoryTip"),
				key: "formatCategory",
				show: choose(5, true)
			},
			{
				type: ComponentType.If.Boolean,
				content: false,
				key: "formatCategory",
				show: choose(5, true)
			}
		],
		// 9：格式化显示属性（依赖第 5 项 = true，默认 OFF）
		[
			{
				type: ComponentType.If.Text,
				content: lang("FormatAttribute"),
				tip: lang("FormatAttributeTip"),
				key: "formatAttribute",
				show: choose(5, true)
			},
			{
				type: ComponentType.If.Boolean,
				content: false,
				key: "formatAttribute",
				show: choose(5, true)
			}
		],
	];

	const OperatorChange = [
		[
			{ type: ComponentType.Tip, content: getTips("ChangeDecimal") }
		],
		[
			{ type: ComponentType.Text, content: getTips("ChangeDecimal2"), tip: getTips("ChangeDecimal3"), key: "decimalValue" },
			{ type: ComponentType.Input.Number, content: 15, key: "decimalValue" }
		],
		[
			{ type: ComponentType.Text, content: getTips("IfError2"), tip: getTips("IfError"), key: "errorHandling" },
			{
				type: ComponentType.Menu,
				key: "errorHandling",
				content: [
					{ text: getMenu("ReturnFalse"), value: "false" },
					{ text: getMenu("ReturnJSError"), value: "jsError" },
					{ text: getMenu("ThrowError"), value: "throwError" },
					{ text: getMenu("ReturnError"), value: "returnError" }
				]
			}
		],
		// 3：无穷精度保护（默认 ON）
		[
			{
				type: ComponentType.Text,
				content: lang("InfinityGuard"),
				tip: getTagTip("InfinityGuard"),
				key: "infinityGuard"
			},
			{
				type: ComponentType.Input.Boolean,
				content: true,
				key: "infinityGuard"
			}
		],
		// 4：无穷替换为（依赖第 3 项 = true）
		[
			{
				type: ComponentType.If.Text,
				content: lang("InfinityFallback"),
				tip: getTagTip("InfinityFallback"),
				key: "infinityFallback",
				show: choose(3, true)
			},
			{
				type: ComponentType.If.Number,
				content: 60,
				key: "infinityFallback",
				show: choose(3, true)
			}
		],
		// 5：智能精度补缺（默认 ON）
		[
			{
				type: ComponentType.Text,
				content: lang("SmartPrecision"),
				tip: getTagTip("SmartPrecision"),
				key: "smartPrecision"
			},
			{
				type: ComponentType.Input.Boolean,
				content: true,
				key: "smartPrecision"
			}
		],
	];

	// ═══════════════════════════════════════════════════════════════
	//  ✦ 数字分类常量
	// ═══════════════════════════════════════════════════════════════
	const NumCategory = {
		Integer: 'Integer',
		Decimal: 'Decimal',
		Irrational: 'Irrational',
		LoopDecimal: 'LoopDecimal',
	};

	const _CATEGORY_ORDER = [
		NumCategory.Integer,
		NumCategory.Decimal,
		NumCategory.LoopDecimal,
		NumCategory.Irrational,
	];

	function _combineCategory(t1, t2, resultValue) {
		const p = Decimal.parse(resultValue);
		if (p && p.frac === '') return NumCategory.Integer;
		const i1 = _CATEGORY_ORDER.indexOf(t1);
		const i2 = _CATEGORY_ORDER.indexOf(t2);
		return _CATEGORY_ORDER[Math.max(i1 < 0 ? 0 : i1, i2 < 0 ? 0 : i2)];
	}

	// ═══════════════════════════════════════════════════════════════
	//  ✦ Decimal —— 全字符串高精度运算（含根号）
	//  所有运算统一返回 { type, value }
	// ═══════════════════════════════════════════════════════════════
	// Stirling 级数系数：B_{2n} / (2n(2n-1))
	const STIRLING_COEF = [
		{ num: "1", den: "12" },
		{ num: "-1", den: "360" },
		{ num: "1", den: "1260" },
		{ num: "-1", den: "1680" },
		{ num: "1", den: "1188" },
		{ num: "-691", den: "360360" },
		{ num: "1", den: "156" },
		{ num: "-3617", den: "122400" },
		{ num: "43867", den: "244188" },
		{ num: "-174611", den: "125400" },
	];
	// Lanczos 近似系数（g=7, n=9），约 15 位精度
	const LANCZOS_G = 7;
	const LANCZOS_N = 9;
	const LANCZOS_COEF = [
		0.99999999999980993,
		676.5203681218851,
		-1259.1392167224028,
		771.32342877765313,
		-176.61502916214059,
		12.507343278686905,
		-0.13857109526572012,
		9.9843695780195716e-6,
		1.5056327351493116e-7
	];
	// g + 0.5，用于 t = z + LANCZOS_T
	const LANCZOS_T = LANCZOS_G + 0.5;
	class Decimal {
		constructor(value) {
			this.value = (value === undefined || value === null) ? "0" : String(value).trim();
			if (this.value === "") this.value = "0";
			
		}
		static _PI_CACHE = null;
		static _LN2PI_CACHE = null;

		static _res(type, value) {
			return { type, value };
		}

		/**
		 * 表达式结果归一化：
		 *  - 任意整数 + 全 9 小数 → 进位（29.999...9 → 30）
		 *  - 极小量 → 0
		 */
		static _normalizeSpecial(value, p) {
			if (value === null || value === undefined) return value;
			const pv = Decimal.parse(value);
			if (!pv) return value;
			// 任意整数 + 全 9 小数 → 进位
			if (/^9+$/.test(pv.frac)) {
				const inc = Decimal._addInt(pv.int, "1");
				return Decimal._format(pv.sign, inc, "");
			}
			// 极小量 → 0
			const tiny = Decimal._tinyStr(Math.max(1, p - 2));
			if (Decimal._decimalAbsCmp(value, tiny) < 0) return "0";
			return value;
		}

		static parse(value) {
			let s = (value === undefined || value === null) ? "0" : String(value).trim();
			if (s === "" || s === "undefined" || s === "null" || s === "NaN") s = "0";
			let sign = 1;
			if (s.startsWith("+")) { s = s.slice(1); }
			else if (s.startsWith("-")) { sign = -1; s = s.slice(1); }
			const dot = s.indexOf(".");
			let intPart = dot === -1 ? s : s.slice(0, dot);
			let fracPart = dot === -1 ? "" : s.slice(dot + 1);
			intPart = intPart.replace(/^0+/, "");
			if (intPart === "") intPart = "0";
			fracPart = fracPart.replace(/0+$/, "");
			if (!/^\d+$/.test(intPart) || (fracPart !== "" && !/^\d+$/.test(fracPart))) return null;
			if (intPart === "0" && fracPart === "") sign = 1;
			return { sign, int: intPart, frac: fracPart };
		}

		static inferCategory(value) {
			const p = Decimal.parse(value);
			if (!p) return NumCategory.Irrational;
			if (p.frac === '') return NumCategory.Integer;

			// ★ 检测循环节
			const frac = p.frac;
			for (let len = 1; len <= Math.floor(frac.length / 2); len++) {
				const unit = frac.slice(0, len);
				let ok = true;
				for (let i = 0; i < frac.length; i++) {
					if (frac[i] !== unit[i % len]) { ok = false; break; }
				}
				if (ok) return NumCategory.LoopDecimal;
			}

			// ★ 小数位达到精度上限，且不循环 → 视为无理数
			const precision = Mathmatics ? Number(Mathmatics.DecimalValue) : 15;
			if (Number.isFinite(precision) && p.frac.length >= precision) {
				return NumCategory.Irrational;
			}

			return NumCategory.Decimal;
		}

		static _addInt(a, b) {
			let i = a.length - 1, j = b.length - 1, carry = 0, result = "";
			while (i >= 0 || j >= 0 || carry > 0) {
				const da = i >= 0 ? a.charCodeAt(i) - 48 : 0;
				const db = j >= 0 ? b.charCodeAt(j) - 48 : 0;
				const sum = da + db + carry;
				result = String(sum % 10) + result;
				carry = sum >= 10 ? 1 : 0;
				i--; j--;
			}
			return result.replace(/^0+/, "") || "0";
		}
		static _subInt(a, b) {
			let i = a.length - 1, j = b.length - 1, borrow = 0, result = "";
			while (i >= 0) {
				let da = a.charCodeAt(i) - 48 - borrow;
				const db = j >= 0 ? b.charCodeAt(j) - 48 : 0;
				if (da < db) { da += 10; borrow = 1; } else { borrow = 0; }
				result = String(da - db) + result;
				i--; j--;
			}
			return result.replace(/^0+/, "") || "0";
		}
		static _cmpInt(a, b) {
			a = a.replace(/^0+/, "") || "0";
			b = b.replace(/^0+/, "") || "0";
			if (a.length !== b.length) return a.length > b.length ? 1 : -1;
			if (a === b) return 0;
			return a > b ? 1 : -1;
		}
		static _format(sign, intPart, fracPart) {
			intPart = intPart.replace(/^0+/, "") || "0";
			fracPart = fracPart.replace(/0+$/, "");
			if (intPart === "0" && fracPart === "") return "0";
			const body = fracPart === "" ? intPart : intPart + "." + fracPart;
			return (sign < 0 ? "-" : "") + body;
		}
		static _mulIntSmall(a, n) {
			if (n === 0) return "0";
			if (n === 1) return a;
			let carry = 0, result = "";
			for (let i = a.length - 1; i >= 0; i--) {
				const p = (a.charCodeAt(i) - 48) * n + carry;
				result = String(p % 10) + result;
				carry = Math.floor(p / 10);
			}
			while (carry > 0) {
				result = String(carry % 10) + result;
				carry = Math.floor(carry / 10);
			}
			return result.replace(/^0+/, "") || "0";
		}
		static _mulInt(a, b) {
			const la = a.length, lb = b.length;
			const result = new Array(la + lb).fill(0);
			for (let i = la - 1; i >= 0; i--) {
				const da = a.charCodeAt(i) - 48;
				for (let j = lb - 1; j >= 0; j--) {
					const db = b.charCodeAt(j) - 48;
					const p = da * db + result[i + j + 1];
					result[i + j + 1] = p % 10;
					result[i + j] += Math.floor(p / 10);
				}
			}
			return result.join("").replace(/^0+/, "") || "0";
		}
		static _divInt(a, b) {
			a = a.replace(/^0+/, "") || "0";
			b = b.replace(/^0+/, "") || "0";
			if (b === "0") return null;
			if (Decimal._cmpInt(a, b) < 0) return { q: "0", r: a };

			// b 的 0~9 倍表（避免每轮重算）
			const bMul = new Array(10);
			bMul[0] = "0";
			for (let i = 1; i <= 9; i++) bMul[i] = Decimal._mulIntSmall(b, i);

			// ★ 除数前两位（用于估商），除数只有 1 位时退化
			const bLen = b.length;
			const bLead = bLen >= 2
				? b.charCodeAt(0) * 10 + b.charCodeAt(1) - 528   // ('0'=48) → (c0-48)*10+(c1-48)
				: b.charCodeAt(0) - 48;

			let q = "";
			let rem = "0";

			for (let i = 0; i < a.length; i++) {
				// rem = rem*10 + a[i]
				rem = (rem === "0" ? "" : rem) + a[i];
				rem = rem.replace(/^0+/, "") || "0";

				let d = 0;
				if (Decimal._cmpInt(rem, b) >= 0) {
					// ★ 估商：取 rem 前两位 / b 前两位，向下取整
					const remLen = rem.length;
					const remLead = remLen >= 2
						? rem.charCodeAt(0) * 10 + rem.charCodeAt(1) - 528
						: rem.charCodeAt(0) - 48;

					d = Math.floor(remLead / bLead);
					if (d > 9) d = 9;
					if (d < 1) d = 1;

					// 修正：估高了往下退
					while (d > 0 && Decimal._cmpInt(rem, bMul[d]) < 0) d--;
					// 修正：估低了往上进（极少发生，最多 1~2 次）
					while (d < 9 && Decimal._cmpInt(rem, bMul[d + 1]) >= 0) d++;

					rem = Decimal._subInt(rem, bMul[d]);
				}
				q += String(d);
			}

			q = q.replace(/^0+/, "") || "0";
			return { q, r: rem };
		}

		static add(a, b) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) { return _handleError("OperatorError", "NaN", { value: getError("Add") }); }
			const fracLen = Math.max(pa.frac.length, pb.frac.length);
			const na = pa.int + pa.frac.padEnd(fracLen, "0");
			const nb = pb.int + pb.frac.padEnd(fracLen, "0");
			let digits, sign;
			if (pa.sign === pb.sign) { digits = Decimal._addInt(na, nb); sign = pa.sign; }
			else {
				const cmp = Decimal._cmpInt(na, nb);
				if (cmp === 0) return Decimal._res(NumCategory.Integer, "0");
				if (cmp > 0) { digits = Decimal._subInt(na, nb); sign = pa.sign; }
				else { digits = Decimal._subInt(nb, na); sign = pb.sign; }
			}
			digits = digits.padStart(fracLen + 1, "0");
			const intPart = digits.slice(0, digits.length - fracLen);
			const fracPart = digits.slice(digits.length - fracLen);
			const value = Decimal._format(sign, intPart, fracPart);
			const type = _combineCategory(
				Decimal.inferCategory(a), Decimal.inferCategory(b), value
			);
			return Decimal._res(type, value);
		}

		static subtract(a, b) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) { return _handleError("OperatorError", "NaN", { value: getError("Subtract") }); }
			const negB = { sign: -pb.sign, int: pb.int, frac: pb.frac };
			const fracLen = Math.max(pa.frac.length, negB.frac.length);
			const na = pa.int + pa.frac.padEnd(fracLen, "0");
			const nb = negB.int + negB.frac.padEnd(fracLen, "0");
			let digits, sign;
			if (pa.sign === negB.sign) { digits = Decimal._addInt(na, nb); sign = pa.sign; }
			else {
				const cmp = Decimal._cmpInt(na, nb);
				if (cmp === 0) return Decimal._res(NumCategory.Integer, "0");
				if (cmp > 0) { digits = Decimal._subInt(na, nb); sign = pa.sign; }
				else { digits = Decimal._subInt(nb, na); sign = negB.sign; }
			}
			digits = digits.padStart(fracLen + 1, "0");
			const intPart = digits.slice(0, digits.length - fracLen);
			const fracPart = digits.slice(digits.length - fracLen);
			const value = Decimal._format(sign, intPart, fracPart);
			const type = _combineCategory(
				Decimal.inferCategory(a), Decimal.inferCategory(b), value
			);
			return Decimal._res(type, value);
		}

		static multiply(a, b) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) { return _handleError("OperatorError", "NaN", { value: getError("Multiply") }); }
			const digits = Decimal._mulInt(pa.int + pa.frac, pb.int + pb.frac);
			const fracLen = pa.frac.length + pb.frac.length;
			const sign = pa.sign * pb.sign;
			let intPart, fracPart;
			if (fracLen === 0) { intPart = digits; fracPart = ""; }
			else {
				const padded = digits.padStart(fracLen + 1, "0");
				intPart = padded.slice(0, padded.length - fracLen);
				fracPart = padded.slice(padded.length - fracLen);
			}
			const value = Decimal._format(sign, intPart, fracPart);
			const type = _combineCategory(
				Decimal.inferCategory(a), Decimal.inferCategory(b), value
			);
			return Decimal._res(type, value);
		}

		static adds(...nums) {
			let acc = Decimal._res(NumCategory.Integer, "0");
			for (let i = 0; i < nums.length; i++) {
				const p = Decimal.parse(nums[i]);
				if (!p) return _handleError("OperatorError", "NaN", { value: getError("Adds") });
				acc = Decimal.add(acc.value, nums[i]);
				if (!acc || typeof acc.value !== "string") return acc;
			}
			return acc;
		}
		static subtracts(...nums) {
			if (nums.length === 0) return Decimal._res(NumCategory.Integer, "0");
			let acc = null;
			for (let i = 0; i < nums.length; i++) {
				const p = Decimal.parse(nums[i]);
				if (!p) return _handleError("OperatorError", "NaN", { value: getError("Subtracts") });
				acc = (acc === null) ? Decimal._res(Decimal.inferCategory(nums[i]), nums[i])
										: Decimal.subtract(acc.value, nums[i]);
				if (!acc || typeof acc.value !== "string") return acc;
			}
			return acc;
		}
		static multiplies(...nums) {
			let acc = Decimal._res(NumCategory.Integer, "1");
			for (let i = 0; i < nums.length; i++) {
				const p = Decimal.parse(nums[i]);
				if (!p) return _handleError("OperatorError", "NaN", { value: getError("Multiplies") });
				acc = Decimal.multiply(acc.value, nums[i]);
				if (!acc || typeof acc.value !== "string") return acc;
			}
			return acc;
		}
		static divides(...nums) {
			if (nums.length === 0) return Decimal._res(NumCategory.Integer, "0");
			let acc = null;
			for (let i = 0; i < nums.length; i++) {
				const p = Decimal.parse(nums[i]);
				if (!p) return _handleError("OperatorError", "NaN", { value: getError("Divides") });
				acc = (acc === null) ? Decimal._res(Decimal.inferCategory(nums[i]), nums[i])
										: Decimal.divide(acc.value, nums[i]);
				if (!acc || typeof acc.value !== "string") return acc;
			}
			return acc;
		}
		static remainders(...nums) {
			if (nums.length === 0) return Decimal._res(NumCategory.Integer, "0");
			let acc = null;
			for (let i = 0; i < nums.length; i++) {
				const p = Decimal.parse(nums[i]);
				if (!p) return _handleError("OperatorError", "NaN", { value: getError("Remainders") });
				acc = (acc === null) ? Decimal._res(Decimal.inferCategory(nums[i]), nums[i])
										: Decimal.remainder(acc.value, nums[i]);
				if (!acc || typeof acc.value !== "string") return acc;
			}
			return acc;
		}

		static remainder(a, b) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) { return _handleError("OperatorError", "NaN", { value: getError("Remainder") }); }
			if (pb.int === "0" && pb.frac === "") {
				throw new MathError("DivideByZeroError", {}, null);
			}
			const fa = pa.frac.length, fb = pb.frac.length;
			const faMax = Math.max(fa, fb);
			const A = pa.int + pa.frac + "0".repeat(faMax - fa);
			const B = pb.int + pb.frac + "0".repeat(faMax - fb);
			const d = Decimal._divInt(A, B);
			if (!d) return _handleError("OperatorError", "NaN", { value: getError("Remainder") });
			const scale = faMax - fb;
			let intPart, fracPart;
			const remDigits = d.r;
			if (scale <= 0) { intPart = remDigits + "0".repeat(-scale); fracPart = ""; }
			else {
				if (remDigits.length <= scale) { intPart = "0"; fracPart = remDigits.padStart(scale, "0"); }
				else { intPart = remDigits.slice(0, remDigits.length - scale); fracPart = remDigits.slice(remDigits.length - scale); }
			}
			const value = Decimal._format(pa.sign, intPart, fracPart);
			const p = Decimal.parse(value);
			const type = (p && p.frac === "") ? NumCategory.Integer : NumCategory.Decimal;
			return Decimal._res(type, value);
		}

		static quotient(a, b) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) { return _handleError("OperatorError", "NaN", { value: getError("Quotient") }); }
			if (pb.int === "0" && pb.frac === "") {
				throw new MathError("DivideByZeroError", {}, null);
			}
			const fa = pa.frac.length, fb = pb.frac.length;
			const faMax = Math.max(fa, fb);
			const A = pa.int + pa.frac + "0".repeat(faMax - fa);
			const B = pb.int + pb.frac + "0".repeat(faMax - fb);
			const d = Decimal._divInt(A, B);
			if (!d) return _handleError("OperatorError", "NaN", { value: getError("Quotient") });
			const scale = faMax - fb;
			let intPart, fracPart;
			const qDigits = d.q;
			if (scale <= 0) { intPart = qDigits + "0".repeat(-scale); fracPart = ""; }
			else {
				if (qDigits.length <= scale) { intPart = "0"; fracPart = qDigits.padStart(scale, "0"); }
				else { intPart = qDigits.slice(0, qDigits.length - scale); fracPart = qDigits.slice(qDigits.length - scale); }
			}
			const value = Decimal._format(pa.sign * pb.sign, intPart, fracPart);
			const p = Decimal.parse(value);
			const type = (p && p.frac === "") ? NumCategory.Integer : NumCategory.Decimal;
			return Decimal._res(type, value);
		}

		static divide(a, b) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) { return _handleError("OperatorError", "NaN", { value: getError("Divide") }); }
			if (pb.int === "0" && pb.frac === "") {
				throw new MathError("DivideByZeroError", {}, null);
			}

			// 精度
			let precision = Mathmatics ? Number(Mathmatics.DecimalValue) : 15;
			const infinitePrecision = (precision === Infinity);
			if (!infinitePrecision) {
				if (!Number.isFinite(precision) || precision < 0) precision = 15;
				precision = Math.floor(precision);
			}

			// 转整数
			const fa = pa.frac.length, fb = pb.frac.length;
			const A = (pa.int + pa.frac).replace(/^0+/, "") || "0";
			const B = (pb.int + pb.frac).replace(/^0+/, "") || "0";

			// 整数部分
			const intDiv = Decimal._divInt(A, B);
			if (!intDiv) { return _handleError("OperatorError", "NaN", { value: getError("Divide") }); }

			let quotientDigits = intDiv.q;
			let rem = intDiv.r;

			const netShift = fb - fa;
			let intPart, fracPart;
			if (netShift >= 0) {
				intPart = quotientDigits + "0".repeat(netShift);
				fracPart = "";
			} else {
				const shift = -netShift;
				if (quotientDigits.length <= shift) {
					const padded = quotientDigits.padStart(shift, "0");
					intPart = "0";
					fracPart = padded;
				} else {
					intPart = quotientDigits.slice(0, quotientDigits.length - shift);
					fracPart = quotientDigits.slice(quotientDigits.length - shift);
				}
			}

			// ★ 核心：is_repeat 标记 + 继续补位
			let is_repeat = false;
			const seenRems = new Set();
			let remaining = infinitePrecision ? Infinity : precision;

			while (remaining > 0) {
				// 除尽
				if (rem === "0") break;

				// 余数重复 → 标记循环，但 ★ 不 break，继续补位
				if (seenRems.has(rem)) {
					is_repeat = true;
				} else {
					seenRems.add(rem);
				}

				// rem 补 0 继续除
				let cur = (rem + "0").replace(/^0+/, "") || "0";
				const d = Decimal._divInt(cur, B);
				if (!d) break;

				fracPart += d.q;
				rem = d.r;
				remaining--;
			}

			const value = Decimal._format(pa.sign * pb.sign, intPart, fracPart);

			// ★ 分类
			let type;
			if (is_repeat) {
				type = NumCategory.LoopDecimal;
			} else if (rem === "0") {
				type = (fracPart === "") ? NumCategory.Integer : NumCategory.Decimal;
			} else {
				// 精度用完仍未除尽、也未见重复 → 有理数必为循环
				type = NumCategory.LoopDecimal;
			}
			return Decimal._res(type, value);
		}

		static divideWithPrecision(a, b, precision) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) { return _handleError("OperatorError", "NaN", { value: getError("Divide") }); }
			if (pb.int === "0" && pb.frac === "") {
				return _handleError("OperatorError", "NaN", { value: getError("DivideByZero") });
			}

			let p = Number(precision);
			const infinitePrecision = (p === Infinity);
			if (!infinitePrecision) {
				if (!Number.isFinite(p) || p < 0) p = 15;
				p = Math.floor(p);
			}

			// 统一把 A、B 当成整数，记录各自的小数位数
			const fa = pa.frac.length, fb = pb.frac.length;
			const A = (pa.int + pa.frac).replace(/^0+/, "") || "0";
			const B = (pb.int + pb.frac).replace(/^0+/, "") || "0";

			// ★ 关键：先补足够的零，让 A 的长度 >= B 的长度 + p
			//   这样 _divInt(A', B) 的商长度足够，直接就是最终商的数字
			const extra = infinitePrecision ? 60 : (p + Math.max(0, fb - fa) + 2);
			const A_shifted = A + "0".repeat(extra);

			// 用 A_shifted / B 得到「商」，其最后 extra 位就是小数部分
			const div = Decimal._divInt(A_shifted, B);
			if (!div) { return _handleError("OperatorError", "NaN", { value: getError("Divide") }); }

			// div.q 是商，div.r 是余数
			let qDigits = div.q;
			let rem = div.r;

			// 计算循环节标记
			let is_repeat = false;
			if (!Decimal._isZeroInt(rem)) {
				const seenRems = new Set();
				let tempRem = rem;
				const maxCheck = infinitePrecision ? 100 : p + 10;
				for (let i = 0; i < maxCheck; i++) {
					if (tempRem === "0") break;
					if (seenRems.has(tempRem)) { is_repeat = true; break; }
					seenRems.add(tempRem);
					const cur = (tempRem + "0").replace(/^0+/, "") || "0";
					const d = Decimal._divInt(cur, B);
					if (!d) break;
					tempRem = d.r;
				}
			}

			// qDigits 是 A_shifted / B 的整数商
			// 真实商 = (A / B) × 10^(fb - fa)
			// A_shifted / B = (A / B) × 10^extra
			// 所以真实商 = qDigits × 10^(fb - fa - extra)

			const totalShift = (fb - fa) - extra;   // 真实商需要移动的小数点位数

			// qDigits 是整数，现在按 totalShift 移位
			let intPart, fracPart;
			if (totalShift >= 0) {
				// 小数点右移
				intPart = qDigits + "0".repeat(totalShift);
				fracPart = "";
			} else {
				const shift = -totalShift;
				if (qDigits.length <= shift) {
					const padded = qDigits.padStart(shift + 1, "0");
					intPart = "0";
					fracPart = padded.slice(padded.length - shift);
				} else {
					intPart = qDigits.slice(0, qDigits.length - shift);
					fracPart = qDigits.slice(qDigits.length - shift);
				}
			}

			// 按 p 截断小数
			if (!infinitePrecision && fracPart.length > p) {
				fracPart = fracPart.slice(0, p);
			}

			const value = Decimal._format(pa.sign * pb.sign, intPart, fracPart);

			let type;
			if (is_repeat) {
				type = NumCategory.LoopDecimal;
			} else if (rem === "0") {
				type = (fracPart === "") ? NumCategory.Integer : NumCategory.Decimal;
			} else {
				type = NumCategory.LoopDecimal;
			}
			return Decimal._res(type, value);
		}

		static power(a, b) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);

			// Decimal.power
			if (pa.int === "0" && pa.frac === "") {
				if (pb.int === "0" && pb.frac === "") {
					throw new MathError("TwoZeroPowerError", {}, null);
				}
				if (pb.sign < 0) {
					throw new MathError("ZeroAndNegativePowerError", {}, null);
				}
				return Decimal._res(NumCategory.Integer, "0");
			}

			if (!pa || !pb) { return _handleError("OperatorError", "NaN", { value: getError("Power") }); }
			let precision = Mathmatics ? Number(Mathmatics.DecimalValue) : 15;
			const infinitePrecision = (precision === Infinity);
			if (!infinitePrecision) {
				if (!Number.isFinite(precision) || precision < 0) precision = 15;
				precision = Math.floor(precision);
			}
			if (pa.int === "0" && pa.frac === "") {
				if (pb.int === "0" && pb.frac === "") return Decimal._res(NumCategory.Integer, "1");
				if (pb.sign < 0) { return _handleError("OperatorError", "NaN", { value: getError("DivideByZero") }); }
				return Decimal._res(NumCategory.Integer, "0");
			}
			if (pb.int === "0" && pb.frac === "") return Decimal._res(NumCategory.Integer, "1");

			if (pb.frac === "") {
				const expAbs = pb.int;
				const baseAbs = Decimal._format(1, pa.int, pa.frac);
				const pAbs = Decimal.parse(baseAbs);
				const f = pAbs.frac.length;
				const baseInt = pAbs.int + pAbs.frac;
				const powInt = Decimal._powIntStr(baseInt, expAbs);
				const totalShift = Number(expAbs) * f;
				let result = Decimal._shiftDecimalPoint(powInt, -totalShift);
				if (pa.sign < 0) {
					const isExpEven = Decimal._isEvenInt(expAbs);
					if (!isExpEven) {
						const p = Decimal.parse(result);
						result = Decimal._format(-1, p.int, p.frac);
					}
				}
				let type = _combineCategory(
					Decimal.inferCategory(a), NumCategory.Integer, result
				);
				if (pb.sign < 0) {
					const divRes = Decimal.divide("1", result);
					if (!divRes || typeof divRes.value !== "string") return divRes;
					result = divRes.value;
					type = divRes.type;
				}
				if (!infinitePrecision) result = Decimal._truncateDecimal(result, precision);
				const pRes = Decimal.parse(result);
				if (pRes && pRes.frac === "") type = NumCategory.Integer;
				return Decimal._res(type, result);
			}

			let fracB = Decimal._fracFromDecimal(b);
			if (!fracB) { return _handleError("OperatorError", "NaN", { value: getError("Power") }); }
			let reduced = Decimal._reduceFrac(fracB.num, fracB.den);
			let num = reduced.num;
			let den = reduced.den;
			const expSign = pb.sign;
			const denNum = Number(den);
			if (denNum > 64) {
				const simple = Decimal._toSimpleFraction(b, 1000);
				if (simple) {
					const r2 = Decimal._reduceFrac(simple.num, simple.den);
					if (Number(r2.den) < denNum) { num = r2.num; den = r2.den; }
				}
			}
			const finalDenNum = Number(den);
			if (finalDenNum > 256) { return _handleError("OperatorError", "NaN", { value: getError("Power") }); }
			if (pa.sign < 0) {
				if (Decimal._isEvenInt(den)) { return _handleError("OperatorError", "NaN", { value: getError("Power") }); }
			}
			const baseAbs = Decimal._format(1, pa.int, pa.frac);
			const powed = Decimal.power(baseAbs, num);
			if (!powed || typeof powed.value !== "string") return powed;
			let result = Decimal._nthRootDecimal(powed.value, den, infinitePrecision ? 50 : precision);
			if (typeof result !== "string") { return _handleError("OperatorError", "NaN", { value: getError("Power") }); }
			if (pa.sign < 0) {
				if (!Decimal._isEvenInt(num)) {
					const p = Decimal.parse(result);
					result = Decimal._format(-1, p.int, p.frac);
				}
			}
			if (expSign < 0) {
				const divRes = Decimal.divide("1", result);
				if (!divRes || typeof divRes.value !== "string") return divRes;
				result = divRes.value;
			}
			if (!infinitePrecision) result = Decimal._truncateDecimal(result, precision);

			let type = NumCategory.Irrational;
			const pBack = Decimal.parse(result);
			if (pBack && pBack.frac === "") {
				type = NumCategory.Integer;
			}
			return Decimal._res(type, result);
		}

		static root(a, b) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) { return _handleError("OperatorError", "NaN", { value: getError("Root") }); }
			let precision = Mathmatics ? Number(Mathmatics.DecimalValue) : 15;
			const infinitePrecision = (precision === Infinity);
			if (!infinitePrecision) {
				if (!Number.isFinite(precision) || precision < 0) precision = 15;
				precision = Math.floor(precision);
			}
			if (pb.sign < 0 || pb.frac !== "") { return _handleError("OperatorError", "NaN", { value: getError("Root") }); }
			if (pb.int === "0") { return _handleError("OperatorError", "NaN", { value: getError("Root") }); }
			const n = Number(pb.int);
			if (!Number.isFinite(n) || n <= 0 || !Number.isInteger(n)) {
				return _handleError("OperatorError", "NaN", { value: getError("Root") });
			}
			if (pa.int === "0" && pa.frac === "") return Decimal._res(NumCategory.Integer, "0");

			const isPerfect = Decimal._isExactRoot(pa, n);

			let result;
			if (pa.sign < 0) {
				if (n % 2 === 0) { return _handleError("OperatorError", "NaN", { value: getError("Root") }); }
				const absA = Decimal._format(1, pa.int, pa.frac);
				result = Decimal._nthRootDecimal(absA, n, infinitePrecision ? 50 : precision);
				if (typeof result !== "string") { return _handleError("OperatorError", "NaN", { value: getError("Root") }); }
				const p = Decimal.parse(result);
				result = Decimal._format(-1, p.int, p.frac);
			} else {
				result = Decimal._nthRootDecimal(Decimal._format(1, pa.int, pa.frac), n, infinitePrecision ? 50 : precision);
				if (typeof result !== "string") { return _handleError("OperatorError", "NaN", { value: getError("Root") }); }
			}
			if (!infinitePrecision) result = Decimal._truncateDecimal(result, precision);

			let type;
			if (isPerfect) {
				const p = Decimal.parse(result);
				type = (p && p.frac === "") ? NumCategory.Integer : NumCategory.Decimal;
			} else {
				type = NumCategory.Irrational;
			}
			return Decimal._res(type, result);
		}

		static _isExactRoot(px, n) {
			if (px.frac === "") {
				const [, exact] = Decimal._nthRootInt(px.int, n);
				return exact;
			}
			const f = px.frac.length;
			const g = f % n;
			const padF = g === 0 ? 0 : (n - g);
			const X = px.int + px.frac + "0".repeat(padF);
			const [, exact] = Decimal._nthRootInt(X, n);
			return exact;
		}

		static roots(radicand, index, ...rest) {
			let acc = Decimal._res(Decimal.inferCategory(radicand), radicand);
			const list = [index, ...rest];
			for (let i = 0; i < list.length; i++) {
				const p = Decimal.parse(list[i]);
				if (!p) { return _handleError("OperatorError", "NaN", { value: getError("Root") }); }
				acc = Decimal.root(acc.value, list[i]);
				if (!acc || typeof acc.value !== "string") return acc;
			}
			return acc;
		}

		static _isZeroInt(s) { return !s || /^0+$/.test(s); }
		static _divIntBy2(a) {
			a = a.replace(/^0+/, "") || "0";
			if (a === "0") return ["0", 0];
			let q = "";
			let rem = 0;
			for (let i = 0; i < a.length; i++) {
				const cur = rem * 10 + (a.charCodeAt(i) - 48);
				q += String(Math.floor(cur / 2));
				rem = cur % 2;
			}
			return [q.replace(/^0+/, "") || "0", rem];
		}
		static _powIntStr(base, exp) {
			let result = "1";
			let b = base.replace(/^0+/, "") || "0";
			let e = exp.replace(/^0+/, "") || "0";
			if (b === "0") return "0";
			if (b === "1") return "1";
			if (e === "0") return "1";
			while (!Decimal._isZeroInt(e)) {
				const lastDigit = e.charCodeAt(e.length - 1) - 48;
				if (lastDigit % 2 === 1) result = Decimal._mulInt(result, b);
				e = Decimal._divInt(e, "2").q;
				if (!Decimal._isZeroInt(e)) b = Decimal._mulInt(b, b);
			}
			return result;
			
		}
		static _nthRootInt(x, n) {
			x = x.replace(/^0+/, "") || "0";
			if (x === "0") return ["0", true, "0"];
			if (n === 1) return [x, true, "0"];
			const nStr = String(n);
			const pad = (n - (x.length % n)) % n;
			const padded = "0".repeat(pad) + x;
			const groups = [];
			for (let i = 0; i < padded.length; i += n) {
				groups.push(padded.slice(i, i + n));
			}
			let root = "0";
			for (let gi = 0; gi < groups.length; gi++) {
				const prefix = padded.slice(0, (gi + 1) * n);
				let d = 0;
				for (let cand = 9; cand >= 0; cand--) {
					const y = Decimal._addInt(Decimal._mulInt(root, "10"), String(cand));
					if (Decimal._cmpInt(Decimal._powIntStr(y, nStr), prefix) <= 0) { d = cand; break; }
				}
				root = Decimal._addInt(Decimal._mulInt(root, "10"), String(d));
			}
			const rootPow = Decimal._powIntStr(root, nStr);
			const exact = Decimal._cmpInt(rootPow, x) === 0;
			const remFinal = exact ? "0" : Decimal._subInt(x, rootPow);
			return [root, exact, remFinal];
		}
		static _nthRootDecimal(x, n, precision) {
			const px = Decimal.parse(x);
			if (!px) return null;
			if (px.int === "0" && px.frac === "") return "0";
			const nInt = Number(n);
			let p = precision;
			if (!Number.isFinite(p)) p = 50;
			p = Math.floor(p);
			const f = px.frac.length;
			const g = f % nInt;
			const padF = g === 0 ? 0 : (nInt - g);
			const f2 = f + padF;
			const X = px.int + px.frac + "0".repeat(padF);
			const extra = p + 1;
			const bigX = X + "0".repeat(nInt * extra);
			const [root] = Decimal._nthRootInt(bigX, nInt);
			const totalShift = extra + f2 / nInt;
			return Decimal._shiftDecimalPoint(root, -totalShift);
		}
		static _shiftDecimalPoint(intStr, shift) {
			intStr = intStr.replace(/^0+/, "") || "0";
			if (shift >= 0) { return intStr + "0".repeat(shift); }
			const s = -shift;
			if (intStr.length <= s) {
				const padded = intStr.padStart(s + 1, "0");
				const intPart = padded.slice(0, padded.length - s);
				const fracPart = padded.slice(padded.length - s);
				return Decimal._format(1, intPart, fracPart);
			}
			const intPart = intStr.slice(0, intStr.length - s);
			const fracPart = intStr.slice(intStr.length - s);
			return Decimal._format(1, intPart, fracPart);
		}
		static _truncateDecimal(s, precision) {
			if (precision === Infinity) return s;
			const p = Decimal.parse(s);
			if (!p) return s;
			if (p.frac.length <= precision) return s;
			const intPart = p.int;
			const fracPart = p.frac.slice(0, precision);
			return Decimal._format(p.sign, intPart, fracPart);
		}
		static _fracFromDecimal(s) {
			const p = Decimal.parse(s);
			if (!p) return null;
			const frac = p.frac;
			if (frac === "") return { num: p.int, den: "1" };
			const num = (p.int + frac).replace(/^0+/, "") || "0";
			const den = "1" + "0".repeat(frac.length);
			return { num, den };
		}
		static _gcdInt(a, b) {
			a = a.replace(/^0+/, "") || "0";
			b = b.replace(/^0+/, "") || "0";
			while (b !== "0") {
				const r = Decimal._divInt(a, b).r;
				a = b;
				b = r;
			}
			return a;
		}
		static _reduceFrac(num, den) {
			num = num.replace(/^0+/, "") || "0";
			den = den.replace(/^0+/, "") || "1";
			if (num === "0") return { num: "0", den: "1" };
			const g = Decimal._gcdInt(num, den);
			if (g === "1" || g === "0") return { num, den };
			return { num: Decimal._divInt(num, g).q, den: Decimal._divInt(den, g).q };
		}
		static _isEvenInt(s) {
			s = s.replace(/^0+/, "") || "0";
			return (s.charCodeAt(s.length - 1) - 48) % 2 === 0;
		}
		static _toSimpleFraction(s, maxDen = 1000) {
			const p = Decimal.parse(s);
			if (!p) return null;
			if (p.frac === "") return { num: p.int, den: "1" };
			const x = parseFloat(s);
			if (!Number.isFinite(x)) return null;
			let sign = x < 0 ? -1 : 1;
			let v = Math.abs(x);
			let h1 = 1, h0 = 0, k1 = 0, k0 = 1;
			let b = v;
			const eps = 1e-12;
			for (let i = 0; i < 30; i++) {
				const a = Math.floor(b);
				const h2 = a * h1 + h0;
				const k2 = a * k1 + k0;
				if (k2 > maxDen) break;
				h0 = h1; h1 = h2;
				k0 = k1; k1 = k2;
				const frac = b - a;
				if (frac < eps) break;
				b = 1 / frac;
			}
			if (k1 === 0) return null;
			const approx = h1 / k1;
			if (Math.abs(approx - v) > 1e-9) { return null; }
			return { num: String(sign * h1), den: String(k1) };
		}
		static rootWithPrecision(a, b, precision) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) {
				return _handleError("OperatorError", "NaN", { value: getError("Root") });
			}

			// 用传入的 precision，而不是全局 DecimalValue
			let p = Number(precision);
			const infinitePrecision = (p === Infinity);
			if (!infinitePrecision) {
				if (!Number.isFinite(p) || p < 0) p = 15;
				p = Math.floor(p);
			}

			if (pb.sign < 0 || pb.frac !== "") {
				return _handleError("OperatorError", "NaN", { value: getError("Root") });
			}
			if (pb.int === "0") {
				return _handleError("OperatorError", "NaN", { value: getError("Root") });
			}
			const n = Number(pb.int);
			if (!Number.isFinite(n) || n <= 0 || !Number.isInteger(n)) {
				return _handleError("OperatorError", "NaN", { value: getError("Root") });
			}
			if (pa.int === "0" && pa.frac === "") {
				return Decimal._res(NumCategory.Integer, "0");
			}

			const isPerfect = Decimal._isExactRoot(pa, n);

			let result;
			if (pa.sign < 0) {
				if (n % 2 === 0) {
					return _handleError("OperatorError", "NaN", { value: getError("Root") });
				}
				const absA = Decimal._format(1, pa.int, pa.frac);
				result = Decimal._nthRootDecimal(absA, n, infinitePrecision ? 50 : p);
				if (typeof result !== "string") {
					return _handleError("OperatorError", "NaN", { value: getError("Root") });
				}
				const pr = Decimal.parse(result);
				result = Decimal._format(-1, pr.int, pr.frac);
			} else {
				result = Decimal._nthRootDecimal(
					Decimal._format(1, pa.int, pa.frac), n,
					infinitePrecision ? 50 : p
				);
				if (typeof result !== "string") {
					return _handleError("OperatorError", "NaN", { value: getError("Root") });
				}
			}

			if (!infinitePrecision) result = Decimal._truncateDecimal(result, p);

			let type;
			if (isPerfect) {
				const pr = Decimal.parse(result);
				type = (pr && pr.frac === "") ? NumCategory.Integer : NumCategory.Decimal;
			} else {
				type = NumCategory.Irrational;
			}
			return Decimal._res(type, result);
		}
		
		static _tinyStr(n) {
			// 返回 "0." + "0"*(n-1) + "1"，表示 10^(-n)
			if (n <= 0) return "1";
			return "0." + "0".repeat(n - 1) + "1";
		}

		// ═══════════════════════════════════════════════════════════
		//  ✦ 对数：手搓 ln，纯字符串高精度
		// ═══════════════════════════════════════════════════════════
		static _LN2_CACHE = null;  // 缓存 ln(2)

		/**
		 * 计算 ln(x)，用 atanh 级数 + 缩放
		 * @param {string} x  正数
		 * @param {number} precision 精度
		 * @returns {string} ln(x)
		 */
		static _lnString(x, precision) {
			const px = Decimal.parse(x);
			if (!px) return null;
			if (px.sign < 0 || (px.int === "0" && px.frac === "")) return null;

			let p = precision;
			if (!Number.isFinite(p)) p = 50;
			p = Math.floor(p);
			const workPrec = p + 5;
			const MAX = workPrec + 10;  // 截断阈值

			let value = x;
			let k = 0;
			const TWO = "2";

			let safety = 0;
			while (Decimal._cmpDecimal(value, "2") >= 0) {
				value = Decimal.divideWithPrecision(value, TWO, workPrec).value;
				k++;
				if (++safety > 20000) break;
			}
			safety = 0;
			while (Decimal._cmpDecimal(value, "1") < 0) {
				value = Decimal.multiply(value, TWO).value;
				k--;
				if (++safety > 20000) break;
			}

			const num = Decimal.subtract(value, "1").value;
			const den = Decimal.add(value, "1").value;
			let t = Decimal.divideWithPrecision(num, den, workPrec + 3).value;
			t = Decimal._truncateDecimal(t, MAX);  // ⭐ 截断 t

			let t2 = Decimal.multiply(t, t).value;
			t2 = Decimal._truncateDecimal(t2, MAX);  // ⭐ 截断 t2！

			let term = t;
			let sum = t;
			let n = 1;

			const tinyThreshold = Decimal._tinyStr(workPrec + 3);
			const maxIter = Math.min(workPrec * 2, 200);

			for (let i = 0; i < maxIter; i++) {
				term = Decimal.multiply(term, t2).value;
				term = Decimal._truncateDecimal(term, MAX);  // ⭐ 每轮截断！防止爆炸！
				n += 2;
				const add = Decimal.divideWithPrecision(term, String(n), workPrec + 3).value;
				if (Decimal._isZeroDecimal(add) ||
					Decimal._decimalAbsCmp(add, tinyThreshold) < 0) {
					break;
				}
				sum = Decimal.add(sum, add).value;
				sum = Decimal._truncateDecimal(sum, MAX);  // ⭐ 截断 sum
			}

			let lnValue = Decimal.multiply(sum, "2").value;
			lnValue = Decimal._truncateDecimal(lnValue, MAX);

			if (k !== 0) {
				const ln2 = Decimal._getLn2(workPrec);
				const kLn2 = Decimal.multiply(String(k), ln2).value;
				lnValue = Decimal.add(lnValue, kLn2).value;
			}

			return Decimal._truncateDecimal(lnValue, p);
		}

		/**
		 * 计算 ln(2)，带缓存
		 */
		static _getLn2(precision) {
			// 简单缓存：只缓存第一个（通常精度一致的）调用
			// 实际可以用 Map 按精度缓存，但这里简化
			if (Decimal._LN2_CACHE !== null && Decimal._LN2_CACHE.precision >= precision) {
				return Decimal._truncateDecimal(Decimal._LN2_CACHE.value, precision);
			}
			// ln(2) = ln(1.25) + ln(1.6) 之类…但简单起见直接用 x=2
			// 注意：这里递归调用 _lnString(2)，但 x=2 会被缩放到 1
			// 2 / 2 = 1，k=1，value=1，t=0，级数=0，lnValue=0，加 k·ln(2)…会死循环！
			// 
			// 解决：直接算 ln(1.25) + ln(1.6) = ln(2)
			// 或者用 x=1.6，让缩放把 1.6 归 1 附近…
			//
			// 更简单的办法：用已知的 atanh 级数直接算 ln(2)
			// ln(2) = 2 * atanh(1/3) = 2 * (1/3 + 1/(3·3³) + 1/(5·3⁵) + ...)
			//        = 2 * Σ_{n=0}^∞ 1/((2n+1) · 3^(2n+1))
			
			const workPrec = precision + 10;
			const three = "3";
			let term = Decimal.divideWithPrecision("1", three, workPrec + 5).value;  // 1/3
			let sum = term;
			const nine = "9";
			let n = 1;
			const maxIter = workPrec + 50;
			for (let i = 0; i < maxIter; i++) {
				// term /= 9
				term = Decimal.divideWithPrecision(term, nine, workPrec + 5).value;
				n += 2;
				const add = Decimal.divideWithPrecision(term, String(n), workPrec + 5).value;
				const tinyThreshold = Decimal._tinyStr(workPrec + 5);
				if (Decimal._isZeroDecimal(add) || Decimal._decimalAbsCmp(add, tinyThreshold) < 0) {
					break;
				}
				sum = Decimal.add(sum, add).value;
			}
			const ln2 = Decimal.multiply(sum, "2").value;
			const result = Decimal._truncateDecimal(ln2, precision);
			Decimal._LN2_CACHE = { value: result, precision };
			return result;
		}

		/**
		 * 把泰勒级数 / 除法残留的极小误差吸附到"简单值"。
		 *  - x.999...9  → x+1
		 *  - x.4999...9 → x.5
		 *  - x.5000...0 → x.5
		 *  - 极小量     → 0
		 *
		 * 由 Mathmatics._settings.smartPrecision 控制，默认 ON。
		 */
		static _snapToSimple(value, p) {
			if (value === null || value === undefined) return value;

			// ★ 智能精度补缺关闭时，直接返回原值
			if (Mathmatics && Mathmatics._settings && Mathmatics._settings.smartPrecision === false) {
				return value;
			}

			const pv = Decimal.parse(value);
			if (!pv) return value;

			const frac = pv.frac;
			const prec = Math.max(1, Math.min(p, 20));

			// ① 任意整数 + 全 9 小数 → 进位（2.999...9 → 3）
			if (/^9+$/.test(frac)) {
				const inc = Decimal._addInt(pv.int, "1");
				return Decimal._format(pv.sign, inc, "");
			}

			// ② 4 后面跟一串 9 → 进位到 5（0.4999...9 → 0.5）
			if (frac.length >= prec && /^4[9]+$/.test(frac)) {
				return Decimal._format(pv.sign, pv.int, "5");
			}

			// ③ 5 后面跟一串 0 → 截断为 5（0.5000...0 → 0.5）
			if (frac.length >= prec && /^5[0]+$/.test(frac)) {
				return Decimal._format(pv.sign, pv.int, "5");
			}

			return value;
		}


		// ═══════════════════════════════════════════════════════════
		//  ✦ 高精度 π（Machin 公式，带缓存）
		// ═══════════════════════════════════════════════════════════
		static _PI_CACHE = null;

		// ═══════════════════════════════════════════════════════════
		//  ✦ 高精度 π（Machin 公式，带缓存）
		//  π/4 = 4·arctan(1/5) − arctan(1/239)
		// ═══════════════════════════════════════════════════════════
		static getPi(precision) {
			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);
			if (Decimal._PI_CACHE !== null && Decimal._PI_CACHE.precision >= p) {
				return Decimal._truncateDecimal(Decimal._PI_CACHE.value, p);
			}
			const workPrec = p + 10;

			// arctan(1/x) = 1/x - 1/(3x³) + 1/(5x⁵) - ...
			// 用字符串除法算，确保精度足够
			const arctanInv = (xStr) => {
				let sum = "0";
				let term = Decimal.divideWithPrecision("1", xStr, workPrec + 5).value;
				let x2 = Decimal.multiply(xStr, xStr).value;
				let n = 1;
				const tiny = Decimal._tinyStr(workPrec + 3);
				const maxIter = workPrec * 2 + 50;
				for (let i = 0; i < maxIter; i++) {
					const add = Decimal.divideWithPrecision(term, String(n), workPrec + 3).value;
					if (Decimal._isZeroDecimal(add) || Decimal._decimalAbsCmp(add, tiny) < 0) break;
					// 符号交替
					if (i % 2 === 0) sum = Decimal.add(sum, add).value;
					else             sum = Decimal.subtract(sum, add).value;
					sum = Decimal._truncateDecimal(sum, workPrec + 3);
					term = Decimal.divideWithPrecision(term, x2, workPrec + 3).value;
					term = Decimal._truncateDecimal(term, workPrec + 3);
					n += 2;
				}
				return sum;
			};

			// π/4 = 4·arctan(1/5) − arctan(1/239)
			const a = arctanInv("5");
			const b = arctanInv("239");
			const fourA = Decimal.multiply("4", a).value;
			const piOver4 = Decimal.subtract(fourA, b).value;
			const pi = Decimal.multiply("4", piOver4).value;

			const result = Decimal._truncateDecimal(pi, p);
			Decimal._PI_CACHE = { value: result, precision: p };
			return result;
		}

		// ═══════════════════════════════════════════════════════════
		//  ✦ 高精度 sin（泰勒级数 + 范围归约）
		// ═══════════════════════════════════════════════════════════
		/**
		 * sin(x)，x 为弧度字符串。
		 * 步骤：
		 *   1. 归约到 [-π, π]：x = x - 2π·round(x / 2π)
		 *   2. 归约到 [-π/2, π/2]：利用 sin(π - x) = sin(x)
		 *   3. 泰勒级数：sin(x) = x - x³/3! + x⁵/5! - ...
		 * 每轮 truncate 防爆炸。
		 */
		static sin(x, precision) {
			const px = Decimal.parse(x);
			if (!px) return null;
			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);
			const workPrec = p + 5;

			// 零
			if (px.int === "0" && px.frac === "") return "0";

			const pi = Decimal.getPi(workPrec);
			const twoPi = Decimal.multiply(pi, "2").value;
			const piHalf = Decimal.divideWithPrecision(pi, "2", workPrec).value;

			// 归约到 [-π, π]
			let xr = x;
			const xNum = parseFloat(x);
			if (Number.isFinite(xNum)) {
				const k = Math.round(xNum / (2 * Math.PI));
				if (k !== 0) {
					xr = Decimal.subtract(x, Decimal.multiply(String(k), twoPi).value).value;
				}
			}

			// 归约到 [-π/2, π/2]：若 |x| > π/2，用 sin(π - x)
			let negate = false;
			if (Decimal._cmpDecimal(xr, piHalf) > 0) {
				xr = Decimal.subtract(pi, xr).value;
			} else {
				const negPiHalf = "-" + piHalf;
				if (Decimal._cmpDecimal(xr, negPiHalf) < 0) {
					// xr < -π/2 → sin(x) = -sin(x + π)
					xr = Decimal.add(xr, pi).value;
					negate = true;
				}
			}

			// 泰勒级数
			let x2 = Decimal.multiply(xr, xr).value;
			x2 = Decimal._truncateDecimal(x2, workPrec + 2);  // ← 防止爆炸

			let term = xr;
			let sum = xr;
			const tiny = Decimal._tinyStr(workPrec);
			const maxIter = workPrec * 2 + 10;

			for (let n = 1; n < maxIter; n++) {
				// term *= -x² / ((2n)(2n+1))
				term = Decimal.multiply(term, x2).value;
				term = Decimal._truncateDecimal(term, workPrec + 5);
				term = Decimal._negate(term);   // ★ 每轮都取负
				const denom = Decimal.multiply(String(2 * n), String(2 * n + 1)).value;
				term = Decimal.divideWithPrecision(term, denom, workPrec).value;
				term = Decimal._truncateDecimal(term, workPrec + 5);

				if (Decimal._isZeroDecimal(term) || Decimal._decimalAbsCmp(term, tiny) < 0) break;
				sum = Decimal.add(sum, term).value;
				sum = Decimal._truncateDecimal(sum, workPrec + 5);
			}
			if (negate) sum = Decimal._negate(sum);

			// ★ 吸附到简单值（0.4999...9 → 0.5，0.999...9 → 1）
			sum = Decimal._snapToSimple(sum, p);

			return Decimal._truncateDecimal(sum, p);

		}

		// 取负
		static _negate(s) {
			const p = Decimal.parse(s);
			if (!p) return s;
			if (p.int === "0" && p.frac === "") return "0";
			return Decimal._format(-p.sign, p.int, p.frac);
		}

		
		static _toRad(degStr, workPrec) {
			const pi = Decimal.getPi(workPrec);
			if (pi === null) return null;
			const rad = Decimal.multiply(degStr, pi).value;
			return Decimal.divideWithPrecision(rad, "180", workPrec).value;
		}

		static _needArgs(args, n, name) {
			if (args.length !== n) {
				throw new MathError("ExpressionArgCountError", {
					func: name, expected: n, got: args.length
				}, null);
			}
		}

		// ═══════════════════════════════════════════════════════════
		//  ✦ 高精度 exp（泰勒级数 + 2^k 缩放）
		// ═══════════════════════════════════════════════════════════
		/**
		 * e^x，纯字符串高精度。用浮点求 k = floor(x / ln2)。
		 * 每轮 truncate 防爆炸。
		 */
		static exp(x, precision) {
			const px = Decimal.parse(x);
			if (!px) return null;
			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);
			const workPrec = p + 5;

			if (px.int === "0" && px.frac === "") return "1";

			const isNeg = px.sign < 0;
			const xAbs = isNeg ? Decimal._format(1, px.int, px.frac) : x;

			// k = floor(x / ln2)，用浮点
			const xNum = parseFloat(xAbs);
			let k = Number.isFinite(xNum) ? Math.floor(xNum / Math.LN2) : 0;
			if (!Number.isFinite(k)) k = 0;

			// r = x - k·ln2
			const ln2 = Math.LN2.toFixed(15);
			let r = xAbs;
			if (k !== 0) {
				r = Decimal.subtract(xAbs, Decimal.multiply(String(k), ln2).value).value;
			}
			// |r| < ln2/2 ≈ 0.347

			// e^r 泰勒
			let term = "1";
			let sum = "1";
			const tiny = Decimal._tinyStr(workPrec);
			const maxIter = workPrec * 2 + 20;

			for (let n = 1; n < maxIter; n++) {
				term = Decimal.multiply(term, r).value;
				term = Decimal._truncateDecimal(term, workPrec + 5);
				term = Decimal.divideWithPrecision(term, String(n), workPrec).value;
				term = Decimal._truncateDecimal(term, workPrec + 5);
				if (Decimal._isZeroDecimal(term) || Decimal._decimalAbsCmp(term, tiny) < 0) break;
				sum = Decimal.add(sum, term).value;
				sum = Decimal._truncateDecimal(sum, workPrec + 5);
			}

			// ×2^k
			let result = sum;
			if (k > 0) {
				const pow2 = Decimal._powIntStr("2", String(k));
				result = Decimal.multiply(result, pow2).value;
			} else if (k < 0) {
				const pow2 = Decimal._powIntStr("2", String(-k));
				result = Decimal.divideWithPrecision(result, pow2, workPrec).value;
			}

			if (isNeg) {
				result = Decimal.divideWithPrecision("1", result, workPrec).value;
			}
			return Decimal._truncateDecimal(result, p);
		}

		// ═══════════════════════════════════════════════════════════
		//  ✦ logGamma（Lanczos 近似，浮点 + 高精度 mix）
		// ═══════════════════════════════════════════════════════════
		/**
		 * ln Γ(z)，Lanczos 近似。
		 * 精度约 15 位（浮点），最后按 precision 截断。
		 */
		static logGamma(z, precision) {
			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);

			const zNum = parseFloat(z);
			if (!Number.isFinite(zNum)) return null;
			if (zNum <= 0 && Number.isInteger(zNum)) return null;  // 极点

			// 用浮点 Lanczos 算
			let result;
			if (zNum < 0.5) {
				// Γ(z)Γ(1-z) = π / sin(πz)
				// ln Γ(z) = ln π - ln sin(πz) - ln Γ(1-z)
				const sinPiZ = Decimal.sin(
					Decimal.multiply(String(zNum), Decimal.getPi(15)).value,
					15
				);
				if (!sinPiZ || Decimal._isZeroDecimal(sinPiZ)) return null;
				const lnSin = Math.log(Math.abs(parseFloat(sinPiZ)));
				const lnPi = Math.log(Math.PI);
				const lnG1z = Decimal._logGammaFloat(1 - zNum);
				result = lnPi - lnSin - lnG1z;
			} else {
				result = Decimal._logGammaFloat(zNum);
			}
			if (!Number.isFinite(result)) return null;
			return Decimal._truncateDecimal(result.toFixed(p + 5), p);
		}

		/**
		 * Lanczos 浮点版 ln Γ(z)，z ≥ 0.5。
		 */
		static _logGammaFloat(z) {
			z -= 1;
			let x = LANCZOS_COEF[0];
			for (let i = 1; i < LANCZOS_COEF.length; i++) {
				x += LANCZOS_COEF[i] / (z + i);
			}
			const t = z + LANCZOS_T;
			return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
		}

		// ═══════════════════════════════════════════════════════════
		//  ✦ Gamma / Factorial
		// ═══════════════════════════════════════════════════════════
		/**
		 * Γ(z)，高精度。
		 */
		static gamma(z, precision) {
			const lnG = Decimal.logGamma(z, precision);
			if (lnG === null) return null;
			return Decimal.exp(lnG, precision);
		}

		/**
		 * 阶乘 x!。
		 *  - 非负整数 → 精确连乘
		 *  - 其他 → Γ(x+1)
		 *  - 负整数 → null
		 */
		static factorial(x, precision) {
			const px = Decimal.parse(x);
			if (!px) return null;

			// 负整数：极点
			if (px.sign < 0 && px.frac === "") return null;

			// 非负整数（含 0）
			if (px.frac === "" && px.sign >= 0) {
				const n = parseInt(px.int, 10);
				if (!Number.isFinite(n) || n < 0) return null;
				if (n === 0 || n === 1) return "1";
				let result = "1";
				for (let i = 2; i <= n; i++) {
					result = Decimal.multiply(result, String(i)).value;
				}
				return result;
			}

			// 非整数 / 负非整数 → Γ(x+1)
			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);
			const arg = Decimal.add(x, "1").value;

			// ★ 自检：打印每一步
			if (typeof console !== 'undefined') {
				console.log('[Factorial] x =', x, 'arg =', arg);
			}
			const lnG = Decimal.logGamma(arg, p);
			if (typeof console !== 'undefined') {
				console.log('[Factorial] lnG =', lnG);
			}
			if (lnG === null) return null;
			const g = Decimal.exp(lnG, p);
			if (typeof console !== 'undefined') {
				console.log('[Factorial] result =', g);
			}
			return g;
		}

		/**
		 * 比较两个十进制数的大小
		 * 返回 -1 / 0 / 1
		 */
		static _cmpDecimal(a, b) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) return 0;
			// 符号不同
			if (pa.sign !== pb.sign) return pa.sign > pb.sign ? 1 : -1;
			// 同号：比较绝对值
			const cmpAbs = Decimal._cmpAbs(pa, pb);
			return pa.sign > 0 ? cmpAbs : -cmpAbs;
		}

		static _cmpAbs(pa, pb) {
			// 整数部分
			const iCmp = Decimal._cmpInt(pa.int, pb.int);
			if (iCmp !== 0) return iCmp;
			// 小数部分：补齐到相同长度再比
			const len = Math.max(pa.frac.length, pb.frac.length);
			const fa = pa.frac.padEnd(len, "0");
			const fb = pb.frac.padEnd(len, "0");
			if (fa === fb) return 0;
			return fa > fb ? 1 : -1;
		}

		/**
		 * 判断一个十进制字符串是否为零
		 */
		static _isZeroDecimal(s) {
			const p = Decimal.parse(s);
			if (!p) return false;
			return p.int === "0" && p.frac === "";
		}

		/**
		 * 比较十进制绝对值与 10^(-n) 之类的小量
		 * 这里简化为：判断 |a| 是否小于 b（b 是正数）
		 */
		static _decimalAbsCmp(a, b) {
			const pa = Decimal.parse(a);
			const pb = Decimal.parse(b);
			if (!pa || !pb) return 0;
			const absA = { sign: 1, int: pa.int, frac: pa.frac };
			const absB = { sign: 1, int: pb.int, frac: pb.frac };
			return Decimal._cmpAbs(absA, absB);
		}

		/**
		 * 对数：log_base(x)
		 * @param {string} base  底数
		 * @param {string} x     真数
		 * @param {number} precision 精度
		 */
		static logarithm(base, x, precision) {
			const pb = Decimal.parse(base);
			const px = Decimal.parse(x);
			if (!pb || !px) {
				return _handleError("OperatorError", "NaN", { value: getError("Logarithm") });
			}

			// ── 检查底数 ──
			if (pb.sign < 0 || (pb.int === "0" && pb.frac === "")) {
				throw new MathError("InvalidLogBaseError", {}, null);
			}
			if (pb.int === "1" && pb.frac === "") {
				throw new MathError("InvalidLogBaseError", {}, null);
			}

			// ── 检查真数 ──
			if (px.sign < 0 || (px.int === "0" && px.frac === "")) {
				throw new MathError("InvalidLogArgumentError", {}, null);
			}

			let p = Number(precision);
			const infinitePrecision = (p === Infinity);
			if (!infinitePrecision) {
				if (!Number.isFinite(p) || p < 0) p = 15;
				p = Math.floor(p);
			}
			const workPrec = infinitePrecision ? 50 : (p + 5);

			// ── 特判 ──
			// log_base(1) = 0
			if (px.int === "1" && px.frac === "") {
				return Decimal._res(NumCategory.Integer, "0");
			}
			// log_base(base) = 1
			if (base === x || Decimal._cmpDecimal(base, x) === 0) {
				return Decimal._res(NumCategory.Integer, "1");
			}

			// ── 计算 ln ──
			const lnBase = Decimal._lnString(base, workPrec);
			const lnX = Decimal._lnString(x, workPrec);
			if (lnBase === null || lnX === null) {
				return _handleError("OperatorError", "NaN", { value: getError("Logarithm") });
			}

			// ── 相除 ──
			const result = Decimal.divideWithPrecision(lnX, lnBase, infinitePrecision ? Infinity : p);
			if (!result || typeof result.value !== "string") {
				return _handleError("OperatorError", "NaN", { value: getError("Logarithm") });
			}

			// ── 分类 ──
			// 有理数：结果是整数 / 有限小数
			// 其他：无理数（大部分对数都是无理数）
			const pRes = Decimal.parse(result.value);
			let type;
			if (pRes && pRes.frac === "") {
				type = NumCategory.Integer;
			} else if (pRes && pRes.frac.length >= p && !Decimal._isRepeatFrac(pRes.frac)) {
				type = NumCategory.Irrational;
			} else if (pRes && Decimal._isRepeatFrac(pRes.frac)) {
				type = NumCategory.LoopDecimal;
			} else {
				type = NumCategory.Decimal;
			}

			return Decimal._res(type, result.value);
		}

		/**
		 * 检测小数部分是否是循环小数
		 */
		static _isRepeatFrac(frac) {
			for (let len = 1; len <= Math.floor(frac.length / 2); len++) {
				const unit = frac.slice(0, len);
				let ok = true;
				for (let i = 0; i < frac.length; i++) {
					if (frac[i] !== unit[i % len]) { ok = false; break; }
				}
				if (ok) return true;
			}
			return false;
		}
		/**
		 * 指定精度对数：log_base(x)，用传入的 precision
		 */
		static logarithmWithPrecision(base, x, precision) {
			const pb = Decimal.parse(base);
			const px = Decimal.parse(x);
			if (!pb || !px) {
				return _handleError("OperatorError", "NaN", { value: getError("Logarithm") });
			}

			// ── 检查底数 ──
			if (pb.sign < 0 || (pb.int === "0" && pb.frac === "")) {
				throw new MathError("InvalidLogBaseError", {}, null);
			}
			if (pb.int === "1" && pb.frac === "") {
				throw new MathError("InvalidLogBaseError", {}, null);
			}

			// ── 检查真数 ──
			if (px.sign < 0 || (px.int === "0" && px.frac === "")) {
				throw new MathError("InvalidLogArgumentError", {}, null);
			}

			// ⭐ 用传入的 precision，而不是全局 DecimalValue
			let p = Number(precision);
			const infinitePrecision = (p === Infinity);
			if (!infinitePrecision) {
				if (!Number.isFinite(p) || p < 0) p = 15;
				p = Math.floor(p);
			}
			const workPrec = infinitePrecision ? 50 : (p + 5);

			// ── 特判 ──
			if (px.int === "1" && px.frac === "") {
				return Decimal._res(NumCategory.Integer, "0");
			}
			if (base === x || Decimal._cmpDecimal(base, x) === 0) {
				return Decimal._res(NumCategory.Integer, "1");
			}

			// ── 计算 ln ──
			const lnBase = Decimal._lnString(base, workPrec);
			const lnX = Decimal._lnString(x, workPrec);
			if (lnBase === null || lnX === null) {
				return _handleError("OperatorError", "NaN", { value: getError("Logarithm") });
			}

			// ── 相除 ──
			const result = Decimal.divideWithPrecision(lnX, lnBase, infinitePrecision ? Infinity : p);
			if (!result || typeof result.value !== "string") {
				return _handleError("OperatorError", "NaN", { value: getError("Logarithm") });
			}

			// ── 分类 ──
			const pRes = Decimal.parse(result.value);
			let type;
			if (pRes && pRes.frac === "") {
				type = NumCategory.Integer;
			} else if (pRes && pRes.frac.length >= p && !Decimal._isRepeatFrac(pRes.frac)) {
				type = NumCategory.Irrational;
			} else if (pRes && Decimal._isRepeatFrac(pRes.frac)) {
				type = NumCategory.LoopDecimal;
			} else {
				type = NumCategory.Decimal;
			}

			return Decimal._res(type, result.value);
		}

		/**
		 * 对数（套娃版）：依次从内到外嵌套
		 * log_base(x, ...rest) = log_base(log_rest[last](...log_rest[0](x)...))
		 * @param {string} base  最外层底数
		 * @param {string} x     真数
		 * @param {...string} rest  内层底数（从外到内，即 rest[0] 是次外层）
		 */
		static logarithms(base, x, ...rest) {
			const p = Mathmatics ? Number(Mathmatics.DecimalValue) : 15;
			// 参数列表：[base, rest[0], rest[1], ..., x]
			const bases = [base, ...rest];
			let acc = { type: Decimal.inferCategory(x), value: x };
			// 从内到外执行：先算 rest[last] 对 x，再算 rest[last-1]，...，最后算 base
			for (let i = bases.length - 1; i >= 0; i--) {
				acc = Decimal.logarithm(bases[i], acc.value, p);
				if (!acc || typeof acc.value !== "string") return acc;
			}
			return acc;
		}

		

		// ═══════════════════════════════════════════════════════════════
		//  ✦ 表达式求值器
		// ═══════════════════════════════════════════════════════════════

		static evalExpression(expr, precision) {
			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);

			const tokens = Decimal._tokenize(expr);
			if (tokens === null) {
				return _handleError("OperatorError", "NaN", { value: getError("Expression") });
			}
			const parser = new Decimal._ExprParser(tokens, p);
			let result;
			try {
				result = parser.parse();
			} catch (e) {
				if (e instanceof MathError) throw e;
				return _handleError("OperatorError", "NaN", { value: getError("Expression") });
			}
			if (result === null || result === undefined) return null;
			const normalized = Decimal._normalizeSpecial(result, p);
			return { type: NumCategory.Irrational, value: normalized };
		}

		static _tokenize(expr) {
			const s = String(expr ?? "").trim();
			if (s === "") return null;
			const tokens = [];
			let i = 0;
			const isDigit = (c) => c >= '0' && c <= '9';
			const isAlpha = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
			while (i < s.length) {
				const c = s[i];
				if (/\s/.test(c)) { i++; continue; }
				if (isDigit(c) || (c === '.' && isDigit(s[i + 1]))) {
					let j = i;
					let dotCount = 0;
					while (j < s.length && (isDigit(s[j]) || s[j] === '.')) {
						if (s[j] === '.') dotCount++;
						if (dotCount > 1) return null;
						j++;
					}
					tokens.push({ type: 'num', value: s.slice(i, j) });
					i = j;
					continue;
				}
				if (isAlpha(c)) {
					let j = i;
					while (j < s.length && (isAlpha(s[j]) || isDigit(s[j]))) j++;
					tokens.push({ type: 'id', value: s.slice(i, j).toLowerCase() });
					i = j;
					continue;
				}
				if ('+-*/×÷^√(),'.includes(c)) {
					tokens.push({ type: 'op', value: c });
					i++;
					continue;
				}
				return null;
			}
			return tokens;
		}

		static _EXPR_FUNCS = {
			sin: function(args) { Decimal._needArgs(args, 1, 'sin'); return Decimal.sin(Decimal._toRad(args[0], this.workPrec), this.p); },
			cos: function(args) { Decimal._needArgs(args, 1, 'cos'); return Decimal._cosRad(Decimal._toRad(args[0], this.workPrec), this.p); },
			tan: function(args) { Decimal._needArgs(args, 1, 'tan'); return Decimal._exprTan(Decimal._toRad(args[0], this.workPrec), this.p, args[0], 'tan'); },
			cot: function(args) { Decimal._needArgs(args, 1, 'cot'); return Decimal._exprCot(Decimal._toRad(args[0], this.workPrec), this.p, args[0], 'cot'); },
			sec: function(args) { Decimal._needArgs(args, 1, 'sec'); return Decimal._exprSec(Decimal._toRad(args[0], this.workPrec), this.p, args[0], 'sec'); },
			csc: function(args) { Decimal._needArgs(args, 1, 'csc'); return Decimal._exprCsc(Decimal._toRad(args[0], this.workPrec), this.p, args[0], 'csc'); },
			asin: function(args) { Decimal._needArgs(args, 1, 'asin'); return InverseTrigonometric.compute('asin', args[0], this.p); },
			acos: function(args) { Decimal._needArgs(args, 1, 'acos'); return InverseTrigonometric.compute('acos', args[0], this.p); },
			atan: function(args) { Decimal._needArgs(args, 1, 'atan'); return InverseTrigonometric.compute('atan', args[0], this.p); },
			acot: function(args) { Decimal._needArgs(args, 1, 'acot'); return InverseTrigonometric.compute('acot', args[0], this.p); },
			asec: function(args) { Decimal._needArgs(args, 1, 'asec'); return InverseTrigonometric.compute('asec', args[0], this.p); },
			acsc: function(args) { Decimal._needArgs(args, 1, 'acsc'); return InverseTrigonometric.compute('acsc', args[0], this.p); },
			atan2: function(args) { Decimal._needArgs(args, 2, 'atan2'); return InverseTrigonometric.atan2(args[1], args[0], this.p); },
			abs: function(args) {
				Decimal._needArgs(args, 1, 'abs');
				const pv = Decimal.parse(args[0]);
				if (!pv) return null;
				return Decimal._format(1, pv.int, pv.frac);
			},
			ceil: function(args) {
				Decimal._needArgs(args, 1, 'ceil');
				const pv = Decimal.parse(args[0]);
				if (!pv) return null;
				if (pv.frac === "") return Decimal._format(pv.sign, pv.int, "");
				const inc = Decimal._addInt(pv.int, "1");
				return Decimal._format(pv.sign, inc, "");
			},
			floor: function(args) {
				Decimal._needArgs(args, 1, 'floor');
				const pv = Decimal.parse(args[0]);
				if (!pv) return null;
				return Decimal._format(pv.sign, pv.int, "");
			},
			round: function(args) {
				Decimal._needArgs(args, 1, 'round');
				const pv = Decimal.parse(args[0]);
				if (!pv) return null;
				if (pv.frac === "") return Decimal._format(pv.sign, pv.int, "");
				const first = pv.frac.charCodeAt(0) - 48;
				if (first < 5) return Decimal._format(pv.sign, pv.int, "");
				const inc = Decimal._addInt(pv.int, "1");
				return Decimal._format(pv.sign, inc, "");
			}
		};

		static _ExprParser = class {
			constructor(tokens, precision) {
				this.tokens = tokens;
				this.pos = 0;
				this.p = precision;
				this.workPrec = precision + 5;
			}
			peek() { return this.tokens[this.pos]; }
			next() { return this.tokens[this.pos++]; }
			expect(value) {
				const t = this.peek();
				if (!t || t.type !== 'op' || t.value !== value) {
					throw new MathError("ExpressionSyntaxError", { value }, null);
				}
				this.pos++;
			}
			atEnd() { return this.pos >= this.tokens.length; }
			parse() {
				if (this.tokens.length === 0) return null;
				const v = this.parseAdd();
				if (!this.atEnd()) {
					throw new MathError("ExpressionSyntaxError", { value: this.peek().value }, null);
				}
				return v;
			}
			parseAdd() {
				let left = this.parseMul();
				while (true) {
					const t = this.peek();
					if (!t || t.type !== 'op' || (t.value !== '+' && t.value !== '-')) break;
					this.next();
					const right = this.parseMul();
					left = (t.value === '+')
						? Decimal.add(left, right).value
						: Decimal.subtract(left, right).value;
				}
				return left;
			}
			parseMul() {
				let left = this.parseUnary();
				while (true) {
					const t = this.peek();
					if (!t || t.type !== 'op') break;
					if (!['*', '×', '/', '÷'].includes(t.value)) break;
					this.next();
					const right = this.parseUnary();
					if (t.value === '*' || t.value === '×') {
						left = Decimal.multiply(left, right).value;
					} else {
						left = Decimal.divideWithPrecision(left, right, this.p).value;
					}
				}
				return left;
			}
			parseUnary() {
				const t = this.peek();
				if (t && t.type === 'op') {
					if (t.value === '+') { this.next(); return this.parseUnary(); }
					if (t.value === '-') {
						this.next();
						const v = this.parseUnary();
						return Decimal._negate(v);
					}
					if (t.value === '√') {
						this.next();
						const v = this.parseUnary();
						const r = Decimal.rootWithPrecision(v, "2", this.p);
						return r.value;
					}
				}
				return this.parsePower();
			}
			parsePower() {
				const base = this.parseAtom();
				const t = this.peek();
				if (t && t.type === 'op' && t.value === '^') {
					this.next();
					const exp = this.parseUnary();
					const r = Decimal.power(base, exp);
					return r.value;
				}
				return base;
			}
			parseAtom() {
				const t = this.peek();
				if (!t) throw new MathError("ExpressionSyntaxError", { value: "EOF" }, null);
				if (t.type === 'num') { this.next(); return t.value; }
				if (t.type === 'id') {
					this.next();
					const name = t.value;
					if (name === 'pi') return Decimal.getPi(this.workPrec);
					if (name === 'e')  return Decimal.exp("1", this.workPrec);
					const fn = Decimal._EXPR_FUNCS[name];
					if (!fn) throw new MathError("ExpressionUnknownSymbol", { value: name }, null);
					this.expect('(');
					const args = [];
					if (this.peek() && !(this.peek().type === 'op' && this.peek().value === ')')) {
						args.push(this.parseAdd());
						while (this.peek() && this.peek().type === 'op' && this.peek().value === ',') {
							this.next();
							args.push(this.parseAdd());
						}
					}
					this.expect(')');
					const r = fn.call(this, args);
					// ★ 表达式里的函数结果也吸附一次，防止 sin/cos 等残留误差
					return (typeof r === 'string') ? Decimal._snapToSimple(r, this.p) : r;
				}
				if (t.type === 'op' && t.value === '(') {
					this.next();
					const v = this.parseAdd();
					this.expect(')');
					return v;
				}
				throw new MathError("ExpressionSyntaxError", { value: t.value }, null);
			}
		}
		/**
		 * 阶加（三角数）：T(x) = x(x+1)/2
		 * 支持小数、负数。
		 *  - 非负整数：精确累加
		 *  - 其他：用 x(x+1)/2 公式
		 */
		static summation(x, precision) {
			const px = Decimal.parse(x);
			if (!px) return null;

			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);

			// 非负整数：精确累加
			if (px.frac === "" && px.sign >= 0) {
				const n = parseInt(px.int, 10);
				if (!Number.isFinite(n) || n < 0) return null;
				if (n === 0 || n === 1) return String(n);
				// n(n+1)/2，直接用整数算，避免大数乘法后再除
				const prod = Decimal._mulInt(String(n), String(n + 1));
				const half = Decimal._divInt(prod, "2");
				return half ? half.q : null;
			}

			// 小数 / 负数：x(x+1)/2
			const xPlus1 = Decimal.add(x, "1").value;
			const prod = Decimal.multiply(x, xPlus1).value;
			const res = Decimal.divideWithPrecision(prod, "2", p);
			if (!res || res.value === undefined) return null;
			return Decimal._snapToSimple(res.value, p);
		}
		/**
		 * 双阶乘 n!!
		 *  - 非负偶数：n × (n-2) × ... × 2
		 *  - 非负奇数：n × (n-2) × ... × 1
		 *  - 0!! = 1，(-1)!! = 1
		 *  - 负偶数：无定义（返回 null）
		 *  - 小数 / 负奇数：用 Gamma 扩展
		 */
		static doubleFactorial(x, precision) {
			const px = Decimal.parse(x);
			if (!px) return null;

			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);

			// 整数情形
			if (px.frac === "") {
				const n = parseInt(px.int, 10) * (px.sign < 0 ? -1 : 1);

				// 负偶数：无定义
				if (n < 0 && n % 2 === 0) return null;

				// 0!! = 1，(-1)!! = 1
				if (n === 0 || n === -1) return "1";

				// 负奇数：用 Gamma 扩展
				if (n < 0) {
					// n!! = (-1)^k * (2k+1)!! ... 走下面的 Gamma 分支
					return Decimal._doubleFactorialGamma(x, p);
				}

				// 非负整数：精确连乘
				let result = "1";
				for (let i = n; i > 0; i -= 2) {
					result = Decimal.multiply(result, String(i)).value;
					if (result === null) return null;
				}
				return result;
			}

			// 小数 / 负奇数：Gamma 扩展
			return Decimal._doubleFactorialGamma(x, p);
		}

		/**
		 * 双阶乘的 Gamma 扩展：
		 *   n!! = 2^(n/2) · (n/2)! / sqrt(π)   (n 偶数方向)
		 * 为了对奇偶都成立，用更通用的定义：
		 *   n!! = 2^((n+1)/2) · Γ(n/2 + 1) / sqrt(π)   ← 这个对整数奇偶都对
		 * 具体推导见：https://en.wikipedia.org/wiki/Double_factorial
		 */
		static _doubleFactorialGamma(x, p) {
			const pi = Decimal.getPi(p + 5);
			const sqrtPi = Decimal.rootWithPrecision(pi, "2", p + 5).value;
			if (sqrtPi === null) return null;

			// Γ(x/2 + 1)
			const half = Decimal.divideWithPrecision(x, "2", p + 5).value;
			if (half === null) return null;
			const arg = Decimal.add(half, "1").value;
			if (arg === null) return null;

			const lnG = Decimal.logGamma(arg, p + 5);
			if (lnG === null) return null;
			const gammaVal = Decimal.exp(lnG, p + 5);
			if (gammaVal === null) return null;

			// 2^((x+1)/2)
			const expHalf = Decimal.divideWithPrecision(
				Decimal.add(x, "1").value, "2", p + 5
			).value;
			if (expHalf === null) return null;
			const ln2 = Decimal._getLn2(p + 5);
			const lnPow = Decimal.multiply(expHalf, ln2).value;
			const pow2 = Decimal.exp(lnPow, p + 5);
			if (pow2 === null) return null;

			// 组合：2^((x+1)/2) · Γ(x/2 + 1) / sqrt(π)
			const num = Decimal.multiply(pow2, gammaVal).value;
			if (num === null) return null;
			const res = Decimal.divideWithPrecision(num, sqrtPi, p);
			if (!res || res.value === undefined) return null;
			return Decimal._snapToSimple(res.value, p);
		}

		/**
		 * 重幂 a ↑↑ n
		 *  - 右结合：a ↑↑ n = a^(a ↑↑ (n-1))
		 *  - 非负整数 n，最大 100
		 *  - 特殊：a=0 或 a=1 时结果稳定
		 */
		static tetration(a, n, precision) {
			const pa = Decimal.parse(a);
			const pn = Decimal.parse(n);
			if (!pa || !pn) return null;

			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);

			// n 必须是非负整数
			if (pn.sign < 0 || pn.frac !== "") {
				throw new MathError("TetrationInvalidIndexError", {
					base: a, index: n, limit: 100
				}, null);
			}

			const N = parseInt(pn.int, 10);
			if (!Number.isFinite(N) || N < 0) {
				throw new MathError("TetrationInvalidIndexError", {
					base: a, index: n, limit: 100
				}, null);
			}

			const LIMIT = 100;
			if (N > LIMIT) {
				throw new MathError("TetrationOverflowError", {
					base: a, index: n, limit: LIMIT
				}, null);
			}

			// a ↑↑ 0 = 1
			if (N === 0) return Decimal._res(NumCategory.Integer, "1");
			// a ↑↑ 1 = a
			if (N === 1) return Decimal._res(Decimal.inferCategory(a), a);

			// 底数特判：0 和 1 是稳定的
			if (pa.int === "0" && pa.frac === "") {
				// 0 ↑↑ n = 0 (n ≥ 1)
				return Decimal._res(NumCategory.Integer, "0");
			}
			if (pa.int === "1" && pa.frac === "") {
				return Decimal._res(NumCategory.Integer, "1");
			}

			// 从最深层往上算：res = a, 重复 N-1 次 res = a^res
			let res = a;
			for (let i = 2; i <= N; i++) {
				// res = a ^ res
				const r = Decimal.power(a, res);
				if (!r || typeof r.value !== "string") return r;
				res = r.value;

				// 安全阀：结果长度超过阈值直接报错，避免卡死
				if (res.replace(/[-.]/g, "").length > 5000) {
					throw new MathError("TetrationOverflowError", {
						base: a, index: String(i), limit: LIMIT
					}, null);
				}
				res = Decimal._truncateDecimal(res, p + 5);
			}

			res = Decimal._snapToSimple(res, p);
			return Decimal._res(NumCategory.Integer, res);
		}
		/**
		 * 取负（相反数）
		 * 输入非法时返回 null，由上层决定错误处理
		 */
		static negateValue(x) {
			const px = Decimal.parse(x);
			if (!px) return null;
			return Decimal._negate(x);
		}
	}

	// ═══════════════════════════════════════════════════════════════
	//  ✦ Trigonometric —— 三角函数（基于 Decimal 高精度）
	//  输入单位：角度（度）
	// ═══════════════════════════════════════════════════════════════
	class Trigonometric {
		/**
		 * 角度 → 弧度
		 * @param {string} degStr 角度字符串
		 * @param {number} precision 精度
		 * @returns {string|null} 弧度字符串
		 */
		static _degToRad(degStr, precision) {
			const p = precision + 5;
			const pi = Decimal.getPi(p);
			if (pi === null) return null;
			const rad = Decimal.multiply(degStr, pi).value;
			if (rad === null || rad === undefined) return null;
			const r = Decimal.divideWithPrecision(rad, '180', p);
			return r ? r.value : null;
		}

		/**
		 * 在给定精度下判断一个值是否应视为 0。
		 * |value| < 10^(-(p+1)) 视为 0，用于兜住泰勒级数残留的极小误差。
		 * @param {string} value
		 * @param {number} p 精度
		 * @returns {boolean}
		 */
		static _isNearlyZero(value, p) {
			if (Decimal._isZeroDecimal(value)) return true;
			const tiny = Decimal._tinyStr(p + 1);   // 10^(-(p+1))
			return Decimal._decimalAbsCmp(value, tiny) < 0;
		}

		/**
		 * 三角函数统一入口
		 * @param {string} func 函数名：sin / cos / tan / cot / sec / csc
		 * @param {string} x    角度（度）
		 * @param {number} precision 精度
		 * @returns {string|null}
		 * @throws {MathError} 当 tan / cot / sec / csc 在无定义点取值时抛出 TrigDomainError
		 */
		static compute(func, x, precision) {
			const name = String(func || '').trim().toLowerCase();
			const px = Decimal.parse(x);
			if (!px) return null;

			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);

			// ★ 角度 → 弧度
			const rad = Trigonometric._degToRad(x, p);
			if (rad === null) return null;

			switch (name) {
				case 'sin': return Trigonometric._sin(rad, p);
				case 'cos': return Trigonometric._cos(rad, p);
				case 'tan': return Trigonometric._tan(rad, p, x, name);
				case 'cot': return Trigonometric._cot(rad, p, x, name);
				case 'sec': return Trigonometric._sec(rad, p, x, name);
				case 'csc': return Trigonometric._csc(rad, p, x, name);
				default:    return null;
			}
		}

		// sin(x)
		static _sin(x, p) {
			return Decimal.sin(x, p);
		}

		// cos(x) = sin(x + π/2)
		static _cos(x, p) {
			const pi = Decimal.getPi(p + 5);
			if (pi === null) return null;
			const halfPi = Decimal.divideWithPrecision(pi, '2', p + 5).value;
			if (halfPi === null) return null;
			const shifted = Decimal.add(x, halfPi).value;
			if (shifted === null) return null;
			return Decimal.sin(shifted, p);
		}

		// tan(x) = sin(x) / cos(x)，cos(x) ≈ 0 时无定义
		static _tan(x, p, deg, name) {
			const s = Trigonometric._sin(x, p + 5);
			const c = Trigonometric._cos(x, p + 5);
			if (s === null || c === null) return null;
			if (Trigonometric._isNearlyZero(c, p)) {
				throw new MathError("TrigDomainError", { func: name, value: deg }, null);
			}
			const r = Decimal.divideWithPrecision(s, c, p);
			return r ? r.value : null;
		}

		// cot(x) = cos(x) / sin(x)，sin(x) ≈ 0 时无定义
		static _cot(x, p, deg, name) {
			const s = Trigonometric._sin(x, p + 5);
			const c = Trigonometric._cos(x, p + 5);
			if (s === null || c === null) return null;
			if (Trigonometric._isNearlyZero(s, p)) {
				throw new MathError("TrigDomainError", { func: name, value: deg }, null);
			}
			const r = Decimal.divideWithPrecision(c, s, p);
			return r ? r.value : null;
		}

		// sec(x) = 1 / cos(x)，cos(x) ≈ 0 时无定义
		static _sec(x, p, deg, name) {
			const c = Trigonometric._cos(x, p + 5);
			if (c === null) return null;
			if (Trigonometric._isNearlyZero(c, p)) {
				throw new MathError("TrigDomainError", { func: name, value: deg }, null);
			}
			const r = Decimal.divideWithPrecision('1', c, p);
			return r ? r.value : null;
		}

		// csc(x) = 1 / sin(x)，sin(x) ≈ 0 时无定义
		static _csc(x, p, deg, name) {
			const s = Trigonometric._sin(x, p + 5);
			if (s === null) return null;
			if (Trigonometric._isNearlyZero(s, p)) {
				throw new MathError("TrigDomainError", { func: name, value: deg }, null);
			}
			const r = Decimal.divideWithPrecision('1', s, p);
			return r ? r.value : null;
		}

		static _cosRad(x, p) {
			const pi = Decimal.getPi(p + 5);
			if (pi === null) return null;
			const halfPi = Decimal.divideWithPrecision(pi, "2", p + 5).value;
			const shifted = Decimal.add(x, halfPi).value;
			if (shifted === null) return null;
			return Decimal.sin(shifted, p);
		}

		static _exprTan(x, p, deg, name) {
			const s = Decimal.sin(x, p + 5);
			const c = Decimal._cosRad(x, p + 5);
			if (s === null || c === null) return null;
			if (Decimal._isNearlyZeroStatic(c, p)) {
				throw new MathError("TrigDomainError", { func: name, value: deg }, null);
			}
			return Decimal.divideWithPrecision(s, c, p).value;
		}

		static _exprCot(x, p, deg, name) {
			const s = Decimal.sin(x, p + 5);
			const c = Decimal._cosRad(x, p + 5);
			if (s === null || c === null) return null;
			if (Decimal._isNearlyZeroStatic(s, p)) {
				throw new MathError("TrigDomainError", { func: name, value: deg }, null);
			}
			return Decimal.divideWithPrecision(c, s, p).value;
		}

		static _exprSec(x, p, deg, name) {
			const c = Decimal._cosRad(x, p + 5);
			if (c === null) return null;
			if (Decimal._isNearlyZeroStatic(c, p)) {
				throw new MathError("TrigDomainError", { func: name, value: deg }, null);
			}
			return Decimal.divideWithPrecision("1", c, p).value;
		}

		static _exprCsc(x, p, deg, name) {
			const s = Decimal.sin(x, p + 5);
			if (s === null) return null;
			if (Decimal._isNearlyZeroStatic(s, p)) {
				throw new MathError("TrigDomainError", { func: name, value: deg }, null);
			}
			return Decimal.divideWithPrecision("1", s, p).value;
		}

		static _toRad(degStr, workPrec) {
			const pi = Decimal.getPi(workPrec);
			if (pi === null) return null;
			const rad = Decimal.multiply(degStr, pi).value;
			return Decimal.divideWithPrecision(rad, "180", workPrec).value;
		}

		static _needArgs(args, n, name) {
			if (args.length !== n) {
				throw new MathError("ExpressionArgCountError", {
					func: name, expected: n, got: args.length
				}, null);
			}
		}

	}


	// ═══════════════════════════════════════════════════════════════
	//  ✦ InverseTrigonometric —— 反三角函数（输出角度制）
	//  asin / acos / atan / acot / asec / acsc
	//  值域约定：
	//    asin: [-90°, 90°]
	//    acos: [0°, 180°]
	//    atan: (-90°, 90°)
	//    acot: (0°, 180°)
	//    asec: [0°, 180°]  (即 acos(1/x))
	//    acsc: [-90°, 90°] (即 asin(1/x))
	// ═══════════════════════════════════════════════════════════════
	class InverseTrigonometric {
		/**
		 * 弧度 → 角度
		 */
		static _radToDeg(radStr, precision) {
			const p = precision + 5;
			const pi = Decimal.getPi(p);
			if (pi === null) return null;
			const deg = Decimal.multiply(radStr, '180').value;
			if (deg === null || deg === undefined) return null;
			const r = Decimal.divideWithPrecision(deg, pi, p);
			return r ? r.value : null;
		}

		/**
		 * 在给定精度下判断一个值是否应视为 0。
		 */
		static _isNearlyZero(value, p) {
			if (Decimal._isZeroDecimal(value)) return true;
			const tiny = Decimal._tinyStr(Math.max(1, p - 2));
			return Decimal._decimalAbsCmp(value, tiny) < 0;
		}

		/**
		 * 统一入口
		 * @param {string} func 函数名：asin / acos / atan / acot / asec / acsc
		 * @param {string} x    输入值（字符串）
		 * @param {number} precision 精度
		 * @returns {string|null} 角度（度）
		 * @throws {MathError} 定义域外抛出 InverseTrigDomainError
		 */
		static compute(func, x, precision) {
			const name = String(func || '').trim().toLowerCase();
			const px = Decimal.parse(x);
			if (!px) return null;

			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);

			let result; // 弧度
			switch (name) {
				case 'asin': result = InverseTrigonometric._asin(x, p, name); break;
				case 'acos': result = InverseTrigonometric._acos(x, p, name); break;
				case 'atan': result = InverseTrigonometric._atan(x, p);       break;
				case 'acot': result = InverseTrigonometric._acot(x, p);       break;
				case 'asec': result = InverseTrigonometric._asec(x, p, name); break;
				case 'acsc': result = InverseTrigonometric._acsc(x, p, name); break;
				default:     return null;
			}
			if (result === null) return null;

			const deg = InverseTrigonometric._radToDeg(result, p);
			if (deg === null) return null;
			return InverseTrigonometric._normalizeSpecial(deg, p);
		}

		// ── asin：定义域 [-1, 1] ──
		static _asin(x, p, name) {
			const px = Decimal.parse(x);
			if (!px) return null;
			const one = "1";
			if (Decimal._cmpDecimal(x, one) > 0 ||
				Decimal._cmpDecimal(x, "-" + one) < 0) {
				throw new MathError("InverseTrigDomainError", { func: name, value: x }, null);
			}
			// 特殊值
			if (InverseTrigonometric._isNearlyZero(x, p)) return "0";
			if (Decimal._cmpDecimal(x, "1") === 0) {
				const pi = Decimal.getPi(p + 5);
				return Decimal.divideWithPrecision(pi, "2", p + 5).value;
			}
			if (Decimal._cmpDecimal(x, "-1") === 0) {
				const pi = Decimal.getPi(p + 5);
				const half = Decimal.divideWithPrecision(pi, "2", p + 5).value;
				return Decimal._negate(half);
			}
			// 牛顿迭代：f(θ) = sin(θ) - x = 0
			// θ_{n+1} = θ_n - (sin(θ_n) - x) / cos(θ_n)
			// 初值用浮点 asin
			const xNum = parseFloat(x);
			let theta = Number.isFinite(xNum) ? String(Math.asin(xNum)) : "0";
			return InverseTrigonometric._newtonSolve(theta, x, p, 'sin');
		}

		// ── acos：定义域 [-1, 1]，值域 [0, π] ──
		static _acos(x, p, name) {
			const px = Decimal.parse(x);
			if (!px) return null;
			if (Decimal._cmpDecimal(x, "1") > 0 ||
				Decimal._cmpDecimal(x, "-1") < 0) {
				throw new MathError("InverseTrigDomainError", { func: name, value: x }, null);
			}
			// acos(x) = π/2 - asin(x)
			const pi = Decimal.getPi(p + 5);
			const halfPi = Decimal.divideWithPrecision(pi, "2", p + 5).value;
			const asinVal = InverseTrigonometric._asin(x, p + 2, name);
			if (asinVal === null) return null;
			return Decimal.subtract(halfPi, asinVal).value;
		}

		// ── atan：定义域 R ──
		static _atan(x, p) {
			const px = Decimal.parse(x);
			if (!px) return null;
			if (InverseTrigonometric._isNearlyZero(x, p)) return "0";

			// 用 atan(1/x) = π/2 - atan(x) 把 |x| 缩到 <= 1
			const absX = px.sign < 0 ? Decimal._format(1, px.int, px.frac) : x;
			const one = "1";
			let useReciprocal = false;
			let xr = absX;
			if (Decimal._cmpDecimal(absX, one) > 0) {
				xr = Decimal.divideWithPrecision(one, absX, p + 5).value;
				useReciprocal = true;
			}

			// 牛顿迭代：f(θ) = tan(θ) - xr = 0
			const xrNum = parseFloat(xr);
			let theta = Number.isFinite(xrNum) ? String(Math.atan(xrNum)) : "0";
			let rad = InverseTrigonometric._newtonSolve(theta, xr, p, 'tan');

			if (useReciprocal) {
				const pi = Decimal.getPi(p + 5);
				const halfPi = Decimal.divideWithPrecision(pi, "2", p + 5).value;
				rad = Decimal.subtract(halfPi, rad).value;
			}
			if (px.sign < 0) rad = Decimal._negate(rad);
			return rad;
		}

		// ── acot：定义域 R，值域 (0, π) ──
		// acot(x) = π/2 - atan(x)
		static _acot(x, p) {
			const px = Decimal.parse(x);
			if (!px) return null;
			const pi = Decimal.getPi(p + 5);
			const halfPi = Decimal.divideWithPrecision(pi, "2", p + 5).value;
			const at = InverseTrigonometric._atan(x, p + 2);
			if (at === null) return null;
			let r = Decimal.subtract(halfPi, at).value;
			// 保证落在 (0, π)：若 x < 0，加上 π
			if (px.sign < 0 && Decimal._cmpDecimal(r, "0") <= 0) {
				r = Decimal.add(r, pi).value;
			}
			return r;
		}

		// ── asec：定义域 |x| ≥ 1，值域 [0, π] ──
		// asec(x) = acos(1/x)
		static _asec(x, p, name) {
			const px = Decimal.parse(x);
			if (!px) return null;
			const absX = px.sign < 0 ? Decimal._format(1, px.int, px.frac) : x;
			if (Decimal._cmpDecimal(absX, "1") < 0) {
				throw new MathError("InverseTrigDomainError", { func: name, value: x }, null);
			}
			const inv = Decimal.divideWithPrecision("1", x, p + 5).value;
			if (inv === null) return null;
			return InverseTrigonometric._acos(inv, p, name);
		}

		// ── acsc：定义域 |x| ≥ 1，值域 [-π/2, π/2] ──
		// acsc(x) = asin(1/x)
		static _acsc(x, p, name) {
			const px = Decimal.parse(x);
			if (!px) return null;
			const absX = px.sign < 0 ? Decimal._format(1, px.int, px.frac) : x;
			if (Decimal._cmpDecimal(absX, "1") < 0) {
				throw new MathError("InverseTrigDomainError", { func: name, value: x }, null);
			}
			const inv = Decimal.divideWithPrecision("1", x, p + 5).value;
			if (inv === null) return null;
			return InverseTrigonometric._asin(inv, p, name);
		}

		/**
		 * 牛顿迭代解 f(θ) = trig(θ) - target = 0
		 * @param {string} theta0 初值（弧度）
		 * @param {string} target 目标值
		 * @param {number} p 精度
		 * @param {'sin'|'tan'} kind
		 */
		static _newtonSolve(theta0, target, p, kind) {
			const workPrec = p + 5;
			const tiny = Decimal._tinyStr(Math.max(1, p - 2));
			let theta = theta0;
			const maxIter = 60;
			for (let i = 0; i < maxIter; i++) {
				let f, fp;
				if (kind === 'sin') {
					const s = Decimal.sin(theta, workPrec);
					const c = InverseTrigonometric._cosRad(theta, workPrec);
					if (s === null || c === null) return null;
					f  = Decimal.subtract(s, target).value;
					fp = c;
				} else {
					// tan(θ) 用 sin/cos 计算
					const s = Decimal.sin(theta, workPrec);
					const c = InverseTrigonometric._cosRad(theta, workPrec);
					if (s === null || c === null) return null;
					if (InverseTrigonometric._isNearlyZero(c, workPrec)) return null;
					const t = Decimal.divideWithPrecision(s, c, workPrec).value;
					f = Decimal.subtract(t, target).value;
					// d/dθ tan(θ) = 1/cos²(θ) = sec²(θ)
					const c2 = Decimal.multiply(c, c).value;
					fp = Decimal.divideWithPrecision("1", c2, workPrec).value;
				}
				if (f === null || fp === null) return null;
				if (InverseTrigonometric._isNearlyZero(fp, workPrec)) break;
				const delta = Decimal.divideWithPrecision(f, fp, workPrec).value;
				if (delta === null) return null;
				if (InverseTrigonometric._isNearlyZero(delta, p)) break;
				theta = Decimal.subtract(theta, delta).value;
				theta = Decimal._truncateDecimal(theta, workPrec + 5);
			}
			return Decimal._truncateDecimal(theta, p);
		}

		/**
		 * cos(rad) = sin(rad + π/2)，内部使用
		 */
		static _cosRad(x, p) {
			const pi = Decimal.getPi(p + 5);
			if (pi === null) return null;
			const halfPi = Decimal.divideWithPrecision(pi, "2", p + 5).value;
			const shifted = Decimal.add(x, halfPi).value;
			if (shifted === null) return null;
			return Decimal.sin(shifted, p);
		}
		

		/**
		 * 特殊值归一化
		 */
		static _normalizeSpecial(value, p) {
			if (value === null || value === undefined) return value;
			const pv = Decimal.parse(value);
			if (!pv) return value;
			// 0.999...9 → 1
			if (pv.int === "0" && /^9+$/.test(pv.frac)) return "1";
			if (pv.sign < 0 && pv.int === "0" && /^9+$/.test(pv.frac)) return "-1";
			// 极小量 → 0
			const tiny = Decimal._tinyStr(Math.max(1, p - 2));
			if (Decimal._decimalAbsCmp(value, tiny) < 0) return "0";
			return value;
		}
		/**
		 * atan2(y, x) —— 返回点 (x, y) 的方位角（弧度制）
		 * 值域：(-π, π]
		 * @param {string} y
		 * @param {string} x
		 * @param {number} p 精度
		 * @returns {string} 弧度
		 * @throws {MathError} 当 x = y = 0 时抛出 InverseTrigDomainError
		 */
		static _atan2Rad(y, x, p) {
			const py = Decimal.parse(y);
			const px = Decimal.parse(x);
			if (!py || !px) return null;

			const yZero = InverseTrigonometric._isNearlyZero(y, p);
			const xZero = InverseTrigonometric._isNearlyZero(x, p);

			// x = y = 0 → 无定义
			if (xZero && yZero) {
				throw new MathError("InverseTrigDomainError", {
					func: "atan2",
					value: `(${x}, ${y})`
				}, null);
			}

			const pi = Decimal.getPi(p + 5);
			const halfPi = Decimal.divideWithPrecision(pi, "2", p + 5).value;

			// x = 0 且 y ≠ 0 → ±π/2
			if (xZero) {
				return py.sign > 0 ? halfPi : Decimal._negate(halfPi);
			}

			// 计算 atan(y / x)（用已有 _atan）
			const ratio = Decimal.divideWithPrecision(y, x, p + 5).value;
			if (ratio === null) return null;
			let rad = InverseTrigonometric._atan(ratio, p + 2);

			// 象限修正
			if (px.sign > 0) {
				// x > 0：直接用 atan(y/x)，值域 (-π/2, π/2)
			} else {
				// x < 0：加 π 或减 π
				if (py.sign >= 0) {
					// 一、二象限交界（x<0, y≥0）→ +π
					rad = Decimal.add(rad, pi).value;
				} else {
					// 三象限（x<0, y<0）→ -π
					rad = Decimal.subtract(rad, pi).value;
				}
			}
			// y = 0 且 x < 0：上式会得到 atan(0) + π = π，正确
			// y = 0 且 x > 0：atan(0) = 0，正确
			return rad;
		}

		/**
		 * atan2(y, x) —— 角度制输出
		 */
		static atan2(y, x, precision) {
			let p = Number(precision);
			if (!Number.isFinite(p) || p < 0) p = 15;
			p = Math.floor(p);

			const rad = InverseTrigonometric._atan2Rad(y, x, p);
			if (rad === null) return null;

			const deg = InverseTrigonometric._radToDeg(rad, p);
			if (deg === null) return null;
			return InverseTrigonometric._normalizeSpecial(deg, p);
		}
	}

	class Operator {
		_opError(e, fallbackId, opName) {
			// 把 Decimal 层异常统一翻译
			let opId = fallbackId;
			let params = {};
			if (e instanceof MathError) {
				opId = _normalizeOpErrorId(e.errorId);
				params = e.params || {};
			}
			const norm = _normalizeOpError(opId, 'NaN', {
				value: opName || getError(opId) || opId,
				...params
			});
			if (norm.mode === 'throwError') {
				Scratch.runtime.logSystem.error(norm.throwMessage);
				// 抛出带 opId 的错误，方便上层继续识别
				const err = new MathError(opId, params, norm.throwMessage);
				err.opId = norm.opId;
				throw err;
			}
			return norm.value;
		}

		Add(a, b) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.add(x, y);
				if (!r || r.value === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('Add'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('Add'));
			}
		}

		Adds(...nums) {
			const list = nums.map((v) => (v === undefined || v === null) ? "0" : String(v).trim() || "0");
			try {
				const r = Decimal.adds(...list);
				if (!r || r.value === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('Add'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('Add'));
			}
		}

		Subtract(a, b) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.subtract(x, y);
				if (!r || r.value === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('Subtract'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('Subtract'));
			}
		}

		Subtracts(...nums) {
			const list = nums.map((v) => (v === undefined || v === null) ? "0" : String(v).trim() || "0");
			try {
				const r = Decimal.subtracts(...list);
				if (!r || r.value === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('Subtract'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('Subtract'));
			}
		}

		Multiply(a, b) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.multiply(x, y);
				if (!r || r.value === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('Multiply'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('Multiply'));
			}
		}

		Multiplies(...nums) {
			const list = nums.map((v) => (v === undefined || v === null) ? "0" : String(v).trim() || "0");
			try {
				const r = Decimal.multiplies(...list);
				if (!r || r.value === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('Multiply'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('Multiply'));
			}
		}

		Divide(a, b) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.divide(x, y);
				if (!r || r.value === undefined) {
					return this._opError(null, 'DivideByZeroError', getError('Divide'));
				}
				if (r.type === NumCategory.LoopDecimal) {
					const ta = Decimal.inferCategory(x);
					const tb = Decimal.inferCategory(y);
					if (ta === NumCategory.Irrational || tb === NumCategory.Irrational) {
						r.type = NumCategory.Irrational;
					}
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'DivideByZeroError', getError('Divide'));
			}
		}

		Divides(...nums) {
			const list = nums.map((v) => (v === undefined || v === null) ? "0" : String(v).trim() || "0");
			try {
				const r = Decimal.divides(...list);
				if (!r || r.value === undefined) {
					return this._opError(null, 'DivideByZeroError', getError('Divide'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'DivideByZeroError', getError('Divide'));
			}
		}

		DivideWithPrecision(a, b, precision) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.divideWithPrecision(x, y, precision);
				if (!r || r.value === undefined) {
					return this._opError(null, 'DivideByZeroError', getError('Divide'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'DivideByZeroError', getError('Divide'));
			}
		}

		DivBy(a, b) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.divide(y, x);
				if (!r || r.value === undefined) {
					return this._opError(null, 'DivideByZeroError', getError('DivBy'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'DivideByZeroError', getError('DivBy'));
			}
		}

		Remainder(a, b) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.remainder(x, y);
				if (!r || r.value === undefined) {
					return this._opError(null, 'DivideByZeroError', getError('Remainder'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'DivideByZeroError', getError('Remainder'));
			}
		}

		Remainders(...nums) {
			const list = nums.map((v) => (v === undefined || v === null) ? "0" : String(v).trim() || "0");
			try {
				const r = Decimal.remainders(...list);
				if (!r || r.value === undefined) {
					return this._opError(null, 'DivideByZeroError', getError('Remainder'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'DivideByZeroError', getError('Remainder'));
			}
		}

		Quotient(a, b) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.quotient(x, y);
				if (!r || r.value === undefined) {
					return this._opError(null, 'DivideByZeroError', getError('Quotient'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'DivideByZeroError', getError('Quotient'));
			}
		}

		Power(a, b) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.power(x, y);
				if (!r || r.value === undefined) {
					return this._opError(null, 'UnknownOperatorError', getError('Power'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'UnknownOperatorError', getError('Power'));
			}
		}

		Root(a, b) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.root(x, y);
				if (!r || r.value === undefined) {
					return this._opError(null, 'EvenRootHasNegativeError', getError('Root'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'EvenRootHasNegativeError', getError('Root'));
			}
		}

		Roots(...nums) {
			const list = nums.map((v) => (v === undefined || v === null) ? "0" : String(v).trim() || "0");
			if (list.length < 2) {
				return this._opError(null, 'EvenRootHasNegativeError', getError('Root'));
			}
			const index = list[0];
			try {
				const r = Decimal.roots(list[1], index, ...list.slice(2));
				if (!r || r.value === undefined) {
					return this._opError(null, 'EvenRootHasNegativeError', getError('Root'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'EvenRootHasNegativeError', getError('Root'));
			}
		}
		RootWithPrecision(a, b, precision) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.rootWithPrecision(x, y, precision);
				if (!r || r.value === undefined) {
					return this._opError(null, 'EvenRootHasNegativeError', getError('Root'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'EvenRootHasNegativeError', getError('Root'));
			}
		}
		Logarithm(base, x) {
			const b = (base === undefined || base === null) ? "10" : String(base).trim() || "10";
			const v = (x === undefined || x === null) ? "0" : String(x).trim() || "0";
			try {
				const r = Decimal.logarithm(b, v, Mathmatics ? Mathmatics.DecimalValue : 15);
				if (!r || r.value === undefined) {
					return this._opError(null, 'InvalidLogBaseError', getError('Logarithm'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'InvalidLogBaseError', getError('Logarithm'));
			}
		}
		LogarithmWithPrecision(base, x, precision) {
			const b = (base === undefined || base === null) ? "10" : String(base).trim() || "10";
			const v = (x === undefined || x === null) ? "0" : String(x).trim() || "0";
			try {
				const r = Decimal.logarithmWithPrecision(b, v, precision);
				if (!r || r.value === undefined) {
					return this._opError(null, 'InvalidLogBaseError', getError('Logarithm'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'InvalidLogBaseError', getError('Logarithm'));
			}
		}

		Logarithms(...nums) {
			if (nums.length < 2) {
				return this._opError(null, 'InvalidLogBaseError', getError('Logarithm'));
			}
			const list = nums.map((v) => (v === undefined || v === null) ? "0" : String(v).trim() || "0");
			const base = list[0];
			const x = list[list.length - 1];
			const rest = list.slice(1, -1);   // 中间的都是内层底数
			try {
				const r = Decimal.logarithms(base, x, ...rest);
				if (!r || r.value === undefined) {
					return this._opError(null, 'InvalidLogBaseError', getError('Logarithm'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'InvalidLogBaseError', getError('Logarithm'));
			}
		}
		Factorial(a) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			try {
				const r = Decimal.factorial(x, Mathmatics ? Mathmatics.DecimalValue : 15);
				if (r === null || r === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('Factorial'));
				}
				return r;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('Factorial'));
			}
		}
		// ── 三角函数 ──
		TrigonometricFunction(func, x) {
			const f = (func === undefined || func === null) ? 'sin' : String(func).trim() || 'sin';
			const v = (x === undefined || x === null) ? '0' : String(x).trim() || '0';
			try {
				const precision = Mathmatics ? Mathmatics.DecimalValue : 15;
				const r = Trigonometric.compute(f, v, precision);
				if (r === null || r === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('TrigonometricFunction'));
				}
				return r;
			} catch (e) {
				// ★ 把 TrigDomainError 的 func / value 参数透传
				return this._opError(e, 'InvalidNumberError', getError('TrigonometricFunction'));
			}
		}
		// ── 反三角函数 ──
		InverseTrigonometricFunction(func, x) {
			const f = (func === undefined || func === null) ? 'asin' : String(func).trim() || 'asin';
			const v = (x === undefined || x === null) ? '0' : String(x).trim() || '0';
			try {
				const precision = Mathmatics ? Mathmatics.DecimalValue : 15;
				const r = InverseTrigonometric.compute(f, v, precision);
				if (r === null || r === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('InverseTrigonometricFunction'));
				}
				return r;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('InverseTrigonometricFunction'));
			}
		}
		// ── atan2(y, x) ──
		Atan2(x, y) {
			const xv = (x === undefined || x === null) ? "0" : String(x).trim() || "0";
			const yv = (y === undefined || y === null) ? "0" : String(y).trim() || "0";
			try {
				const precision = Mathmatics ? Mathmatics.DecimalValue : 15;
				const r = InverseTrigonometric.atan2(yv, xv, precision);
				if (r === null || r === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('Atan2'));
				}
				return r;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('Atan2'));
			}
		}
		CalculateExpression(expr) {
			const s = (expr === undefined || expr === null) ? "" : String(expr).trim();
			console.log("[Calc] input =", JSON.stringify(s));
			if (s === "") {
				console.log("[Calc] empty input");
				return this._opError(null, 'ExpressionSyntaxError', getError('Expression'));
			}
			try {
				const precision = Mathmatics ? Mathmatics.DecimalValue : 15;
				console.log("[Calc] precision =", precision);
				const r = Decimal.evalExpression(s, precision);
				console.log("[Calc] eval result =", r);
				if (!r || r.value === undefined) {
					console.log("[Calc] result invalid");
					return this._opError(null, 'ExpressionSyntaxError', getError('Expression'));
				}
				return r.value;
			} catch (e) {
				console.log("[Calc] caught =", e, "errorId =", e && e.errorId);
				return this._opError(e, 'ExpressionSyntaxError', getError('Expression'));
			}
		}
		Summation(a) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			try {
				const r = Decimal.summation(x, Mathmatics ? Mathmatics.DecimalValue : 15);
				if (r === null || r === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('Summation'));
				}
				return r;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('Summation'));
			}
		}
		DoubleFactorial(a) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			try {
				const r = Decimal.doubleFactorial(x, Mathmatics ? Mathmatics.DecimalValue : 15);
				if (r === null || r === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('DoubleFactorial'));
				}
				return r;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('DoubleFactorial'));
			}
		}
		Tetration(a, b) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			const y = (b === undefined || b === null) ? "0" : String(b).trim() || "0";
			try {
				const r = Decimal.tetration(x, y, Mathmatics ? Mathmatics.DecimalValue : 15);
				if (!r || r.value === undefined) {
					return this._opError(null, 'TetrationInvalidIndexError', getError('Tetration'));
				}
				return r.value;
			} catch (e) {
				return this._opError(e, 'TetrationInvalidIndexError', getError('Tetration'));
			}
		}
		Negate(a) {
			const x = (a === undefined || a === null) ? "0" : String(a).trim() || "0";
			try {
				const r = Decimal.negateValue(x);
				if (r === null || r === undefined) {
					return this._opError(null, 'InvalidNumberError', getError('Negate'));
				}
				return r;
			} catch (e) {
				return this._opError(e, 'InvalidNumberError', getError('Negate'));
			}
		}
	}

	// ═══════════════════════════════════════════════════════════════
	//  ✦ 数字分类：按 opcode + 值 反推（跨积木兜底）
	// ═══════════════════════════════════════════════════════════════
	function classifyByOpcode(opcode, value, precision) {
		const p = Decimal.parse(String(value));
		if (!p) return getType('Irrational');
		const prec = Number.isFinite(precision) ? precision : 15;

		// 纯整数
		if (p.frac === '') return getType('Integer');

		// 除法族：小数位到达精度 → 循环小数
		if (['Divide', 'Divides', 'DivideWithPrecision', 'DivBy'].includes(opcode)) {
			if (p.frac.length >= prec) return getType('LoopDecimal');
			return getType('Decimal');
		}

		// 开方 / 幂族：小数位到达精度 → 无理数
		if (['Root', 'Roots', 'Power', 'Powers', 'Logarithm',"LogarithmWithPrecision","Logarithms","TrigonometricFunction"].includes(opcode)) {
			if (p.frac.length >= prec) return getType('Irrational');
			return getType('Decimal');
		}

		// ★ 其它 opcode（Add/Subtract/Multiply/...）：如果小数位达到精度上限，说明是继承来的
		//   优先尝试检测循环节，其次视为无理数
		if (p.frac.length >= prec) {
			const frac = p.frac;
			for (let len = 1; len <= Math.floor(frac.length / 2); len++) {
				const unit = frac.slice(0, len);
				let ok = true;
				for (let i = 0; i < frac.length; i++) {
					if (frac[i] !== unit[i % len]) { ok = false; break; }
				}
				if (ok) return getType('LoopDecimal');
			}
			return getType('Irrational');
		}

		return getType('Decimal');
	}

	// ═══════════════════════════════════════════════════════════════
	//  ✦ 设置面板样式（动画优化版）
	// ═══════════════════════════════════════════════════════════════
	const MATH_SETTINGS_STYLE_ID = 'math-extension-settings-styles-v3';
	if (!document.getElementById(MATH_SETTINGS_STYLE_ID)) {
		const style = document.createElement('style');
		style.id = MATH_SETTINGS_STYLE_ID;
		style.textContent = `
		/* ── 遮罩层 ── */
		.math-settings-overlay {
			position: fixed; inset: 0;
			background: rgba(0, 0, 0, 0.5);
			display: flex; align-items: center; justify-content: center;
			z-index: 99999; padding: 20px;
			opacity: 0;
			transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1);
			backdrop-filter: blur(0px);
			will-change: opacity, backdrop-filter;
		}
		.math-settings-overlay.math-open {
			opacity: 1;
			backdrop-filter: blur(8px);
		}
		.math-settings-overlay.math-closing {
			opacity: 0;
			backdrop-filter: blur(0px);
			pointer-events: none;
		}

		/* ── 主弹窗 ── */
		.math-settings-modal {
			background: #181825; color: #cdd6f4;
			border-radius: 16px;
			box-shadow: 0 40px 120px rgba(0, 0, 0, 0.85);
			width: 1200px; max-width: 1200px;
			height: 580px; max-height: 88vh;
			display: flex; flex-direction: column; overflow: hidden;
			font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
			border: 1px solid #313244;
			transform: translateY(30px) scale(0.96);
			opacity: 0;
			transition:
				transform 0.42s cubic-bezier(0.22, 1, 0.36, 1),
				opacity 0.32s cubic-bezier(0.22, 1, 0.36, 1);
			will-change: transform, opacity;
		}
		.math-settings-overlay.math-open .math-settings-modal {
			transform: translateY(0) scale(1);
			opacity: 1;
		}
		.math-settings-overlay.math-closing .math-settings-modal {
			transform: translateY(20px) scale(0.96);
			opacity: 0;
		}

		/* ── 头部 ── */
		.math-settings-header {
			padding: 18px 32px;
			border-bottom: 1px solid #2a2a3e;
			display: flex; justify-content: space-between; align-items: center;
			flex-shrink: 0; background: #1c1c2e; min-height: 60px;
		}
		.math-settings-title {
			font-size: 20px; font-weight: 700; margin: 0;
			letter-spacing: 0.5px;
			background: linear-gradient(135deg, #89b4fa, #b4befe, #74a7f5);
			-webkit-background-clip: text; -webkit-text-fill-color: transparent;
			background-clip: text;
			background-size: 200% 100%;
			animation: mathTitleShimmer 6s ease-in-out infinite;
		}
		@keyframes mathTitleShimmer {
			0%, 100% { background-position: 0% 50%; }
			50% { background-position: 100% 50%; }
		}
		.math-settings-close {
			background: rgba(255, 255, 255, 0.05); border: none;
			font-size: 22px; cursor: pointer; color: #6c7086;
			padding: 4px 14px; border-radius: 8px; line-height: 1.4;
			transition: color 0.25s ease, background 0.25s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
		.math-settings-close:hover {
			color: #f38ba8; background: rgba(243, 139, 168, 0.15);
			transform: rotate(90deg) scale(1.05);
		}
		.math-settings-close:active {
			transform: rotate(90deg) scale(0.9);
		}

		/* ── 主体 ── */
		.math-settings-body {
			padding: 0; overflow: hidden; flex: 1;
			display: flex; flex-direction: row; min-height: 0;
		}

		/* ── 左侧导航 ── */
		.math-settings-sidebar {
			display: flex; flex-direction: column; gap: 6px;
			padding: 24px 16px;
			min-width: 200px; width: 220px; flex-shrink: 0;
			background: #14141f; border-right: 1px solid #2a2a3e;
		}
		.math-settings-nav-btn {
			display: flex; align-items: center; gap: 12px;
			padding: 14px 16px; background: transparent; border: none;
			border-radius: 10px; color: #a6adc8; font-size: 15px; font-weight: 500;
			cursor: pointer; width: 100%; min-width: 0; text-align: left;
			font-family: inherit; position: relative;
			transition: background 0.25s ease, color 0.25s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
			will-change: transform;
		}
		.math-settings-nav-btn::before {
			content: ''; position: absolute; left: 0; top: 20%; height: 60%; width: 4px;
			border-radius: 0 4px 4px 0; background: transparent;
			transition: background 0.3s ease, box-shadow 0.3s ease, height 0.3s ease, top 0.3s ease;
		}
		.math-settings-nav-btn .nav-icon {
			font-size: 20px; opacity: 0.5;
			transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
		.math-settings-nav-btn .nav-label { flex: 0 0 auto; white-space: nowrap; font-size: 15px; }
		.math-settings-nav-btn .nav-badge {
			font-size: 11px; background: rgba(137, 180, 250, 0.15); color: #89b4fa;
			padding: 2px 10px; border-radius: 12px; font-weight: 600;
			transition: background 0.3s ease, transform 0.3s ease;
		}
		.math-settings-nav-btn:hover {
			background: rgba(137, 180, 250, 0.08); color: #cdd6f4;
			transform: translateX(3px);
		}
		.math-settings-nav-btn:hover .nav-icon { opacity: 1; transform: scale(1.12); }
		.math-settings-nav-btn.active {
			background: rgba(137, 180, 250, 0.14); color: #89b4fa;
		}
		.math-settings-nav-btn.active::before {
			background: #89b4fa;
			box-shadow: 0 0 16px rgba(137, 180, 250, 0.5);
			top: 12%; height: 76%;
		}
		.math-settings-nav-btn.active .nav-icon { opacity: 1; }
		.math-settings-nav-btn.active .nav-badge { background: rgba(137, 180, 250, 0.3); }
		.math-settings-nav-btn:active { transform: scale(0.97); }

		/* ── 右侧内容 ── */
		.math-settings-content {
			flex: 1; padding: 24px 32px 24px 28px;
			overflow-y: auto; min-width: 0; background: #1a1a2e;
			scroll-behavior: smooth;
		}
		.math-settings-content::-webkit-scrollbar { width: 6px; }
		.math-settings-content::-webkit-scrollbar-track { background: transparent; }
		.math-settings-content::-webkit-scrollbar-thumb {
			background: #313244; border-radius: 10px;
			transition: background 0.3s ease;
		}
		.math-settings-content::-webkit-scrollbar-thumb:hover { background: #45475a; }

		/* ── 通用组件 ── */
		.math-settings-note {
			font-size: 13px; color: #a6adc8; margin: 0 0 22px; line-height: 1.6;
			padding: 14px 18px;
			background: rgba(108, 112, 134, 0.08);
			border-radius: 10px; border-left: 4px solid #89b4fa;
			animation: mathFadeSlideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
		}
		.math-settings-small-tip {
			font-size: 12px; color: #6c7086; margin-top: 4px; line-height: 1.5;
		}
		.math-setting-item, .math-setting-item-row {
			animation: mathFadeSlideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
		}
		@keyframes mathFadeSlideIn {
			from { opacity: 0; transform: translateY(6px); }
			to   { opacity: 1; transform: translateY(0); }
		}

		/* ── 设置项 ── */
		.math-setting-item {
			display: flex; align-items: center; justify-content: space-between;
			padding: 12px 0; border-bottom: 1px solid rgba(42, 42, 62, 0.5);
			gap: 16px;
			transition: background 0.25s ease, padding 0.25s ease, margin 0.25s ease, border-radius 0.25s ease;
		}
		.math-setting-item:hover {
			background: rgba(255, 255, 255, 0.025);
			margin: 0 -8px; padding: 12px 8px; border-radius: 8px;
		}
		.math-setting-item:last-child { border-bottom: none; }
		.math-setting-label { font-size: 14px; flex: 1; color: #cdd6f4; }
		.math-setting-label-text { display: block; font-weight: 500; }
		.math-setting-desc {
			font-size: 12px; color: #6c7086; display: block;
			margin-top: 3px; font-weight: 400;
		}

		/* ── 开关 ── */
		.math-toggle {
			display: flex; align-items: center; gap: 14px; cursor: pointer;
			flex-shrink: 0; user-select: none; padding: 4px 0;
		}
		.math-toggle-track {
			width: 48px; height: 26px; background: #313244;
			border-radius: 13px; position: relative;
			transition: background 0.32s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.32s ease;
			box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
			will-change: background;
		}
		.math-toggle-track.active {
			background: #89b4fa;
			box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 24px rgba(137, 180, 250, 0.25);
		}
		.math-toggle-knob {
			width: 20px; height: 20px; background: #cdd6f4; border-radius: 50%;
			position: absolute; top: 3px; left: 3px;
			transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, box-shadow 0.3s ease;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
			will-change: transform;
		}
		.math-toggle-track.active .math-toggle-knob {
			transform: translateX(22px);
			background: #ffffff;
			box-shadow: 0 2px 12px rgba(137, 180, 250, 0.5);
		}
		.math-toggle:active .math-toggle-knob { transform: scale(0.9) translateX(0); }
		.math-toggle-track.active:active .math-toggle-knob { transform: scale(0.9) translateX(22px); }
		.math-toggle-status {
			font-size: 12px; color: #6c7086; min-width: 32px; font-weight: 600;
			transition: color 0.3s ease;
		}
		.math-toggle.active .math-toggle-status { color: #89b4fa; }

		/* ── 输入 / 下拉 ── */
		.math-settings-input, .math-settings-select {
			background: #1e1e32; border: 1px solid #313244; color: #cdd6f4;
			padding: 8px 16px; border-radius: 8px; font-size: 14px;
			font-family: inherit;
			transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease;
			min-width: 100px;
		}
		.math-settings-input:hover, .math-settings-select:hover {
			border-color: #45475a; background: #20203a;
		}
		.math-settings-input:focus, .math-settings-select:focus {
			outline: none; border-color: #89b4fa;
			box-shadow: 0 0 0 4px rgba(137, 180, 250, 0.15);
			transform: scale(1.02);
		}
		.math-settings-input { width: 90px; }
		.math-settings-select { min-width: 160px; cursor: pointer; }
		.math-settings-select option { background: #1a1a2e; padding: 4px; }

		/* ── 底部 ── */
		.math-settings-footer {
			padding: 16px 32px 20px;
			border-top: 1px solid #2a2a3e;
			display: flex; justify-content: flex-end; gap: 14px;
			flex-shrink: 0; background: #1c1c2e;
		}
		.math-settings-btn {
			padding: 10px 30px; border: none; border-radius: 10px;
			cursor: pointer; font-size: 14px; font-weight: 600;
			letter-spacing: 0.3px;
			transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.25s ease, background 0.25s ease;
			will-change: transform;
		}
		.math-settings-btn:active { transform: scale(0.95); }
		.math-settings-btn-primary {
			background: linear-gradient(135deg, #89b4fa, #74a7f5); color: #1a1a2e;
			box-shadow: 0 4px 20px rgba(137, 180, 250, 0.3);
		}
		.math-settings-btn-primary:hover {
			transform: translateY(-2px);
			box-shadow: 0 6px 28px rgba(137, 180, 250, 0.5);
			background: linear-gradient(135deg, #b4befe, #89b4fa);
		}
		.math-settings-btn-secondary { background: #313244; color: #cdd6f4; }
		.math-settings-btn-secondary:hover {
			background: #45475a; transform: translateY(-2px);
			box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
		}

		/* ── 条件行展开动画 ── */
		.math-cond-enter {
			animation: mathCondExpand 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
		}
		@keyframes mathCondExpand {
			from { opacity: 0; transform: translateY(-8px); max-height: 0; }
			to   { opacity: 1; transform: translateY(0); max-height: 200px; }
		}

		/* ── 页面切换动画 ── */
		.math-page-enter {
			animation: mathPageIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
		}
		@keyframes mathPageIn {
			from { opacity: 0; transform: translateX(12px); }
			to   { opacity: 1; transform: translateX(0); }
		}

		@media (prefers-reduced-motion: reduce) {
			.math-settings-overlay, .math-settings-modal,
			.math-settings-nav-btn, .math-toggle-track, .math-toggle-knob,
			.math-settings-btn, .math-settings-note, .math-setting-item,
			.math-cond-enter, .math-page-enter, .math-settings-title {
				animation: none !important;
				transition-duration: 0.01ms !important;
			}
		}
	`;
		document.head.appendChild(style);
	}

	// ═══════════════════════════════════════════════════════════════
	//  ✦ 数据化设置面板 DataSettingsModal
	// ═══════════════════════════════════════════════════════════════
	class DataSettingsModal {
		constructor(config) {
			this.config = config;
			this.pages = config.pages || [];
			this.values = { ...config.initialValues };
			this.onSave = config.onSave || (() => {});
			this.onCancel = config.onCancel || (() => {});
			this.onChange = config.onChange || (() => {});
			this.activePage = 0;
			this._closing = false;
			this._build();
			this._render();
			this._bind();
			this._open();
		}

		_build() {
			this.overlay = document.createElement('div');
			this.overlay.className = 'math-settings-overlay';

			this.modal = document.createElement('div');
			this.modal.className = 'math-settings-modal';
			this.modal.tabIndex = -1;

			const header = document.createElement('div');
			header.className = 'math-settings-header';
			const title = document.createElement('h2');
			title.className = 'math-settings-title';
			title.textContent = this.config.title || lang("Setting");
			const closeBtn = document.createElement('button');
			closeBtn.className = 'math-settings-close';
			closeBtn.textContent = '✕';
			closeBtn.dataset.action = 'close';
			header.append(title, closeBtn);

			this.body = document.createElement('div');
			this.body.className = 'math-settings-body';

			this.sidebar = document.createElement('div');
			this.sidebar.className = 'math-settings-sidebar';

			this.navButtons = [];
			this.pages.forEach((page, idx) => {
				const btn = document.createElement('button');
				btn.className = 'math-settings-nav-btn';
				btn.dataset.page = String(idx);

				const iconSpan = document.createElement('span');
				iconSpan.className = 'nav-icon';
				iconSpan.textContent = page.emoji || '📄';

				const labelSpan = document.createElement('span');
				labelSpan.className = 'nav-label';
				labelSpan.textContent = page.title;

				const badgeSpan = document.createElement('span');
				badgeSpan.className = 'nav-badge';
				badgeSpan.textContent = String(page.data.length);

				btn.append(iconSpan, labelSpan, badgeSpan);
				this.sidebar.appendChild(btn);
				this.navButtons.push(btn);
			});

			this.content = document.createElement('div');
			this.content.className = 'math-settings-content';

			this.body.append(this.sidebar, this.content);
			this.modal.appendChild(header);
			this.modal.appendChild(this.body);

			const footer = document.createElement('div');
			footer.className = 'math-settings-footer';

			const cancelBtn = document.createElement('button');
			cancelBtn.className = 'math-settings-btn math-settings-btn-secondary';
			cancelBtn.textContent = this.config.cancelText || lang("Close");
			cancelBtn.dataset.action = 'cancel';

			const saveBtn = document.createElement('button');
			saveBtn.className = 'math-settings-btn math-settings-btn-primary';
			saveBtn.textContent = this.config.saveText || lang("Save");
			saveBtn.dataset.action = 'save';

			footer.append(cancelBtn, saveBtn);
			this.modal.appendChild(footer);
			this.overlay.appendChild(this.modal);
		}

		_bind() {
			this.overlay.addEventListener('click', (e) => {
				if (e.target === this.overlay) this.close(false);
			});
			this.modal.addEventListener('click', (e) => {
				const action = e.target.dataset.action;
				if (action === 'close' || action === 'cancel') { this.close(false); }
				else if (action === 'save') { this.close(true); }
			});
			this.sidebar.addEventListener('click', (e) => {
				const btn = e.target.closest('.math-settings-nav-btn');
				if (!btn) return;
				const newPage = Number(btn.dataset.page);
				if (newPage === this.activePage) return;
				this.activePage = newPage;
				this._renderContent(true);
				this._updateNav();
			});
			this.content.addEventListener('click', (e) => {
				const toggle = e.target.closest('.math-toggle');
				if (!toggle) return;
				const key = toggle.dataset.key;
				this._setValue(key, !this.values[key]);
			});
			this.content.addEventListener('change', (e) => {
				const target = e.target;
				if (target.classList.contains('math-settings-input')) {
					const key = target.dataset.key;
					const type = target.type;
					let val;
					if (type === 'number') {
						val = parseInt(target.value, 10);
						if (isNaN(val) || val < 0) { target.value = this.values[key]; return; }
					} else {
						val = target.value;
					}
					this._setValue(key, val);
					return;
				}
				if (target.classList.contains('math-settings-select')) {
					const key = target.dataset.key;
					this._setValue(key, target.value);
				}
			});
			this._escHandler = (e) => {
				if (e.key === 'Escape' && !this._closing) this.close(false);
			};
			document.addEventListener('keydown', this._escHandler);
		}

		_render() {
			this._renderContent(false);
			this._updateNav();
		}

		_updateNav() {
			this.navButtons.forEach((btn, idx) => {
				btn.classList.toggle('active', idx === this.activePage);
			});
		}
		

		_renderContent(animate) {
			this.content.innerHTML = '';
			const page = this.pages[this.activePage];
			if (!page) return;

			const container = document.createElement('div');
			container.className = 'math-settings-compute';
			if (animate) container.classList.add('math-page-enter');

			for (const row of page.data) {
				const rowEl = this._renderRow(row, page.data);
				if (rowEl) container.appendChild(rowEl);
			}
			this.content.appendChild(container);
		}

		_isConditional(comp) {
			if (!comp || typeof comp.type !== 'string') return false;
			return comp.type === ComponentType.If.Text ||
				comp.type === ComponentType.If.Boolean ||
				comp.type === ComponentType.If.Number ||
				comp.type === ComponentType.If.Menu;
		}
		_checkShow(comp, data) {
			const show = comp.show;
			if (show === undefined) return true;
			if (typeof show === 'function') return !!show(this.values, data);
			return !!show;
		}

		_renderRow(row, data) {
			if (!Array.isArray(row) || row.length === 0) return null;

			if (row.length === 1) {
				const comp = row[0];
				if (this._isConditional(comp) && !this._checkShow(comp, data)) return null;
				const el = this._renderComponent(comp, data);
				if (!el) return null;
				if (this._isConditional(comp)) el.classList.add('math-cond-enter');
				return el;
			}

			const visible = row.filter(c => !this._isConditional(c) || this._checkShow(c, data));
			if (visible.length === 0) return null;

			const text = visible.find(c =>
				c.type === ComponentType.Text || c.type === ComponentType.If.Text
			);
			const input = visible.find(c =>
				c.type === ComponentType.Input.Boolean ||
				c.type === ComponentType.Input.Number ||
				c.type === ComponentType.Input.Text ||
				c.type === ComponentType.Menu ||
				c.type === ComponentType.If.Boolean ||
				c.type === ComponentType.If.Number ||
				c.type === ComponentType.If.Menu
			);

			if (text && input) {
				const rowEl = this._createLabeledRow(text, input);
				if (this._isConditional(text) || this._isConditional(input)) {
					rowEl.classList.add('math-cond-enter');
				}
				return rowEl;
			}

			const wrapper = document.createElement('div');
			for (const comp of visible) {
				const el = this._renderComponent(comp, data);
				if (el) wrapper.appendChild(el);
			}
			return wrapper;
		}

		_createTip(content) {
			const el = document.createElement('div');
			el.className = 'math-settings-note';
			el.textContent = content;
			return el;
		}

		_createTextWithTip(comp) {
			const wrap = document.createElement('div');
			wrap.className = 'math-setting-label';

			const text = document.createElement('span');
			text.className = 'math-setting-label-text';
			text.textContent = comp.content;
			wrap.appendChild(text);

			if (comp.tip) {
				const tip = document.createElement('span');
				tip.className = 'math-setting-desc';
				tip.textContent = comp.tip;
				wrap.appendChild(tip);
			}
			return wrap;
		}

		_createBooleanInput(comp) {
			const key = comp.key;
			const value = this.values[key] ?? comp.content ?? false;

			const toggle = document.createElement('div');
			toggle.className = 'math-toggle';
			toggle.dataset.key = key;

			const track = document.createElement('div');
			track.className = 'math-toggle-track';
			const knob = document.createElement('div');
			knob.className = 'math-toggle-knob';
			track.appendChild(knob);

			const status = document.createElement('span');
			status.className = 'math-toggle-status';
			status.textContent = value ? lang("ON") : lang("OFF");

			toggle.append(track, status);

			if (value) {
				requestAnimationFrame(() => {
					toggle.classList.add('active');
					track.classList.add('active');
				});
			}
			return toggle;
		}

		_createNumberInput(comp) {
			const key = comp.key;
			const input = document.createElement('input');
			input.type = 'number';
			input.className = 'math-settings-input';
			input.dataset.key = key;
			input.min = 0;
			input.step = 1;
			input.value = this.values[key] ?? comp.content ?? 0;
			return input;
		}

		_createTextInput(comp) {
			const key = comp.key;
			const input = document.createElement('input');
			input.type = 'text';
			input.className = 'math-settings-input';
			input.dataset.key = key;
			input.value = this.values[key] ?? comp.content ?? '';
			return input;
		}

		_createMenu(comp) {
			const key = comp.key;
			const options = (comp.content || []).map(item => {
				if (item && typeof item === 'object') {
					return { value: item.value, label: item.text ?? String(item.value) };
				}
				return { value: item, label: String(item) };
			});
			const select = document.createElement('select');
			select.className = 'math-settings-select';
			select.dataset.key = key;
			for (const opt of options) {
				const el = document.createElement('option');
				el.value = opt.value;
				el.textContent = opt.label;
				select.appendChild(el);
			}
			const defaultValue = this.values[key] ?? options[0]?.value;
			select.value = defaultValue;
			return select;
		}

		_createLabeledRow(textComp, inputComp) {
			const item = document.createElement('div');
			item.className = 'math-setting-item';

			const label = document.createElement('div');
			label.className = 'math-setting-label';

			const labelText = document.createElement('span');
			labelText.className = 'math-setting-label-text';
			labelText.textContent = textComp.content;
			label.appendChild(labelText);

			if (textComp.tip) {
				const desc = document.createElement('span');
				desc.className = 'math-setting-desc';
				desc.textContent = textComp.tip;
				label.appendChild(desc);
			}

			const control = this._renderComponent(inputComp, null);
			item.append(label, control);
			return item;
		}

		_renderComponent(comp, data) {
			switch (comp.type) {
				case ComponentType.Text:
				case ComponentType.If.Text:
					return this._createTextWithTip(comp);
				case ComponentType.Tip:
					return this._createTip(comp.content);
				case ComponentType.Input.Boolean:
				case ComponentType.If.Boolean:
					return this._createBooleanInput(comp);
				case ComponentType.Input.Number:
				case ComponentType.If.Number:
					return this._createNumberInput(comp);
				case ComponentType.Input.Text:
					return this._createTextInput(comp);
				case ComponentType.Menu:
				case ComponentType.If.Menu:
					return this._createMenu(comp);
				default:
					return null;
			}
		}

		_pageHasConditional(pageIndex) {
			const page = this.pages[pageIndex];
			if (!page) return false;
			for (const row of page.data) {
				for (const comp of row) {
					if (this._isConditional(comp)) return true;
				}
			}
			return false;
		}

		_keyAffectsCondition(changedKey) {
			const page = this.pages[this.activePage];
			if (!page) return false;
			const data = page.data;
			for (const row of data) {
				for (const comp of row) {
					if (!this._isConditional(comp)) continue;
					const show = comp.show;
					if (typeof show !== 'function') continue;
					const depIndex = show.__index;
					if (!Number.isInteger(depIndex)) continue;
					const depComp = data[depIndex];
					const depKey = Array.isArray(depComp)
						? (depComp.find(c => c.key)?.key)
						: depComp?.key;
					if (depKey === changedKey) return true;
				}
			}
			return false;
		}

		_setValue(key, val) {
			const prevVal = this.values[key];
			this.values[key] = val;

			if (prevVal === val) return;

			this._syncDom(key, val);
			this.onChange(key, val, this.values);

			if (this._pageHasConditional(this.activePage) && this._keyAffectsCondition(key)) {
				this._renderContent(true);
			}
		}

		_syncDom(key, val) {
			const toggles = this.content.querySelectorAll('.math-toggle');
			for (const toggle of toggles) {
				if (toggle.dataset.key === key) {
					const track = toggle.querySelector('.math-toggle-track');
					const status = toggle.querySelector('.math-toggle-status');
					const isActive = Boolean(val);
					toggle.classList.toggle('active', isActive);
					track.classList.toggle('active', isActive);
					status.textContent = isActive ? lang("ON") : lang("OFF");
				}
			}
			const inputs = this.content.querySelectorAll('.math-settings-input');
			for (const input of inputs) {
				if (input.dataset.key === key) {
					if (document.activeElement !== input) input.value = val;
				}
			}
			const selects = this.content.querySelectorAll('.math-settings-select');
			for (const select of selects) {
				if (select.dataset.key === key) select.value = String(val);
			}
		}

		_open() {
			document.body.appendChild(this.overlay);
			void this.overlay.offsetWidth;
			this.overlay.classList.add('math-open');
			setTimeout(() => this.modal.focus(), 100);
		}

		close(save) {
			if (this._closing) return;
			this._closing = true;
			this.overlay.classList.add('math-closing');
			this.overlay.classList.remove('math-open');
			document.removeEventListener('keydown', this._escHandler);

			const finish = () => {
				if (this.overlay?.parentNode) {
					this.overlay.parentNode.removeChild(this.overlay);
				}
				if (save) { this.onSave({ ...this.values }); }
				else { this.onCancel(); }
			};
			setTimeout(finish, 260);
		}

		destroy() {
			if (this.overlay?.parentNode) {
				this.overlay.parentNode.removeChild(this.overlay);
			}
			document.removeEventListener('keydown', this._escHandler);
		}
	}
	// ═══════════════════════════════════════════════════════════════
	//  ✦ 数学局部域：全局作用域 key
	// ═══════════════════════════════════════════════════════════════
	const GLOBAL_SCOPE = '__math_global_scope__';
	class MathExtension {
		constructor() {
			this.runtime = Scratch.runtime;

			// ── 1. 先初始化「数学局部域」相关容器 ──
			//    因为 DecimalValue / HandleErrorMode 的 setter 依赖它们
			this._mathScopeCounter = 0;
			this._mathScopeStack = [GLOBAL_SCOPE];
			this._mathScopeSettings = {
				[GLOBAL_SCOPE]: { DecimalValue: 15, HandleErrorMode: 'throwError' }
			};

			// ── 2. 其它实例字段 ──
			this._powerCache = new Map();
			this._settings = {
				showGlobalTools: true,
				showSimpleOperator: true,
				showAdvancedOperator: true,
				showOtherOperator: true,
				showDynamicBlocks: true,
				showTagCount: false,
				showUnimportantBlocks: true,
				cacheLargeOp: false,
				formatReturn: true,
				formatCondition: true,
				formatValue: true,
				formatCategory: false,
				formatAttribute: false,
				infinityGuard: true,
				infinityFallback: 60,
    			smartPrecision: true,
				
			};

			// ── 3. 加载本地设置（此时 setter 可用）──
			this._loadSettings();

			// ── 4. 其它初始化 ──
			this._openSettings = this._openSettings.bind(this);

			this._blockDefs = Object.create(null);
			this.runtime.__mathExt = this;
			this._patchVisualReport();
		}
		
		// ═══════════════════════════════════════════════════════════
		//  ✦ 数学局部域：作用域管理
		// ═══════════════════════════════════════════════════════════

		// 当前作用域 key
		_getCurrentScopeKey() {
			if (!this._mathScopeStack || this._mathScopeStack.length === 0) {
				return GLOBAL_SCOPE;
			}
			return this._mathScopeStack[this._mathScopeStack.length - 1];
		}

		// 当前作用域设置
		_getCurrentSettings() {
			const key = this._getCurrentScopeKey() ?? GLOBAL_SCOPE;
			if (!this._mathScopeSettings[key]) {
				this._mathScopeSettings[key] = {
					DecimalValue: 15,
					HandleErrorMode: 'throwError'
				};
			}
			return this._mathScopeSettings[key];
		}

		// 读取精度
		get DecimalValue() {
			return this._getCurrentSettings().DecimalValue;
		}
		set DecimalValue(v) {
			// 无穷精度保护：开启时，把 Infinity 归一化为 fallback
			if (v === Infinity || v === -Infinity) {
				if (this._settings && this._settings.infinityGuard !== false) {
					const fb = Number(this._settings.infinityFallback);
					v = Number.isFinite(fb) && fb > 0 ? Math.floor(fb) : 60;
				}
			}
			this._getCurrentSettings().DecimalValue = v;
		}

		// 读取出错处理模式
		get HandleErrorMode() {
			return this._getCurrentSettings().HandleErrorMode;
		}
		set HandleErrorMode(v) {
			this._getCurrentSettings().HandleErrorMode = v;
		}

		_loadSettings() {
			try {
				const saved = localStorage.getItem('math_extension_settings');
				if (saved) {
					const parsed = JSON.parse(saved);
					if (parsed.showGlobalTools !== undefined) this._settings.showGlobalTools = parsed.showGlobalTools;
					if (parsed.showSimpleOperator !== undefined) this._settings.showSimpleOperator = parsed.showSimpleOperator;
					if (parsed.showAdvancedOperator !== undefined) this._settings.showAdvancedOperator = parsed.showAdvancedOperator;
					if (parsed.showOtherOperator !== undefined) this._settings.showOtherOperator = parsed.showOtherOperator;
					if (parsed.showDynamicBlocks !== undefined) this._settings.showDynamicBlocks = parsed.showDynamicBlocks;
					if (parsed.showTagCount !== undefined) this._settings.showTagCount = parsed.showTagCount;
					if (parsed.showUnimportantBlocks !== undefined) this._settings.showUnimportantBlocks = parsed.showUnimportantBlocks;
					if (parsed.cacheLargeOp !== undefined) this._settings.cacheLargeOp = parsed.cacheLargeOp;
					if (parsed.formatReturn !== undefined) this._settings.formatReturn = parsed.formatReturn;
					if (parsed.formatCondition !== undefined) this._settings.formatCondition = parsed.formatCondition;
					if (parsed.formatValue !== undefined) this._settings.formatValue = parsed.formatValue;
					if (parsed.formatCategory !== undefined) this._settings.formatCategory = parsed.formatCategory;
					if (parsed.formatAttribute !== undefined) this._settings.formatAttribute = parsed.formatAttribute;
					if (parsed.infinityGuard !== undefined) this._settings.infinityGuard = parsed.infinityGuard;
					if (parsed.infinityFallback !== undefined) this._settings.infinityFallback = parsed.infinityFallback;
					if (parsed.smartPrecision !== undefined) this._settings.smartPrecision = parsed.smartPrecision;
					if (parsed.DecimalValue !== undefined) this.DecimalValue = parsed.DecimalValue;
					if (parsed.HandleErrorMode !== undefined) this.HandleErrorMode = parsed.HandleErrorMode;
				}
			} catch (e) {}
		}
		_saveSettings() {
			try {
				localStorage.setItem('math_extension_settings', JSON.stringify({
					showGlobalTools: this._settings.showGlobalTools,
					showSimpleOperator: this._settings.showSimpleOperator,
					showAdvancedOperator: this._settings.showAdvancedOperator,
					showOtherOperator: this._settings.showOtherOperator,
					showDynamicBlocks: this._settings.showDynamicBlocks,
					showTagCount: this._settings.showTagCount,
					showUnimportantBlocks: this._settings.showUnimportantBlocks,
					cacheLargeOp: this._settings.cacheLargeOp,
					formatReturn: this._settings.formatReturn,
					formatCondition: this._settings.formatCondition,
					formatValue: this._settings.formatValue,
					formatCategory: this._settings.formatCategory,
					formatAttribute: this._settings.formatAttribute,
					infinityGuard: this._settings.infinityGuard,
					infinityFallback: this._settings.infinityFallback,
					smartPrecision: this._settings.smartPrecision,
					DecimalValue: this.DecimalValue,
					HandleErrorMode: this.HandleErrorMode
				}));
			} catch (e) {}
		}

		_patchVisualReport() {
			const runtime = this.runtime;
			const Blockly = runtime.scratchBlocks || window.ScratchBlocks;
			if (!Blockly) {
				console.warn(lang("ErrorPrefix"), "ScratchBlocks not found, skip visualReport patch");
				return;
			}
			if (runtime.__mathOriginalVisualReport) {
				runtime.visualReport = runtime.__mathOriginalVisualReport;
				runtime.__mathOriginalVisualReport = null;
			} else if (runtime.__mathVisualReportPatched && runtime.visualReport) {
				const cur = runtime.visualReport;
				if (cur && cur.__mathOrig) { runtime.visualReport = cur.__mathOrig; }
			}
			runtime.__mathVisualReportPatched = false;

			const origVisualReport = runtime.visualReport ? runtime.visualReport.bind(runtime) : null;
			runtime.__mathOriginalVisualReport = origVisualReport;

			const self = this;
			const getOpcode = (blockId) => {
				try {
					const workspace = Blockly.getMainWorkspace();
					const block = workspace.getBlockById(blockId);
					if (!block || !block.type) return null;
					const prefix = 'NewMathExtension_';
					if (block.type.startsWith(prefix)) return block.type.slice(prefix.length);
					const idx = block.type.indexOf('_');
					return idx >= 0 ? block.type.slice(idx + 1) : block.type;
				} catch (e) { return null; }
			};

			const buildTypedHtml = (value, opcode) => {
				const wrap = document.createElement('div');
				wrap.style.cssText = 'display:flex;flex-direction:column;padding:2px;overflow:auto;line-height:1.3;min-width:120px;';

				const rowStyle = 'display:flex;gap:8px;align-items:flex-start;';
				const labelStyle = 'font-weight:bold;white-space:nowrap;color:#333;';
				const valueStyle = 'color:#666;overflow:auto;white-space:pre-wrap;word-break:break-all;';

				const showCond = self._settings.formatCondition !== false;
				const showCategory = self._settings.formatCategory === true;
				const showVal = self._settings.formatValue !== false;
				const showAttr = self._settings.formatAttribute === true;

				const isNumeric = self._isNumericValue(value);
				const bubbleType = self._bubbleType(value);
				const bubbleCause = self._bubbleCause(value, opcode);

				// ── 类型 ──
				if (showCond) {
					const row = document.createElement('div');
					row.style.cssText = rowStyle;
					const label = document.createElement('span');
					label.style.cssText = labelStyle;
					label.textContent = lang("Type");
					const valSpan = document.createElement('span');
					valSpan.style.cssText = valueStyle;
					valSpan.innerText = bubbleType;
					row.append(label, valSpan);
					wrap.appendChild(row);
				}

				// ── 原因（仅非数字/错误时显示）──
				if (bubbleCause) {
					const row = document.createElement('div');
					row.style.cssText = rowStyle;
					const label = document.createElement('span');
					label.style.cssText = labelStyle;
					label.textContent = getError('TypeReason') || '原因';
					const valSpan = document.createElement('span');
					valSpan.style.cssText = valueStyle;
					valSpan.innerText = bubbleCause;
					row.append(label, valSpan);
					wrap.appendChild(row);
				}

				// ── 分类（仅数字时显示）──
				if (showCategory && isNumeric) {
					const row = document.createElement('div');
					row.style.cssText = rowStyle;
					const label = document.createElement('span');
					label.style.cssText = labelStyle;
					label.textContent = lang("Category");
					const valSpan = document.createElement('span');
					valSpan.style.cssText = valueStyle;
					valSpan.innerText = classifyByOpcode(opcode, value, self.DecimalValue);
					row.append(label, valSpan);
					wrap.appendChild(row);
				}

				// ── 值 ──
				if (showVal) {
					const row = document.createElement('div');
					row.style.cssText = rowStyle;
					const label = document.createElement('span');
					label.style.cssText = labelStyle;
					label.textContent = lang("Value");
					const valSpan = document.createElement('span');
					valSpan.style.cssText = valueStyle;
					valSpan.innerText = String(value);
					row.append(label, valSpan);
					wrap.appendChild(row);
				}

				// ── 属性表格（仅数字时显示，默认 OFF）──
				if (showAttr && isNumeric) {
					const attr = self._parseAttributes(value);

					const table = document.createElement('div');
					table.style.cssText = 'display:flex;flex-direction:column;gap:2px;margin-top:4px;'
						+ 'padding-top:4px;border-top:1px dashed #bbb;';

					const attrRows = [
						[lang("Sign"),    attr.sign],
						[lang("IntPart"), attr.int],
					];
					// 非整数才显示小数位
					if (attr.frac !== '') {
						attrRows.push([lang("FracPart"), attr.frac]);
					}
					// 仅循环小数才显示循环节
					if (attr.repetend !== null) {
						attrRows.push([lang("Repetend"), attr.repetend]);
					}

					for (const [label, val] of attrRows) {
						const row = document.createElement('div');
						row.style.cssText = rowStyle;
						const l = document.createElement('span');
						l.style.cssText = labelStyle;
						l.textContent = label;
						const v = document.createElement('span');
						v.style.cssText = valueStyle;
						v.innerText = val;
						row.append(l, v);
						table.appendChild(row);
					}
					wrap.appendChild(table);
				}

				if (!showCond && !showCategory && !showVal && !bubbleCause && !showAttr) {
					wrap.innerText = String(value);
				}
				return wrap;
			};

			const buildPlainHtml = (value) => {
				const wrap = document.createElement('div');
				wrap.style.cssText = 'padding:2px;overflow:auto;line-height:1.3;white-space:pre-wrap;word-break:break-all;color:#666;';
				wrap.innerText = String(value);
				return wrap;
			};

			const show = (blockId, buildFn) => {
				const workspace = Blockly.getMainWorkspace();
				const block = workspace.getBlockById(blockId);
				if (!block) return null;
				Blockly.DropDownDiv.hideWithoutAnimation();
				Blockly.DropDownDiv.clearContent();
				const contentDiv = Blockly.DropDownDiv.getContentDiv();
				const elem = buildFn();
				elem.className = 'valueReportBox';
				elem.style.maxWidth = 'none';
				contentDiv.appendChild(elem);
				Blockly.DropDownDiv.setColour(
					Blockly.Colours.valueReportBackground,
					Blockly.Colours.valueReportBorder
				);
				Blockly.DropDownDiv.showPositionedByBlock(workspace, block);
				return elem;
			};

			const patched = function(blockId, value) {
				try {
					const globalFormat = self._settings ? self._settings.formatReturn !== false : true;
					const opcode = getOpcode(blockId);
					if (opcode) {
						const def = self._blockDefs[opcode];
						const fmt = def && def.data ? def.data.returnFormat : undefined;
						const detailOn = self._settings.formatCondition !== false
							|| self._settings.formatValue !== false
							|| self._settings.formatCategory === true
							|| self._settings.formatAttribute === true;

						const isNumeric = self._isNumericValue(value);
						const isErrorLike = (value === false)
							|| (typeof value === 'string' && (
								value === 'NaN' ||
								value.startsWith(lang('ErrorPrefix')) ||
								/错误|Error/.test(value)
							));

						// ★ returnFormat === false：强制纯值，不做任何格式化
						if (fmt === false) {
							const res = show(blockId, () => buildPlainHtml(value));
							if (res) return res;
						}
						// 非数字 / 错误值：强制走 typed（这样才能显示 类型/原因/值）
						else if (globalFormat && (fmt === true || isErrorLike || !isNumeric) && detailOn) {
							const res = show(blockId, () => buildTypedHtml(value, opcode));
							if (res) return res;
						} else {
							const res = show(blockId, () => buildPlainHtml(value));
							if (res) return res;
						}
					}
				} catch (e) {
					console.warn(lang("ErrorPrefix"), e);
				}
				if (origVisualReport) return origVisualReport(blockId, value);
				return undefined;
			};

			patched.__mathOrig = origVisualReport;
			runtime.visualReport = patched;
			runtime.__mathVisualReportPatched = true;
		}

		_openSettings() {
			const pages = [
				makePage(lang("BlockClass"), 3, BlockClass, '📂'),
				makePage(lang("BlockChange"), 3, BlockChange, '🧩'),
				makePage(lang("OperatorChange"), 3, OperatorChange, '🧮'),
			];
			new DataSettingsModal({
				title: lang("Setting"),
				pages,
				saveText: lang("Save"),
				cancelText: lang("Close"),
				initialValues: {
					showGlobalTools: this._settings.showGlobalTools,
					showSimpleOperator: this._settings.showSimpleOperator,
					showAdvancedOperator: this._settings.showAdvancedOperator,
					showOtherOperator: this._settings.showOtherOperator,
					showDynamicBlocks: this._settings.showDynamicBlocks,
					showTagCount: this._settings.showTagCount,
					showUnimportantBlocks: this._settings.showUnimportantBlocks,
					cacheLargeOp: this._settings.cacheLargeOp,
					formatReturn: this._settings.formatReturn,
					formatCondition: this._settings.formatCondition,
					formatValue: this._settings.formatValue,
					formatCategory: this._settings.formatCategory,
					formatAttribute: this._settings.formatAttribute,
					infinityGuard: this._settings.infinityGuard,
					infinityFallback: this._settings.infinityFallback,
					decimalValue: this.DecimalValue,
					errorHandling: this.HandleErrorMode,
					smartPrecision: this._settings.smartPrecision,
				},
				onChange: (key, value) => {
					if (key === 'decimalValue') {
						this.DecimalValue = Number(value) || 15;
						this._powerCache.clear();
					} else if (key === 'errorHandling') {
						this.HandleErrorMode = value;
					} else if (key === 'cacheLargeOp') {
						this._settings.cacheLargeOp = value === true;
						this._powerCache.clear();
					} else if (key === 'infinityFallback') {
						this._settings.infinityFallback = Math.max(1, Number(value) || 60);
						this._powerCache.clear();
					} else if (key === 'smartPrecision') {              // ★ 新增
						this._settings.smartPrecision = value === true;
					} else {
						this._settings[key] = value;
					}
					this._saveSettings();
				},
				onSave: (values) => {
					this._settings.showGlobalTools = values.showGlobalTools !== false;
					this._settings.showSimpleOperator = values.showSimpleOperator !== false;
					this._settings.showAdvancedOperator = values.showAdvancedOperator !== false;
					this._settings.showOtherOperator = values.showOtherOperator !== false;
					this._settings.showDynamicBlocks = values.showDynamicBlocks !== false;
					this._settings.showTagCount = values.showTagCount === true;
					this._settings.showUnimportantBlocks = values.showUnimportantBlocks !== false;
					const prevCache = this._settings.cacheLargeOp;
					this._settings.cacheLargeOp = values.cacheLargeOp === true;
					if (prevCache !== this._settings.cacheLargeOp) { this._powerCache.clear(); }
					this._settings.formatReturn = values.formatReturn !== false;
					this._settings.formatCondition = values.formatCondition !== false;
					this._settings.formatValue = values.formatValue !== false;
					this._settings.formatAttribute = values.formatAttribute === true;
					this._settings.infinityGuard = values.infinityGuard !== false;
					this._settings.infinityFallback = Math.max(1, Number(values.infinityFallback) || 60);
					this.DecimalValue = Number(values.decimalValue) || 15;
					this.HandleErrorMode = values.errorHandling || 'throwError';
					this._settings.formatCategory = values.formatCategory === true;
					this._settings.smartPrecision = values.smartPrecision !== false;
					this._saveSettings();
					if (this.runtime?.emit) { this.runtime.emit('TOOLBOX_EXTENSIONS_NEED_UPDATE'); }
				},
				onCancel: () => this._loadSettings()
			});
		}
		_filterBlocksBySettings(blocks) {
			const globalVisible = this._settings.showGlobalTools !== false;
			const simpleVisible = this._settings.showSimpleOperator !== false;
			const advancedVisible = this._settings.showAdvancedOperator !== false;
			const otherVisible = this._settings.showOtherOperator !== false;
			const dynamicVisible = this._settings.showDynamicBlocks !== false;
			const showCount = this._settings.showTagCount === true;
			const unimportantVisible = this._settings.showUnimportantBlocks !== false;

			const isTag = (block) => {
				if (typeof block === 'string') return true;
				return block && block.blockType === BlockType.LABEL;
			};
			const classVisibility = {
				'All': globalVisible,
				'SimpleOperator': simpleVisible,
				'AdvancedOperator': advancedVisible,
				'OtherOperator': otherVisible,
			};
			const getBlockClass = (block) => {
				const cls = block?.data?.Class;
				if (cls && classVisibility[cls] !== undefined) return cls;
				return 'All';
			};
			const isBlockVisible = (block) => {
				const cls = getBlockClass(block);
				if (!classVisibility[cls]) return false;
				if (!dynamicVisible && block && block.dynamicArgsInfo) return false;
				if (!unimportantVisible && block?.data?.Type === 'Unimportant') return false;
				return true;
			};

			const staged = [];
			for (const block of blocks) {
				if (block && block.opcode === 'openSettings') { staged.push(block); continue; }
				if (isTag(block)) { staged.push({ __isTag: true, __raw: block }); continue; }
				if (isBlockVisible(block)) { staged.push(block); }
			}
			const finalResult = [];
			for (let i = 0; i < staged.length; i++) {
				const item = staged[i];
				if (!item.__isTag) { finalResult.push(item); continue; }
				let ownerClass = null;
				for (let j = i + 1; j < staged.length; j++) {
					const next = staged[j];
					if (next.__isTag) continue;
					if (next.opcode === 'openSettings') continue;
					ownerClass = getBlockClass(next);
					break;
				}
				if (ownerClass === null) ownerClass = 'All';
				if (!classVisibility[ownerClass]) continue;
				finalResult.push(item.__raw);
			}
			if (showCount) {
				const getTagClass = (tag) => {
					const text = typeof tag === 'string' ? tag : tag.text;
					if (typeof text !== 'string') return null;
					const clean = text.replace(/^-+/, '').replace(/\(\d+\)$/, '');
					if (clean === getTag('All')) return 'All';
					if (clean === getTag('SimpleOperator')) return 'SimpleOperator';
					if (clean === getTag('AdvancedOperator')) return 'AdvancedOperator';
					if (clean === getTag('OtherOperator')) return 'OtherOperator';
					return null;
				};
				const counts = { All: 0, SimpleOperator: 0, AdvancedOperator: 0, OtherOperator: 0 };
				for (const block of finalResult) {
					if (isTag(block)) continue;
					if (block && block.opcode === 'openSettings') continue;
					const cls = getBlockClass(block);
					if (counts[cls] !== undefined) counts[cls]++;
				}
				for (let i = 0; i < finalResult.length; i++) {
					const block = finalResult[i];
					if (!isTag(block)) continue;
					const cat = getTagClass(block);
					if (!cat) continue;
					const count = counts[cat] ?? 0;
					const originalText = getTag(cat);
					const newText = `${originalText}(${count})`;
					if (typeof block === 'string') { finalResult[i] = `---${newText}`; }
					else { finalResult[i] = { ...block, text: newText }; }
				}
			}
			return finalResult;
		}
		getInfo() {
			const blocks = [
				{
					opcode: 'openSettings',
					blockType: BlockType.BUTTON,
					text: lang("Setting"),
					onClick: this._openSettings
				},
				makeTag("All"),
				{
					opcode: "SetDecimal",
					blockType: BlockType.COMMAND,
					text: getText("SetDecimal"),
					arguments:
					{
						Decimal:
						{
							type: ArgumentType.NUMBER,
							defaultValue: 15
						}
					},
					tooltip: getTips("SetDecimal"),
					data:
					{
						Type: CodeType.Important,
						Class: "All"
					}
				},
				{
					opcode: "HandleError",
					blockType: BlockType.COMMAND,
					text: getText("HandleError"),
					arguments:
					{
						Menu:
						{
							type: ArgumentType.STRING,
							menu: "ErrorHandleMenu",
							defaultValue: "false"
						}
					},
					tooltip: getTips("HandleError"),
					data:
					{
						Type: CodeType.Important,
						Class: "All"
					}
				},
				// { 有问题，暂时不处理
				// 	opcode: "LocalScope",
				// 	blockType: BlockType.CONDITIONAL,
				// 	text: getText("LocalScope"),
				// 	tooltip: getTips("LocalScope"),
				// 	data: {
				// 		Type:CodeType.Unimportant,
				// 		Class: "All"
				// 	}
				// },
				{
					opcode: "Decimal",
					blockType: BlockType.REPORTER,
					text: getText("Decimal"),
					tooltip: getTips("Decimal"),
					data:
					{
						Type: CodeType.Unimportant,
						Class: "All",
						returnFormat: false
					}
				},
				{
					opcode: "WhenError",
					blockType: BlockType.REPORTER,
					text: getText("WhenError"),
					tooltip: getTips("WhenError"),
					data:
					{
						Type: CodeType.Unimportant,
						Class: "All",
						returnFormat: false
					}
				},
				{
					opcode: 'ExtractTruth',
					blockType: BlockType.REPORTER,
					text: getText("ExtractTruth"),
					arguments:
					{
						VALUE:
						{
							type: ArgumentType.STRING,
							defaultValue: ''
						}
					},
					tooltip: getTips("ExtractTruth"),
					data:
					{
						Type: CodeType.Important,
						Class: "All",
						returnFormat: false
					}
				},
				makeTag("SimpleOperator"),
				{
					opcode: "Add",
					blockType: BlockType.REPORTER,
					text: getText("Add"),
					arguments:
					{
						Addend1:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "1"
						},
						Addend2:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "1"
						},
					},
					...Color.Operator,
					tooltip: getTips("Add"),
					data:
					{
						Type: CodeType.Important,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Adds",
					blockType: BlockType.REPORTER,
					text: getText("Add"),
					arguments:
					{
						Addend1:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "1"
						},
						Addend2:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "1"
						},
					},
					dynamicArgsInfo:
					{
						dynamicArgTypes: ["n"],
						afterArg: "Addend2",
						joinCh: "+",
						defaultValues: "1"
					},
					...Color.Operator,
					tooltip: getTips("Adds"),
					data:
					{
						Type: CodeType.Important,
						DynamicArg: true,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Subtract",
					blockType: BlockType.REPORTER,
					text: getText("Subtract"),
					arguments:
					{
						Minuend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Subtrahend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "1"
						},
					},
					...Color.Operator,
					tooltip: getTips("Subtract"),
					data:
					{
						Type: CodeType.Important,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Subtracts",
					blockType: BlockType.REPORTER,
					text: getText("Subtract"),
					arguments:
					{
						Minuend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Subtrahend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "1"
						},
					},
					dynamicArgsInfo:
					{
						dynamicArgTypes: ["n"],
						afterArg: "Subtrahend",
						joinCh: "-",
						defaultValues: "1"
					},
					...Color.Operator,
					tooltip: getTips("Subtracts"),
					data:
					{
						Type: CodeType.Important,
						DynamicArg: true,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Multiply",
					blockType: BlockType.REPORTER,
					text: getText("Multiply"),
					arguments:
					{
						Multiplier1:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Multiplier2:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
					},
					...Color.Operator,
					tooltip: getTips("Multiply"),
					data:
					{
						Type: CodeType.Important,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Multiplies",
					blockType: BlockType.REPORTER,
					text: getText("Multiply"),
					arguments:
					{
						Multiplier1:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Multiplier2:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
					},
					dynamicArgsInfo:
					{
						dynamicArgTypes: ["n"],
						afterArg: "Multiplier2",
						joinCh: "×",
						defaultValues: "2"
					},
					...Color.Operator,
					tooltip: getTips("Multiplies"),
					data:
					{
						Type: CodeType.Important,
						DynamicArg: true,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Divide",
					blockType: BlockType.REPORTER,
					text: getText("Divide"),
					arguments:
					{
						Dividend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "4"
						},
						Divisor:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
					},
					...Color.Operator,
					tooltip: getTips("Divide"),
					data:
					{
						Type: CodeType.Important,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Divides",
					blockType: BlockType.REPORTER,
					text: getText("Divide"),
					arguments:
					{
						Dividend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "8"
						},
						Divisor:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
					},
					dynamicArgsInfo:
					{
						dynamicArgTypes: ["n"],
						afterArg: "Divisor",
						joinCh: "÷",
						defaultValues: "2"
					},
					...Color.Operator,
					tooltip: getTips("Divides"),
					data:
					{
						Type: CodeType.Important,
						DynamicArg: true,
						Class: "SimpleOperator",
						returnFormat: true
					}
				}, '---',
				{
					opcode: "Remainder",
					blockType: BlockType.REPORTER,
					text: getText("Remainder"),
					arguments:
					{
						Dividend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "5"
						},
						Divisor:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
					},
					...Color.Operator,
					tooltip: getTips("Remainder"),
					data:
					{
						Type: CodeType.Important,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Remainders",
					blockType: BlockType.REPORTER,
					text: getText("Divide"),
					arguments:
					{
						Dividend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "3"
						},
						Divisor:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
					},
					dynamicArgsInfo:
					{
						dynamicArgTypes: ["n"],
						afterArg: "Divisor",
						joinCh: getText("Div"),
						endText: getText("Mod"),
						defaultValues: "2"
					},
					...Color.Operator,
					tooltip: getTips("Remainders"),
					data:
					{
						Type: CodeType.Important,
						DynamicArg: true,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Quotient",
					blockType: BlockType.REPORTER,
					text: getText("Quotient"),
					arguments:
					{
						Dividend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "5"
						},
						Divisor:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
					},
					...Color.Operator,
					tooltip: getTips("Quotient"),
					data:
					{
						Type: CodeType.Important,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "DivideWithPrecision",
					blockType: BlockType.REPORTER,
					text: getText("DivideWithPrecision"),
					arguments:
					{
						Dividend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "8"
						},
						Divisor:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Decimal:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "15"
						}
					},
					...Color.Operator,
					tooltip: getTips("DivideWithPrecision"),
					data:
					{
						Type: CodeType.Important,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				{
					opcode: "DivBy",
					blockType: BlockType.REPORTER,
					text: getText("DivBy"),
					arguments:
					{
						Dividend:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Divisor:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "8"
						},
					},
					...Color.Operator,
					tooltip: getTips("DivBy"),
					data:
					{
						Type: CodeType.Unimportant,
						Class: "SimpleOperator",
						returnFormat: true
					}
				},
				makeTag("AdvancedOperator"),
				{
					opcode: "Power",
					blockType: BlockType.REPORTER,
					text: getText("Power"),
					arguments:
					{
						Base:
						{
							type: ArgumentType.NUMBER,
							defaultValue: 2
						},
						Index:
						{
							type: ArgumentType.NUMBER,
							defaultValue: 3
						}
					},
					...Color.Operator,
					tooltip: getTips("Power"),
					data:
					{
						Type: CodeType.Important,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Powers",
					blockType: BlockType.REPORTER,
					text: getText("Power"),
					arguments:
					{
						Base:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Index:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "3"
						},
					},
					dynamicArgsInfo:
					{
						dynamicArgTypes: ["n"],
						afterArg: "Index",
						joinCh: "^",
						defaultValues: "1"
					},
					...Color.Operator,
					tooltip: getTips("Powers"),
					data:
					{
						Type: CodeType.Important,
						DynamicArg: true,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Root",
					blockType: BlockType.REPORTER,
					text: getText("Root"),
					arguments:
					{
						Index:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Radicand:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "4"
						}
					},
					...Color.Operator,
					tooltip: getTips("Root"),
					data:
					{
						Type: CodeType.Important,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Roots",
					blockType: BlockType.REPORTER,
					text: getText("Root"),
					arguments:
					{
						Index:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Radicand:
						{
							type: ArgumentType.NUMBER,
							defaultValue: "8"
						}
					},
					dynamicArgsInfo:
					{
						dynamicArgTypes: ["n"],
						afterArg: "Radicand",
						joinCh: "√",
						defaultValues: "2"
					},
					...Color.Operator,
					tooltip: getTips("Roots"),
					data:
					{
						Type: CodeType.Unimportant,
						DynamicArg: true,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "RootWithPrecision",
					blockType: BlockType.REPORTER,
					text: getText("RootWithPrecision"),
					arguments: {
						Index: {
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Radicand: {
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Decimal: {
							type: ArgumentType.NUMBER,
							defaultValue: "15"
						}
					},
					...Color.Operator,
					tooltip: getTips("RootWithPrecision"),
					data: {
						Type: CodeType.Important,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Logarithm",
					blockType: BlockType.REPORTER,
					text: getText("Logarithm"),
					arguments: {
						Base: {
							type: ArgumentType.NUMBER,
							defaultValue: "10"
						},
						Logarithm: {
							type: ArgumentType.NUMBER,
							defaultValue: "100"
						}
					},
					...Color.Operator,
					tooltip: getTips("Logarithm"),
					data: {
						Type: CodeType.Important,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Logarithms",
					blockType: BlockType.REPORTER,
					text: getText("Logarithm2")+")",
					arguments: {
						Base: {
							type: ArgumentType.NUMBER,
							defaultValue: "10"
						},
						Logarithm: {
							type: ArgumentType.NUMBER,
							defaultValue: "100"
						}
					},
					dynamicArgsInfo: {
						dynamicArgTypes: ["n"],
						afterArg: "Base",
						joinCh: "( log",
						endText: (num) => ")".repeat(Math.max(0, num)),
						defaultValues: "10"
					},
					...Color.Operator,
					tooltip: getTips("Logarithms"),
					data: {
						Type: CodeType.Unimportant,
						DynamicArg: true,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "LogarithmWithPrecision",
					blockType: BlockType.REPORTER,
					text: getText("LogarithmWithPrecision"),
					arguments: {
						Base: {
							type: ArgumentType.NUMBER,
							defaultValue: "10"
						},
						Logarithm: {
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Decimal: {
							type: ArgumentType.NUMBER,
							defaultValue: "15"
						}
					},
					...Color.Operator,
					tooltip: getTips("LogarithmWithPrecision"),
					data: {
						Type: CodeType.Important,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Factorial",
					blockType: BlockType.REPORTER,
					text: getText("Factorial"),
					arguments: {
						Number: {
							type: ArgumentType.NUMBER,
							defaultValue: "5"
						}
					},
					...Color.Operator,
					tooltip: getTips("Factorial"),
					data: {
						Type: CodeType.Important,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "TrigonometricFunction",
					blockType: BlockType.REPORTER,
					text: getText("TrigonometricFunction"),
					arguments: {
						Func: {
							type: ArgumentType.STRING,
							menu: "TrigFuncMenu",
							defaultValue: "sin"
						},
						Number: {
							type: ArgumentType.NUMBER,
							defaultValue: "0"
						}
					},
					...Color.Operator,
					tooltip: getTips("TrigonometricFunction"),
					data: {
						Type: CodeType.Important,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "InverseTrigonometricFunction",
					blockType: BlockType.REPORTER,
					text: getText("InverseTrigonometricFunction"),
					arguments: {
						Func: {
							type: ArgumentType.STRING,
							menu: "InvTrigFuncMenu",
							defaultValue: "asin"
						},
						Number: {
							type: ArgumentType.NUMBER,
							defaultValue: "0.5"
						}
					},
					...Color.Operator,
					tooltip: getTips("InverseTrigonometricFunction"),
					data: {
						Type: CodeType.Important,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Atan2",
					blockType: BlockType.REPORTER,
					text: getText("Atan2"),
					arguments: {
						x: {
							type: ArgumentType.NUMBER,
							defaultValue: "1"
						},
						y: {
							type: ArgumentType.NUMBER,
							defaultValue: "1"
						}
					},
					...Color.Operator,
					tooltip: getTips("Atan2"),
					data: {
						Type: CodeType.Unimportant,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "CalculateExpression",
					blockType: BlockType.REPORTER,
					text: getText("CalculateExpression"),
					arguments: {
						Expression: {
							type: ArgumentType.STRING,
							defaultValue: "sin(30) + (2×3) ÷ (5 - (1+1))"
						}
					},
					...Color.Operator,
					tooltip: getTips("CalculateExpression"),
					data: {
						Type: CodeType.Important,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				'---',
				{
					opcode: "Summation",
					blockType: BlockType.REPORTER,
					text: getText("Summation"),
					arguments: {
						Number: {
							type: ArgumentType.NUMBER,
							defaultValue: "5"
						}
					},
					...Color.Operator,
					tooltip: getTips("Summation"),
					data: {
						Type: CodeType.Unimportant,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "DoubleFactorial",
					blockType: BlockType.REPORTER,
					text: getText("DoubleFactorial"),
					arguments: {
						Number: {
							type: ArgumentType.NUMBER,
							defaultValue: "5"
						}
					},
					...Color.Operator,
					tooltip: getTips("DoubleFactorial"),
					data: {
						Type: CodeType.Unimportant,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				{
					opcode: "Tetration",
					blockType: BlockType.REPORTER,
					text: getText("Tetration"),
					arguments: {
						Base: {
							type: ArgumentType.NUMBER,
							defaultValue: "2"
						},
						Index: {
							type: ArgumentType.NUMBER,
							defaultValue: "3"
						}
					},
					...Color.Operator,
					tooltip: getTips("Tetration"),
					data: {
						Type: CodeType.Unimportant,
						Class: "AdvancedOperator",
						returnFormat: true
					}
				},
				makeTag("OtherOperator"),
				{
					opcode: "Negate",
					blockType: BlockType.REPORTER,
					text: getText("Negate"),
					arguments: {
						Number: {
							type: ArgumentType.NUMBER,
							defaultValue: "1"
						}
					},
					...Color.Operator,
					tooltip: getTips("Negate"),
					data: {
						Type: CodeType.Important,
						Class: "OtherOperator",
						returnFormat: true
					}
				},
			];

			this._blockDefs = Object.create(null);
			for (const b of blocks) {
				if (b && typeof b === 'object' && b.opcode) {
					this._blockDefs[b.opcode] = b;
				}
			}

			return {
				id: "newmathextension",
				name: lang("Name"),
				color1: "#6859ff",
				color2: "#5e50e6",
				color3: "#5347cc",
				blocks: this._filterBlocksBySettings(blocks),
				menus: {
					ErrorHandleMenu: {
						items: [
							{ text: getMenu("ReturnFalse"), value: "false" },
							{ text: getMenu("ReturnJSError"), value: "jsError" },
							{ text: getMenu("ThrowError"), value: "throwError" },
							{ text: getMenu("ReturnError"), value: "returnError" }
						]
					},
					TrigFuncMenu: {
						items: [
							{ text: 'sin', value: 'sin' },
							{ text: 'cos', value: 'cos' },
							{ text: 'tan', value: 'tan' },
							{ text: 'cot', value: 'cot' },
							{ text: 'sec', value: 'sec' },
							{ text: 'csc', value: 'csc' }
						]
					},
					InvTrigFuncMenu: {
						items: [
							{ text: 'asin', value: 'asin' },
							{ text: 'acos', value: 'acos' },
							{ text: 'atan', value: 'atan' },
							{ text: 'acot', value: 'acot' },
							{ text: 'asec', value: 'asec' },
							{ text: 'acsc', value: 'acsc' }
						]
					},
				}
			}
		}
		// 判断一个值是不是“正常数字”
		_isNumericValue(value) {
			if (typeof value === 'number') return Number.isFinite(value) || Number.isNaN(value) === false;
			if (typeof value !== 'string') return false;
			const s = value.trim();
			if (s === '' || s === 'undefined' || s === 'null' || s === 'NaN') return false;
			return Decimal.parse(s) !== null;
		}

		// 根据值推断“冒泡类型”
		_bubbleType(value) {
			if (value === false) return getError('TypeError') || '错误';
			if (value === true) return getType('Integer') || '整数';
			if (typeof value === 'number') {
				if (Number.isNaN(value)) return getError('TypeNaN') || '非数字';
				return Number.isInteger(value) ? getType('Integer') : getType('Decimal');
			}
			const s = String(value);
			if (s === 'NaN') return getError('TypeNaN') || '非数字';
			if (s.startsWith(lang('ErrorPrefix')) || /错误|Error/.test(s)) {
				return getError('TypeReason') || '原因';
			}
			const p = Decimal.parse(s);
			if (!p) return getError('TypeNaN') || '非数字';
			if (p.frac === '') return getType('Integer');
			return getType('Number') || '数字';
		}

		// 根据值推断“原因”
		_bubbleCause(value, opcode) {
			// 错误文本
			if (typeof value === 'string') {
				const s = value;
				if (s === 'NaN') return getErrorFromOp('InvalidNumberError').cause;
				if (/除数|DivideByZero|除以零/.test(s)) return getErrorFromOp('DivideByZeroError').cause;
				if (/0.*0.*幂|TwoZeroPower/.test(s)) return getErrorFromOp('TwoZeroPowerError').cause;
				if (/零.*负.*幂|ZeroAndNegativePower/.test(s)) return getErrorFromOp('ZeroAndNegativePowerError').cause;
				if (/偶次根|EvenRoot/.test(s)) return getErrorFromOp('EvenRootHasNegativeError').cause;
			}
			if (value === false) {
				return getErrorFromOp('UnknownOperatorError').cause;
			}
			return '';
		}

		/**
		 * 解析数值字符串的属性。
		 * 返回 { sign, int, frac, repetend }
		 *  - sign:     "+" / "-" / "0"（零无符号）
		 *  - int:      整数位
		 *  - frac:     小数位
		 *  - repetend: 循环节；不是循环小数时为 null
		 */
		_parseAttributes(value) {
			const p = Decimal.parse(String(value));
			if (!p) {
				return { sign: "", int: "", frac: "", repetend: null };
			}
			const sign = (p.int === '0' && p.frac === '')
				? '0'
				: (p.sign < 0 ? '-' : '+');
			const fracPart = p.frac;
			let repetend = null;
			if (fracPart.length >= 2) {
				repetend = this._findRepetend(fracPart);
			}
			return { sign, int: p.int, frac: fracPart, repetend };
		}

		/**
		 * 找出小数部分的循环节（最短重复单元）。
		 * 找不到返回 null。
		 */
		_findRepetend(frac) {
			const n = frac.length;
			for (let len = 1; len <= Math.floor(n / 2); len++) {
				const unit = frac.slice(0, len);
				let ok = true;
				for (let i = 0; i < n; i++) {
					if (frac[i] !== unit[i % len]) { ok = false; break; }
				}
				if (ok) return unit;
			}
			return null;
		}


		_norm(v) {
			const s = String(v ?? "0").trim();
			return (s === "" || s === "undefined" || s === "null" || s === "NaN") ? "0" : s;
		}

		// ── 全局工具 ──
		SetDecimal(args) {
			args = args || {};
			let n = Number(args.Decimal);
			if (n === Infinity || n === -Infinity) {
				if (this._settings.infinityGuard !== false) {
					// 保护开启：setter 会自动归一化为 fallback
					this.DecimalValue = Infinity;
					this._powerCache.clear();
					return;
				}
				const msg = getError("SetDecimalToInfinte");
				const ok = (typeof window !== "undefined" && typeof window.confirm === "function")
					? window.confirm(msg) : true;
				if (!ok) return;
				this.DecimalValue = Infinity;
				this._powerCache.clear();
				return;
			}
			if (!Number.isFinite(n) || n < 0) n = 15;
			this.DecimalValue = Math.floor(n);
			this._powerCache.clear();
		}

		HandleError(args) {
			args = args || {};
			const valid = ["false", "jsError", "throwError", "returnError"];
			if (!valid.includes(args.Menu)) {
				return _handleError("UnknownMenu", "NaN", { value: args.Menu });
			}
			this.HandleErrorMode = args.Menu;
		}

		Decimal() { return this.DecimalValue; }

		WhenError() {
			const mode = _currentMode();
			const v = _flat["HandleErrorModeText." + mode];
			if (v !== undefined) return v.zh !== undefined ? v.zh : v.en;
			return mode;
		}

		ExtractTruth(args) {
			args = args || {};
			const v = args.VALUE;
			if (typeof v === 'number') return String(v);
			if (typeof v === 'boolean') return v ? '1' : '0';
			if (typeof v === 'string') {
				const s = v.trim();
				if (s === '' || s === 'undefined' || s === 'null' || s === 'NaN') return '0';
				const p = Decimal.parse(s);
				if (!p) return '0';
				return Decimal._format(p.sign, p.int, p.frac);
			}
			return '0';
		}

		// ── 基础运算 ──
		Add(args) {
			args = args || {};
			return new Operator().Add(this._norm(args.Addend1), this._norm(args.Addend2));
		}

		Adds(args) {
			args = args || {};
			const nums = [this._norm(args.Addend1), this._norm(args.Addend2)];
			const rest = getDynamicArgs(args);
			for (let i = 0; i < rest.length; i++) nums.push(this._norm(rest[i]));
			return new Operator().Adds(...nums);
		}

		Subtract(args) {
			args = args || {};
			return new Operator().Subtract(this._norm(args.Minuend), this._norm(args.Subtrahend));
		}

		Subtracts(args) {
			args = args || {};
			const nums = [this._norm(args.Minuend), this._norm(args.Subtrahend)];
			const rest = getDynamicArgs(args);
			for (let i = 0; i < rest.length; i++) nums.push(this._norm(rest[i]));
			return new Operator().Subtracts(...nums);
		}

		Multiply(args) {
			args = args || {};
			return new Operator().Multiply(this._norm(args.Multiplier1), this._norm(args.Multiplier2));
		}

		Multiplies(args) {
			args = args || {};
			const nums = [this._norm(args.Multiplier1), this._norm(args.Multiplier2)];
			const rest = getDynamicArgs(args);
			for (let i = 0; i < rest.length; i++) nums.push(this._norm(rest[i]));
			return new Operator().Multiplies(...nums);
		}

		Divide(args) {
			args = args || {};
			return new Operator().Divide(this._norm(args.Dividend), this._norm(args.Divisor));
		}

		Divides(args) {
			args = args || {};
			const nums = [this._norm(args.Dividend), this._norm(args.Divisor)];
			const rest = getDynamicArgs(args);
			for (let i = 0; i < rest.length; i++) nums.push(this._norm(rest[i]));
			return new Operator().Divides(...nums);
		}

		DivideWithPrecision(args) {
			args = args || {};
			const precision = Number(args.Decimal);
			return new Operator().DivideWithPrecision(
				this._norm(args.Dividend), this._norm(args.Divisor), precision
			);
		}

		DivBy(args) {
			args = args || {};
			return new Operator().DivBy(this._norm(args.Dividend), this._norm(args.Divisor));
		}

		Remainder(args) {
			args = args || {};
			return new Operator().Remainder(this._norm(args.Dividend), this._norm(args.Divisor));
		}

		Remainders(args) {
			args = args || {};
			const nums = [this._norm(args.Dividend), this._norm(args.Divisor)];
			const rest = getDynamicArgs(args);
			for (let i = 0; i < rest.length; i++) nums.push(this._norm(rest[i]));
			return new Operator().Remainders(...nums);
		}

		Quotient(args) {
			args = args || {};
			return new Operator().Quotient(this._norm(args.Dividend), this._norm(args.Divisor));
		}

		// ── 高级运算 ──
		Power(args) {
			args = args || {};
			const base = this._norm(args.Base);
			const index = this._norm(args.Index);
			return this._powerMaybeCached(new Operator(), base, index);
		}

		_powerMaybeCached(op, base, index) {
			if (!this._settings.cacheLargeOp) return op.Power(base, index);
			const precision = this.DecimalValue;
			const key = `${base}|${index}|${precision}`;
			const cache = this._powerCache;
			if (cache.has(key)) return cache.get(key);
			const result = op.Power(base, index);
			if (typeof result === "string") {
				cache.set(key, result);
				if (cache.size > 256) {
					const firstKey = cache.keys().next().value;
					cache.delete(firstKey);
				}
			}
			return result;
		}

		Powers(args) {
			args = args || {};
			const base = this._norm(args.Base);
			const exps = [this._norm(args.Index)];
			const rest = getDynamicArgs(args);
			for (let i = 0; i < rest.length; i++) exps.push(this._norm(rest[i]));
			const op = new Operator();
			let acc = base;
			for (let i = 0; i < exps.length; i++) {
				acc = this._powerMaybeCached(op, acc, exps[i]);
				if (typeof acc !== "string") return acc;
			}
			return acc;
		}

		Root(args) {
			args = args || {};
			return new Operator().Root(this._norm(args.Radicand), this._norm(args.Index));
		}

		Roots(args) {
			args = args || {};
			const index = this._norm(args.Index);
			const radicands = [this._norm(args.Radicand)];
			const rest = getDynamicArgs(args);
			for (let i = 0; i < rest.length; i++) radicands.push(this._norm(rest[i]));
			return new Operator().Roots(index, ...radicands);
		}
		// LocalScope(args, util) { 有bug
		//     const frame = util.stackFrame;

		//     // 第二次调用：离开
		//     if (frame.__mathScopeKey) {
		//         const key = frame.__mathScopeKey;
		//         delete frame.__mathScopeKey;
		//         // 弹出
		//         if (this._mathScopeStack[this._mathScopeStack.length - 1] === key) {
		//             this._mathScopeStack.pop();
		//         }
		//         // 可选：清理该作用域的设置缓存
		//         delete this._mathScopeSettings[key];
		//         return;
		//     }

		//     // 第一次调用：进入
		//     const key = `__local_${++this._mathScopeCounter}__`;
		//     this._mathScopeSettings[key] = {
		//         DecimalValue: this._getCurrentSettings().DecimalValue,
		//         HandleErrorMode: this._getCurrentSettings().HandleErrorMode
		//     };
		//     this._mathScopeStack.push(key);
		//     frame.__mathScopeKey = key;

		//     util.startBranch(1, false);
		// }
		RootWithPrecision(args) {
			args = args || {};
			const precision = Number(args.Decimal);
			return new Operator().RootWithPrecision(
				this._norm(args.Radicand),
				this._norm(args.Index),
				precision
			);
		}
		Logarithm(args) {
			args = args || {};
			return new Operator().Logarithm(
				this._norm(args.Base),
				this._norm(args.Logarithm)
			);
		}
		LogarithmWithPrecision(args) {
			args = args || {};
			const precision = Number(args.Decimal);
			return new Operator().LogarithmWithPrecision(
				this._norm(args.Base),
				this._norm(args.Logarithm),
				precision
			);
		}
		Logarithms(args) {
			args = args || {};
			const nums = [this._norm(args.Base)];
			const rest = getDynamicArgs(args);
			for (let i = 0; i < rest.length; i++) nums.push(this._norm(rest[i]));
			nums.push(this._norm(args.Logarithm));
			return new Operator().Logarithms(...nums);
		}
		Factorial(args) {
			args = args || {};
			return new Operator().Factorial(this._norm(args.Number));
		}
		TrigonometricFunction(args) {
			args = args || {};
			const func = this._norm(args.Func);
			const num = this._norm(args.Number);
			return new Operator().TrigonometricFunction(func, num);
		}
		InverseTrigonometricFunction(args) {
			args = args || {};
			const func = this._norm(args.Func);
			const num = this._norm(args.Number);
			return new Operator().InverseTrigonometricFunction(func, num);
		}
		Atan2(args) {
			args = args || {};
			const xv = this._norm(args.x);
			const yv = this._norm(args.y);
			return new Operator().Atan2(xv, yv);
		}
		CalculateExpression(args) {
			args = args || {};
			const expr = this._norm(args.Expression);
			return new Operator().CalculateExpression(expr);
		}
		Summation(args) {
			args = args || {};
			return new Operator().Summation(this._norm(args.Number));
		}
		DoubleFactorial(args) {
			args = args || {};
			return new Operator().DoubleFactorial(this._norm(args.Number));
		}
		Tetration(args) {
			args = args || {};
			return new Operator().Tetration(this._norm(args.Base), this._norm(args.Index));
		}
		Negate(args) {
			args = args || {};
			return new Operator().Negate(this._norm(args.Number));
		}
	}
	Mathmatics = new MathExtension();
	try {
		initExpandableBlocks(Mathmatics);
	} catch (e) {
		console.warn(lang("ErrorPrefix"), getError("FailedExpand"), e);
	}
	extensions.register(Mathmatics);
})(Scratch);