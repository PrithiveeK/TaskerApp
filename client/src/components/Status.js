import React from 'react';
import style from '../cssModules/status.module.css';

function Status(props) {
    return (
        <div className={`d_flex fd_col`}>
            <div className={`${style['status-bar']} w_100`}></div>
            <div className={`${style['all-status']}`}>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>Open</p>
                    <div className={`status-content status-open d_flex align_c`}>0</div>
                </div>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>In Progress</p>
                    <div className={`status-content status-in-progress d_flex align_c`}>0</div>
                </div>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>Resolved</p>
                    <div className={`status-content status-resolved d_flex align_c`}>0</div>
                </div>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>QA</p>
                    <div className={`status-content status-qa d_flex align_c`}>0</div>
                </div>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>Reopen</p>
                    <div className={`status-content status-reopen d_flex align_c`}>0</div>
                </div>
                <div className={`d_flex fd_col jc_c align_c ${style['status-block']}`}>
                    <p>Closed</p>
                    <div className={`status-content status-closed d_flex align_c`}>0</div>
                </div>
            </div>
        </div>
    );
}

export default Status;