import axios from 'axios';
import {genericValidator,email} from "./Validators";

const LECTION_URL = 'http://localhost:5000/api/lection';

type work = {
    uploadFile:string,
    userResponses:[{UserID:string, file:string, date:number, status: string, mark: number}],
    deadline:number
}

export default class Lection{
    public _id:string;
    public title:string;
    public description:string;
    public video:string;
    public duration: number;
    public order: number;
    public course: string;
    public teoricalResources:string[];
    public homework:work[];
    public evaluations:work;
    public dateAvailable:number;
    public dateEnd:number;
    public active:boolean;
    public last_update:number;

    constructor(){
        this._id = null;
        this.title = '';
        this.description ='';
        this.video = null;
        this.duration= 0;
        this.order= null;
        this.course = '';
        this.teoricalResources = [];
        this.homework = [];
        this.evaluations = null;
        this.dateAvailable = null;
        this.dateEnd = null;
        this.active = true;
        this.last_update = null;
    }
}

export const create = (lection:Lection) => {
    delete lection['_id'];
    return axios.post(LECTION_URL,lection);
};
export const edit = (lection:Lection) => axios.put(LECTION_URL,lection);
export const getCourseById = (cursoId: string) =>  axios.get(LECTION_URL+'/findById/' + cursoId);

export const uploadLectionVideo = (lectionName: string, file, video:boolean,needAuth:boolean) => {
    let data = new FormData();
    data.append('file',file);
    return axios({
        method:'post',
        url:`${LECTION_URL}/post_file/${lectionName}`,
        data:data,
        params:{
            video:video,
            needAuth:needAuth
        },
        onUploadProgress:(progressEvent) =>{console.log(progressEvent)}
    });
};

export const uploadTeoreticalResourceLectionFile = (lectionName:string,file, video:boolean,needAuth:boolean) => {
    let data = new FormData();
    data.append('file',file);
    return axios({
        method:'post',
        url:`${LECTION_URL}/post_file/${lectionName}`,
        data:data,
        params:{
            video:video,
            needAuth:needAuth
        },
        onUploadProgress:(progressEvent) =>{console.log(progressEvent)}
    });
};
export const uploadHomeworkLectionFile = (lectionName:string, homeworkName: string, file, needAuth:boolean) => {
    let data = new FormData();
    data.append('file',file);
    return axios({
        method:'post',
        url:`${LECTION_URL}/post_file/${lectionName}/homework/${homeworkName}`,
        data:data,
        params:{
            video: false,
            needAuth:needAuth
        },
        onUploadProgress:(progressEvent) =>{console.log(progressEvent)}
    });
};
export const validate = async (lection: Lection) => {
    return new Promise((resolve,reject) => {
        let validations = {
            title:genericValidator(lection.title,'required'),
            description:genericValidator(lection.description,'required'),
            video:genericValidator(lection.video,'required'),
            duration : genericValidator(lection.duration,'positive'),          
            order : genericValidator(lection.order,'positive'),
            course : genericValidator(lection.course, 'required'),
            dateAvailable : genericValidator(lection.dateAvailable, 'positive') && lection.dateAvailable<lection.dateEnd,
            dateEnd : genericValidator(lection.dateEnd, 'positive') && lection.dateAvailable<lection.dateEnd,
            active : lection.active==true || lection.active==false,
            last_update : genericValidator(lection.last_update, 'positive')
        };
        let errors = [];
        for (let property in validations){
            if(validations[property] !== '') errors.push({[getPropertyName(property)]:validations[property]});
        }

        if(lection.teoricalResources.length > 0){
            if(!validateTeoricalResources(lection.teoricalResources)){
                errors.push({plazos:'Error al comprobar recursos teoricos.'});
            }
        }
        if(lection.homework.length>0){
            if(!validateHomework(lection.homework)){
                errors.push({plazos:'Error en las tareas.'});
            }
        }
        if(lection.evaluations){
            if(!validateEvaluations(lection.evaluations)){
                errors.push({plazos:'Error en las evaluaciones.'})
            }
        }
        errors.length>0 ? reject(errors) : resolve('No hay errores');
    });
};
const validateTeoricalResources = (resources:string[]) => {
    resources.forEach(r => {
        if(typeof(r)!=='string'){
            return false;
        }
    });
    return true;
};
const validateHomework = (homework:work[]) => {
    homework.forEach(h => {
        if(typeof(h.uploadFile)!=='string'){
            return false;
        }
        if(typeof(h.deadline)!=='number' || h.deadline<=0){
            return false;
        }
        if(h.userResponses){
            h.userResponses.forEach(r => {
                if(typeof(r.UserID)!=='string' || typeof(r.file)!=='string' || typeof(r.status)!=='string' || typeof(r.mark)!=='number' ||typeof(r.date)!=='number' || r.mark>10 || r.mark<0 || r.date < 0){
                    return false;
                }
            } )
        }
    });
    return true;
};
const validateEvaluations = (evals: work) =>{
    if(typeof(evals.uploadFile)!=='string'){
        return false;
    }
    if(typeof(evals.deadline)!=='number' || evals.deadline<=0){
        return false;
    }
    if(evals.userResponses){
        evals.userResponses.forEach(r => {
            if(typeof(r.UserID)!=='string' || typeof(r.file)!=='string' || typeof(r.status)!=='string' || typeof(r.mark)!=='number' ||typeof(r.date)!=='number' || r.mark>10 || r.mark<0 || r.date < 0){
                return false;
            }
        } )
    }
    return true;
}
function getPropertyName(property){
    switch (property) {
        case 'title':
            return 'Título';
        case 'description':
            return 'Descripción';
        case 'video':
            return 'Vídeo de cabecera';
        case 'duration':
            return 'Duración';
        case 'order':
            return 'Lección número';
        case 'course':
            return 'Curso';
        case 'teoricalResources':
            return 'Recursos teóricos';
        case 'homework':
            return 'Tareas';
        case 'evaluations':
            return 'Evaluaciones';
        case 'dateAvailable':
            return 'Disponible';
        case 'dateEnd':
            return 'Fecha de cierre';
    }
}
