import React from 'react';
import style from '../cssModules/taskContent.module.css';

function TaskContent({data}) {
    return (
        <tr>
            <td>{data.Subject}</td>
            <td>{data.Assignee.UserName}</td>
            <td><div className={`status-content status-open d_flex align_c`}>{data.Status}</div></td>
            <td>
                <div className={`d_flex w_100`}>
                    <div className={`${style['priority-'+data.Priority]} ${style['priority']} m_auto pos_rel`}/>
                </div>
            </td>
            <td>{data.DateCreated}</td>
            <td>{data.StartDate}</td>
            <td>{data.DueDate}</td>
        </tr>
    );
}

export default TaskContent;