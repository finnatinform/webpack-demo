import Express = require('express');
import Webpack = require('webpack');
import * as path from "path";
import * as http from "http";

// SERVER
export class Server {
    /**
     * Internal Server Application
     */
    private __Application: Express.Application;
    private __Server : http.Server;

    constructor() {
        this.__Application = Express();
        this.initializeMiddleware();
    }

    /**
     * Wrapper method for initializing middleware
     */
    private initializeMiddleware(): void {
        // WEBPACK
        const CONFIG = require('./../webpack.config.client.js');
        const COMPILER = Webpack(CONFIG);

        this.__Application.use(require('webpack-dev-middleware')(COMPILER, {
            noInfo: true, publicPath: CONFIG.output.publicPath, stats: { colors: true }
        }));
        this.__Application.use(require('webpack-hot-middleware')(COMPILER));

        // STATIC SERVE
        this.__Application.use(Express.static('public'));
    }

    /**
     *  method which will be executed once the start method is called
     */
    private onServerStart(): void {
        console.log(`Listening to Port 3000 from Server in `+process.cwd());
    }

    public start(): void {
        console.log('#################################START SERVER#################################');
        this.__Server = this.__Application.listen(3000,this.onServerStart);
    }

    public stop():void{
        console.log('#################################STOP SERVER#################################');
        this.__Server.close();
    }
}

const SERVER : Server = new Server();
SERVER.start();

process.on('exit', ()=>{ SERVER.stop() });
