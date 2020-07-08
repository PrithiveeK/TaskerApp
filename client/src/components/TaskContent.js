import React from 'react';
import { withRouter } from 'react-router-dom';
import style from '../cssModules/taskContent.module.css';

function TaskContent({history, data, filter: {status, category, assignee, keyword}}) {
    const statusList = ["All", "Open", "In Progress", "Resolved", "QA", "Reopen", "Closed", "Not Closed"]
    let display = {display: "table-row"}
    if((data.Subject+data.Description).toLowerCase().includes(keyword.toLowerCase())){
        display.display = "table-row"
    } else{
        display.display = "none"
    }
    if(status!==0 && status!==7 && data.Status !== statusList[status] || category && data.Category !== category || assignee && data.Assignee[0].Username !== assignee){
        display.display = "none"
    }
    if(status===7 && (data.Status==="Closed" || data.Status==="Resolved")){
        display.display = "none"
    }
    
    return (
        <tr style={display} onClick={()=>history.push("/tasks?view="+data.ID)}>
            <td>{data.Subject}</td>
            <td>{data.Assignee[0].Username}</td>
            <td><div className={`status-content ${"status-"+data.Status.toLowerCase().split(" ").join("-")} d_flex align_c m_auto`}>{data.Status}</div></td>
            <td>
                <div className={`d_flex w_100`}>
                    <div className={`${style['priority-'+data.Priority]} ${style['priority']} m_auto pos_rel`}/>
                </div>
            </td>
            <td>{new Date(data.DateCreated).toLocaleDateString()}</td>
            <td>{new Date(data.StartDate).toLocaleDateString()}</td>
            <td>{new Date(data.DueDate).toLocaleDateString()}</td>
        </tr>
    );
}

export default withRouter(TaskContent);