import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import style from '../cssModules/status.module.css';

function Status(props) {
    const tasks = useSelector(state=>state.tasks)
    const [status, setStatus] = useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/api/task/status?pId="+props.match.params.id,{
            method: "GET"
        }).then(res=>res.json())
        .then(data=>{
            if(data[0].ID !== "0"){
                setStatus(data)
            }
        }).catch(err=>console.log(err))
    },[tasks])
    return (
        <div className={`d_flex fd_col`}>
            <div className={`${style['status-bar']} w_100`}></div>
            <div className={`${style['all-status']}`}>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>Open</p>
                    <div className={`status-content status-open d_flex align_c`}>{status.find(s=>s.ID==="Open")?.Count || 0}</div>
                </div>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>In Progress</p>
                    <div className={`status-content status-in-progress d_flex align_c`}>{status.find(s=>s.ID==="In Progress")?.Count || 0}</div>
                </div>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>Resolved</p>
                    <div className={`status-content status-resolved d_flex align_c`}>{status.find(s=>s.ID==="Resolved")?.Count || 0}</div>
                </div>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>QA</p>
                    <div className={`status-content status-qa d_flex align_c`}>{status.find(s=>s.ID==="QA")?.Count || 0}</div>
                </div>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>Reopen</p>
                    <div className={`status-content status-reopen d_flex align_c`}>{status.find(s=>s.ID==="Reopen")?.Count || 0}</div>
                </div>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>Closed</p>
                    <div className={`status-content status-closed d_flex align_c`}>{status.find(s=>s.ID==="Closed")?.Count || 0}</div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Status);