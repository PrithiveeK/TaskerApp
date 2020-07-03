import React from 'react';
import style from '../cssModules/taskContent.module.css';

function TaskContent(props) {
    return (
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><div className={`status-content status-open d_flex align_c`}>Open</div></td>
            <td>
                <div className={`d_flex w_100`}>
                    <div className={`${style['priority-0']} ${style['priority']} m_auto pos_rel`}/>
                </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    );
}

export default TaskContent;