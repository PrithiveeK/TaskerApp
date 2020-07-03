import React from 'react';
import style from '../cssModules/homePage.module.css';
import Header from './Header';
import Project from './Project';
import Status from './Status';
import Milestone from './Milestone';

function HomePage(props) {
    return (
        <div>
            <Header />
            <div className={`body-content body_h d_flex`}>
                <div className={`${style['project-content']} of_auto sb_none`}>
                    <Project />
                </div>
                <div className={`${style['overall-data']} of_auto sb_none`}>
                    <div>
                        <h3 className={`${style['section-heading']}`}>Status</h3>
                        <div className={`${style['section']}`}>
                            <Status />
                        </div>
                    </div>
                    <div>
                        <h3 className={`${style['section-heading']}`}>Milestone</h3>
                        <div className={`${style['section']}`}>
                            <Milestone />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;