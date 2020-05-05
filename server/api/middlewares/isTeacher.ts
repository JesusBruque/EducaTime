const isTeacher = (req,res,next) => {
    if(req.user && req.user.includes('teacher') ){
        return next();
    }
    return res.status(403).json({
        'status': 403,
        'message': 'Para entrar aquí tienes que iniciar sesión.'
    });
};

export const isTeacherOfCourse = (req,res,next) => {
    if(req.user && req.user.includes('teacher') && req.body.teacher == req.user.email ){
        return next();
    }
    return res.status(403).json({
        'status': 403,
        'message': 'Para entrar aquí tienes que iniciar sesión.'
    });
};

export default isTeacher;
