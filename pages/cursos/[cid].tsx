import {getCourseById} from "../../utils/Curso";
import {useEffect} from "react";

const Curso = ({curso}) => {

    return (
        <div>
            <p>Curso: {curso.title}</p>

        </div>
    )
};
// //
export const getServerSideProps =  async ctx => {
    const res = await getCourseById(ctx.params.cid);
    const curso = res.data.Course;
    return {props:{curso:curso}}
};
export default Curso;
