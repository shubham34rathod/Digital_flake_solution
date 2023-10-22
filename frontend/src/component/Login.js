import { useState } from 'react'
import '../css/login.css'
import digitalFlake from '../images/DIGITAL_flake.jpg'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { json, useNavigate } from 'react-router-dom'

function Login() {

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let [loginSpnner, setSpinner] = useState(false)
    let [userData, setUserdata] = useState({
        email: '',
        password: ''
    })

    let [checkPassword, setCheckpassword] = useState(false)

    //forgot password

    let [oldEmail, setOldEmail] = useState({
        email: '',
        // NewPassword: ''
    })
    let [userCheck, setUsercheck] = useState(false)

    async function handleForgot() {
        // console.log(oldEmail);
        // if (userCheck) {
        //     await fetch(`http://localhost:8000/reset_password`, {
        //         method: "POST",
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(oldEmail)
        //     })
        //         .then((data) => data.json())
        //         .then((res) => {
        //             if (res === 'user found') {
        //                 setUsercheck(true)
        //             }
        //         })
        //         .catch((error) => console.log(error))
        // }
        // else {
        await fetch(`forgot_password`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(oldEmail)
        })
            .then((data) => data.json())
            .then((res) => {
                if (res === 'user found') {
                    setUsercheck(true)
                }
            })
            .catch((error) => console.log(error))
        // }
    }

    function handleUser(e, prop) {
        setUserdata((data) => ({
            ...data,
            [prop]: e.target.value
        }))
    }

    async function submitUser(e) {
        e.preventDefault()
        console.log(userData);
        setSpinner(true)
        await fetch(`/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then((data) => data.json())
            .then((res) => {
                console.log(res);
                if (res[0] === 'login success') {
                    dispatch(setUser(res[1]))
                    navigate('/navbar/home')
                    setSpinner(false)
                }
                else {
                    setCheckpassword(true)
                    setSpinner(false)
                }

            })
            .catch((error) => console.log(error))
    }

    return <>
        <div className="login_container">
            <div className="login_box1">
                <div className="login_img">
                    <img src={digitalFlake} alt="" />
                </div>
                <p className="login_title">Welcome to Digitalflake Admin</p>
                <div className="login_box2">
                    <form onSubmit={(e) => submitUser(e)}>
                        <div class="form-floating mt-5 mb-5">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={userData.email} onChange={(e) => handleUser(e, 'email')} />
                            <label for="floatingInput">Email ID</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={userData.password} onChange={(e) => handleUser(e, 'password')} />
                            <label for="floatingPassword">Password</label>
                        </div>
                        {checkPassword && <p className="wrong_data" style={{ color: 'red' }}>Wrong credentials</p>}

                        <button type="button" class=" login_forgot btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Forgot Password?
                        </button>

                        {/* //popup  */}

                        {/* <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel" style={{ textAlign: 'center' }}>
                                            Did you forget your password?
                                            <p style={{ fontSize: '12px', color: 'gray' }}>Enter your email address and we'll send you a link to restore password</p>
                                        </h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className='forgot_form' >
                                            <div>
                                                <label htmlFor="emal" style={{ width: '10px' }}>Email</label>
                                                <input type="email"  onChange={(e)=>setOldEmail(e.target.value)}/>
                                            </div>
                                            {userCheck &&
                                                <div>
                                                    <label htmlFor="password" style={{ width: '10px' }}>Password</label>
                                                    <input type="password" />
                                                </div>
                                            }
                                            <button onClick={handleForgot}>Check User</button>

                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn" style={{ color: '#979595' }} data-bs-dismiss="modal">Back to log in</button>
                                    </div>
                                </div>
                            </div>
                        </div> */}


                        <button className="login_btn mt-5">{(loginSpnner) ? <><div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div></>
                            : 'Log In'}
                        </button>
                    </form>


                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel" style={{ textAlign: 'center' }}>
                                        Did you forget your password?
                                        <p style={{ fontSize: '12px', color: 'gray' }}>Enter your email address and we'll send you a link to restore password</p>
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div className='forgot_form' >
                                        <div>
                                            <label htmlFor="emal" style={{ width: '10px' }}>Email</label>
                                            <input type="email" onChange={(e) => setOldEmail((data) => ({ ...data, email: e.target.value }))} />
                                        </div>
                                        {userCheck &&
                                           <p className='mt-3' style={{color:'blue',fontWeight:'500'}}>Check your email</p>
                                        }
                                        <button onClick={handleForgot}>Check User</button>

                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn" style={{ color: '#979595' }} data-bs-dismiss="modal">Back to log in</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </>
}

export default Login