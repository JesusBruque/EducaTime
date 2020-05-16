import estilos from '../../styles/Valorar.module.css'
import Button from '../Button';
import Review from '../../utils/Review'
import {create,getReviewById} from '../../utils/Review'
import { useState,useEffect } from 'react';

const ValorarContent = ({cursoIndex, cursoId, user}) =>{
    const [reviewInfo,setReviewInfo] = useState(new Review());
    const checkForExistinReview =  () => {
        if(user.cursos[cursoIndex].review.reviewId){
            getReviewById(user.cursos[cursoIndex].review.reviewId).then((res)=>{
                if(res.status==200){
                    setReviewInfo({...reviewInfo,review:res.data.review.review,score:res.data.review.score});
                }
            });
        }
    };

    useEffect(() => {
        checkForExistinReview();
    },[]);

    const handleSubmitReview = () =>{
        const r = new Review();
        r.course = cursoId;
        create(r).then(()=>{

        }).catch(errors => {
            throw errors;
        });
    };

    return (
        <div className={estilos.backPanel}>
            <div className = {estilos.valorarBox}>
                <h2 className={estilos.cabecera}>¡ENHORABUENA!</h2>
                <div className={estilos.comentario}>
                    <p className={estilos.texto}>Has finalizado el curso de {cursoId}, ahora puedes añadir una valoración</p>
                        <div className={estilos.estrellas}>
                            {reviewInfo.score}
                        </div>
                </div>
                <div className={estilos.valoracionTexto}>
                    <textarea value={reviewInfo.review} onChange={(e)=>setReviewInfo({...reviewInfo,review:e.target.value}) }/>
                </div>
                <div className={estilos.submit}>
                    <Button color={'blue'} text={'VALORAR'} type={'submit'} disabled={false}/>
                </div>
            </div>
        </div>
    )
};
export default ValorarContent;
