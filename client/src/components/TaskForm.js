import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeamData, fetchedTeamData, teamDataError, fetchAllTasks } from '../redux';
import style from '../cssModules/addTask.module.css';

function TaskForm(props) {
    const team = useSelector(state => state.team)
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)

    const [newtask,setNewTask] = useState({
        subject: "",
        description: "",
        status: "Open",
        assignee: "",
        priority: "0",
        category: "",
        start_date: "",
        due_date: "",
        error: "",
        done: {ok:false, message: "", className: ""}
    })
    const handleChange = (event) => {
        setNewTask({
            ...newtask,
            [event.target.name]: event.target.value
        })
    }

    useEffect(()=>{
        dispatch(fetchTeamData())
        setEdit(!props.location.search)
        setNewTask({
            subject: props.task?.Subject || "",
            description: props.task?.Description || "",
            status: props.task?.Status || "Open",
            assignee: props.task?.Assignee[0] || "",
            priority: props.task?.Priority || "0",
            category: props.task?.Category || "",
            start_date: new Date(props.task?.StartDate || Date()).toLocaleDateString().split("/").reverse().join("-"),
            due_date: new Date(props.task?.DueDate || Date()).toLocaleDateString().split("/").reverse().join("-"),
            error: "",
            done: {ok:false, message: "", className: ""}
        })
        fetch(`http://localhost:5000/api/team?cId=${localStorage.getItem('loggedInUser')}`,{
            method: "GET"
        }).then(res=>res.json())
        .then(data=>{
            if(data){
                dispatch(fetchedTeamData(data[0].MemberData))
            } else{
                dispatch(teamDataError("Sorry, something went wrong!"))
            }
        }).catch(err=>{
            dispatch(teamDataError("Sorry, something went wrong!"))
        })
    },[props])

    const insertTask = () => {
        fetch("http://localhost:5000/api/task/add?pId="+props.match.params.id, {
            method: "POST",
            body: JSON.stringify({
                ...newtask, 
                start_date: new Date(newtask.start_date).toISOString(),
                due_date: new Date(newtask.due_date).toISOString()
            })
        }).then(res=>res.json())
        .then(data=> {
            if(data.Ok){
                setNewTask({
                    subject: "",
                    description: "",
                    status: "Open",
                    assignee: "",
                    priority: "0",
                    category: "",
                    start_date: "",
                    due_date: "",
                    error: "",
                    done: {ok: true, message: "Task added Successfully!", className: "success"}
                })
                dispatch(fetchAllTasks())
            } else {
                setNewTask({
                    ...newtask,
                    done: {ok: true, message: "Task adding Failed!", className: "failed"}
                })
            }
        }).catch(err=>{
            console.log(err)
            setNewTask({
                ...newtask,
                done: {ok: true, message: "sorry, Something went Wrong!", className: "failed"}
            })
        }).finally(()=>{
            setTimeout(()=>{
                setNewTask({
                    ...newtask,
                    done: {ok: false, message: "", className: ""}
                })
            },2000);
        })
    }

    const updateTask = () => {
        fetch("http://localhost:5000/api/task/update?tId="+props.task.ID, {
            method: "PUT",
            body: JSON.stringify({
                ...newtask, 
                start_date: new Date(newtask.start_date).toISOString(),
                due_date: new Date(newtask.due_date).toISOString()
            })
        }).then(res=>res.json())
        .then(data=> {
            if(data.Ok){
                dispatch(fetchAllTasks())
                props.history.push("/tasks")
            } else {
                setNewTask({
                    ...newtask,
                    done: {ok: true, message: "Task adding Failed!", className: "failed"}
                })
            }
        }).catch(err=>{
            console.log(err)
            setNewTask({
                ...newtask,
                done: {ok: true, message: "sorry, Something went Wrong!", className: "failed"}
            })
        }).finally(()=>{
            setTimeout(()=>{
                setNewTask({
                    ...newtask,
                    done: {ok: false, message: "", className: ""}
                })
            },2000);
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!newtask.subject || !newtask.description || !newtask.assignee || !newtask.category || !newtask.start_date || !newtask.due_date) {
            setNewTask({
                ...newtask,
                error: "Fill all the Fields"
            });
        } else if(props.location.search){
            updateTask()
        }
         else{
            insertTask()
        }
    }
    return (
        <React.Fragment>
            { newtask.done.ok && (<div className={`${style['display-message']} d_flex`}>
                <div className={`${style[newtask.done.className]} m_auto d_flex`}>
                    <p className={`m_auto`}>{newtask.done.message}</p>
                </div>
            </div>)}
            {edit || <button onClick={()=>setEdit(true)}>Edit</button>}
            <form className={`${style['task-form']}`} onSubmit={handleSubmit}>
                <div className={`${style['task-subject']}`}>
                    {edit ? <input type="text" className={`w_100`} placeholder="Subject" onChange={handleChange} name="subject" value={newtask.subject}/>
                    : (<div className={`d_flex align_c`}><h3>Subject:</h3><p>{newtask.subject}</p></div>)}
                </div>
                <div className={`${style['about-task']}`}>
                    <div className={`${style['task-section']}`}>
                        <p>Description</p>
                        {edit ? <textarea rows="10" placeholder="Description" onChange={handleChange} name="description" value={newtask.description}/>
                        : <p style={{height: "200px"}}>{newtask.description}</p>}
                    </div>
                    <div className={`${style['task-section']}`}>
                        <p>Status</p>
                        {edit ? (<select name="status" onChange={handleChange} value={newtask.status}>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="QA">QA</option>
                            <option value="Reopen">Reopen</option>
                            <option value="Closed">Closed</option>
                        </select>) : <p>{newtask.status}</p>}
                    </div>
                    <div className={`${style['task-section']}`}>
                        <p>Assignee</p>
                        {edit ? (<select onChange={handleChange} name="assignee" value={newtask.assignee.ID}>
                            <option value=""></option>
                            {team.data.map(member=><option value={member.ID} key={member.ID}>{member.Username}</option>)}
                            </select>) : <p>{newtask.assignee.Username}</p>}
                    </div>
                    <div className={`${style['task-section']}`}>
                        <p>Priority</p>
                        {edit ? (<select onChange={handleChange} name="priority" value={newtask.priority}>
                            <option value="-1">Low</option>
                            <option value="0">Normal</option>
                            <option value="1">High</option>
                        </select>) : <p>{["Normal", "High"][newtask.priority] || "Low"}</p> }
                    </div>
                    <div className={`${style['task-section']}`}>
                        <p>Category</p>
                        {edit ? (<select onChange={handleChange} name="category" value={newtask.category}>
                            <option value=""></option>
                            <option value="frontend">Frontend</option>
                            <option value="server">Server</option>
                            <option value="database">Database</option>
                            <option value="testing">Testing</option>
                        </select>) : <p>{newtask.category}</p>}
                    </div>
                    <div className={`${style['task-section']}`}>
                        <p>Start Date</p>
                        {edit ? <input type="date" onChange={handleChange} name="start_date" value={newtask.start_date} />
                        : <p>{newtask.start_date}</p>}
                    </div>
                    <div className={`${style['task-section']}`}>
                        <p>Due Date</p>
                        {edit ? <input type="date" onChange={handleChange} name="due_date" value={newtask.due_date} />
                        : <p>{newtask.due_date}</p>}
                    </div>
                </div>
                <div className={`d_flex align_c`}>
                    {edit && <button type="submit">Save</button>}
                    {newtask.error && <p className={`error`}>{newtask.error}</p>}
                </div>
            </form>
        </React.Fragment>
    );
}

export default withRouter(TaskForm);