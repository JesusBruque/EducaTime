import fs from 'fs';
import config from "../config";
import AWS from 'aws-sdk';
import * as S3 from "aws-sdk/clients/s3";


export default class FilesServices{
    private s3 : S3;
    constructor(){
        AWS.config.update({
            accessKeyId: config.iam_id_key,
            secretAccessKey: config.iam_secret_key,
            region: 'eu-west-3',
        });
        this.s3 = new AWS.S3();
    }

    /*--- PARA SUBIR IMAGENES VAMOS A PONER UN PREFIJO /public/blogImages*/
    /*--- PARA SUBIR LOS VIDEOS DE LOS CURSOS VAMOS HACERLO POR STREAM CONTROLANDO LO QUE ENVIAMOS ---*/
    public uploadFile = async (file,targetName): Promise<string> => {
        console.log('preparing to upload...');
        const putParams = {
            Bucket      : 'casor-s3',
            Key         : targetName,
            Body        : file
        };
        const options= {partSize: 10 * 1024 * 1024, queueSize: 10}; //

        return new Promise((resolve,reject) => {
            this.s3.upload(putParams,options,(err,data) => {
                if(err) reject(err);
                console.log(data);
                resolve(data.Location);
            });
        });
    };

    public retrieveFile = async (filename) => {
        console.log('preparing to retrieve...');
        const getParams = {
            Bucket: 'casor-s3',
            Key: filename
        };

        return new Promise((resolve,reject) => {
            this.s3.headObject(getParams, function(err, data) {
                if(err) reject(err);
                console.log(data);
                resolve(data);
            });
        })
    }
}
