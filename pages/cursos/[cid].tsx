import {getCourseById} from "../../utils/Curso";
import Link from "next/link";
const Curso = ({curso}) => {


    return (
        <div>
            <p>Curso: {curso.title}</p>
            <Link href={'/cursos/payment/[pcid]'} as={'/cursos/payment/'+curso._id}>
                <button>
                    pagar
                </button>
            </Link>
        </div>
    )
};

export const getServerSideProps =  async ctx => {
    const res = await getCourseById(ctx.params.cid);
    const curso = res.data.Course;
    return {props:{curso:curso}}
};
export default Curso;
