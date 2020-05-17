import estilos from '../../styles/Valorar.module.css'
import Button from '../Button';
import Review from '../../utils/Review'
import {create,getReviewById} from '../../utils/Review'
import { useState,useEffect } from 'react';
import Estrella from '../Estrella';

const ValorarContent = ({cursoIndex, cursoId, user, setWriteReview}) =>{
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
    const closeWindow = () => {
        setWriteReview(false);
    }
    const handleSubmitReview = () =>{
        const r = new Review();
        r.course = cursoId;
        create(r).then(()=>{
            setWriteReview(false);
        }).catch(errors => {
            throw errors;
        });
    };
    const renderStars = () => {
        let stars = [];
        for(let i=1;i<6;i++){
            let val = Math.floor(reviewInfo.score);
            let w = val >= i ? 100 : val+1 === i ? ((reviewInfo.score % 1)*100) : 0;
            stars.push(<Estrella width={w} key={i}/>)
        }
        return stars;
    }
    return (
        <div className={estilos.backPanel}>
            <div className = {estilos.valorarBox}>
                <div onClick={closeWindow} className={estilos.closeX}>X</div>
                <h2 className={estilos.cabecera}>¡ENHORABUENA!</h2>
                <div className={estilos.comentario}>
                    <p className={estilos.texto}>Has finalizado el curso de {cursoId}, ahora puedes añadir una valoración</p>
                        <div className={estilos.estrellas}>
                            {renderStars()}
                            <span style={{fontWeight:'bold',marginLeft:'4px',color:'var(--black-color)'}}>{reviewInfo.score}</span>
                        </div>
                </div>
                <div className={estilos.valoracionTexto}>
                    <textarea value={reviewInfo.review} onChange={(e)=>setReviewInfo({...reviewInfo,review:e.target.value}) }/>
                </div>
                <div className={estilos.submit}>
                    <Button action={handleSubmitReview} color={'blue'} text={'VALORAR'} type={'submit'} disabled={false}/>
                </div>
            </div>
        </div>
    )
};
export default ValorarContent;
