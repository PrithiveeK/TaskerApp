import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';

import style from '../cssModules/addTask.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeamData, fetchedTeamData, teamDataError } from '../redux';

function AddTask(props) {

    const team = useSelector(state => state.team)
    const dispatch = useDispatch()

    const [newtask,setNewTask] = useState({
        subject: "",
        description: "",
        assignee: "",
        priority: 0,
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

    // useEffect(()=>{
    //     dispatch(fetchTeamData())
    //     fetch("http://localhost:5000/api/team",{
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'client': JSON.parse(localStorage.getItem("loggedInUser"))
    //         }
    //     }).then(res=>res.json())
    //     .then(data=>{
    //         if(data){
    //             dispatch(fetchedTeamData(data))
    //         } else{
    //             dispatch(teamDataError("Sorry, something went wrong!"))
    //         }
    //     }).catch(err=>{
    //         dispatch(teamDataError("Sorry, something went wrong!"))
    //     })
    // },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newtask.subject || !newtask.description || !newtask.assignee || !newtask.category || !newtask.start_date || !newtask.due_date){
            setNewTask({
                ...newtask,
                error: "Fill all the Fields"
            });
        }
        else{
            fetch("http://localhost:5000/api/task/add",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'client': JSON.parse(localStorage.getItem('loggedInUser')),
                    'project-id': props.match.prams.id
                },
                body: JSON.stringify(newtask)
            }).then(res=>res.json())
            .then(data=> {
                if(data.ok){
                    setNewTask({
                        subject: "",
                        description: "",
                        assignee: "",
                        priority: 0,
                        category: "",
                        start_date: "",
                        due_date: "",
                        error: "",
                        done: {ok: true, message: "Task added Successfully!", className: "success"}
                    })
                } else {
                    setNewTask({
                        ...newtask,
                        done: {ok: true, message: "Task adding Failed!", className: "failed"}
                    })
                }
            }).catch(err=>{
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
    }
    return (
        <div>
            <Header />
            <div className={`body-content body_h scroll`}>
                <div className={`${style['form-container']}`}>
                    { newtask.done.ok && (<div className={`${style['display-message']} d_flex`}>
                        <div className={`${style[newtask.done.className]} m_auto d_flex`}>
                            <p className={`m_auto`}>{newtask.done.message}</p>
                        </div>
                    </div>)}
                    <h3>Add Task</h3>
                    <form className={`${style['task-form']}`} onSubmit={handleSubmit}>
                        <div className={`${style['task-subject']}`}>
                            <input type="text" className={`w_100`} placeholder="Subject" onChange={handleChange} name="subject" value={newtask.subject}/>
                        </div>
                        <div className={`${style['about-task']}`}>
                            <div className={`${style['task-section']}`}>
                                <p>Description</p>
                                <textarea rows="10" placeholder="Description" onChange={handleChange} name="description" value={newtask.description}/>
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Status</p>
                                <p>Open</p>
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Assignee</p>
                                <select onChange={handleChange} name="assignee" value={newtask.assignee}>

                                </select>
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Priority</p>
                                <select onChange={handleChange} name="priority" value={newtask.priority}>
                                    <option value="-1">Low</option>
                                    <option value="0">Normal</option>
                                    <option value="1">High</option>
                                </select>
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Category</p>
                                <select onChange={handleChange} name="category" value={newtask.category}>
                                    <option value=""></option>
                                    <option value="frontend">Frontend</option>
                                    <option value="server">Server</option>
                                    <option value="database">Database</option>
                                    <option value="testing">Testing</option>
                                </select>
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Start Date</p>
                                <input type="date" onChange={handleChange} name="start_date" value={newtask.start_date} />
                            </div>
                            <div className={`${style['task-section']}`}>
                                <p>Due Date</p>
                                <input type="date" onChange={handleChange} name="due_date" value={newtask.due_date} />
                            </div>
                        </div>
                        <div className={`d_flex align_c`}>
                            <button>Save</button>
                            {newtask.error && <p className={`error`}>{newtask.error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(AddTask);