import {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {logout} from "../../utils/Authentication";
import {getCourseById} from "../../utils/Course";
import useSWR from 'swr';
import LateralMenu from "../../components/whiteBoard/LateralMenu";
import {getUserData} from '../../utils/Authentication';

const userWhiteBoard = (props) => {

    const [userData, setuserData] = useState(null);
    useEffect(() =>{
        getUserData().then(res => {
            if(res.status === 200){
                setuserData(res.data.user);
            }else{
                window.alert('ERROR');
            }
        }).catch(err => console.error(err));
    },[userData]);

    const goLogOut = () => {
        logout().then(() => {
            props.router.push('/login');
            props.setUser(null);
        });
    };
    return (
        <Layout user={props.user} setUser={props.setUser} router={props.router} utils={props.utils}>
            {userData && <LateralMenu onClickOption={()=>console.log(userData)} user={userData}/>}
            <button onClick={goLogOut}>Salir</button>
        </Layout>
    )
};

export default userWhiteBoard;
