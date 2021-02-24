import { useEffect, useState } from "react";
import { fetchAlumnosByCourse } from '../../utils/Course'
const AlumnosCurso = ({ curso, show }) => {
    const [alumnos, setAlumnos] = useState([])
    useEffect(() => {
        if (curso && curso._id)
            fetchAlumnosByCourse(curso._id).then(res => {
                setAlumnos(res.data.usuarios)
            })
    }, [curso])

    if (show)
        if (alumnos && alumnos.length > 0)
            return <div>{alumnos.map(al => <span>{al}</span>)}</div>
        else
            return <span>No hay alumnos inscritos en el curso.</span>
    else return <div />
}

export default AlumnosCurso;