import axios from 'axios';
const AUTHENTICATION_URL = `${process.env.API_URL}/api/authentication`;
axios.defaults.withCredentials = true;
export const login = (credentials: { email: string, password: string }) => axios.post(AUTHENTICATION_URL, credentials);
export const logout = () => axios.delete(AUTHENTICATION_URL);
export const check = () => axios.get(AUTHENTICATION_URL);
export const getUserData = () => axios.get(AUTHENTICATION_URL + '/findUserCourses');
export const forgetPassword = (email: string) => axios.get(AUTHENTICATION_URL + '/forgetPassword/' + email);

type userCourse = {
    idCurso: string,
    completed: boolean,
    review: { enabled: boolean, review: string },
    feeState: { paid: Boolean, idFee: string }[],
    lections: {
        idLection: string,
        seen: boolean,
        taskResponses: { origin: String, url: String }[],
        evaluationResponses: { origin: String, url: String }[]
    }[]
}
export class User {
    public name: string;
    public apellidos: string;
    public email: string;
    public username: string;
    public _id: string;
    public roles: string[];
    public cursos: userCourse[];
    public favoritos: string[];

    constructor() {
        this.email = '';
        this.username = '';
        this._id = '';
        this.roles = [];
        this.cursos = [];
        this.favoritos = [];
    }
}


export const editUserInfo = (userInfo) => axios.put(AUTHENTICATION_URL + '/userInfo', userInfo);
