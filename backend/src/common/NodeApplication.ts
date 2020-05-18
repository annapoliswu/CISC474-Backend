import express from 'express'
import bodyParser from 'body-parser'
import { AppRouter } from './AppRouter';

/* This is the base class for a Node Express application, it provides lifecycle hooks
    for various stages of application initialization and an abstract method 
    for attaching the endpoint routes to the appliation */
export abstract class NodeApplication {
    app: express.Application;
    routes: express.Router;

    //NodeApplication:
    //  port: number - The port for the node server to listen on
    //  rootPath: string (Optional) - The path of the root route, 
    //             defaults to the root of the server
    constructor(private port: number, rootPath: string='/') {        
        this.app = express();
        this.OnBeforeInit();
        this.initCors();
        this.initBodyParser();
        this.routes = this.SetupRoutes().expressRouter;
        this.app.use(rootPath, this.routes);
    }

    //SetupRoutes: Abstract method for child classes to implement
    //   returns: A populated AppRouter object to be attached to the 
    //      root of the site
    abstract SetupRoutes(): AppRouter;

    //OnBeforeInit: Lifecycle hook before initialization of the application
    OnBeforeInit(): void {};
    //OnSetupComplete: Lifecycle hook after node server started and listening
    OnSetupComplete(port: number): void {}

    //initBodyParser: Initialize default options for the body parser
    //  override to prevent or change behavior
    protected initBodyParser(): void{
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({limit: '50mb'}));
    }

    //initCors: Initialize default options for CORS allowing open access
    //      Override this method to prvent or change behavior
    protected initCors(): void {
        this.app.use(function (req: express.Request, res: express.Response, next: any) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }

    //startServer: Called to start the node.js server
    startServer(): void {
        this.app.listen(this.port, ()=>this.OnSetupComplete(this.port));
    }
}
