import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import style from '../cssModules/login.module.css';

function LogIn(props) {

    const [user, setUser] = useState({useremail: "", password: "", error: ""})
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        props.history.push("/home")
    }
    return (
        <form className={`${style['form-container']} d_flex align_c fd_col jc_sa`}
        onSubmit={handleSubmit}>
            <label className={`${style['user-input-label']}`}>USER EMAIL</label>
            <input type="email" className={`${style['user-input']}`} onChange={handleChange} name="useremail" value={user.useremail}/>
            <label className={`${style['user-input-label']}`}>PASSWORD</label>
            <input type="password" className={`${style['user-input']}`} onChange={handleChange} name="password" value={user.password}/>
            <div className={`d_flex align_c jc_sa ${style['register']}`}>
                <button type="submit">Log In</button>
                <Link to="/?p=signup">SignUp</Link>
            </div>
        </form>
    );
}

export default withRouter(LogIn);