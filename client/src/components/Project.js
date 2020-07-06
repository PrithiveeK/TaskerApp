import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProjectData from './ProjectData';
import { fetchAllProject } from '../redux';
import style from '../cssModules/project.module.css';

function Project(props) {

    const projects = useSelector(state => state.projects)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllProject())
    },[])
    return (
        <div className={`${style['project-list-container']}`}>
            <h3>Project Home</h3>
            <div className={`${style['project-list-content']}`}>
                {projects.data.map(project=><ProjectData key={project.ID} data={project}/>)}
            </div>
        </div>
    );
}

export default Project;