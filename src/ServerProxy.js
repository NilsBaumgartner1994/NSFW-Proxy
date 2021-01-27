/* eslint no-console: "off" */
/**
 * Proxy Starts here
 * All needed modules will be loaded here
 * configurations will be set
 * and the server will be started
 */
import path from "path";
import Express from "express";
import MyLogger from "./module/MyLogger"; // Using Winston

const { constants } = require('crypto')
const https = require("https");
const http = require("http");
const cors = require("cors"); // to allow cors

const helmet = require("helmet"); // Security
const fs = require("fs");
const proxy = require("express-http-proxy");
const bodyParser = require('body-parser'); //a parser for requests with body data

/***********************************************************************************************************************
 *********************************************** Import of Libraries ***************************************************
 **********************************************************************************************************************/

const motd =
    "\n" +
    "███╗   ██╗███████╗███████╗██╗    ██╗      ██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗\n" +
    "████╗  ██║██╔════╝██╔════╝██║    ██║      ██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝\n" +
    "██╔██╗ ██║███████╗█████╗  ██║ █╗ ██║█████╗██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝ \n" +
    "██║╚██╗██║╚════██║██╔══╝  ██║███╗██║╚════╝██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝  \n" +
    "██║ ╚████║███████║██║     ╚███╔███╔╝      ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║   \n" +
    "╚═╝  ╚═══╝╚══════╝╚═╝      ╚══╝╚══╝       ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   \n";

let httpPort = 80;
let httpsPort = 443;

let proxyConfig = null;

export default class ServerProxy {

    constructor(proxyConfig) {
        this.proxyConfig = proxyConfig;
    }

    async start(){
        proxyConfig = this.proxyConfig;
        await startServer();
    }

}

/**
 * Redirect incomming http traffic to https
 * https://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express
 */
function startServerForRedirectToHTTPS(){
	let http = Express();

	// set up a route to redirect http to https
	http.get('*', function(req, res) {  
	    res.redirect('https://' + req.headers.host + req.url);

	    // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
    	    // res.redirect('https://example.com' + req.url);
	})

	// have it listen on 80
	http.listen(httpPort);
}

/**
 * The Main Function of the server
 * @returns {Promise<void>}
 */
async function startServer() {
    console.log("Welcome to");
    console.log(motd);

    const backend = proxyConfig.server.api_server_domain; // At Production Server

    const url = require("url");

// Problem Error: unable to verify the first certificate
//solution https://stackoverflow.com/questions/31673587/error-unable-to-verify-the-first-certificate-in-nodejs
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; //TODO find an other solution for this.
//this is only okay if we are dealing with localhost

// https://github.com/villadora/express-http-proxy/issues/127
    const isMultipartRequest = req => {
        const contentTypeHeader = req.headers["content-type"];
        return contentTypeHeader && contentTypeHeader.indexOf("multipart") > -1;
    };

    const proxyMiddleware = (req, res, next) =>
        proxy(backend, {
            parseReqBody: !isMultipartRequest(req),
            proxyReqPathResolver: req =>
                url.parse(req.baseUrl).path + url.parse(req.url).path
        })(req, res, next);

    const apiProxy = proxyMiddleware;

    const frontend = proxyConfig.server.server_frontend_domain; // For Localhsot, but seems to be ok with Production Server
    const apiFrontend = proxy(frontend, {
        proxyReqPathResolver: req => url.parse(req.baseUrl).path
    });

    const myLogger = new MyLogger();
    const logger = myLogger.getLogger();

// END OF THE LOGGER
    logger.info("Logger Instance (winston) created");

    const app = new Express();
    app.use(cors()); // has to be the first
    app.use(helmet()); // use security

    let maxBodyUploadSizeInMb = proxyConfig.uploads.maxBodyUploadSizeInMb || 50;
    app.use(bodyParser.json({limit: maxBodyUploadSizeInMb+'mb'})); //set body limit
    app.use(bodyParser.urlencoded({limit: maxBodyUploadSizeInMb+'mb', extended: true, parameterLimit: 1000000})); //set url limit
    app.use(Express.json()); //AFTER BodyParser ! https://stackoverflow.com/questions/60947294/error-413-payload-too-large-when-upload-image


    app.disable("x-powered-by"); // Attackers can use this header to detect apps running Express and then launch specifically-targeted attacks.

// define the folder that will be used for static assets
    app.use(Express.static(path.join(__dirname, "static")));

    app.use("/api/*", apiProxy); // this will proxy all incoming requests to /api route to back end
    app.use("/*", apiFrontend); // this will proxy all incoming requests to /client route to front end

// start the server
    const env = "production"; // process.env.NODE_ENV ||

    try {
        const httpsCredntials = {
            secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1,
            key: fs.readFileSync(path.join(proxyConfig.ssl.privkeyPath)),
            cert: fs.readFileSync(
                path.join(proxyConfig.ssl.certPath)
            ),
            passphrase: "YOUR PASSPHRASE HERE"
        };
        https.createServer(httpsCredntials, app).listen(httpsPort, err => {
            if (err) {
                return console.error(err);
            }
            return console.info(
                `
      Server running on https://localhost:${httpsPort} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? "enabled" : "disabled"}
    `
            );
        });
        startServerForRedirectToHTTPS();
    } catch (e) {
	console.log(e);
        console.log("No certificates for https found");
        http.createServer(app).listen(httpPort, err => {
            if (err) {
                return console.error(err);
            }
            return console.info(
                `
        Server running on http://localhost:${httpPort} [${env}]
        Universal rendering: ${process.env.UNIVERSAL ? "enabled" : "disabled"}
    `
            );
        });
    }

}
