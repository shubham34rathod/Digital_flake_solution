import '../css/home.css'
import Sidebar from './Sidebar'
import digitalFlake from '../images/DIGITAL_flake.jpg'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home()
{
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let loginStatus=useSelector((state)=>state.user.loginStatus)

    if(!loginStatus)
    {
        navigate('/')
    }

    return <>
        <div className="home_container">
            <div className="home_box1">
                <Sidebar></Sidebar>
            </div>
            <div className="home_box2">
                <div className="home_img_box">
                    <div className="home_img">
                        <img src={digitalFlake} alt="" />
                    </div>
                    <p>Welcome to Digitalflake Admin</p>
                </div>
            </div>
        </div>
    </>
}
export default Home