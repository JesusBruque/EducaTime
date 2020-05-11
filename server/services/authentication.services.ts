import Usuario from '../models/usuario.model';
import Course from '../models/course.model';
import Lection from '../models/lection.model';
import { IUsuario, IUsuarioDTO } from '../interfaces/IUsuario';
import argon2 from 'argon2';
import {randomBytes} from "crypto";
import {sendEmail} from "./email.services";
import mongoose from "mongoose";

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
    public findUserCourses = async (idUsuario:string) => {
        try{
            // let err, user = await Usuario.aggregate([
            //     {$match:{"_id": new mongoose.Types.ObjectId(idUsuario)}},
            //     {$lookup:{from:'courses',localField:'cursos.idCurso',foreignField:'_id',as:'userCourses'}}
            // ]);
            let err,user = await Usuario.findById(idUsuario).populate({path:'cursos.idCurso',model:Course,populate:{path:'lections',model:Lection}});
            if(err) throw err;
            return user;
        }catch(e){
            throw e;
        }
    };
    public marcaProxPlazo = async(user:IUsuario, courseId: string, plazo: number) => {
        try{
            let courseIndex = 0;
            const lc = user.cursos.length;
            for(let i=0;i<lc;i++){
                if(user.cursos[i].idCurso.toString()==courseId){
                    courseIndex = i;
                }
            }
            const fees = user.cursos[courseIndex].feeState;
            if(plazo){
                fees[plazo] ? fees[plazo].paid = true : () => {throw Error('No existe el plazo indicado')};
            }else{
                fees.map(f => f.paid = true);
            }
        }
        catch(e){
            throw e;
        }
    }
    public findUserByEmail = async(email:string): Promise<IUsuario> => {
        try {
            let err, user = await Usuario.findOne({email: email});
            if (err) throw err;
            if (!user) return null;
            if (user) return user;
        }
        catch(e){
            throw e;
        }
    };
    public findByEmail = async(email:string): Promise<IUsuarioDTO> => {
        try {
            let err, user = await Usuario.findOne({email: email});
            if (err) throw err;
            if (!user) return {_id:null,email:email,roles:null,username:email,cursos:[],favoritos:[]};
            if (user) return user;
        }
        catch(e){
            throw e;
        }
    };

    public registerUser = async(user:IUsuarioDTO): Promise<IUsuarioDTO> => {
        return this.register(user,'user');
    }
    public registerTeacher = async(user:IUsuarioDTO): Promise<IUsuarioDTO> => {
        return this.register(user,'teacher');
    }
    private register = async(user:IUsuarioDTO, rol:string): Promise<IUsuarioDTO> => {
        try{
            const salt = randomBytes(32);
            const pass = Math.random().toString(36).substring(7);
            const hashedPassword = await argon2.hash(pass, { salt: salt });
            let err, newUser = await new Usuario({email:user.email,username:user.username,roles:[rol],password:hashedPassword,salt:salt}).save();
            if(err) throw err;
            if(!newUser) throw Error("No se ha podido crear el usuario " + user.email);
            await this.sendRegisterEmail(user.username,pass,user.email);
            return newUser;
        }catch(e){
            throw e;
        }
    }
    
    public addRolTeacherToUser = async(userId: string) => {
        let err, user = await Usuario.findById(userId);
        if(err) throw err;
        if(!user) throw Error('No se ha encontrado el usuario');
        user.roles.push('teacher');
        return user;
    }
    public addCursoToUser = async(userId:string,curso:string, plazo?:number) : Promise<IUsuarioDTO> => {
        
        let a = await Course.findById(curso);
        let plazosPagados = [];
        let leccionesCurso = [];
        a.fees.forEach((fee,i) => {
            plazosPagados.push({paid:(plazo===null || plazo===undefined || i === plazo),idFee:fee._id});
        });
        a.lections.forEach(lection => {
            leccionesCurso.push({idLection:lection,taskResponses:[],evaluationResponses:[]})
        });

        let courseParams = {
            idCurso: curso, feeState: plazosPagados, lections: leccionesCurso
        }
        let err, user = await Usuario.findById(userId);
        if(err) throw err;
        if(!user) throw Error('No se ha encontrado el usuario');
        user.cursos.push(courseParams);
        user = await user.save();
        return user;
    };
    public sendCourseAssignmentEmail = async (email: string, username: string, courseTitle: string, courseDescription: string) =>{
        let html = this.assignmentEmail(email,username, courseTitle, courseDescription);
        await sendEmail(email,'Nueva tutoría de Curso en CASOR. Academia de formación deportiva.', html);
    }
    public sendRegisterEmail = async(email:string,pass:string,username:string) => {
        let html = this.registerEmail({username,pass,email});
        await sendEmail(email,'Registro en CASOR. Academia de formación deportiva.', html);
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
    private registerEmail = (userCredentials :  {username:string,pass:string,email:string}) => {
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
