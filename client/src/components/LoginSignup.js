import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import LogIn from './LogIn';
import SignUp from './SignUp';

import style from '../cssModules/loginSignup.module.css';

function LoginSignup(props) {
    const nextPage = {
        "login": <LogIn />,
        "signup": <SignUp />
    }
    const goToPage = (page) => {
        props.history.push(`/?p=${page}`);
    }
    const page = props.location.search.substr(1).split("=")[1];
    return (
        <div className={`${style['body-container']}`}>
            <header className={`${style['header-container']} d_flex align_c jc_sb`}>
                <h1 className={`${style['app-title']}`}>Tasker App</h1>
                <div>
                    <button className={`${style['btn']}`} onClick={()=>goToPage('login')}>Log in</button>
                    <button className={`${style['btn']}`} onClick={()=>goToPage('signup')}>Sign up</button>
                </div>
            </header>
            <div className={`${style['main-body']} d_flex body_h align_c jc_sa`}>
                <div style={{zIndex: "1"}}>
                    <div className={`${style['task-note']} pos_rel`}>
                        <div className={`${style['note-pin']} pos_abs br_100`} />
                        <p>Hey!</p>
                        <p>Here is a task for You</p>
                    </div>
                </div>
                <div className={`${style['body-right']}`}>
                    <p>Welcome!</p>
                    <p className={`${style['p2']}`}>to the</p>
                    <p className={`${style['p3']}`}>Tasker App</p>
                    <p className={`${style['p4']}`}>Create a <i>Project</i> and assign to your team in <i>No Time</i></p>
                </div>
            </div>
            {
                page && (
                <div className={`${style['next-page']} d_flex`}>
                    <div className={`${style['register-body']} m_auto pos_rel`}>
                        <Link to="/" title="close"><div className={`${style['close']} pos_abs`} /></Link>
                        <div className={`${style['note-pin']} pos_abs br_100`} />
                        {nextPage[page]}
                    </div>
                </div>
                )
            }
        </div>

    );
}

export default withRouter(LoginSignup);