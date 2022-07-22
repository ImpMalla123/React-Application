import { rejects } from 'assert';
import mongose from 'mongoose';
import { resolve } from 'path';

export class DBConfig{
    public static connectToDB(dbURL:string, dbName:string):Promise<any>{
        return new Promise((resolve,rejects)=>{
            mongose.connect(dbURL,{
                dbName:dbName
            }).then(()=>{
                resolve("Mongos BD  Connected successful");
            }).catch((error: any)=>{
                process.exit(0);
                rejects(error);
            })
        })
    }
}