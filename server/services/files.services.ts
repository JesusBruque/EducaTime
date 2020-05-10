import fs from 'fs';
import config from "../config";
import AWS from 'aws-sdk';
import * as S3 from "aws-sdk/clients/s3";
import * as MediaConvert from "aws-sdk/clients/mediaconvert";

const privateKey = `----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAlPtwQwQdfilka8ItE7xm32a+Lfiv8eaJJu+KysOOW4NpqI5b
Wk/TelsvWQJ7E4GyplVZrkS+DqZS0tmLgWzV88J1CHhNrQbs6KFY25iDkudffKVf
iWK0D6WYhSYJ1AXyGx3zQ+FsuNT3LmBJpRU1DoVPh6Dl+/GDCvJPljf5NgLr0nZa
t8iuByjlaP+EILoNzqOCkrfWBnIs1mmfofePg17DBCktcaMkfrtkxUNAUuKRZId0
r1W96eSxZjaMoQmi7g/4uACW665LmZpK3iDQkTdh+g7tNLLqQ4FtKeVY+8kxz0L8
KM7uDiSpi6c16/Zm1frNiOxIOFzmvqkTQGZz2QIDAQABAoIBAGH8ffmV20//KW02
aS9x2rdUfAEAb7hKSCqzojV6KUdHR1b1SmA74Hu5PYrtdsV9qGJ+AF3+GILKIe9L
5dVaH94TJ6ZKecwzod3fQPItfVxBkSwKGKvjn0orQAVS32P0BSiQqk8bFMb8SxbV
fZp2OE80nvo1eQ4b6nRoqq/CYMaEW+q/0cWtnQcbpWmiC2g7+Etj6dfh7CkjzD/l
PXuXQrO/FdRGQvcbKk8t78/QvuVDcBNDDy8ObNdMTpyam0dVU94ufbJyQHRyyq4U
Qb6ZmeliwNFfus15y2MhqoZ9mtC99ElgihexXQUBw/ylvhG60y3U6uqLQyNS1iaW
w40DRgECgYEA/ICiIDMQ3h+4sqUDJF6HPLG+fKF7HCPKKqHXWbNnVemm1ceQc/ZS
iXnBJuZf8ESk7J1PIiCtvYs68iN3tAT2hl3g1Zwo5M5kD06y9YeoUuLazf9SxvQp
26MogTvJKgkcUNsHeWZ1xLt+ZZpTLSlLYixkG8P5Sbusl7gMMmAFi3UCgYEAlwu5
pFg/344oSMe+GiN2F5QUaPwAE1WK/mHj0i9wHcmZ13SvZItKU070Kn+rKPbZvVmi
7VeOLcIZ17l5JTBoF+LXvNrwq5zj/iPzBci4M+xWoDaZG4ffYhPSSKCFRj0394bU
MmnPoX4tuBLo4FR65+nHM2NSIP1p1pJqEwcbzlUCgYEAgjHRZsjt6Zpxoatz80zK
boE3twuMbvYFR/YrFBVtMt9HJvO/iAt6g2hEL8qZrUm3wElchDxVWWZw/mlLT4c/
lgjR5VKfw1qoPTxXCkLoh9Rw/cao5+z9qEJ4oCozj3kjII3PTMmH7+i9Q6ZPPPoN
5JD/DVH/OAWM+K3tnAvm0AECgYEAib2TiR9BACiu68/auBNmeZH8GtDTcM4tdlTm
YKIJ5+AUfrpVx6aOHPJ/DtJlz3FslpPLVAzoBypeTq9Ann1KL54ZhotRte3Yq8U0
tS2ZbSA0zt17OfPp7ZKNzNU1NBxXkU5O67o6MdbS8m2sGAZyHlK96UrFdnghsB7M
xJVS8hECgYAvVBadqzBhO6e7rUiciyuo3ZNw8V9Kcnk4glPfagpfKr87f84uafqt
rNKyh0flCDnA0PaauKK+WbtJBUMpfxYjWObopJr1RsPyQoY8wWNxcnELJH8yVui8
h/ZnUMbXy4QnEMe36UEZ8Hb6lvMJm5sqn0mor6wD5LIChe2rYEY6mg==
-----END RSA PRIVATE KEY-----`;

export default class FilesServices{
    private s3 : S3;
    private mediaConvert : MediaConvert;
    private cloudFront;

    constructor(){
        AWS.config.update({
            accessKeyId: config.iam_id_key,
            secretAccessKey: config.iam_secret_key,
            region: 'eu-west-3',
        });
        AWS.config.mediaconvert = {endpoint:'https://187dshywc.mediaconvert.eu-west-3.amazonaws.com'};
        this.cloudFront = new AWS.CloudFront({apiVersion: '2019-03-26'});
        console.log(config.amazon_private_key);
        this.s3 = new AWS.S3();
        this.mediaConvert = new AWS.MediaConvert({apiVersion: '2017-08-29'});
    }

    public getSignedUrl = async() => {
        let twoDays = 2*24*60*60*1000;
        const cloudFrontPolicy =JSON.stringify({
                "Statement": [
                    {
                        "Resource": config.cdn_url+'/dist/private/*',
                        "Condition": {
                            "DateLessThan": {
                                "AWS:EpochTime": Math.floor((Date.now() + twoDays)/1000)
                            }
                        }
                    }
                ]
        });
        const signer = new AWS.CloudFront.Signer(config.amazon_pair_id, config.amazon_private_key);
        console.log(cloudFrontPolicy);
        const signedUrl = signer.getSignedUrl({
            url:config.cdn_url+'/dist/private/*',
            policy:cloudFrontPolicy
        });

        console.log(signedUrl);
        return signedUrl;
    };

    public getSignedCookie = async() => {
        let twoDays = 2*24*60*60*1000;
        const cookiesPolicy =JSON.stringify({
            "Statement": [
                {
                    "Resource": config.cdn_url+'/dist/private/*',
                    "Condition": {
                        "DateLessThan": {
                            "AWS:EpochTime": Math.floor((Date.now() + twoDays)/1000)
                        }
                    }
                }
            ]
        });
        const signer = new AWS.CloudFront.Signer(config.amazon_pair_id, config.amazon_private_key);
        const signedCookie = signer.getSignedCookie({
            policy:cookiesPolicy
        });
        console.log(signedCookie);
        return signedCookie;
    };

    public uploadFile = async (file,courseName,fileName,video?,needAuth?): Promise<string> => {
        /*-- OBTENGO DONDE VOY A GUARDAR EL FICHERO FINALMENTE EN FUNCION DE SI ES PUBLICO --*/
        let finalDst =`dist/${needAuth === 'true' ? 'private' : 'public'}/${courseName}/${fileName}`;
        /*--- OBTENGO EL SITIO TEMPORAL O NO E FUNCION DE SI ES VIDEO ----*/
        let clave = video === 'true' ? `src/${courseName}/${fileName}` : finalDst;
        const putParams = {
            Bucket      : 'casor-s3',
            Key         : clave,
            Body        : file
        };
        const options= {partSize: 10 * 1024 * 1024, queueSize: 10};

        await new Promise((resolve,reject) => {
            this.s3.upload(putParams,options,(err,data) => {
                if(err) reject(err);
                resolve(data.Location);
            }).on('httpUploadProgress',(evt) => {
                console.log('EVENTO ON PROGRESSS --> ',evt);
                //res.write(evt);
            });
        });
        if(video === 'true'){
            /*-- SI ES VIDEO VA PASAR POR EL TRANSCODER CON ORIGEN "clave" y DESTINO "finalDst" sin el nombre del fichero*/
            await this.transCodeVideo(clave,`dist/${needAuth === 'true' ? 'private' : 'public'}/${courseName}/`);
        }
        let location = config.cdn_url;
        if(video === 'true'){
            return location + `/dist/${needAuth === 'true' ? 'private' : 'public'}/${courseName}/${fileName.split('.')[0]}.m3u8`;
        }else{
            return location + '/' + finalDst;
        }
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
    };

    private transCodeVideo = async (origen:string,destino:string) => {
        let src ="s3://casor-s3/" + origen;
        let dst = "s3://casor-s3/" + destino;
        const params = mediaConvertParams(src,dst);
        return new Promise((resolve,reject) => {
            this.mediaConvert.createJob(params).promise().then((data) =>{
                console.log('JobCreated!',data);
                resolve(destino);
            }).catch(err => reject(err));
        });
    }
}



const mediaConvertParams =  (origen:string,destino:string) => {
    console.log(origen,destino);
    return {
        "Queue": "arn:aws:mediaconvert:eu-west-3:344329366756:queues/Default",
        "Role": "arn:aws:iam::344329366756:role/media-convert",
        "Settings": {
            "OutputGroups": [
                {
                    "Name": "Apple HLS",
                    "Outputs": [
                        {
                            "ContainerSettings": {
                                "Container": "M3U8",
                                "M3u8Settings": {
                                    "AudioFramesPerPes": 4,
                                    "PcrControl": "PCR_EVERY_PES_PACKET",
                                    "PmtPid": 480,
                                    "PrivateMetadataPid": 503,
                                    "ProgramNumber": 1,
                                    "PatInterval": 0,
                                    "PmtInterval": 0,
                                    "Scte35Source": "NONE",
                                    "NielsenId3": "NONE",
                                    "TimedMetadata": "NONE",
                                    "VideoPid": 481,
                                    "AudioPids": [
                                        482,
                                        483,
                                        484,
                                        485,
                                        486,
                                        487,
                                        488,
                                        489,
                                        490,
                                        491,
                                        492
                                    ]
                                }
                            },
                            "VideoDescription": {
                                "ScalingBehavior": "DEFAULT",
                                "TimecodeInsertion": "DISABLED",
                                "AntiAlias": "ENABLED",
                                "Sharpness": 50,
                                "CodecSettings": {
                                    "Codec": "H_264",
                                    "H264Settings": {
                                        "InterlaceMode": "PROGRESSIVE",
                                        "NumberReferenceFrames": 3,
                                        "Syntax": "DEFAULT",
                                        "Softness": 0,
                                        "GopClosedCadence": 1,
                                        "GopSize": 90,
                                        "Slices": 1,
                                        "GopBReference": "DISABLED",
                                        "SlowPal": "DISABLED",
                                        "SpatialAdaptiveQuantization": "ENABLED",
                                        "TemporalAdaptiveQuantization": "ENABLED",
                                        "FlickerAdaptiveQuantization": "DISABLED",
                                        "EntropyEncoding": "CABAC",
                                        "Bitrate": 50000000,
                                        "FramerateControl": "INITIALIZE_FROM_SOURCE",
                                        "RateControlMode": "CBR",
                                        "CodecProfile": "MAIN",
                                        "Telecine": "NONE",
                                        "MinIInterval": 0,
                                        "AdaptiveQuantization": "HIGH",
                                        "CodecLevel": "AUTO",
                                        "FieldEncoding": "PAFF",
                                        "SceneChangeDetect": "ENABLED",
                                        "QualityTuningLevel": "SINGLE_PASS",
                                        "FramerateConversionAlgorithm": "DUPLICATE_DROP",
                                        "UnregisteredSeiTimecode": "DISABLED",
                                        "GopSizeUnits": "FRAMES",
                                        "ParControl": "INITIALIZE_FROM_SOURCE",
                                        "NumberBFramesBetweenReferenceFrames": 2,
                                        "RepeatPps": "DISABLED",
                                        "DynamicSubGop": "STATIC"
                                    }
                                },
                                "AfdSignaling": "NONE",
                                "DropFrameTimecode": "ENABLED",
                                "RespondToAfd": "NONE",
                                "ColorMetadata": "INSERT"
                            },
                            "AudioDescriptions": [
                                {
                                    "AudioTypeControl": "FOLLOW_INPUT",
                                    "CodecSettings": {
                                        "Codec": "AAC",
                                        "AacSettings": {
                                            "AudioDescriptionBroadcasterMix": "NORMAL",
                                            "Bitrate": 96000,
                                            "RateControlMode": "CBR",
                                            "CodecProfile": "LC",
                                            "CodingMode": "CODING_MODE_2_0",
                                            "RawFormat": "NONE",
                                            "SampleRate": 48000,
                                            "Specification": "MPEG4"
                                        }
                                    },
                                    "LanguageCodeControl": "FOLLOW_INPUT"
                                }
                            ],
                            "OutputSettings": {
                                "HlsSettings": {
                                    "AudioGroupId": "program_audio",
                                    "AudioOnlyContainer": "AUTOMATIC",
                                    "IFrameOnlyManifest": "EXCLUDE"
                                }
                            },
                            "NameModifier": "$fn$"
                        }
                    ],
                    "OutputGroupSettings": {
                        "Type": "HLS_GROUP_SETTINGS",
                        "HlsGroupSettings": {
                            "ManifestDurationFormat": "INTEGER",
                            "SegmentLength": 10,
                            "TimedMetadataId3Period": 10,
                            "CaptionLanguageSetting": "OMIT",
                            "Destination": destino,
                            "TimedMetadataId3Frame": "PRIV",
                            "CodecSpecification": "RFC_4281",
                            "OutputSelection": "MANIFESTS_AND_SEGMENTS",
                            "ProgramDateTimePeriod": 600,
                            "MinSegmentLength": 0,
                            "MinFinalSegmentLength": 0,
                            "DirectoryStructure": "SINGLE_DIRECTORY",
                            "ProgramDateTime": "EXCLUDE",
                            "SegmentControl": "SEGMENTED_FILES",
                            "ManifestCompression": "NONE",
                            "ClientCache": "ENABLED",
                            "StreamInfResolution": "INCLUDE"
                        }
                    }
                }
            ],
            "AdAvailOffset": 0,
            "Inputs": [
                {
                    "AudioSelectors": {
                        "Audio Selector 1": {
                            "Offset": 0,
                            "DefaultSelection": "DEFAULT",
                            "ProgramSelection": 1
                        }
                    },
                    "VideoSelector": {
                        "ColorSpace": "FOLLOW",
                        "Rotate": "DEGREE_0",
                        "AlphaBehavior": "DISCARD"
                    },
                    "FilterEnable": "AUTO",
                    "PsiControl": "USE_PSI",
                    "FilterStrength": 0,
                    "DeblockFilter": "DISABLED",
                    "DenoiseFilter": "DISABLED",
                    "TimecodeSource": "EMBEDDED",
                    "FileInput": origen
                }
            ]
        },
        "AccelerationSettings": {
            "Mode": "DISABLED"
        },
        "StatusUpdateInterval": "SECONDS_60",
        "Priority": 0
    }
}
