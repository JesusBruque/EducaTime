import axios from 'axios';
import {genericValidator,email} from "./Validators";
import moment from 'moment';

const COURSE_URL = 'http://localhost:5000/api/course';

type fee = {
    fee:number,
    date:number
};
type lection = {
    title:string
}
export default class Course{
    public _id:string;
    public title:string;
    public thumbnail:string;
    public description:string;
    public video:string;
    public target:string;
    public goals:string;
    public requirements:string;
    public original_fee:number;
    public fees: fee[];
    public discount:number;
    public teacher:string;
    public active:boolean;
    public lections:lection[];
    public webinar:string;
    public score:number;

    constructor(){
        this._id = null;
        this.title = '';
        this.thumbnail = null;
        this.video = null;
        this.description ='';
        this.target = '';
        this.original_fee = 0.00;
        this.goals = '';
        this.requirements = '';
        this.fees = [];
        this.discount = 0;
        this.teacher = '';
        this.active = true;
        this.lections = [];
        this.webinar = null;
    }
}

export const create = (curso:Course) => {
    delete curso['_id'];
    return axios.post(COURSE_URL,curso);
};

export const uploadCourseFile = (cursoId:string,data) => axios({
    method:'post',
    url:COURSE_URL + '/post_file/'+cursoId,
    data:data,
    onUploadProgress:(progressEvent) =>{console.log(progressEvent)}
});

export const validate = async (curso: Course) => {
    return new Promise((resolve,reject) => {
        let validations = {
            title:genericValidator(curso.title,'required'),
            thumbnail:genericValidator(curso.thumbnail,'required'),
            video:genericValidator(curso.video,'required'),
            description:genericValidator(curso.description,'required'),
            target: genericValidator(curso.target,'required'),
            original_fee: genericValidator(curso.original_fee,'positive'),
            goals:genericValidator(curso.goals,'required'),
            requirements:genericValidator(curso.requirements,'required'),
            teacher:curso.teacher ? email(curso.teacher) : '',
            lections:!curso.webinar ? genericValidator(curso.lections,'notEmpty') : '',
            webinar:curso.lections.length<=0 ? genericValidator(curso.webinar,'required') : ''
        };

        let errors = [];
        for (let property in validations){
            if(validations[property] !== '') errors.push({[getPropertyName(property)]:validations[property]});
        }

        if(curso.fees.length > 0){
            if(!validateFees(curso.fees,curso.original_fee)){
                errors.push({plazos:'Los plazos y el precio no se corresponden.'});
            }
            if(!validateDateFees){
                errors.push({plazos:'Error en los plazos de pagos.'});
            }
        }
        errors.length>0 ? reject(errors) : resolve('No hay errores');
    });

};

const validateFees = (fees:fee[],price) => {
    let restante = price;
    fees.forEach(fee => {
        restante -= fee.fee;
    });

    return parseFloat(restante).toFixed(2) === "0.00";
};
const validateDateFees = (fees:fee[]) => {
    let res = true;
    for(let i=1;i<fees.length;i++){
        if(moment(fees[i-1].date).isAfter(moment(fees[i].date),'date')){
            res = false;
            break;
        }
    }
    return res;
};
export const validateFiles = (oldFiles: File[],newFiles:File[]) : boolean => {
    let result = true;
    let images = 0;
    let videos = 0;

    calcFiles(newFiles);
    calcFiles(oldFiles);

    if(images>1 || videos>1){
        result = false
    }

    function calcFiles(files){
        files.forEach(file => {
            if(file && file.type.includes('image')) images++;
            if(file &&file.type.includes('video')) videos++;
        });
    }

    return result;
};


function getPropertyName(property){
    switch (property) {
        case 'title':
            return 'Título';
        case 'video':
            return 'Vídeo de cabecera';
        case 'description':
            return 'Descripción';
        case 'target':
            return 'A quién va dirigido';
        case 'original_fee':
            return 'Precio';
        case 'goals':
            return 'Lo que aprenderás';
        case 'requirements':
            return 'Requisitos';
        case 'teacher':
            return 'Profesor';
        case 'thumbnail':
            return 'Imagen de previsualización';
        case 'lections':
            return 'Bloques';
        case 'webinar':
            return 'Webinar';
    }
}
