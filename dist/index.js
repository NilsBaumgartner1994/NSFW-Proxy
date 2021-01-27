module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ServerProxy.js":
/*!****************************!*\
  !*** ./src/ServerProxy.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ServerProxy; });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _module_MyLogger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/MyLogger */ \"./src/module/MyLogger.js\");\n/* eslint no-console: \"off\" */\n\n/**\n * Proxy Starts here\n * All needed modules will be loaded here\n * configurations will be set\n * and the server will be started\n */\n\n\n // Using Winston\n\nconst {\n  constants\n} = __webpack_require__(/*! crypto */ \"crypto\");\n\nconst https = __webpack_require__(/*! https */ \"https\");\n\nconst http = __webpack_require__(/*! http */ \"http\");\n\nconst cors = __webpack_require__(/*! cors */ \"cors\"); // to allow cors\n\n\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\"); // Security\n\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst proxy = __webpack_require__(/*! express-http-proxy */ \"express-http-proxy\");\n\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\"); //a parser for requests with body data\n\n/***********************************************************************************************************************\n *********************************************** Import of Libraries ***************************************************\n **********************************************************************************************************************/\n\n\nconst motd = \"\\n\" + \"███╗   ██╗███████╗███████╗██╗    ██╗      ██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗\\n\" + \"████╗  ██║██╔════╝██╔════╝██║    ██║      ██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝\\n\" + \"██╔██╗ ██║███████╗█████╗  ██║ █╗ ██║█████╗██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝ \\n\" + \"██║╚██╗██║╚════██║██╔══╝  ██║███╗██║╚════╝██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝  \\n\" + \"██║ ╚████║███████║██║     ╚███╔███╔╝      ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║   \\n\" + \"╚═╝  ╚═══╝╚══════╝╚═╝      ╚══╝╚══╝       ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   \\n\";\nlet httpPort = 80;\nlet httpsPort = 443;\nlet proxyConfig = null;\nclass ServerProxy {\n  constructor(proxyConfig) {\n    this.proxyConfig = proxyConfig;\n  }\n\n  async start() {\n    proxyConfig = this.proxyConfig;\n    await startServer();\n  }\n\n}\n/**\n * Redirect incomming http traffic to https\n * https://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express\n */\n\nfunction startServerForRedirectToHTTPS() {\n  let http = express__WEBPACK_IMPORTED_MODULE_1___default()(); // set up a route to redirect http to https\n\n  http.get('*', function (req, res) {\n    res.redirect('https://' + req.headers.host + req.url); // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:\n    // res.redirect('https://example.com' + req.url);\n  }); // have it listen on 80\n\n  http.listen(httpPort);\n}\n/**\n * The Main Function of the server\n * @returns {Promise<void>}\n */\n\n\nasync function startServer() {\n  console.log(\"Welcome to\");\n  console.log(motd);\n  const backend = proxyConfig.server.api_server_domain; // At Production Server\n\n  const url = __webpack_require__(/*! url */ \"url\"); // Problem Error: unable to verify the first certificate\n  //solution https://stackoverflow.com/questions/31673587/error-unable-to-verify-the-first-certificate-in-nodejs\n\n\n  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; //TODO find an other solution for this.\n  //this is only okay if we are dealing with localhost\n  // https://github.com/villadora/express-http-proxy/issues/127\n\n  const isMultipartRequest = req => {\n    const contentTypeHeader = req.headers[\"content-type\"];\n    return contentTypeHeader && contentTypeHeader.indexOf(\"multipart\") > -1;\n  };\n\n  const proxyMiddleware = (req, res, next) => proxy(backend, {\n    parseReqBody: !isMultipartRequest(req),\n    proxyReqPathResolver: req => url.parse(req.baseUrl).path + url.parse(req.url).path\n  })(req, res, next);\n\n  const apiProxy = proxyMiddleware;\n  const frontend = proxyConfig.server.server_frontend_domain; // For Localhsot, but seems to be ok with Production Server\n\n  const apiFrontend = proxy(frontend, {\n    proxyReqPathResolver: req => url.parse(req.baseUrl).path\n  });\n  const myLogger = new _module_MyLogger__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  const logger = myLogger.getLogger(); // END OF THE LOGGER\n\n  logger.info(\"Logger Instance (winston) created\");\n  const app = new express__WEBPACK_IMPORTED_MODULE_1___default.a();\n  app.use(cors()); // has to be the first\n\n  app.use(helmet()); // use security\n\n  let maxBodyUploadSizeInMb = proxyConfig.uploads.maxBodyUploadSizeInMb || 50;\n  app.use(bodyParser.json({\n    limit: maxBodyUploadSizeInMb + 'mb'\n  })); //set body limit\n\n  app.use(bodyParser.urlencoded({\n    limit: maxBodyUploadSizeInMb + 'mb',\n    extended: true,\n    parameterLimit: 1000000\n  })); //set url limit\n\n  app.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.json()); //AFTER BodyParser ! https://stackoverflow.com/questions/60947294/error-413-payload-too-large-when-upload-image\n\n  app.disable(\"x-powered-by\"); // Attackers can use this header to detect apps running Express and then launch specifically-targeted attacks.\n  // define the folder that will be used for static assets\n\n  app.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, \"static\")));\n  app.use(\"/api/*\", apiProxy); // this will proxy all incoming requests to /api route to back end\n\n  app.use(\"/metrics/*\", apiMetrics);\n  app.use(\"/*\", apiFrontend); // this will proxy all incoming requests to /client route to front end\n  // start the server\n\n  const env = \"production\"; // process.env.NODE_ENV ||\n\n  try {\n    const httpsCredntials = {\n      secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,\n      key: fs.readFileSync(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(proxyConfig.ssl.privkeyPath)),\n      cert: fs.readFileSync(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(proxyConfig.ssl.certPath)),\n      passphrase: \"YOUR PASSPHRASE HERE\"\n    };\n    https.createServer(httpsCredntials, app).listen(httpsPort, err => {\n      if (err) {\n        return console.error(err);\n      }\n\n      return console.info(`\n      Server running on https://localhost:${httpsPort} [${env}]\n      Universal rendering: ${process.env.UNIVERSAL ? \"enabled\" : \"disabled\"}\n    `);\n    });\n    startServerForRedirectToHTTPS();\n  } catch (e) {\n    console.log(e);\n    console.log(\"No certificates for https found\");\n    http.createServer(app).listen(httpPort, err => {\n      if (err) {\n        return console.error(err);\n      }\n\n      return console.info(`\n        Server running on http://localhost:${httpPort} [${env}]\n        Universal rendering: ${process.env.UNIVERSAL ? \"enabled\" : \"disabled\"}\n    `);\n    });\n  }\n}\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/ServerProxy.js?");

/***/ }),

/***/ "./src/helper/FileSystemHelper.js":
/*!****************************************!*\
  !*** ./src/helper/FileSystemHelper.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FileSystemHelper; });\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst path = __webpack_require__(/*! path */ \"path\");\n/**\n * A Helper for FileSystem. Managing Files, deleting, ...\n */\n\n\nclass FileSystemHelper {\n  /**\n   * Make a Directory, and by default all subfolders automatically recursive.\n   * @param dirPath\n   */\n  static mkdirpath(dirPath, recursive = true) {\n    try {\n      fs.mkdirSync(dirPath, {\n        recursive: recursive\n      });\n    } catch (err) {\n      if (err.code !== 'EEXIST') {}\n    }\n  }\n  /**\n   * Checks if a path exists\n   * @param path The path as String\n   * @returns {boolean}\n   */\n\n\n  static doesPathExist(path) {\n    return fs.existsSync(path);\n  }\n  /**\n   * Creates all folders necessary for a file.\n   * @param filePath path to a file\n   */\n\n\n  static mkdirpathForFile(filePath) {\n    let parentDir = path.dirname(filePath); //get folder of file\n\n    FileSystemHelper.mkdirpath(parentDir); //create all subfolders\n  }\n  /**\n   * Deletes a File from Disk\n   * @param filePath path to file\n   */\n\n\n  static deleteFile(filePath) {\n    try {\n      fs.unlinkSync(filePath);\n    } catch (err) {\n      if (err.code !== \"ENOENT\") {//deleting something that does not exist\n      }\n    }\n  }\n  /**\n   * Read Content from a File\n   * @param path path to file\n   * @returns {Buffer} Returns the content from the file\n   */\n\n\n  static readFileAsString(path) {\n    let contents = fs.readFileSync(path);\n    return contents;\n  }\n  /**\n   * Reads Content from a File and Converts to JSON\n   * @param path path to file\n   * @returns {any}\n   */\n\n\n  static readFileAsJSON(path) {\n    let contents = FileSystemHelper.readFileAsString(path);\n    let jsonContent = JSON.parse(contents); //parse content\n\n    return jsonContent;\n  }\n  /**\n   * Writes content into a file\n   * @param path path to file\n   * @param contents Content as String\n   * @param cb Callback Function on error\n   */\n\n\n  static writeFile(path, contents, cb) {\n    mkdirp(getDirName(path), function (err) {\n      if (err) return cb(err); //on error send to callback\n\n      fs.writeFile(path, contents, cb);\n    });\n  }\n  /**\n   * Get all Files from a Path. Ignores Hidden files\n   * @param path Path to a folder\n   * @returns {null|Array}\n   */\n\n\n  static getAllFilesFormPath(path) {\n    if (!path) {\n      //if no path defined\n      return null; //handle error\n    }\n\n    let files = []; //create empty list\n\n    if (fs.existsSync(path)) {\n      //is path exists\n      fs.readdirSync(path).forEach(function (file, index) {\n        let curPath = path + \"/\" + file; //create path of file\n\n        if (fs.lstatSync(curPath).isDirectory()) {//if its dictionary\n          //do nothing\n        } else {\n          // otherwise if file\n          if (!/(^|\\/)\\.[^\\/\\.]/g.test(file)) {\n            //ignore hidden files https://stackoverflow.com/questions/18973655/how-to-ingnore-hidden-files-in-fs-readdir-result\n            files.push(file); //add to list\n          }\n        }\n      });\n    }\n\n    return files; //return found resulsts\n  }\n  /**\n   * Deletes a Folder recursive\n   * @param path The path to be deleted\n   * @param inst\n   */\n\n\n  static deleteFolderRecursive(path) {\n    if (path === undefined) {\n      return;\n    }\n\n    if (fs.existsSync(path)) {\n      fs.readdirSync(path).forEach(function (file, index) {\n        let curPath = path + \"/\" + file;\n\n        if (fs.lstatSync(curPath).isDirectory()) {\n          // recursive\n          FileSystemHelper.deleteFolderRecursive(curPath);\n        } else {\n          // delete file\n          fs.unlinkSync(curPath);\n        }\n      });\n      fs.rmdirSync(path);\n    }\n  }\n  /**\n   * Get the createdAt time of a file/folder\n   * @param path The path to the file/folder\n   * @returns {Date}\n   */\n\n\n  static getCreatedDate(path) {\n    const {\n      birthtime\n    } = fs.statSync(path);\n    return birthtime;\n  }\n  /**\n   * Get the updatedAt time of a file/folder\n   * @param path The path to the file/folder\n   * @returns {Date}\n   */\n\n\n  static getFileUpdatedDate(path) {\n    const stats = fs.statSync(path);\n    return stats.mtime;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/helper/FileSystemHelper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// this should be the entry point to your library\nmodule.exports = {\n  ServerProxy: __webpack_require__(/*! ./ServerProxy */ \"./src/ServerProxy.js\").default // eslint-disable-line global-require\n\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/module/MyLogger.js":
/*!********************************!*\
  !*** ./src/module/MyLogger.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MyLogger; });\n/* harmony import */ var _helper_FileSystemHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/FileSystemHelper */ \"./src/helper/FileSystemHelper.js\");\nconst {\n  createLogger,\n  format,\n  transports\n} = __webpack_require__(/*! winston */ \"winston\");\n\n__webpack_require__(/*! winston-daily-rotate-file */ \"winston-daily-rotate-file\");\n\nconst {\n  combine,\n  timestamp,\n  label,\n  printf\n} = format;\n\n/**\n * MyLogger is a Wrapper for winston logger https://www.npmjs.com/package/winston\n * This logger simply creates just a format and handles the folder structure\n */\n\nclass MyLogger {\n  /**\n   * Constructor of a logger\n   * @param folderName the folder name\n   * @param workerID the workerID\n   */\n  constructor(folderName, workerID) {\n    const pathToGeneralLogFolder = \"./logs/\"; //get path of logs\n\n    _helper_FileSystemHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mkdirpath(pathToGeneralLogFolder); //create it if it does not exist\n\n    const pathToLogFolder = pathToGeneralLogFolder + folderName;\n    _helper_FileSystemHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mkdirpath(pathToLogFolder); //create specific folder\n    // CREATING THE LOGGER\n\n    const myFormat = printf(({\n      level,\n      message,\n      label,\n      timestamp\n    }) => {\n      return `${timestamp} [${label}] ${level}: ${message}`;\n    });\n    let transportsList = [];\n    transportsList.push(new transports.DailyRotateFile({\n      //each day a new file\n      filename: 'logs/' + folderName + '/error-%DATE%.log',\n      datePattern: 'YYYY-MM-DD-HH',\n      zippedArchive: false,\n      maxSize: '20m',\n      maxFiles: '14d',\n      level: 'error'\n    }));\n    transportsList.push(new transports.DailyRotateFile({\n      //each day a new file\n      filename: 'logs/' + folderName + '/combined-%DATE%.log',\n      datePattern: 'YYYY-MM-DD-HH',\n      zippedArchive: false,\n      maxSize: '20m',\n      maxFiles: '14d'\n    }));\n    const customLabel = \"Worker: \" + workerID + \" - \" + folderName; //the format will be defined here\n\n    this.logger = createLogger({\n      format: combine(label({\n        label: customLabel\n      }), timestamp(), myFormat),\n      defaultMeta: {\n        service: 'user-service'\n      },\n      transports: transportsList\n    });\n    this.logger.info(\"[\" + folderName + \"] Logger Created\"); //first logger message :D\n  }\n  /**\n   * Returns the logger instance\n   */\n\n\n  getLogger() {\n    return this.logger;\n  }\n\n}\n\n//# sourceURL=webpack:///./src/module/MyLogger.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-http-proxy":
/*!*************************************!*\
  !*** external "express-http-proxy" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-http-proxy\");\n\n//# sourceURL=webpack:///external_%22express-http-proxy%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url\");\n\n//# sourceURL=webpack:///external_%22url%22?");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston\");\n\n//# sourceURL=webpack:///external_%22winston%22?");

/***/ }),

/***/ "winston-daily-rotate-file":
/*!********************************************!*\
  !*** external "winston-daily-rotate-file" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston-daily-rotate-file\");\n\n//# sourceURL=webpack:///external_%22winston-daily-rotate-file%22?");

/***/ })

/******/ });