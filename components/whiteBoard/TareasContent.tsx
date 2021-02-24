import styles from '../../styles/whiteBoard/whiteBoard.module.css';
import utilsStyles from "../../styles/Utils.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import TareasCurso from './TareasCurso';

const TareasContent = ({ user, utils, cargarContenido, setCargarContenido }) => {

    const hasTareasPendienteCurso = (curso): boolean => {
        for (let i = 0; i < curso.lections.length; i++) {
            const lection = curso.lections[i];
            if (hasTareasPendienteLeccion(lection)) return true;
        }
        return false;

    }
    const hasTareasPendienteLeccion = (lection): boolean => {
        const find = lection.homework.find(x => canRespond(lection._id, x._id))
        if (find)
            return true;

        return false
    }
    const canRespond = (lectionId: string, tareaId: string): boolean => {
        let res = true;
        if (user && user.cursos) {
            for (let i = 0; i < user.cursos.length; i++) {
                const curso = user.cursos[i];
                const lection = curso.lections.find(x => x.idLection + '' === lectionId + '');
                if (lection) {
                    const find = lection.taskResponses.find(x => x.origin + '' === tareaId + '');
                    if (find) res = false;
                }
            }
        }
        return res;

    }
    return (
        user.cursos.map(x => {
            const curso = x.idCurso;
            if (!hasTareasPendienteCurso(curso)) return <div />
            return <div>
                <h2>{curso.title}</h2>
                {curso.lections.map((lection, i) => {
                    if (!hasTareasPendienteLeccion(lection)) return <div />
                    return (
                        <div className={styles.lectionItem} key={i}>
                            <div className={styles.lectionHeader}>
                                <h3 style={{ marginRight: '15px' }}>{lection.title}</h3>
                                <div className={utilsStyles.timeLeft} style={moment(lection.dateEnd).diff(moment(), 'days') < 5 ? { backgroundColor: 'var(--red-color)' } : { backgroundColor: 'var(--black-color)' }}>
                                    <FontAwesomeIcon icon={faClock} color={'white'} style={{ marginRight: '4px' }} />
                                    <span>(Quedan {moment(lection.dateEnd).diff(moment(), 'days')} días)</span>
                                </div>
                            </div>
                            <div className={styles.lectionContainer}>
                                <div className={styles.optionsSelector}>
                                    <span className={styles.optionSelected} >Tareas pendientes</span>
                                </div>
                                <div className={styles.lectionContent}>
                                    <TareasCurso
                                        showPendientes={false}
                                        user={user}
                                        curso={curso}
                                        lection={lection}
                                        utils={utils}
                                        cargarContenido={cargarContenido} setCargarContenido={setCargarContenido} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        })
    )
};

export default TareasContent;
