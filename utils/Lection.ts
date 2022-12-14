import axios from 'axios';
import { genericValidator, email } from "./Validators";

const LECTION_URL = process.env.API_URL + '/api/lection';

type work = {
    uploadFile: string,
    userResponses: [{ UserID: string, file: string, date: number, status: string, mark: number }],
    deadline: number
}

export default class Lection {
    public _id: string;
    public title: string;
    public description: string;
    public video: string;
    public duration: number;
    public order: number;
    public course: string;
    public teoricalResources: string[];
    public homework: work[];
    public evaluations: work[];
    public dateAvailable: number;
    public dateEnd: number;
    public active: boolean;
    public last_update: number;

    constructor() {
        this._id = null;
        this.title = '';
        this.description = '';
        this.video = null;
        this.duration = 0;
        this.order = null;
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

export const create = (lection: Lection) => {
    delete lection['_id'];
    return axios.post(LECTION_URL, lection);
};
export const edit = (lection: Lection) => axios.put(LECTION_URL, lection);
export const getLectionById = async (lectionId: string) => { return axios.get(LECTION_URL + '/findById/' + lectionId); }
export const deleteLection = async (cursoId: string, lection: string) => {
    return axios.delete(LECTION_URL + '/' + lection, { params: { courseId: cursoId } });
}
export const deleteTeoricalResources = (cursoId: string, lectionId: string, teoricalResourceId: string) => {
    return axios.delete(LECTION_URL + '/deleteTeoricalResource/' + teoricalResourceId, { params: { courseId: cursoId, lectionId: lectionId } });
};
export const deleteVideoResource = (cursoId: string, lectionId: string, resourceId: string) => {
    return axios.delete(LECTION_URL + '/deteVideoResource/' + resourceId, { params: { courseId: cursoId, lectionId: lectionId } });
}
export const deleteHomework = (cursoId: string, lectionId: string, homeworkId: string) => {
    return axios.delete(LECTION_URL + '/deleteHomework/', { params: { courseId: cursoId, lectionId: lectionId, homeworkId: homeworkId } });
}
export const deleteEvaluation = (cursoId: string, lectionId: string, evaluationId: string) => {
    return axios.delete(LECTION_URL + '/deleteEvaluation/' + evaluationId, { params: { courseId: cursoId, lectionId: lectionId } });
}
export const updateLectionDates = (fechaInicio, fechaFin, idLection, cursoId) => axios.put(LECTION_URL + '/updateDates/' + idLection, { fechaInicio: fechaInicio, fechaFin: fechaFin }, { params: { courseId: cursoId } });
export const updateTaskDate = (taskId, fechaLimite, cursoId) => axios.put(LECTION_URL + '/updateTaskDate/' + taskId, { fechaLimite: fechaLimite }, { params: { courseId: cursoId } });
export const updateEvaluationDate = (evaluationId, fechaLimite, cursoId) => axios.put(LECTION_URL + '/updateEvaluationDate/' + evaluationId, { fechaLimite: fechaLimite }, { params: { courseId: cursoId } });
export const uploadLectionVideo = (lectionName: string, file, cursoId: string) => {
    let data = new FormData();
    data.append('file', file);
    return axios({
        method: 'post',
        url: `${LECTION_URL}/post_file/${lectionName}`,
        data: data,
        params: {
            courseId: cursoId,
            video: true,
            needAuth: true
        },
        onUploadProgress: (progressEvent) => { console.log(progressEvent) }
    });
};
export const uploadTeoreticalResourceLectionFile = (lectionName: string, file, cursoId: string) => {
    let data = new FormData();
    data.append('file', file);
    return axios({
        method: 'post',
        url: `${LECTION_URL}/post_file/${lectionName}/resources/teoricos`,
        data: data,
        params: {
            courseId: cursoId,
            video: false,
            needAuth: true
        },
        onUploadProgress: (progressEvent) => { console.log(progressEvent) }
    });
};
export const uploadHomeworkLectionFile = (lectionName: string, homeworkName: string, file, cursoId: string) => {
    let data = new FormData();
    data.append('file', file);
    return axios({
        method: 'post',
        url: `${LECTION_URL}/post_file/${lectionName}/homework/${homeworkName}`,
        data: data,
        params: {
            courseId: cursoId,
            video: false,
            needAuth: true
        },
        onUploadProgress: (progressEvent) => { console.log(progressEvent) }
    });
};
export const uploadEvaluationLectionFile = (lectionName: string, evaluationName: string, file, cursoId: string) => {
    let data = new FormData();
    data.append('file', file);
    return axios({
        method: 'post',
        url: `${LECTION_URL}/post_file/${lectionName}/evaluation`,
        data: data,
        params: {
            courseId: cursoId,
            video: false,
            needAuth: true
        },
        onUploadProgress: (progressEvent) => { console.log(progressEvent) }
    });
}
export const uploadHomeworkResponseFile = (lectionName: string, homeworkId: string, file) => {
    let data = new FormData();
    data.append('file', file);
    return axios({
        method: 'post',
        url: `${LECTION_URL}/post_file/${lectionName}/homework/${homeworkId}/user`,
        data: data,
        params: {
            video: false,
            needAuth: true
        },
        onUploadProgress: (progressEvent) => { console.log(progressEvent) }
    });
}
export const uploadEvaluationResponseFile = (lectionName: string, evaluationId: string, file) => {
    let data = new FormData();
    data.append('file', file);
    return axios({
        method: 'post',
        url: `${LECTION_URL}/post_file/${lectionName}/evaluation/${evaluationId}/user`,
        data: data,
        params: {
            video: false,
            needAuth: true
        },
        onUploadProgress: (progressEvent) => { console.log(progressEvent) }
    });
}
export const validate = async (lection: Lection) => {
    return new Promise((resolve, reject) => {
        let validations = {
            title: genericValidator(lection.title, 'required'),
            description: genericValidator(lection.description, 'required'),
            video: genericValidator(lection.video, 'required'),
            duration: genericValidator(lection.duration, 'positive'),
            order: genericValidator(lection.order, 'positive'),
            course: genericValidator(lection.course, 'required'),
            dateAvailable: genericValidator(lection.dateAvailable, 'positive') && lection.dateAvailable < lection.dateEnd,
            dateEnd: genericValidator(lection.dateEnd, 'positive') && lection.dateAvailable < lection.dateEnd,
            active: lection.active == true || lection.active == false,
            last_update: genericValidator(lection.last_update, 'positive')
        };
        let errors = [];
        for (let property in validations) {
            if (validations[property] !== '') errors.push({ [getPropertyName(property)]: validations[property] });
        }

        if (lection.teoricalResources.length > 0) {
            if (!validateTeoricalResources(lection.teoricalResources)) {
                errors.push({ plazos: 'Error al comprobar recursos teoricos.' });
            }
        }
        if (lection.homework.length > 0) {
            if (!validateHomework(lection.homework)) {
                errors.push({ plazos: 'Error en las tareas.' });
            }
        }
        if (lection.evaluations) {
            if (!validateEvaluations(lection.evaluations)) {
                errors.push({ plazos: 'Error en las evaluaciones.' })
            }
        }
        errors.length > 0 ? reject(errors) : resolve('No hay errores');
    });
};
const validateTeoricalResources = (resources: string[]) => {
    resources.forEach(r => {
        if (typeof (r) !== 'string') {
            return false;
        }
    });
    return true;
};
const validateHomework = (homework: work[]) => {
    homework.forEach(h => {
        if (typeof (h.uploadFile) !== 'string') {
            return false;
        }
        if (typeof (h.deadline) !== 'number' || h.deadline <= 0) {
            return false;
        }
        if (h.userResponses) {
            h.userResponses.forEach(r => {
                if (typeof (r.UserID) !== 'string' || typeof (r.file) !== 'string' || typeof (r.status) !== 'string' || typeof (r.mark) !== 'number' || typeof (r.date) !== 'number' || r.mark > 10 || r.mark < 0 || r.date < 0) {
                    return false;
                }
            })
        }
    });
    return true;
};
const validateEvaluations = (eva: work[]) => {
    eva.forEach(evals => {
        if (typeof (evals.uploadFile) !== 'string') {
            return false;
        }
        if (typeof (evals.deadline) !== 'number' || evals.deadline <= 0) {
            return false;
        }
        if (evals.userResponses) {
            evals.userResponses.forEach(r => {
                if (typeof (r.UserID) !== 'string' || typeof (r.file) !== 'string' || typeof (r.status) !== 'string' || typeof (r.mark) !== 'number' || typeof (r.date) !== 'number' || r.mark > 10 || r.mark < 0 || r.date < 0) {
                    return false;
                }
            })
        }
    });
    return true;
}
function getPropertyName(property) {
    switch (property) {
        case 'title':
            return 'T??tulo';
        case 'description':
            return 'Descripci??n';
        case 'video':
            return 'V??deo de cabecera';
        case 'duration':
            return 'Duraci??n';
        case 'order':
            return 'Lecci??n n??mero';
        case 'course':
            return 'Curso';
        case 'teoricalResources':
            return 'Recursos te??ricos';
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
