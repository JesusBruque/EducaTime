import axios from 'axios';
const CURSOS_URL = 'http://localhost:5000/api/course/';

export const getCourseById = (cursoId: string) =>  axios.get(CURSOS_URL+'findById/' + cursoId);


