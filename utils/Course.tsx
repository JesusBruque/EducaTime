import axios from 'axios';
const COURSE_URL = 'http://localhost:5000/api/course';

export const create = (credentials: {
             title: string,
             thumbnail:string,
             description:string ,
             target:string ,
             goals:string ,
             requirements:string ,
             dateStartInscription:number ,
             dateEndInscription:number ,
             dateEndCourse: number,
             original_fee:string ,
             fees: string, 
             discount: string,
             teacher: string,
             active: string }) => axios.post(COURSE_URL, credentials);