import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import style from '../cssModules/signup.module.css';

function SignUp(props) {

    const [user, setUser] = useState({username: "", useremail: "", password: "", error: ""})
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:5000/api/user/signup",{
            method: "POST",
            body: JSON.stringify(user)
        }).then(res=>res.json())
        .then(data => {
            if(data.ID){
                localStorage.setItem("loggedInUser",data.ID)
                props.history.push("/home")
            }else{
                setUser({
                    ...user,
                    error: data.Message
                })
            }
        }).catch(err=>{
            setUser({
                ...user,
                error: "Sorry, Try Again!"
            })
        })
    }

    return (
        <form className={`${style['form-container']} d_flex align_c fd_col jc_sa`} onSubmit={handleSubmit}>
            <label className={`${style['user-input-label']}`}>USER NAME</label>
            <input type="text" className={`${style['user-input']}`} onChange={handleChange} name="username" value={user.username}/>
            <label className={`${style['user-input-label']}`}>USER EMAIL</label>
            <input type="email" className={`${style['user-input']}`} onChange={handleChange} name="useremail" value={user.useremail}/>
            <label className={`${style['user-input-label']}`}>PASSWORD</label>
            <input type="password" className={`${style['user-input']}`} onChange={handleChange} name="password" value={user.password}/>
            <div className={`d_flex jc_sa align_c ${style['register']}`}>
                <button type="submit">Sign Up</button>
                <Link to="/?p=login">Log In</Link>
            </div>
            <div className={`error`}>{user.error}</div>
        </form>
    );
}

export default withRouter(SignUp);