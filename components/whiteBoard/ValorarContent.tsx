import estilos from '../../styles/Valorar.module.css'
import Button from '../Button';
import Review from '../../utils/Review'
import {create,getReviewById} from '../../utils/Review'
import { useState } from 'react';
import Usuario from '../../server/models/usuario.model'

const ValorarContent = ({cursoIndex, cursoId, usuario}) =>{
    const [rate, setRate] = useState(null);
    const [opinion, setOpinion] = useState(null);
    const checkForExistinReview = async () => {
        const user = Usuario.findById(usuario);
        if((await user).cursos[cursoIndex].review.reviewId){
            getReviewById((await user).cursos[cursoIndex].review.reviewId).then((res)=>{
                if(res.status==200){
                    setOpinion(res.data.review.review);
                    setRate(res.data.review.score);
                }
            });
        }
        else{
            setOpinion('Valoracion by default aqui')
        }
    }
    const handleSubmitReview = () =>{
        if(!rate){
            alert('Debes dejar una calificacion');
        }
        const r = new Review();
        r.score = rate;
        if(opinion){
            r.review = opinion;
        }
        r.user = usuario;
        r.course = cursoId;
        create(r).then(()=>{

        }).catch(errors => {
            throw errors;
        });
    }
    return (
        <div className={estilos.backPanel}>
            <div className = {estilos.valorarBox}>
                <h2 className={estilos.cabecera}>¡ENHORABUENA!</h2>
                <div className={estilos.comentario}>
                    <p className={estilos.texto}>Has finalizado el curso de {cursoId}, ahora puedes añadir una valoración</p>
                        <div className={estilos.estrellas}>
                            {rate}
                        </div>
                </div>
                <div className={estilos.valoracionTexto}>
                    {opinion}
                </div>
                <div className={estilos.submit}>
                    <Button color={'blue'} text={'VALORAR'} type={'submit'} disabled={false}/>
                </div>
            </div>
        </div>
    )
};
export default ValorarContent;
