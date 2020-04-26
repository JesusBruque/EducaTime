import axios from 'axios';
import fetch from 'isomorphic-unfetch'
const CURSOS_URL = 'http://localhost:5000/api/course/';

export const getCourseById = (cursoId: string) => { return axios.get(CURSOS_URL + cursoId)};

