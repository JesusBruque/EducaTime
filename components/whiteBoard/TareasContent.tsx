import styles from '../../styles/whiteBoard/whiteBoard.module.css';
import utilsStyles from "../../styles/Utils.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import TareasCurso from './TareasCurso';

const TareasContent = ({ user, utils, cargarContenido, setCargarContenido }) => {
    console.log(user)
    return (
        user.cursos.map(x => {
            const curso = x.idCurso;
            return <div>
                <h2>{curso.title}</h2>
                {curso.lections.map((lection, i) => {
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
