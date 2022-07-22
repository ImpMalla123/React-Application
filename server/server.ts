import express, {Application, Request, response, Response} from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import { DBConfig } from './utillDB/DBConfig';
import productRouter from './Routers/productRouter';

const app: Application = express();

// configure dot-env
dotenv.config({
    path: './.env'
});

// configure express to receive form data
app.use(express.json());

const hostName: string | undefined = process.env.HOST_NAME;
const port: number | undefined = Number(process.env.PORT);

// connect to local mongodb
const dbURL:string |undefined = process.env.MONGO_DB_LOCAL_URL;
const dbName:string | undefined = process.env.DATA_BASE_NAME;

if(dbURL && dbName){
    DBConfig.connectToDB(dbURL,dbName).then((response)=>{
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    })
}

app.get('/', (request: Request, response: Response) => {
    response.status(200);
    response.json({
        msg: "Welcome to Express Server"
    });
});

// router configuration
app.use(cors());
app.use("/api/products",productRouter);

if (port && hostName) {
    app.listen(port, hostName, () => {
        console.log(`Express JS Server is started at http://${hostName}:${port}`);
    });
}
