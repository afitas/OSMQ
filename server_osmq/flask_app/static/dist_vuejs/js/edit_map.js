/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"edit_map": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/dist_vuejs/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/EditApp.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/EditApp.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Map_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Map.vue */ \"./src/components/Map.vue\");\n/* harmony import */ var _components_SideBar_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/SideBar.vue */ \"./src/components/SideBar.vue\");\n/* harmony import */ var _components_Layers_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Layers.vue */ \"./src/components/Layers.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"EditApp\",\n  components: {\n    Map: _components_Map_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    SideBar: _components_SideBar_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    Layers: _components_Layers_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  }\n});\n\n//# sourceURL=webpack:///./src/EditApp.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Layers.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layers.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"Layers\",\n  methods: {\n    updateLayerStore: function updateLayerStore(index, visible) {\n      this.$store.commit(\"visibleLayer\", {\n        index: index,\n        visible: visible\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/Layers.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Map.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Map.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mixins_LayersMixin_mixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mixins/LayersMixin.mixin.js */ \"./src/mixins/LayersMixin.mixin.js\");\n/* harmony import */ var _mixins_BaseMapMixin_mixin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mixins/BaseMapMixin.mixin.js */ \"./src/mixins/BaseMapMixin.mixin.js\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"Map\",\n  props: [],\n  mixins: [_mixins_BaseMapMixin_mixin_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _mixins_LayersMixin_mixin_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]]\n});\n\n//# sourceURL=webpack:///./src/components/Map.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SideBar.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SideBar.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper */ \"./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../consts */ \"./src/consts.js\");\n\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: \"SideBar\",\n  props: {\n    msg: String\n  },\n  computed: {\n    tronconNames: function tronconNames() {\n      var res = [];\n\n      var _iterator = Object(C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.$store.state.map.selectedTroncons),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var elt = _step.value;\n          res.push(elt.properties_[_consts__WEBPACK_IMPORTED_MODULE_2__[\"GEOM_ID_COLUMN_NAME\"]]);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      return res;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/SideBar.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4cb31f2e-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/EditApp.vue?vue&type=template&id=13c49764&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4cb31f2e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/EditApp.vue?vue&type=template&id=13c49764& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", [_c(\"Map\"), _c(\"SideBar\"), _c(\"Layers\")], 1)\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/EditApp.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%224cb31f2e-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4cb31f2e-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Layers.vue?vue&type=template&id=2b9deb1c&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4cb31f2e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layers.vue?vue&type=template&id=2b9deb1c&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"layers-list\" },\n    [\n      _vm._l(this.$store.state.map.layers, function(val, index) {\n        return [\n          _c(\"input\", {\n            key: val.title,\n            attrs: { type: \"checkbox\" },\n            domProps: { checked: val.visible },\n            on: {\n              change: function($event) {\n                return _vm.updateLayerStore(index, !val.visible)\n              }\n            }\n          }),\n          _vm._v(\" \" + _vm._s(val.title) + \" \"),\n          _c(\"br\", { key: index })\n        ]\n      })\n    ],\n    2\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/Layers.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%224cb31f2e-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4cb31f2e-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Map.vue?vue&type=template&id=3074bd5c&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4cb31f2e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Map.vue?vue&type=template&id=3074bd5c& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", [_c(\"div\", { ref: \"map\", attrs: { id: \"map\" } })])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/Map.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%224cb31f2e-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4cb31f2e-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SideBar.vue?vue&type=template&id=3eca7188&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4cb31f2e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SideBar.vue?vue&type=template&id=3eca7188&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"nav\", { staticClass: \"sidebar\" }, [\n    _c(\"div\", [\n      _vm._v(\" SIDE BAR GOES HERE \"),\n      _c(\"br\"),\n      _c(\"br\"),\n      _vm._v(\" \" + _vm._s(this.tronconNames) + \" \")\n    ])\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/SideBar.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%224cb31f2e-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n.layers-list[data-v-2b9deb1c] {\\r\\n    position: absolute;\\r\\n    top: 56px;\\r\\n    left: 0;\\r\\n    z-index: 2;\\r\\n    color: black;\\r\\n    padding: 20px;\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/Layers.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Map.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Map.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n#map {\\r\\n  width: 100%;\\r\\n  height: 100vh;\\n}\\n#map .ol-zoom .ol-zoom-out {\\r\\n    margin-top: 0px;\\n}\\n.ol-zoom {\\r\\n    display: block !important;\\r\\n    top: 95px;\\r\\n    left: 2em !important;\\r\\n    left: unset;\\n}\\n.ol-zoom-extent {\\r\\n    top: 180px;\\r\\n    right: 2em !important;\\r\\n    left: unset;\\n}\\n#map .ol-zoomslider {\\r\\n    top: 200px;\\r\\n    height: 200px;\\r\\n    display: none;\\n}\\n.ol-zoomslider {\\r\\n    right: 2em !important;\\r\\n    left: unset;\\n}\\n#map .ol-zoom-in.ol-has-tooltip:hover [role=\\\"tooltip\\\"],\\r\\n#map .ol-zoom-in.ol-has-tooltip:focus [role=\\\"tooltip\\\"] {\\r\\n    top: 3px;\\n}\\n#map .ol-zoom-out.ol-has-tooltip:hover [role=\\\"tooltip\\\"],\\r\\n#map .ol-zoom-out.ol-has-tooltip:focus [role=\\\"tooltip\\\"] {\\r\\n    top: 232px;\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/Map.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n.sidebar[data-v-3eca7188] {\\r\\n  height: 85vh; /* Full-height: remove this if you want \\\"auto\\\" height */\\r\\n  width: 300px; /* Set the width of the sidebar */\\r\\n  position: fixed; /* Fixed Sidebar (stay in place on scroll) */\\r\\n  z-index: 1; /* Stay on top */\\r\\n  top: 60px; /* Stay at the top */\\r\\n  left: 0;\\r\\n  background-color: whitesmoke; /* Black */\\r\\n  overflow-x: hidden; /* Disable horizontal scroll */\\r\\n  padding-top: 20px;\\n}\\r\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/SideBar.vue?./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css&\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"e8ce2d24\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/Layers.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Map.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Map.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Map.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Map.vue?vue&type=style&index=0&lang=css&\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"e4891e1a\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/Map.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css&\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"701fa398\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/components/SideBar.vue?./node_modules/vue-style-loader??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/EditApp.vue":
/*!*************************!*\
  !*** ./src/EditApp.vue ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _EditApp_vue_vue_type_template_id_13c49764___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditApp.vue?vue&type=template&id=13c49764& */ \"./src/EditApp.vue?vue&type=template&id=13c49764&\");\n/* harmony import */ var _EditApp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditApp.vue?vue&type=script&lang=js& */ \"./src/EditApp.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _EditApp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _EditApp_vue_vue_type_template_id_13c49764___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _EditApp_vue_vue_type_template_id_13c49764___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/EditApp.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/EditApp.vue?");

/***/ }),

/***/ "./src/EditApp.vue?vue&type=script&lang=js&":
/*!**************************************************!*\
  !*** ./src/EditApp.vue?vue&type=script&lang=js& ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditApp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--12-0!../node_modules/babel-loader/lib!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./EditApp.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/EditApp.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditApp_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/EditApp.vue?");

/***/ }),

/***/ "./src/EditApp.vue?vue&type=template&id=13c49764&":
/*!********************************************************!*\
  !*** ./src/EditApp.vue?vue&type=template&id=13c49764& ***!
  \********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditApp_vue_vue_type_template_id_13c49764___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4cb31f2e-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./EditApp.vue?vue&type=template&id=13c49764& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"4cb31f2e-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/EditApp.vue?vue&type=template&id=13c49764&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditApp_vue_vue_type_template_id_13c49764___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditApp_vue_vue_type_template_id_13c49764___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/EditApp.vue?");

/***/ }),

/***/ "./src/components/Layers.vue":
/*!***********************************!*\
  !*** ./src/components/Layers.vue ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Layers_vue_vue_type_template_id_2b9deb1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layers.vue?vue&type=template&id=2b9deb1c&scoped=true& */ \"./src/components/Layers.vue?vue&type=template&id=2b9deb1c&scoped=true&\");\n/* harmony import */ var _Layers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layers.vue?vue&type=script&lang=js& */ \"./src/components/Layers.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Layers_vue_vue_type_style_index_0_id_2b9deb1c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css& */ \"./src/components/Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Layers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Layers_vue_vue_type_template_id_2b9deb1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Layers_vue_vue_type_template_id_2b9deb1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"2b9deb1c\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/Layers.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/Layers.vue?");

/***/ }),

/***/ "./src/components/Layers.vue?vue&type=script&lang=js&":
/*!************************************************************!*\
  !*** ./src/components/Layers.vue?vue&type=script&lang=js& ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Layers.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Layers.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/Layers.vue?");

/***/ }),

/***/ "./src/components/Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css&":
/*!********************************************************************************************!*\
  !*** ./src/components/Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css& ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layers_vue_vue_type_style_index_0_id_2b9deb1c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Layers.vue?vue&type=style&index=0&id=2b9deb1c&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layers_vue_vue_type_style_index_0_id_2b9deb1c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layers_vue_vue_type_style_index_0_id_2b9deb1c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layers_vue_vue_type_style_index_0_id_2b9deb1c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layers_vue_vue_type_style_index_0_id_2b9deb1c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/components/Layers.vue?");

/***/ }),

/***/ "./src/components/Layers.vue?vue&type=template&id=2b9deb1c&scoped=true&":
/*!******************************************************************************!*\
  !*** ./src/components/Layers.vue?vue&type=template&id=2b9deb1c&scoped=true& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layers_vue_vue_type_template_id_2b9deb1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4cb31f2e-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Layers.vue?vue&type=template&id=2b9deb1c&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"4cb31f2e-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Layers.vue?vue&type=template&id=2b9deb1c&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layers_vue_vue_type_template_id_2b9deb1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Layers_vue_vue_type_template_id_2b9deb1c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Layers.vue?");

/***/ }),

/***/ "./src/components/Map.vue":
/*!********************************!*\
  !*** ./src/components/Map.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Map_vue_vue_type_template_id_3074bd5c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Map.vue?vue&type=template&id=3074bd5c& */ \"./src/components/Map.vue?vue&type=template&id=3074bd5c&\");\n/* harmony import */ var _Map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Map.vue?vue&type=script&lang=js& */ \"./src/components/Map.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Map.vue?vue&type=style&index=0&lang=css& */ \"./src/components/Map.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Map_vue_vue_type_template_id_3074bd5c___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Map_vue_vue_type_template_id_3074bd5c___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/Map.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/Map.vue?");

/***/ }),

/***/ "./src/components/Map.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/components/Map.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Map.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Map.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/Map.vue?");

/***/ }),

/***/ "./src/components/Map.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************!*\
  !*** ./src/components/Map.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Map.vue?vue&type=style&index=0&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Map.vue?vue&type=style&index=0&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/components/Map.vue?");

/***/ }),

/***/ "./src/components/Map.vue?vue&type=template&id=3074bd5c&":
/*!***************************************************************!*\
  !*** ./src/components/Map.vue?vue&type=template&id=3074bd5c& ***!
  \***************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_template_id_3074bd5c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4cb31f2e-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./Map.vue?vue&type=template&id=3074bd5c& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"4cb31f2e-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Map.vue?vue&type=template&id=3074bd5c&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_template_id_3074bd5c___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Map_vue_vue_type_template_id_3074bd5c___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/Map.vue?");

/***/ }),

/***/ "./src/components/SideBar.vue":
/*!************************************!*\
  !*** ./src/components/SideBar.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SideBar_vue_vue_type_template_id_3eca7188_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SideBar.vue?vue&type=template&id=3eca7188&scoped=true& */ \"./src/components/SideBar.vue?vue&type=template&id=3eca7188&scoped=true&\");\n/* harmony import */ var _SideBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SideBar.vue?vue&type=script&lang=js& */ \"./src/components/SideBar.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _SideBar_vue_vue_type_style_index_0_id_3eca7188_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css& */ \"./src/components/SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _SideBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _SideBar_vue_vue_type_template_id_3eca7188_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _SideBar_vue_vue_type_template_id_3eca7188_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"3eca7188\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/SideBar.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/SideBar.vue?");

/***/ }),

/***/ "./src/components/SideBar.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/components/SideBar.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SideBar.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SideBar.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/SideBar.vue?");

/***/ }),

/***/ "./src/components/SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css&":
/*!*********************************************************************************************!*\
  !*** ./src/components/SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_3eca7188_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--6-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--6-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SideBar.vue?vue&type=style&index=0&id=3eca7188&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_3eca7188_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_3eca7188_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_3eca7188_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_style_index_0_id_3eca7188_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/components/SideBar.vue?");

/***/ }),

/***/ "./src/components/SideBar.vue?vue&type=template&id=3eca7188&scoped=true&":
/*!*******************************************************************************!*\
  !*** ./src/components/SideBar.vue?vue&type=template&id=3eca7188&scoped=true& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_template_id_3eca7188_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"4cb31f2e-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./SideBar.vue?vue&type=template&id=3eca7188&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"4cb31f2e-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SideBar.vue?vue&type=template&id=3eca7188&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_template_id_3eca7188_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_4cb31f2e_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideBar_vue_vue_type_template_id_3eca7188_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/SideBar.vue?");

/***/ }),

/***/ "./src/consts.js":
/*!***********************!*\
  !*** ./src/consts.js ***!
  \***********************/
/*! exports provided: GEOSERVER_WMTS_URL, BACKGROUND_LAYER_NAME, TRONCONS_LAYER_NAME, ORTHO_LAYER_NAME, GEOM_ID_COLUMN_NAME, resolutions, gridNames */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GEOSERVER_WMTS_URL\", function() { return GEOSERVER_WMTS_URL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BACKGROUND_LAYER_NAME\", function() { return BACKGROUND_LAYER_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TRONCONS_LAYER_NAME\", function() { return TRONCONS_LAYER_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ORTHO_LAYER_NAME\", function() { return ORTHO_LAYER_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GEOM_ID_COLUMN_NAME\", function() { return GEOM_ID_COLUMN_NAME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resolutions\", function() { return resolutions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gridNames\", function() { return gridNames; });\nvar GEOSERVER_WMTS_URL = Object({\"NODE_ENV\":\"development\",\"BASE_URL\":\"/static/dist_vuejs/\"}).VUE_APP_GEOSERVER_WMTS_URL || \"http://192.168.0.228:8080/geoserver/gwc/service/wmts\"; // WARNING : DONT MODIFY THIS LINE if you want to set another GEOSERVER_WMTS_URL use envirenment variable VUE_APP_GEOSERVER_WMTS_URL using a .env file or cmd windows cli SET VUE_APP_GEOSERVER_WMTS_URL=http://127.0.0.1:8080/geoserver/gwc/service/wmts\n\nvar BACKGROUND_LAYER_NAME = Object({\"NODE_ENV\":\"development\",\"BASE_URL\":\"/static/dist_vuejs/\"}).VUE_APP_BACKGROUND_LAYER_NAME || \"rna:commune\"; // SAME WARNING AS GEOSERVER_WMTS_URL\n\nvar TRONCONS_LAYER_NAME = Object({\"NODE_ENV\":\"development\",\"BASE_URL\":\"/static/dist_vuejs/\"}).VUE_APP_TRONCONS_LAYER_NAME || \"rna:geoms\"; // SAME WARNING AS GEOSERVER_WMTS_URL\n\nvar ORTHO_LAYER_NAME = Object({\"NODE_ENV\":\"development\",\"BASE_URL\":\"/static/dist_vuejs/\"}).VUE_APP_ORTHO_LAYER_NAME || \"rna:arz50cm\"; // SAME WARNING AS GEOSERVER_WMTS_URL\n\nvar GEOM_ID_COLUMN_NAME = Object({\"NODE_ENV\":\"development\",\"BASE_URL\":\"/static/dist_vuejs/\"}).VUE_APP_GEOM_ID_COLUMN_NAME || \"geom_id\"; // SAME WARNING AS GEOSERVER_WMTS_URL\n\nvar resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125e-4, 3.4332275390625e-4, 1.71661376953125e-4, 8.58306884765625e-5, 4.291534423828125e-5, 2.1457672119140625e-5, 1.0728836059570312e-5, 5.364418029785156e-6, 2.682209014892578e-6, 1.341104507446289e-6, 6.705522537231445e-7, 3.3527612686157227e-7];\nvar gridNames = [\"EPSG:4326:0\", \"EPSG:4326:1\", \"EPSG:4326:2\", \"EPSG:4326:3\", \"EPSG:4326:4\", \"EPSG:4326:5\", \"EPSG:4326:6\", \"EPSG:4326:7\", \"EPSG:4326:8\", \"EPSG:4326:9\", \"EPSG:4326:10\", \"EPSG:4326:11\", \"EPSG:4326:12\", \"EPSG:4326:13\", \"EPSG:4326:14\", \"EPSG:4326:15\", \"EPSG:4326:16\", \"EPSG:4326:17\", \"EPSG:4326:18\", \"EPSG:4326:19\", \"EPSG:4326:20\", \"EPSG:4326:21\"];\n\n//# sourceURL=webpack:///./src/consts.js?");

/***/ }),

/***/ "./src/mixins/BaseMapMixin.mixin.js":
/*!******************************************!*\
  !*** ./src/mixins/BaseMapMixin.mixin.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var ol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol */ \"./node_modules/ol/index.js\");\n/* harmony import */ var ol_interaction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/interaction */ \"./node_modules/ol/interaction.js\");\n/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/proj */ \"./node_modules/ol/proj.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/utils */ \"./src/utils.js\");\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/consts */ \"./src/consts.js\");\n/* harmony import */ var ol_ol_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/ol.css */ \"./node_modules/ol/ol.css\");\n/* harmony import */ var ol_ol_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ol_ol_css__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\nvar mixin = {\n  created: function created() {\n    this.olMap = {};\n  },\n  mounted: function mounted() {\n    var _this = this;\n\n    var resolutions = _consts__WEBPACK_IMPORTED_MODULE_7__[\"resolutions\"];\n    this.olMap = new ol__WEBPACK_IMPORTED_MODULE_3__[\"Map\"]({\n      interactions: Object(ol_interaction__WEBPACK_IMPORTED_MODULE_4__[\"defaults\"])({\n        doubleClickZoom: false\n      }),\n      layers: [],\n      target: \"map\",\n      view: new ol__WEBPACK_IMPORTED_MODULE_3__[\"View\"]({\n        projection: \"EPSG:4326\",\n        center: [-0.32, 35.85],\n        // constrainResolution: true,\n        resolutions: resolutions,\n        zoom: 14,\n        extent: ol_proj__WEBPACK_IMPORTED_MODULE_5__[\"get\"](\"EPSG:4326\").getExtent(),\n        smoothExtentConstraint: false\n      })\n    }); // LISTEN CLICK event\n\n    this.olMap.on(\"dblclick\", function (evt) {\n      _this.olMap.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {\n        var clone_feature = Object.assign({}, feature);\n\n        _this.$store.dispatch(\"featureSelected\", {\n          feature: clone_feature\n        });\n\n        return;\n      }, {\n        hitTolerance: 5\n      });\n    });\n    this.olMap.getView().fit([-0.343666017055512, 35.84114074707031, -0.297061741352081, 35.865203857421875], this.olMap.getSize()); // LISTEN moveend\n\n    this.olMap.on(\"moveend\", function () {\n      var viewExtent = _this.olMap.getView().calculateExtent();\n\n      _this.$store.commit(\"setStoreViewExtent\", {\n        viewExtent: viewExtent\n      });\n\n      _this.$store.commit(\"setStoreViewZoom\", {\n        viewZoom: _this.olMap.getView().getZoom()\n      });\n    });\n    this.$store.commit(\"setStoreViewExtent\", {\n      viewExtent: this.olMap.getView().calculateExtent()\n    });\n  },\n  computed: Object(C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__[\"mapState\"])({\n    viewExtentStore: function viewExtentStore(state) {\n      return state.map.viewExtent;\n    },\n    viewZoomStore: function viewZoomStore(state) {\n      return state.map.viewZoom;\n    }\n  })),\n  methods: {\n    setViewExtent: function setViewExtent(extent) {\n      this.olMap.getView().fit(extent);\n    },\n    setViewZoom: function setViewZoom(level) {\n      console.log(level);\n      this.olMap.getView().setZoom(level);\n    }\n  },\n  watch: {\n    viewExtentStore: {\n      handler: function handler() {\n        if (!_utils__WEBPACK_IMPORTED_MODULE_6__[\"equals\"](this.viewExtentStore, this.olMap.getView().calculateExtent())) {\n          this.setViewExtent(this.viewExtentStore);\n        }\n      },\n      deep: true\n    },\n    viewZoomStore: {\n      handler: function handler() {\n        if (this.viewZoomStore != this.olMap.getView().getZoom()) {\n          this.setViewZoom(this.viewZoomStore);\n        }\n      },\n      deep: true\n    }\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (mixin);\n\n//# sourceURL=webpack:///./src/mixins/BaseMapMixin.mixin.js?");

/***/ }),

/***/ "./src/mixins/LayersMixin.mixin.js":
/*!*****************************************!*\
  !*** ./src/mixins/LayersMixin.mixin.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper */ \"./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n\n\n\n\n\nvar mixin = {\n  created: function created() {\n    this.olLayers = [];\n  },\n  mounted: function mounted() {\n    var _iterator = Object(C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.layersStore),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var layerDefinition = _step.value;\n\n        if (layerDefinition.id == \"troncons\") {\n          // ********************************** troncons LAYER *************************************\n          var tronconLayer = _utils__WEBPACK_IMPORTED_MODULE_4__[\"createTronconsLayer\"](layerDefinition);\n          if (typeof layerDefinition.visible === \"boolean\") tronconLayer.setVisible(layerDefinition.visible);\n          this.olLayers.push(tronconLayer);\n          this.olMap.addLayer(tronconLayer);\n        } else if (layerDefinition.id == \"background\") {\n          // ********************************************   BACKGROUND LAYER *************************************\n          var layerBackground = _utils__WEBPACK_IMPORTED_MODULE_4__[\"createBackgroundLayer\"](layerDefinition);\n          if (typeof layerDefinition.visible === \"boolean\") layerBackground.setVisible(layerDefinition.visible);\n          this.olLayers.push(layerBackground);\n          this.olMap.addLayer(layerBackground);\n        } else if (layerDefinition.id == \"ortho\") {\n          // ********************************************   BACKGROUND LAYER *************************************\n          var layerortho = _utils__WEBPACK_IMPORTED_MODULE_4__[\"createBackgroundLayer\"](layerDefinition);\n          if (typeof layerDefinition.visible === \"boolean\") layerortho.setVisible(layerDefinition.visible);\n          this.olLayers.push(layerortho);\n          this.olMap.addLayer(layerortho);\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  },\n  computed: Object(C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Object(C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, Object(vuex__WEBPACK_IMPORTED_MODULE_3__[\"mapState\"])({\n    layersStore: function layersStore(state) {\n      return state.map.layers;\n    },\n    viewExtentStore: function viewExtentStore(state) {\n      return state.map.viewExtent;\n    },\n    viewZoomStore: function viewZoomStore(state) {\n      return state.map.viewZoom;\n    },\n    selectedTronconsStore: function selectedTronconsStore(state) {\n      return state.map.selectedTroncons;\n    }\n  })), {}, {\n    style: function style() {\n      return _utils__WEBPACK_IMPORTED_MODULE_4__[\"generateNewTronconStyleFunc\"](this.viewExtentStore, this.viewZoomStore, this.selectedTronconsStore);\n    }\n  }),\n  watch: {\n    layersStore: {\n      handler: function handler() {\n        for (var i = 0; i < this.layersStore.length; i++) {\n          if (typeof this.layersStore[i].visible === \"boolean\") this.olLayers[i].setVisible(this.layersStore[i].visible);\n        }\n      },\n      deep: true\n    },\n    style: {\n      handler: function handler() {\n        var i = 0;\n\n        var _iterator2 = Object(C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.layersStore),\n            _step2;\n\n        try {\n          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n            var layerDefinition = _step2.value;\n\n            if (layerDefinition.id == \"troncons\") {\n              this.olLayers[i].setStyle(this.style);\n            }\n\n            i++;\n          }\n        } catch (err) {\n          _iterator2.e(err);\n        } finally {\n          _iterator2.f();\n        }\n      },\n      deep: true\n    }\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (mixin);\n\n//# sourceURL=webpack:///./src/mixins/LayersMixin.mixin.js?");

/***/ }),

/***/ "./src/pages/EditMap.js":
/*!******************************!*\
  !*** ./src/pages/EditMap.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(C_Users_afitas_Documents_Project_rna_vue_apps_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _EditApp_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../EditApp.vue */ \"./src/EditApp.vue\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store */ \"./src/store/index.js\");\n\n\n\n\n\n\n\nwindow.store = _store__WEBPACK_IMPORTED_MODULE_6__[\"default\"];\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  store: _store__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  render: function render(h) {\n    return h(_EditApp_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  }\n}).$mount(\"#edit_app\");\n\n//# sourceURL=webpack:///./src/pages/EditMap.js?");

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/ui */ \"./src/store/modules/ui.js\");\n/* harmony import */ var _modules_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/map */ \"./src/store/modules/map.js\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].Store({\n  modules: {\n    ui: _modules_ui__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    map: _modules_map__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  }\n}));\n\n//# sourceURL=webpack:///./src/store/index.js?");

/***/ }),

/***/ "./src/store/modules/map.js":
/*!**********************************!*\
  !*** ./src/store/modules/map.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ \"./node_modules/core-js/modules/es.array.slice.js\");\n/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ \"./node_modules/core-js/modules/es.array.includes.js\");\n/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ \"./node_modules/core-js/modules/es.string.includes.js\");\n/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.splice.js */ \"./node_modules/core-js/modules/es.array.splice.js\");\n/* harmony import */ var core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var ol_extent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/extent */ \"./node_modules/ol/extent.js\");\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../consts */ \"./src/consts.js\");\n\n\n\n\n\n\n\n\nvar state = {\n  layers: [{\n    id: \"ortho\",\n    title: \"صورة أورثو\",\n    geoserverLayername: _consts__WEBPACK_IMPORTED_MODULE_7__[\"ORTHO_LAYER_NAME\"],\n    zindex: 0,\n    visible: true\n  }, {\n    id: \"background\",\n    title: \"خلفية الخريطة\",\n    geoserverLayername: _consts__WEBPACK_IMPORTED_MODULE_7__[\"BACKGROUND_LAYER_NAME\"],\n    zindex: 1,\n    visible: true\n  }, {\n    id: \"troncons\",\n    title: \"أقسام الطريق\",\n    geoserverLayername: _consts__WEBPACK_IMPORTED_MODULE_7__[\"TRONCONS_LAYER_NAME\"],\n    zindex: 3,\n    visible: true\n  }],\n  selectedTroncons: [],\n  viewExtent: [],\n  viewZoom: 10\n};\nvar getters = {};\nvar actions = {\n  featureSelected: function featureSelected(_ref, _ref2) {\n    var state = _ref.state,\n        commit = _ref.commit;\n    var feature = _ref2.feature;\n    var extent = feature.extent_.slice();\n    var e = Object(ol_extent__WEBPACK_IMPORTED_MODULE_6__[\"buffer\"])(extent, 0.0008); //after search\n\n    commit(\"setStoreViewExtent\", {\n      viewExtent: e\n    });\n    if (state.viewZoom > 15) commit(\"setSelectedTroncon\", {\n      feature: feature\n    });\n  }\n};\nvar mutations = {\n  visibleLayer: function visibleLayer(state, payload) {\n    state.layers[payload.index].visible = payload.visible;\n  },\n  setStoreViewExtent: function setStoreViewExtent(state, _ref3) {\n    var viewExtent = _ref3.viewExtent;\n    state.viewExtent = viewExtent;\n  },\n  setStoreViewZoom: function setStoreViewZoom(state, _ref4) {\n    var viewZoom = _ref4.viewZoom;\n    state.viewZoom = viewZoom;\n  },\n  setSelectedTroncon: function setSelectedTroncon(state, _ref5) {\n    var feature = _ref5.feature;\n\n    // If it exist in selectedTroncons delete it else add it\n    if (!state.selectedTroncons.map(function (e) {\n      return e.properties_[_consts__WEBPACK_IMPORTED_MODULE_7__[\"GEOM_ID_COLUMN_NAME\"]];\n    }).includes(feature.properties_[_consts__WEBPACK_IMPORTED_MODULE_7__[\"GEOM_ID_COLUMN_NAME\"]])) {\n      state.selectedTroncons.push(feature);\n    } else {\n      state.selectedTroncons.splice(state.selectedTroncons.map(function (e) {\n        return e.properties_[_consts__WEBPACK_IMPORTED_MODULE_7__[\"GEOM_ID_COLUMN_NAME\"]];\n      }).indexOf(feature.properties_[_consts__WEBPACK_IMPORTED_MODULE_7__[\"GEOM_ID_COLUMN_NAME\"]]), 1);\n    }\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  state: state,\n  getters: getters,\n  actions: actions,\n  mutations: mutations\n});\n\n//# sourceURL=webpack:///./src/store/modules/map.js?");

/***/ }),

/***/ "./src/store/modules/ui.js":
/*!*********************************!*\
  !*** ./src/store/modules/ui.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar state = {};\nvar mutations = {};\nvar actions = {};\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  state: state,\n  actions: actions,\n  mutations: mutations // getters\n\n});\n\n//# sourceURL=webpack:///./src/store/modules/ui.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: createBackgroundLayer, createTronconsLayer, equals, generateNewTronconStyleFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createBackgroundLayer\", function() { return createBackgroundLayer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createTronconsLayer\", function() { return createTronconsLayer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"equals\", function() { return equals; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateNewTronconStyleFunc\", function() { return generateNewTronconStyleFunc; });\n/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ \"./node_modules/core-js/modules/es.array.slice.js\");\n/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ \"./node_modules/core-js/modules/es.array.includes.js\");\n/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ \"./node_modules/core-js/modules/es.string.includes.js\");\n/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ \"./node_modules/core-js/modules/es.array.map.js\");\n/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./consts */ \"./src/consts.js\");\n/* harmony import */ var ol_layer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/layer */ \"./node_modules/ol/layer.js\");\n/* harmony import */ var ol_source__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/source */ \"./node_modules/ol/source.js\");\n/* harmony import */ var ol_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style */ \"./node_modules/ol/style.js\");\n/* harmony import */ var ol_tilegrid_WMTS__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/tilegrid/WMTS */ \"./node_modules/ol/tilegrid/WMTS.js\");\n/* harmony import */ var ol_format__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/format */ \"./node_modules/ol/format.js\");\n\n\n\n\n\n\n\n\n\n\nvar gridsetName = \"EPSG:4326\";\nvar resolutions = _consts__WEBPACK_IMPORTED_MODULE_4__[\"resolutions\"];\nvar gridNames = _consts__WEBPACK_IMPORTED_MODULE_4__[\"gridNames\"];\nvar style = \"\";\nvar GEOSERVER_WMTS_URL = _consts__WEBPACK_IMPORTED_MODULE_4__[\"GEOSERVER_WMTS_URL\"];\nvar projection = \"EPSG:4326\";\nvar createBackgroundLayer = function createBackgroundLayer(layerDefinition) {\n  var format = \"image/png\";\n  var layerName = layerDefinition.geoserverLayername;\n  var baseParams = [\"api_key\", \"VERSION\", \"LAYER\", \"STYLE\", \"TILEMATRIX\", \"TILEMATRIXSET\", \"SERVICE\", \"FORMAT\"];\n  var params = {\n    api_key: window.api_key,\n    VERSION: \"1.0.0\",\n    LAYER: layerName,\n    STYLE: style,\n    TILEMATRIX: gridsetName,\n    TILEMATRIXSET: gridsetName,\n    SERVICE: \"WMTS\",\n    FORMAT: format\n  };\n  var url = GEOSERVER_WMTS_URL + \"?\";\n\n  for (var param in params) {\n    if (baseParams.indexOf(param.toUpperCase()) < 0) {\n      url = url + param + \"=\" + params[param] + \"&\";\n    }\n  }\n\n  url = url.slice(0, -1);\n  var layerBackground = new ol_layer__WEBPACK_IMPORTED_MODULE_5__[\"Tile\"]({\n    zIndex: layerDefinition.zindex,\n    source: new ol_source__WEBPACK_IMPORTED_MODULE_6__[\"WMTS\"]({\n      url: url,\n      layer: params[\"LAYER\"],\n      matrixSet: params[\"TILEMATRIXSET\"],\n      format: params[\"FORMAT\"],\n      projection: projection,\n      tileGrid: new ol_tilegrid_WMTS__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n        tileSize: [256, 256],\n        extent: [-180.0, -90.0, 180.0, 90.0],\n        origin: [-180.0, 90.0],\n        resolutions: resolutions,\n        matrixIds: gridNames\n      }),\n      style: params[\"STYLE\"],\n      wrapX: true\n    })\n  });\n  return layerBackground;\n};\nvar createTronconsLayer = function createTronconsLayer(layerDefinition) {\n  var format = \"application/vnd.mapbox-vector-tile\";\n  var layerName = _consts__WEBPACK_IMPORTED_MODULE_4__[\"TRONCONS_LAYER_NAME\"];\n  var params = {\n    api_key: window.api_key,\n    REQUEST: \"GetTile\",\n    SERVICE: \"WMTS\",\n    VERSION: \"1.0.0\",\n    LAYER: layerName,\n    STYLE: style,\n    TILEMATRIX: gridsetName + \":{z}\",\n    TILEMATRIXSET: gridsetName,\n    FORMAT: format,\n    TILECOL: \"{x}\",\n    TILEROW: \"{y}\"\n  };\n  var url = GEOSERVER_WMTS_URL + \"?\";\n\n  for (var param in params) {\n    url = url + param + \"=\" + params[param] + \"&\";\n  }\n\n  url = url.slice(0, -1);\n  var tronconLayer = new ol_layer__WEBPACK_IMPORTED_MODULE_5__[\"VectorTile\"]({\n    declutter: true,\n    // minZoom: 14,\n    zIndex: layerDefinition.zindex,\n    source: new ol_source__WEBPACK_IMPORTED_MODULE_6__[\"VectorTile\"]({\n      crossOrigin: \"*\",\n      url: url,\n      format: new ol_format__WEBPACK_IMPORTED_MODULE_9__[\"MVT\"](),\n      projection: projection,\n      tileGrid: new ol_tilegrid_WMTS__WEBPACK_IMPORTED_MODULE_8__[\"default\"]({\n        tileSize: [256, 256],\n        origin: [-180.0, 90.0],\n        resolutions: resolutions,\n        matrixIds: gridNames\n      }),\n      wrapX: true\n    }) // style: function(feature, resolution) {\n    //   return new olStyle.Style({\n    //     stroke: new olStyle.Stroke({\n    //       color: \"red\",\n    //       width: 3,\n    //     }),\n    //     text: new olStyle.Text({\n    //       font: \"12px Calibri,sans-serif\",\n    //       text: feature.get(consts.GEOM_ID_COLUMN_NAME),\n    //       fill: new olStyle.Fill({\n    //         color: \"#000\",\n    //       }),\n    //       stroke: new olStyle.Stroke({\n    //         color: \"#fff\",\n    //         width: 3,\n    //       }),\n    //     }),\n    //   });\n    // },\n\n  });\n  return tronconLayer;\n};\nvar equals = function equals(a, b) {\n  return a.length === b.length && a.every(function (v, i) {\n    return v === b[i];\n  });\n};\nfunction generateNewTronconStyleFunc(extent, zoom, selectedTroncons) {\n  return function (feature, resolution) {\n    var color = \"orange\";\n    if (selectedTroncons.map(function (e) {\n      return e.properties_[_consts__WEBPACK_IMPORTED_MODULE_4__[\"GEOM_ID_COLUMN_NAME\"]];\n    }).includes(feature.get(_consts__WEBPACK_IMPORTED_MODULE_4__[\"GEOM_ID_COLUMN_NAME\"]))) color = \"blue\";\n    var styleOpt = {};\n    styleOpt[\"stroke\"] = new ol_style__WEBPACK_IMPORTED_MODULE_7__[\"Stroke\"]({\n      color: color,\n      width: 3\n    }); // console.log(feature.get(consts.GEOM_ID_COLUMN_NAME));\n\n    styleOpt[\"text\"] = new ol_style__WEBPACK_IMPORTED_MODULE_7__[\"Text\"]({\n      font: \"12px Calibri,sans-serif\",\n      text: feature.get(_consts__WEBPACK_IMPORTED_MODULE_4__[\"GEOM_ID_COLUMN_NAME\"]),\n      fill: new ol_style__WEBPACK_IMPORTED_MODULE_7__[\"Fill\"]({\n        color: \"#000\"\n      }),\n      stroke: new ol_style__WEBPACK_IMPORTED_MODULE_7__[\"Stroke\"]({\n        color: \"#fff\",\n        width: 3\n      })\n    });\n    return new ol_style__WEBPACK_IMPORTED_MODULE_7__[\"Style\"](styleOpt);\n  };\n}\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./src/pages/EditMap.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\Users\\afitas\\Documents\\Project\\rna\\vue_apps\\src\\pages\\EditMap.js */\"./src/pages/EditMap.js\");\n\n\n//# sourceURL=webpack:///multi_./src/pages/EditMap.js?");

/***/ })

/******/ });