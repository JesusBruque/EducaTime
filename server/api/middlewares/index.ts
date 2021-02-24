import isAuth from './isAuth'
import upload from "./filesUpload";
import isAdmin from "./isAdmin";
import isTeacher,{isTeacherOfCourse} from "./isTeacher";
export default {
    isAuth,
    isAdmin,
    upload,
    isTeacher,
    isTeacherOfCourse
};
