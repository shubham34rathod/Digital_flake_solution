import { useEffect, useState } from 'react'
// import '../css/forgot.css'
import '../css/forgot_password.css'
import digitalFlake from '../images/DIGITAL_flake.jpg'
import { useNavigate, useParams } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { setUser } from '../redux/userSlice'
// import { json, useNavigate } from 'react-router-dom'

function Forgot_password() {

    let navigate = useNavigate()
    let { id, token } = useParams()

    let [newPassword, setNewPassword] = useState('')
    let [cnfPassword, setCnfPassword] = useState('')
    let [checkPassword, setCheckPassword] = useState(true)

    async function handleReset() {
        console.log(newPassword);
        if(newPassword===cnfPassword)
        {
            setCheckPassword(true)
            await fetch(`/reset_password/${id}/${token}`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({newPassword})
            })
                .then((data) => data.json())
                .then((res) => {
                    if(res==='password update successfully')
                    {
                        navigate('/')
                    }
                })
                .catch((error) => console.log(error))
        }
        else
        {
            setCheckPassword(false)
        }
     
    }

    return <>
        <div className="forgot_container">
            <div className="forgot_box1">
                <div className="forgot_img">
                    <img src={digitalFlake} alt="" />
                </div>
                <p className="forgot_title">Enter your new password</p>
                <div className="forgot_box2">
                    {/* <form > */}
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"  onChange={(e) => setNewPassword(e.target.value)} />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div class="form-floating ">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"  onChange={(e) => setCnfPassword(e.target.value )} />
                            <label for="floatingPassword">Confirm Password</label>
                        </div>
                        {!checkPassword && <p className="wrong_data" style={{color:'red'}}>Wrong credentials</p>}

                        <button className="forgot_btn mt-5" onClick={handleReset}>Reset Password</button>
                    {/* </form> */}

                </div>
            </div>
        </div>
    </>
}

export default Forgot_password