import Usuario from '../models/usuario.model';
import Course from '../models/course.model';
import Lection from '../models/lection.model';
import { IUsuario, IUsuarioDTO } from '../interfaces/IUsuario';
import argon2 from 'argon2';
import { randomBytes } from "crypto";
import { sendEmail } from "./email.services";

export default class AuthenticationService {
    constructor() { }

    public login = async (email: string, password: string): Promise<{ user: IUsuarioDTO, correct: Boolean }> => {
        var correct: Boolean = false;
        try {
            var err, user = await Usuario.findOne({ $or: [{ username: email }, { email: email }] }).select("+password");
            if (err) throw err;
            if (user)
                correct = await user.validPassword(password);
            if (correct)
                return { user: user, correct: true };
            return { user: null, correct: false }
        } catch (e) {
            throw e;
        }
    };
    public findUserAndUpdateInfo = async (idUsuario: string, userInfo) => {
        try {
            const salt = randomBytes(32);
            let err, user = await Usuario.findById(idUsuario);
            if (err) throw err;
            user.name = userInfo.name;
            user.apellidos = userInfo.apellidos;
            user.email = userInfo.email;
            if (userInfo.password !== "" && userInfo.password !== null) {
                const hashedPassword = await argon2.hash(userInfo.password, { salt: salt });
                user.password = hashedPassword;
            }
            user.username = userInfo.username;
            user = await user.save();
            return user;
        } catch (e) {
            throw e;
        }
    }

    public findUserCourses = async (idUsuario: string) => {
        try {
            // let err, user = await Usuario.aggregate([
            //     {$match:{"_id": new mongoose.Types.ObjectId(idUsuario)}},
            //     {$lookup:{from:'courses',localField:'cursos.idCurso',foreignField:'_id',as:'userCourses'}}
            // ]);
            let err, user = await Usuario.findById(idUsuario).populate({ path: 'cursos.idCurso', model: Course, populate: { path: 'lections', model: Lection, options: { sort: { 'order': 1 } } } });
            if (err) throw err;
            const getHomeworkPend = (user): number => {
                let res = 0;
                if (user && user.cursos && user.cursos.length > 0) {
                    const cursos = user.cursos
                    for (let i = 0; i < cursos.length; i++) {
                        const curso = cursos[i].idCurso;
                        const lections = curso.lections;
                        for (let j = 0; j < lections.length; j++) {
                            const lection = lections[j];
                            const homework = lection.homework;
                            for (let k = 0; k < homework.length; k++) {
                                const work = homework[k];
                                const find = work.userResponses.find(x => x.UserId + '' === user._id + '')
                                if (!find) res++;
                            }
                        }

                    }
                }
                return res;
            }
            let userRes = user.toJSON();
            userRes.homeworkPend = getHomeworkPend(userRes);
            return userRes;
        } catch (e) {
            throw e;
        }
    };
    public marcaProxPlazo = async (user: IUsuario, courseId: string, plazo: number) => {
        try {
            let courseIndex = -1;
            const lc = user.cursos.length;

            const cursos = [...user.cursos];
            for (let i = 0; i < lc; i++) {
                if (cursos[i].idCurso.toString() == courseId) {
                    courseIndex = i;
                }
            }

            if (plazo && courseIndex !== -1) {

                cursos[courseIndex].feeState[plazo] ? cursos[courseIndex].feeState[plazo].paid = true : () => { throw Error('No existe el plazo indicado') };
            }
            var err, res = await Usuario.findByIdAndUpdate(user._id, { cursos: cursos });
            if (err) throw err;

        }
        catch (e) {
            throw e;
        }
    }
    public findUserByEmail = async (email: string): Promise<IUsuario> => {
        try {
            let err, user = await Usuario.findOne({ email: email });
            if (err) throw err;
            if (!user) return null;
            if (user) return user;
        }
        catch (e) {
            throw e;
        }
    };
    public findByEmail = async (email: string): Promise<IUsuarioDTO> => {
        try {
            let err, user = await Usuario.findOne({ email: email });
            if (err) throw err;
            if (!user) return { _id: null, email: email, roles: null, username: email, cursos: [], favoritos: [] };
            if (user) return user;
        }
        catch (e) {
            throw e;
        }
    };

    public registerUser = async (user: IUsuarioDTO): Promise<IUsuarioDTO> => {
        return this.register(user, 'user');
    }
    public registerTeacher = async (user: IUsuarioDTO): Promise<IUsuarioDTO> => {
        return this.register(user, 'teacher');
    }
    private register = async (user: IUsuarioDTO, rol: string): Promise<IUsuarioDTO> => {
        try {
            const salt = randomBytes(32);
            const pass = Math.random().toString(36).substring(7);
            const hashedPassword = await argon2.hash(pass, { salt: salt });
            let err, newUser = await new Usuario({ email: user.email, username: user.username, roles: [rol], password: hashedPassword, salt: salt }).save();
            if (err) throw err;
            if (!newUser) throw Error("No se ha podido crear el usuario " + user.email);
            await this.sendRegisterEmail(user.username, pass, user.email);
            return newUser;
        } catch (e) {
            throw e;
        }
    }
    public addRolTeacherToUser = async (userId: string) => {
        let err, user = await Usuario.findById(userId);
        if (err) throw err;
        if (!user) throw Error('No se ha encontrado el usuario');
        user.roles.push('teacher');
        await user.save();
        return user;
    }
    public addRolUserToUser = async (userId: string) => {
        let err, user = await Usuario.findById(userId);
        if (err) throw err;
        if (!user) throw Error('No se ha encontrado el usuario');
        user.roles.push('user');
        await user.save();
        return user;
    }
    public deleteCourseFromUser = async (userId: string, courseId: string) => {
        let err, user = await Usuario.findById(userId);
        if (err) throw err;
        for (let i = 0; i < user.cursos.length; i++) {
            if (user.cursos[i].idCurso === courseId) {
                user.cursos.splice(i, 1);
                break;
            }
        }
        user = await user.save();
        return user;

    }
    public addCursoToUser = async (userId: string, curso: string, plazo?: number): Promise<IUsuarioDTO> => {

        let a = await Course.findById(curso);
        let plazosPagados = [];
        let leccionesCurso = [];
        a.fees.forEach((fee, i) => {
            plazosPagados.push({ paid: (plazo === null || plazo === undefined || i === plazo), idFee: fee._id });
        });
        a.lections.forEach(lection => {
            leccionesCurso.push({ idLection: lection, seen: false, taskResponses: [], evaluationResponses: [] })
        });

        let courseParams = {
            idCurso: curso, completed: false, review: {enabled: false, reviewId: ''}, feeState: plazosPagados, lections: leccionesCurso
        }
        let err, user = await Usuario.findById(userId);
        if (err) throw err;
        if (!user) throw Error('No se ha encontrado el usuario');
        user.cursos.push(courseParams);
        user = await user.save();
        return user;
    };

    public updateHomeworkResponse = async (lectionId: string, homeworkId: string, userId: string, fileLocation: string) => {
        try {
            var err, user = await Usuario.findById(userId);
            if (err) throw err;
            if (!user) throw Error("No se encuentra el usuario")
            for (let i = 0; i < user.cursos.length; i++) {
                for (let j = 0; j < user.cursos[i].lections.length; j++) {
                    if (user.cursos[i].lections[j].idLection + '' === lectionId + '') {
                        const find = user.cursos[i].lections[j].taskResponses.find(x => x.origin === homeworkId);
                        if (find) throw Error("El usuario ya ha enviado una respuesta a la tarea.")
                        user.cursos[i].lections[j].taskResponses.push({ origin: homeworkId, url: fileLocation })
                    }
                }
            }
            await Usuario.findByIdAndUpdate(userId, { cursos: user.cursos });
            //await user.save()
        } catch (e) {
            throw e;
        }
    }

    public sendCourseAssignmentEmail = async (email: string, username: string, courseTitle: string, courseDescription: string) => {
        let html = this.assignmentEmail(email, username, courseTitle, courseDescription);
        let err, info = await sendEmail(email, 'Nueva tutoría de Curso en CASOR. Academia de formación deportiva.', html);
        if (err) console.error(err);
        return info;
    };
    public sendRegisterEmail = async (email: string, pass: string, username: string) => {
        let html = this.registerEmail({ username, pass, email });
        await sendEmail(email, 'Registro en CASOR. Academia de formación deportiva.', html);
    };


    private assignmentEmail = (email: string, username: string, courseTitle: string, courseDescription: string) => {
        return `
        <body>
            <table width="600" style='text-align:center;font-family:Verdana;border-collapse:collapse;margin:0 auto;background-color: #ffffff'>
                <tr>
                    <td style='padding:30px 0;margin-bottom:30px;border-bottom:solid 1px #565656'><img src="https://www.boorpret.com/images/work/casor/logo_casor.png"  alt="'logo de CASOR" width='160' /></td>
                </tr>
                <tr>
                    <td style="padding:15px;font-weight:bold;">Se le ha asignado como tutor de un nuevo curso</td>
                </tr>
                <tr>
                    <td style="padding-bottom:15px">
                        <table style="text-align:center;background-color: #dcdcdc; color:#565656;padding:30px;width:100%;font-size:.9em">
                            <tr><td colSpan="2" style='padding:15px;border-bottom:solid 1px grey;'> ${username} </td></tr>
                            <tr><td style="font-weight:bold;padding:15px;">Curso: </td> <td style='padding:15px;text-align:left'>${courseTitle}</td></tr>
                            <tr style=';padding-top:8px;'><td style="font-weight:bold;">Descripción: </td><td style="text-align: left">${courseDescription}</td></tr>
                            <tr><td colSpan="2" style='font-size:.8em;font-weight:bold;padding-top:30px;'><a href = "www.google.com" target="_blank">Acceso directo al curso. ¡Comienza esta nueva eventura!</a></td></tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style='padding:15px;color:darkgrey;font-size:9px;border-top:solid 1px #bcbcbc'>
                    Este email se ha enviado a ${email} por su compra de un curso en academiaformaciondeportiva.com. Si no es usted póngase en contacto con 
                    nuestro departamento técnico <a href="mailto:info@boorpret.com">info@boorpret.com</a>
                    </td>
                </tr>
                <tr>
                    <td style='font-size:8px;color:darkgrey;padding-bottom:30px;'>&copy; Todos los derechos reservados 2019/2020. CASOR. Academia de formación deportiva</td>
                </tr>
            </table>
        </body>`
    }
    private registerEmail = (userCredentials: { username: string, pass: string, email: string }) => {
        return `
        <body>
            <table width="600" style='text-align:center;font-family:Verdana;border-collapse:collapse;margin:0 auto;background-color: #ffffff'>
                <tr>
                    <td style='padding:30px 0;margin-bottom:30px;border-bottom:solid 1px #565656'><img src="https://www.boorpret.com/images/work/casor/logo_casor.png"  alt="'logo de CASOR" width='160' /></td>
                </tr>
                <tr>
                    <td style="padding:15px;font-weight:bold;">¡Enhorabuena, ya tiene acceso a nuestra plataforma!</td>
                </tr>
                <tr>
                    <td style="padding-bottom:15px">
                        <table style="text-align:center;background-color: #dcdcdc; color:#565656;padding:30px;width:100%;font-size:.9em">
                            <tr><td colSpan="2" style='padding:15px;border-bottom:solid 1px grey;'>Crendenciales de acceso</td></tr>
                            <tr><td style="font-weight:bold;padding:15px;">Usuario: </td> <td style='padding:15px;text-align:left'>${userCredentials.username}</td></tr>
                            <tr style=';padding-top:8px;'><td style="font-weight:bold;">Contraseña: </td><td style="text-align: left">${userCredentials.pass}</td></tr>
                            <tr><td colSpan="2" style='font-size:.8em;font-weight:bold;padding-top:30px;'>Recomendamos cambiar la contraseña tras su primer acceso.</td></tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style='padding:15px;color:darkgrey;font-size:9px;border-top:solid 1px #bcbcbc'>
                    Este email se ha enviado a ${userCredentials.email} por su compra de un curso en academiaformaciondeportiva.com. Si no es usted pòngase en contacto con 
                    nuestro departamento técnico <a href="mailto:info@boorpret.com">info@boorpret.com</a>
                    </td>
                </tr>
                <tr>
                    <td style='font-size:8px;color:darkgrey;padding-bottom:30px;'>&copy; Todos los derechos reservados 2019/2020. CASOR. Academia de formación deportiva</td>
                </tr>
            </table>
        </body>`
    }
}
