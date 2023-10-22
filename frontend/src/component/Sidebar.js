import { Outlet, useNavigate } from 'react-router-dom'
import '../css/siderbar.css'
import { useSelector } from 'react-redux'

function Sidebar() {

    let navigate=useNavigate()
    let loginStatus=useSelector((state)=>state.user.loginStatus)

    if(!loginStatus)
    {
        navigate('/')
    }

    return <>
        <div className="sidebar_container">
            <div className="sidebar_box1" onClick={()=>navigate('/navbar/home')}>
                <div className="sidevar_sub1">
                    <i class="bi bi-house-door "></i>
                    <span>Home</span>
                </div>
                <i class="bi bi-caret-right-fill mt-2" style={{ color: 'rgb(159, 159, 159)'}}></i>
            </div>
            <div className="sidebar_box1" onClick={()=>navigate('/navbar/category')}>
                <div className="sidevar_sub1">
                    <i class="bi bi-grid"></i>
                    <span>Category</span>
                </div>
                <i class="bi bi-caret-right-fill mt-2 " style={{ color: 'rgb(159, 159, 159)'}}></i>
            </div>
            <div className="sidebar_box1" onClick={()=>navigate('/navbar/product')}>
                <div className="sidevar_sub1">
                    <i class="bi bi-diagram-2"></i>
                    <span>Products</span>
                </div>
                <i class="bi bi-caret-right-fill mt-2" style={{ color: 'rgb(159, 159, 159)'}}></i>
            </div>
        </div>
        <Outlet></Outlet>
    </>
}

export default Sidebar