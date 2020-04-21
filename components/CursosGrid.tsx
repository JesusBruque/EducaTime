import React from "react";
import CursoItem from "./CursoItem";
import cursosStyle from '../styles/Course.module.css';

const CursoGrid = ({cursos}) => {
    return (
        <div className={cursosStyle.cursosContainer}>
            {cursos.map(curso=>{return <CursoItem curso={curso} key={curso._id}/>})}
        </div>
    )
};

export default CursoGrid;
