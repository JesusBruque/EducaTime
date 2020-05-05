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

    public uploadFile = async (file,targetName,res): Promise<string> => {
        const putParams = {
            Bucket      : 'casor-s3',
            Key         : targetName,
            Body        : file
        };
        const options= {partSize: 10 * 1024 * 1024, queueSize: 10}; //

        return new Promise((resolve,reject) => {
            this.s3.upload(putParams,options,(err,data) => {
                if(err) reject(err);
                resolve(data.Location);
            }).on('httpUploadProgress',(evt) => {
                console.log('EVENTO ON PROGRESSS --> ',evt);
                //res.write(evt);
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
