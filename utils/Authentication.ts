import axios from 'axios';
const AUTHENTICATION_URL = 'http://localhost:3000/dist/api/authentication';
axios.defaults.withCredentials = true;
export const login = (credentials: { email: string, password: string }) => axios.post(AUTHENTICATION_URL, credentials);
export const logout = () => axios.delete(AUTHENTICATION_URL);
export const check = () => axios.get(AUTHENTICATION_URL);
export const getUserData = () => axios.get(AUTHENTICATION_URL+'/findUserCourses');

type userCourse = {
    idCurso: string,
    feeState: { paid: Boolean, idFee: string }[],
    lections: {
        idLection: string,
        taskResponses: { origin: String, url: String }[],
        evaluationResponses: { origin: String, url: String }[]
    }[]
}
export class User{
    public name:string;
    public apellidos:string;
    public email:string;
    public username:string;
    public _id:string;
    public roles:string[];
    public cursos:userCourse[];
    public favoritos:string[];

    constructor(){
        this.email = '';
        this.username = '';
        this._id = '';
        this.roles = [];
        this.cursos = [];
        this.favoritos = [];
    }
}
