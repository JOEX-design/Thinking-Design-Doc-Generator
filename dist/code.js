/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/extractor/extractBreakdown.ts":
/*!*******************************************!*\
  !*** ./src/extractor/extractBreakdown.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const extractBreakdown = (frameNode) => {
    const breakdownFrameList = frameNode.findAll(n => n.name === "breakdown-list");
    const itemFrameList = breakdownFrameList[0].children;
    console.log("----DocGen-----: start extract breakdowns");
    const breakdownList = itemFrameList.map(listItem => {
        const contents = listItem.findAll(n => n.type === "TEXT");
        return {
            breakdownItem: contents[1].name,
            breakdownValue: contents[2].name
        };
    });
    console.log("----DocGen-----: finished extract breakdowns");
    return breakdownList;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractBreakdown);


/***/ }),

/***/ "./src/extractor/extractDefinition.ts":
/*!********************************************!*\
  !*** ./src/extractor/extractDefinition.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const extractDefinition = (frameNode) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("----DocGen-----: start extract definition");
    const frameTitle = frameNode.findAll(n => n.name === "标题");
    const frameDefine = frameNode.findAll(n => n.name === "component-define");
    const frameFileLink = frameNode.findAll(n => n.name === "原始组件链接");
    const frameImgShowcase = frameNode.findOne(n => n.name === "component-showcase");
    const textNodeLink = frameFileLink[0].children[1];
    const link = textNodeLink.hyperlink;
    console.log("----DocGen-----: start export img");
    const imgBytes = yield frameImgShowcase.exportAsync({ format: 'SVG' }).catch(e => console.log(e));
    console.log("----DocGen-----: finished export img");
    console.log("----DocGen-----: finished extract definition");
    return {
        componentName: frameTitle[0].children[0] ? frameTitle[0].children[0].name : null,
        componentDesc: frameTitle[0].children[1] ? frameTitle[0].children[1].name : null,
        componentDefine: frameDefine[0].children[0] ? frameDefine[0].children[0].name : null,
        componentLink: link.value,
        componentMainImg: imgBytes
    };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extractDefinition);


/***/ }),

/***/ "./src/modules/generateJSON.ts":
/*!*************************************!*\
  !*** ./src/modules/generateJSON.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _extractor_extractDefinition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../extractor/extractDefinition */ "./src/extractor/extractDefinition.ts");
/* harmony import */ var _extractor_extractBreakdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../extractor/extractBreakdown */ "./src/extractor/extractBreakdown.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const FrameNameIsValid = (frameName) => {
    switch (frameName) {
        case 'doc-starter':
            return true;
        default:
            return false;
    }
};
const generateJSON = () => __awaiter(void 0, void 0, void 0, function* () {
    const selectedFrame = figma.currentPage.selection.filter(node => node.type === "FRAME");
    if (selectedFrame.length) {
        if (FrameNameIsValid(selectedFrame[0].name)) {
            const docDefinitionNode = selectedFrame[0].findAll(node => node.name === "doc-definition");
            const docBreakdownNode = selectedFrame[0].findAll(node => node.name === "doc-breakdown");
            const docCompoTypes = selectedFrame[0].findAll(node => node.name === "doc-component-type");
            // Refactor later
            if (docDefinitionNode.length) {
                const def = yield (0,_extractor_extractDefinition__WEBPACK_IMPORTED_MODULE_0__["default"])(docDefinitionNode[0]);
                const breakdownList = (0,_extractor_extractBreakdown__WEBPACK_IMPORTED_MODULE_1__["default"])(docBreakdownNode[0]);
                // const compoTypesList = ExtractDocCompoTypes(docCompoTypes[0])
                return {
                    definition: Object.assign({}, def),
                    breakdown: breakdownList,
                    // componentTypes: compoTypesList
                };
                // figma.ui.postMessage(result)
            }
        }
        else {
            figma.notify("Frame名称必须为「doc-starter」");
        }
    }
    else {
        figma.notify("请选择一个Frame");
    }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateJSON);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_generateJSON__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/generateJSON */ "./src/modules/generateJSON.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

figma.showUI(__html__, {
    themeColors: true
});
figma.skipInvisibleInstanceChildren = true;
figma.ui.resize(380, 480);
// onmessage = (event) => {
//   console.log(event.data.pluginMessage);
//   const jsonContainer = document.getElementById('jsonContainer');
//   jsonContainer.textContent = JSON.stringify(event.data.pluginMessage);
// }
let result = {};
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'generate') {
        result = yield (0,_modules_generateJSON__WEBPACK_IMPORTED_MODULE_0__["default"])();
        console.log(result);
    }
    if (msg.type === 'copyJSON') {
        console.log(result);
        figma.ui.postMessage({ type: 'copyJSON', data: result });
        // console.log('Result: ')
        // const resultString = JSON.stringify(result)
        // // document.execCommand(resultString);
        // try {
        // console.log(document)
        // document.execCommand(resultString)
        // // figma.notify("JSON 复制成功")
        // } catch (e) {
        // console.error('Unable to copy content to clipboard!', e);
        // }
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLGdCQUFnQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNkaEMsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELGVBQWU7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLGlCQUFpQixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQzdCakMsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQytEO0FBQ0Y7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx3RUFBaUI7QUFDbkQsc0NBQXNDLHVFQUFnQjtBQUN0RDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLFlBQVksRUFBQzs7Ozs7OztVQy9DNUI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3Qiw0QkFBNEIsK0RBQStELGlCQUFpQjtBQUM1RztBQUNBLG9DQUFvQyxNQUFNLCtCQUErQixZQUFZO0FBQ3JGLG1DQUFtQyxNQUFNLG1DQUFtQyxZQUFZO0FBQ3hGLGdDQUFnQztBQUNoQztBQUNBLEtBQUs7QUFDTDtBQUNrRDtBQUNsRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlFQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGdDQUFnQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJ5Ly4vc3JjL2V4dHJhY3Rvci9leHRyYWN0QnJlYWtkb3duLnRzIiwid2VicGFjazovL3RyeS8uL3NyYy9leHRyYWN0b3IvZXh0cmFjdERlZmluaXRpb24udHMiLCJ3ZWJwYWNrOi8vdHJ5Ly4vc3JjL21vZHVsZXMvZ2VuZXJhdGVKU09OLnRzIiwid2VicGFjazovL3RyeS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90cnkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RyeS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RyeS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RyeS8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV4dHJhY3RCcmVha2Rvd24gPSAoZnJhbWVOb2RlKSA9PiB7XG4gICAgY29uc3QgYnJlYWtkb3duRnJhbWVMaXN0ID0gZnJhbWVOb2RlLmZpbmRBbGwobiA9PiBuLm5hbWUgPT09IFwiYnJlYWtkb3duLWxpc3RcIik7XG4gICAgY29uc3QgaXRlbUZyYW1lTGlzdCA9IGJyZWFrZG93bkZyYW1lTGlzdFswXS5jaGlsZHJlbjtcbiAgICBjb25zb2xlLmxvZyhcIi0tLS1Eb2NHZW4tLS0tLTogc3RhcnQgZXh0cmFjdCBicmVha2Rvd25zXCIpO1xuICAgIGNvbnN0IGJyZWFrZG93bkxpc3QgPSBpdGVtRnJhbWVMaXN0Lm1hcChsaXN0SXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gbGlzdEl0ZW0uZmluZEFsbChuID0+IG4udHlwZSA9PT0gXCJURVhUXCIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnJlYWtkb3duSXRlbTogY29udGVudHNbMV0ubmFtZSxcbiAgICAgICAgICAgIGJyZWFrZG93blZhbHVlOiBjb250ZW50c1syXS5uYW1lXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coXCItLS0tRG9jR2VuLS0tLS06IGZpbmlzaGVkIGV4dHJhY3QgYnJlYWtkb3duc1wiKTtcbiAgICByZXR1cm4gYnJlYWtkb3duTGlzdDtcbn07XG5leHBvcnQgZGVmYXVsdCBleHRyYWN0QnJlYWtkb3duO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jb25zdCBleHRyYWN0RGVmaW5pdGlvbiA9IChmcmFtZU5vZGUpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnNvbGUubG9nKFwiLS0tLURvY0dlbi0tLS0tOiBzdGFydCBleHRyYWN0IGRlZmluaXRpb25cIik7XG4gICAgY29uc3QgZnJhbWVUaXRsZSA9IGZyYW1lTm9kZS5maW5kQWxsKG4gPT4gbi5uYW1lID09PSBcIuagh+mimFwiKTtcbiAgICBjb25zdCBmcmFtZURlZmluZSA9IGZyYW1lTm9kZS5maW5kQWxsKG4gPT4gbi5uYW1lID09PSBcImNvbXBvbmVudC1kZWZpbmVcIik7XG4gICAgY29uc3QgZnJhbWVGaWxlTGluayA9IGZyYW1lTm9kZS5maW5kQWxsKG4gPT4gbi5uYW1lID09PSBcIuWOn+Wni+e7hOS7tumTvuaOpVwiKTtcbiAgICBjb25zdCBmcmFtZUltZ1Nob3djYXNlID0gZnJhbWVOb2RlLmZpbmRPbmUobiA9PiBuLm5hbWUgPT09IFwiY29tcG9uZW50LXNob3djYXNlXCIpO1xuICAgIGNvbnN0IHRleHROb2RlTGluayA9IGZyYW1lRmlsZUxpbmtbMF0uY2hpbGRyZW5bMV07XG4gICAgY29uc3QgbGluayA9IHRleHROb2RlTGluay5oeXBlcmxpbms7XG4gICAgY29uc29sZS5sb2coXCItLS0tRG9jR2VuLS0tLS06IHN0YXJ0IGV4cG9ydCBpbWdcIik7XG4gICAgY29uc3QgaW1nQnl0ZXMgPSB5aWVsZCBmcmFtZUltZ1Nob3djYXNlLmV4cG9ydEFzeW5jKHsgZm9ybWF0OiAnU1ZHJyB9KS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUpKTtcbiAgICBjb25zb2xlLmxvZyhcIi0tLS1Eb2NHZW4tLS0tLTogZmluaXNoZWQgZXhwb3J0IGltZ1wiKTtcbiAgICBjb25zb2xlLmxvZyhcIi0tLS1Eb2NHZW4tLS0tLTogZmluaXNoZWQgZXh0cmFjdCBkZWZpbml0aW9uXCIpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbXBvbmVudE5hbWU6IGZyYW1lVGl0bGVbMF0uY2hpbGRyZW5bMF0gPyBmcmFtZVRpdGxlWzBdLmNoaWxkcmVuWzBdLm5hbWUgOiBudWxsLFxuICAgICAgICBjb21wb25lbnREZXNjOiBmcmFtZVRpdGxlWzBdLmNoaWxkcmVuWzFdID8gZnJhbWVUaXRsZVswXS5jaGlsZHJlblsxXS5uYW1lIDogbnVsbCxcbiAgICAgICAgY29tcG9uZW50RGVmaW5lOiBmcmFtZURlZmluZVswXS5jaGlsZHJlblswXSA/IGZyYW1lRGVmaW5lWzBdLmNoaWxkcmVuWzBdLm5hbWUgOiBudWxsLFxuICAgICAgICBjb21wb25lbnRMaW5rOiBsaW5rLnZhbHVlLFxuICAgICAgICBjb21wb25lbnRNYWluSW1nOiBpbWdCeXRlc1xuICAgIH07XG59KTtcbmV4cG9ydCBkZWZhdWx0IGV4dHJhY3REZWZpbml0aW9uO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgZXh0cmFjdERlZmluaXRpb24gZnJvbSBcIi4uL2V4dHJhY3Rvci9leHRyYWN0RGVmaW5pdGlvblwiO1xuaW1wb3J0IGV4dHJhY3RCcmVha2Rvd24gZnJvbSBcIi4uL2V4dHJhY3Rvci9leHRyYWN0QnJlYWtkb3duXCI7XG5jb25zdCBGcmFtZU5hbWVJc1ZhbGlkID0gKGZyYW1lTmFtZSkgPT4ge1xuICAgIHN3aXRjaCAoZnJhbWVOYW1lKSB7XG4gICAgICAgIGNhc2UgJ2RvYy1zdGFydGVyJzpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5jb25zdCBnZW5lcmF0ZUpTT04gPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBzZWxlY3RlZEZyYW1lID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmZpbHRlcihub2RlID0+IG5vZGUudHlwZSA9PT0gXCJGUkFNRVwiKTtcbiAgICBpZiAoc2VsZWN0ZWRGcmFtZS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKEZyYW1lTmFtZUlzVmFsaWQoc2VsZWN0ZWRGcmFtZVswXS5uYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgZG9jRGVmaW5pdGlvbk5vZGUgPSBzZWxlY3RlZEZyYW1lWzBdLmZpbmRBbGwobm9kZSA9PiBub2RlLm5hbWUgPT09IFwiZG9jLWRlZmluaXRpb25cIik7XG4gICAgICAgICAgICBjb25zdCBkb2NCcmVha2Rvd25Ob2RlID0gc2VsZWN0ZWRGcmFtZVswXS5maW5kQWxsKG5vZGUgPT4gbm9kZS5uYW1lID09PSBcImRvYy1icmVha2Rvd25cIik7XG4gICAgICAgICAgICBjb25zdCBkb2NDb21wb1R5cGVzID0gc2VsZWN0ZWRGcmFtZVswXS5maW5kQWxsKG5vZGUgPT4gbm9kZS5uYW1lID09PSBcImRvYy1jb21wb25lbnQtdHlwZVwiKTtcbiAgICAgICAgICAgIC8vIFJlZmFjdG9yIGxhdGVyXG4gICAgICAgICAgICBpZiAoZG9jRGVmaW5pdGlvbk5vZGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVmID0geWllbGQgZXh0cmFjdERlZmluaXRpb24oZG9jRGVmaW5pdGlvbk5vZGVbMF0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJyZWFrZG93bkxpc3QgPSBleHRyYWN0QnJlYWtkb3duKGRvY0JyZWFrZG93bk5vZGVbMF0pO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGNvbXBvVHlwZXNMaXN0ID0gRXh0cmFjdERvY0NvbXBvVHlwZXMoZG9jQ29tcG9UeXBlc1swXSlcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uOiBPYmplY3QuYXNzaWduKHt9LCBkZWYpLFxuICAgICAgICAgICAgICAgICAgICBicmVha2Rvd246IGJyZWFrZG93bkxpc3QsXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXBvbmVudFR5cGVzOiBjb21wb1R5cGVzTGlzdFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gZmlnbWEudWkucG9zdE1lc3NhZ2UocmVzdWx0KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiRnJhbWXlkI3np7Dlv4XpobvkuLrjgIxkb2Mtc3RhcnRlcuOAjVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZmlnbWEubm90aWZ5KFwi6K+36YCJ5oup5LiA5LiqRnJhbWVcIik7XG4gICAgfVxufSk7XG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZUpTT047XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IGdlbmVyYXRlSlNPTiBmcm9tIFwiLi9tb2R1bGVzL2dlbmVyYXRlSlNPTlwiO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gICAgdGhlbWVDb2xvcnM6IHRydWVcbn0pO1xuZmlnbWEuc2tpcEludmlzaWJsZUluc3RhbmNlQ2hpbGRyZW4gPSB0cnVlO1xuZmlnbWEudWkucmVzaXplKDM4MCwgNDgwKTtcbi8vIG9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xuLy8gICBjb25zb2xlLmxvZyhldmVudC5kYXRhLnBsdWdpbk1lc3NhZ2UpO1xuLy8gICBjb25zdCBqc29uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzb25Db250YWluZXInKTtcbi8vICAganNvbkNvbnRhaW5lci50ZXh0Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KGV2ZW50LmRhdGEucGx1Z2luTWVzc2FnZSk7XG4vLyB9XG5sZXQgcmVzdWx0ID0ge307XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBpZiAobXNnLnR5cGUgPT09ICdnZW5lcmF0ZScpIHtcbiAgICAgICAgcmVzdWx0ID0geWllbGQgZ2VuZXJhdGVKU09OKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gJ2NvcHlKU09OJykge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdjb3B5SlNPTicsIGRhdGE6IHJlc3VsdCB9KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1Jlc3VsdDogJylcbiAgICAgICAgLy8gY29uc3QgcmVzdWx0U3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0KVxuICAgICAgICAvLyAvLyBkb2N1bWVudC5leGVjQ29tbWFuZChyZXN1bHRTdHJpbmcpO1xuICAgICAgICAvLyB0cnkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudClcbiAgICAgICAgLy8gZG9jdW1lbnQuZXhlY0NvbW1hbmQocmVzdWx0U3RyaW5nKVxuICAgICAgICAvLyAvLyBmaWdtYS5ub3RpZnkoXCJKU09OIOWkjeWItuaIkOWKn1wiKVxuICAgICAgICAvLyB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ1VuYWJsZSB0byBjb3B5IGNvbnRlbnQgdG8gY2xpcGJvYXJkIScsIGUpO1xuICAgICAgICAvLyB9XG4gICAgfVxuICAgIC8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcbiAgICAvLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cbiAgICAvLyBmaWdtYS5jbG9zZVBsdWdpbigpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=