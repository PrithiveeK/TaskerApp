import React,{ useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import style from '../cssModules/header.module.css';

function Header(props) {
    const [logged, setLogged] = useState(true);
    const path = props.history.location.pathname;
    return logged ? (
        <header className={`${style['header-container']} d_flex align_c`}>
            <div className={`${style['icon']} br_100 d_flex`}>
                <div className={`${style['options']} m_auto`} />
            </div>
            <h1>TASKER APP</h1>
            <div className={`${style['dock']} body_h d_flex fd_col align_c`}>
                <div className={`${style['icon-container']} d_flex`} style={path.startsWith("/home")||path.startsWith("/project") ? {backgroundColor: "#a8bd84"}:{}} 
                onClick={()=>props.history.push('/home')}>
                    <div className={`${style['icon']} br_100 d_flex`}>
                        <div className={`${style['home']} m_auto pos_rel`} />
                    </div>
                </div>
                <div className={`${style['icon-container']} d_flex`} style={path.startsWith('/add') ? {backgroundColor: "#a8bd84"}:{}} 
                onClick={()=>props.history.push('/add')}>
                    <div className={`${style['icon']} br_100 d_flex`}>
                        <div className={`${style['add']} m_auto pos_rel`} />
                    </div>
                </div>
                <div className={`${style['icon-container']} d_flex`} style={path.startsWith('/tasks') ? {backgroundColor: "#a8bd84"}:{}}
                onClick={()=>props.history.push('/tasks')}>
                    <div className={`${style['icon']} br_100 d_flex`}>
                        <div className={`${style['task']} m_auto pos_rel`} />
                    </div>
                </div>
                <div className={`flex_1`}/>
                <div className={`${style['icon']} br_100 d_flex`} title="Logout"
                onClick={()=>setLogged(false)}>
                    <div className={`${style['logout']} m_auto pos_rel`} />
                </div>
            </div>
        </header>
    ) : <Redirect to="/" />;
}

export default withRouter(Header);