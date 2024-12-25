/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./redux/action_types/index.js":
/*!*************************************!*\
  !*** ./redux/action_types/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ALERT_CLEAR: () => (/* binding */ ALERT_CLEAR),\n/* harmony export */   ALERT_FAILED: () => (/* binding */ ALERT_FAILED),\n/* harmony export */   ALERT_SUCCESS: () => (/* binding */ ALERT_SUCCESS)\n/* harmony export */ });\nconst ALERT_SUCCESS = \"ALERT_SUCCESS\";\nconst ALERT_FAILED = \"ALERT_FAILED\";\nconst ALERT_CLEAR = \"ALERT_CLEAR\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eC9hY3Rpb25fdHlwZXMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sTUFBTUEsZ0JBQWdCLGdCQUFnQjtBQUN0QyxNQUFNQyxlQUFlLGVBQWU7QUFDcEMsTUFBTUMsY0FBYyxjQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vam9iYmVycy8uL3JlZHV4L2FjdGlvbl90eXBlcy9pbmRleC5qcz83NDVjIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBTEVSVF9TVUNDRVNTID0gJ0FMRVJUX1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IEFMRVJUX0ZBSUxFRCA9ICdBTEVSVF9GQUlMRUQnO1xuZXhwb3J0IGNvbnN0IEFMRVJUX0NMRUFSID0gJ0FMRVJUX0NMRUFSJzsiXSwibmFtZXMiOlsiQUxFUlRfU1VDQ0VTUyIsIkFMRVJUX0ZBSUxFRCIsIkFMRVJUX0NMRUFSIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./redux/action_types/index.js\n");

/***/ }),

/***/ "./redux/reducers/alert.js":
/*!*********************************!*\
  !*** ./redux/reducers/alert.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../action_types */ \"./redux/action_types/index.js\");\n\nconst initialState = {\n    type: null,\n    message: null\n};\nconst AlertHandler = (state = initialState, action)=>{\n    switch(action.type){\n        case _action_types__WEBPACK_IMPORTED_MODULE_0__.ALERT_CLEAR:\n            return {\n                ...state,\n                type: null,\n                message: null\n            };\n        case _action_types__WEBPACK_IMPORTED_MODULE_0__.ALERT_SUCCESS:\n            return {\n                ...state,\n                type: action.payload,\n                message: action.message\n            };\n        case _action_types__WEBPACK_IMPORTED_MODULE_0__.ALERT_FAILED:\n            return {\n                ...state,\n                type: action.payload,\n                message: action.message\n            };\n        default:\n            return state;\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlertHandler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eC9yZWR1Y2Vycy9hbGVydC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUE2RTtBQUU3RSxNQUFNRyxlQUFlO0lBQ2pCQyxNQUFNO0lBQ05DLFNBQVM7QUFDYjtBQUVBLE1BQU1DLGVBQWUsQ0FBQ0MsUUFBUUosWUFBWSxFQUFFSztJQUV4QyxPQUFRQSxPQUFPSixJQUFJO1FBQ2YsS0FBS0Ysc0RBQVdBO1lBQ1osT0FBTztnQkFDSCxHQUFHSyxLQUFLO2dCQUNSSCxNQUFNO2dCQUNOQyxTQUFTO1lBQ2I7UUFDSixLQUFLSix3REFBYUE7WUFDZCxPQUFPO2dCQUNILEdBQUdNLEtBQUs7Z0JBQ1JILE1BQU1JLE9BQU9DLE9BQU87Z0JBQ3BCSixTQUFTRyxPQUFPSCxPQUFPO1lBQzNCO1FBQ0osS0FBS0wsdURBQVlBO1lBQ2IsT0FBTztnQkFDSCxHQUFHTyxLQUFLO2dCQUNSSCxNQUFNSSxPQUFPQyxPQUFPO2dCQUNwQkosU0FBU0csT0FBT0gsT0FBTztZQUMzQjtRQUNKO1lBQ0ksT0FBT0U7SUFDZjtBQUNKO0FBRUEsaUVBQWVELFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qb2JiZXJzLy4vcmVkdXgvcmVkdWNlcnMvYWxlcnQuanM/MGVjMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBTEVSVF9GQUlMRUQsIEFMRVJUX1NVQ0NFU1MsIEFMRVJUX0NMRUFSIH0gZnJvbSAnLi8uLi9hY3Rpb25fdHlwZXMnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gICAgdHlwZTogbnVsbCxcbiAgICBtZXNzYWdlOiBudWxsXG59XG5cbmNvbnN0IEFsZXJ0SGFuZGxlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgQUxFUlRfQ0xFQVI6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbnVsbFxuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIEFMRVJUX1NVQ0NFU1M6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIHR5cGU6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGFjdGlvbi5tZXNzYWdlXG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgQUxFUlRfRkFJTEVEOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBhY3Rpb24ubWVzc2FnZVxuICAgICAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWxlcnRIYW5kbGVyOyJdLCJuYW1lcyI6WyJBTEVSVF9GQUlMRUQiLCJBTEVSVF9TVUNDRVNTIiwiQUxFUlRfQ0xFQVIiLCJpbml0aWFsU3RhdGUiLCJ0eXBlIiwibWVzc2FnZSIsIkFsZXJ0SGFuZGxlciIsInN0YXRlIiwiYWN0aW9uIiwicGF5bG9hZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./redux/reducers/alert.js\n");

/***/ }),

/***/ "./redux/reducers/index.js":
/*!*********************************!*\
  !*** ./redux/reducers/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alert */ \"./redux/reducers/alert.js\");\n\n\nconst rootReducer = (0,redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({\n    AlertHandler: _alert__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rootReducer);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eC9yZWR1Y2Vycy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXdDO0FBQ0w7QUFFbkMsTUFBTUUsY0FBY0Ysc0RBQWVBLENBQUM7SUFDaENDLFlBQVlBLGdEQUFBQTtBQUNoQjtBQUVBLGlFQUFlQyxXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vam9iYmVycy8uL3JlZHV4L3JlZHVjZXJzL2luZGV4LmpzP2ZjNjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSBcInJlZHV4XCI7XG5pbXBvcnQgQWxlcnRIYW5kbGVyIGZyb20gXCIuL2FsZXJ0XCI7XG5cbmNvbnN0IHJvb3RSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBBbGVydEhhbmRsZXJcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb290UmVkdWNlcjsgIl0sIm5hbWVzIjpbImNvbWJpbmVSZWR1Y2VycyIsIkFsZXJ0SGFuZGxlciIsInJvb3RSZWR1Y2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./redux/reducers/index.js\n");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store */ \"./store.js\");\n\n\n\n\n//import DisableCopyPasteRightClick from \"../components/UI/DisableCopyPasteRightClick\";\nfunction App({ Component, pageProps }) {\n    // const arr = [1,3,2,7,4,0,2,8,2,8,6]\n    // Input: list1 = [1,2,4], list2 = [1,3,4]Output: [1,1,2,3,4,4]\n    // const arr = {\n    //   name: 'pankaj',\n    //   exp: {\n    //     job1: 'test1',\n    //     job2: 'test2',\n    //     skills: {\n    //       skill1: 'java',\n    //       skill2: 'node'\n    //     }\n    //   }\n    // }\n    // const add = (perameter) => {\n    //   console.log(Object.entries(perameter))\n    // }\n    // add(arr)\n    // const arr1 = {\n    //   _name: \"pankaj\",\n    //   _exp: {\n    //     _job1: \"test1\",\n    //     _job2: \"test2\",\n    //     _skills: {\n    //       _skill1: \"java\",\n    //       _skill2: \"node\"\n    //     }\n    //   }\n    // }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_redux__WEBPACK_IMPORTED_MODULE_2__.Provider, {\n        store: _store__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\gaura\\\\Downloads\\\\jobbers_admin\\\\src\\\\pages\\\\_app.js\",\n            lineNumber: 51,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\gaura\\\\Downloads\\\\jobbers_admin\\\\src\\\\pages\\\\_app.js\",\n        lineNumber: 50,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBNkI7QUFDUztBQUNQO0FBQy9CLHVGQUF1RjtBQUt4RSxTQUFTRSxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFFO0lBRWxELHNDQUFzQztJQUV0QywrREFBK0Q7SUFFL0QsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixXQUFXO0lBQ1gscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixnQkFBZ0I7SUFDaEIsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixRQUFRO0lBQ1IsTUFBTTtJQUNOLElBQUk7SUFFSiwrQkFBK0I7SUFFL0IsMkNBQTJDO0lBRTNDLElBQUk7SUFFSixXQUFXO0lBRVgsaUJBQWlCO0lBQ2pCLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLHNCQUFzQjtJQUN0QixpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLHdCQUF3QjtJQUN4QixRQUFRO0lBQ1IsTUFBTTtJQUNOLElBQUk7SUFJSixxQkFDRSw4REFBQ0osaURBQVFBO1FBQUNDLE9BQU9BLDhDQUFLQTtrQkFDcEIsNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFNOUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qb2JiZXJzLy4vc3JjL3BhZ2VzL19hcHAuanM/OGZkYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ0Avc3R5bGVzL2dsb2JhbHMuY3NzJ1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4J1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUnXHJcbi8vaW1wb3J0IERpc2FibGVDb3B5UGFzdGVSaWdodENsaWNrIGZyb20gXCIuLi9jb21wb25lbnRzL1VJL0Rpc2FibGVDb3B5UGFzdGVSaWdodENsaWNrXCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XHJcblxyXG4gIC8vIGNvbnN0IGFyciA9IFsxLDMsMiw3LDQsMCwyLDgsMiw4LDZdXHJcblxyXG4gIC8vIElucHV0OiBsaXN0MSA9IFsxLDIsNF0sIGxpc3QyID0gWzEsMyw0XU91dHB1dDogWzEsMSwyLDMsNCw0XVxyXG5cclxuICAvLyBjb25zdCBhcnIgPSB7XHJcbiAgLy8gICBuYW1lOiAncGFua2FqJyxcclxuICAvLyAgIGV4cDoge1xyXG4gIC8vICAgICBqb2IxOiAndGVzdDEnLFxyXG4gIC8vICAgICBqb2IyOiAndGVzdDInLFxyXG4gIC8vICAgICBza2lsbHM6IHtcclxuICAvLyAgICAgICBza2lsbDE6ICdqYXZhJyxcclxuICAvLyAgICAgICBza2lsbDI6ICdub2RlJ1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxuICAvLyBjb25zdCBhZGQgPSAocGVyYW1ldGVyKSA9PiB7XHJcblxyXG4gIC8vICAgY29uc29sZS5sb2coT2JqZWN0LmVudHJpZXMocGVyYW1ldGVyKSlcclxuXHJcbiAgLy8gfVxyXG5cclxuICAvLyBhZGQoYXJyKVxyXG5cclxuICAvLyBjb25zdCBhcnIxID0ge1xyXG4gIC8vICAgX25hbWU6IFwicGFua2FqXCIsXHJcbiAgLy8gICBfZXhwOiB7XHJcbiAgLy8gICAgIF9qb2IxOiBcInRlc3QxXCIsXHJcbiAgLy8gICAgIF9qb2IyOiBcInRlc3QyXCIsXHJcbiAgLy8gICAgIF9za2lsbHM6IHtcclxuICAvLyAgICAgICBfc2tpbGwxOiBcImphdmFcIixcclxuICAvLyAgICAgICBfc2tpbGwyOiBcIm5vZGVcIlxyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG5cclxuXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfSA+XHJcbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgey8qIDxEaXNhYmxlQ29weVBhc3RlUmlnaHRDbGljayAvPiAqL31cclxuICAgICAgXHJcbiAgICA8L1Byb3ZpZGVyPlxyXG4gIClcclxuXHJcbn1cclxuIl0sIm5hbWVzIjpbIlByb3ZpZGVyIiwic3RvcmUiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.js\n");

/***/ }),

/***/ "./store.js":
/*!******************!*\
  !*** ./store.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _redux_reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./redux/reducers */ \"./redux/reducers/index.js\");\n/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-devtools-extension */ \"redux-devtools-extension\");\n/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_3__);\n// store/index.js\n\n\n\n\n\nconst initialState = {};\nconst middleware = [\n    (redux_thunk__WEBPACK_IMPORTED_MODULE_3___default())\n];\n// Create the Redux store\nconst store = (0,redux__WEBPACK_IMPORTED_MODULE_0__.createStore)(_redux_reducers__WEBPACK_IMPORTED_MODULE_1__[\"default\"], initialState, (0,redux_devtools_extension__WEBPACK_IMPORTED_MODULE_2__.composeWithDevTools)((0,redux__WEBPACK_IMPORTED_MODULE_0__.applyMiddleware)(...middleware)));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGlCQUFpQjtBQUNtQjtBQUNPO0FBQ29CO0FBQ3ZCO0FBQ1I7QUFFaEMsTUFBTUssZUFBZSxDQUFDO0FBQ3RCLE1BQU1DLGFBQWE7SUFBQ0Ysb0RBQUtBO0NBQUM7QUFFMUIseUJBQXlCO0FBQ3pCLE1BQU1HLFFBQVFQLGtEQUFXQSxDQUNyQkMsdURBQVdBLEVBQ1hJLGNBQ0FILDZFQUFtQkEsQ0FBQ0Msc0RBQWVBLElBQUlHO0FBRzNDLGlFQUFlQyxLQUFLQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vam9iYmVycy8uL3N0b3JlLmpzPzQwZjUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3RvcmUvaW5kZXguanNcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHJvb3RSZWR1Y2VyIGZyb20gJy4vcmVkdXgvcmVkdWNlcnMnO1xuaW1wb3J0IHsgY29tcG9zZVdpdGhEZXZUb29scyB9IGZyb20gJ3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuXG5jb25zdCBpbml0aWFsU3RhdGUgPSB7fTtcbmNvbnN0IG1pZGRsZXdhcmUgPSBbdGh1bmtdO1xuXG4vLyBDcmVhdGUgdGhlIFJlZHV4IHN0b3JlXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxuICAgIHJvb3RSZWR1Y2VyLFxuICAgIGluaXRpYWxTdGF0ZSxcbiAgICBjb21wb3NlV2l0aERldlRvb2xzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKSlcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHN0b3JlOyJdLCJuYW1lcyI6WyJjcmVhdGVTdG9yZSIsInJvb3RSZWR1Y2VyIiwiY29tcG9zZVdpdGhEZXZUb29scyIsImFwcGx5TWlkZGxld2FyZSIsInRodW5rIiwiaW5pdGlhbFN0YXRlIiwibWlkZGxld2FyZSIsInN0b3JlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./store.js\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension":
/*!*******************************************!*\
  !*** external "redux-devtools-extension" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-thunk");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.js"));
module.exports = __webpack_exports__;

})();