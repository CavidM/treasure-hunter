import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import GraphqlHttp from "./graphql/root/GraphqlHttp";
require('dotenv').config();


class App {

    public app: express.Application;

    constructor() {
        this.app = express();

        this.init();
    }

    public async init(): Promise<any> {

        this.config();
        
        this.app.use('/graphql', cors(), GraphqlHttp());

        return this;
    }

    private config(): void {

        this.app.use(helmet());

        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type");
            next();
        });

        this.app.use(bodyParser.json());   // support application/json type post data

        this.app.use(bodyParser.urlencoded({extended: false}));  //support application/x-www-form-urlencoded post data
    }
}

export default new App().app;
