import React from 'react';
import Header from './Header';
import Status from './Status';
import style from '../cssModules/homePage.module.css'

function ProjectList(props) {
    return (
        <div>
            <Header />
            <div className={`body-content d_flex body_h`}>
                <div className={`${style['project-content']} of_auto sb_none`}>
                    <div className={`d_flex ${style['add-task']}`} onClick={()=>props.history.push(`/add/${props.match.params.id}`)}>
                        <div className={`${style['add']} m_auto pos_rel`}></div>
                        <h2>Add task</h2>
                    </div>
                    <h2>No Updates</h2>
                </div>
                <div className={`${style['overall-data']} of_auto sb_none`}>
                    <div>
                        <h3 className={`${style['section-heading']}`}>Status</h3>
                        <div className={`${style['section']}`}>
                            <Status />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectList;