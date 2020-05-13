import Course from '../../models/course.model';

const isTeacher = (req,res,next) => {
    if(req.user && req.user.roles.includes('teacher') ){
        return next();
    }
    return res.status(403).json({
        'status': 403,
        'message': 'Para entrar aquí tienes que iniciar sesión.'
    });
};

export const isTeacherOfCourse = async(req,res,next) => {
    if(req.user && req.user.roles.includes('teacher') && req.user.email && req.query.courseId ){
        const curso = await Course.findById(req.query.courseId);
        if(curso.teacher === req.user.email){
            return next();
        }else{
            return res.status(403).json({
                'status': 403,
                'message': 'No eres el profesor so mamón.'
            });
        }
    }else{
        return res.status(403).json({
            'status': 403,
            'message': 'Para entrar aquí tienes que iniciar seaekruvbhjerbvhjervhjervhrevrghevrhgjghrghvweghkesión.',
            'req':req
        });
    }
};

export default isTeacher;
