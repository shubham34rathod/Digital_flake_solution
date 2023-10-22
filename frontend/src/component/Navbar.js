import { Outlet, useNavigate } from 'react-router-dom'
import '../css/navbar.css'
import group from '../images/Group.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutHandel } from '../redux/userSlice'

function Navbar() {

    let navigate=useNavigate()
    let dispatch=useDispatch()
    let user = useSelector((state) => state.user.user)
    let login_status = useSelector((state) => state.user.loginStatus)

    // if(!login_status)
    // {
    //     navigate('/')
    // }

    let [toggleBtn, setToggle] = useState(false)

    function handleLogout()
    {
        dispatch(logoutHandel())
        navigate('/')
    }

    return <>
        <div className="navbar_container">
            <div className="_nav_box1">
                <img src={group} alt="" />
            </div>
            {(login_status)?
            <div className="nav_useName" onClick={() => (toggleBtn) ? setToggle(false) : setToggle(true)}>
                <p>{user.name[0]}</p>
            </div>
            :
            <i class="bi bi-person-circle" onClick={() => (toggleBtn) ? setToggle(false) : setToggle(true)}></i>
            }
            {toggleBtn && <button className='navbar_logout' onClick={handleLogout}>Log Out</button>}
        </div >
        <Outlet></Outlet>
    </>
}

export default Navbar