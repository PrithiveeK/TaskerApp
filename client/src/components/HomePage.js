import React from 'react';
import style from '../cssModules/homePage.module.css';
import Header from './Header';
import Project from './Project';

function HomePage(props) {
    return (
        <div>
            <Header />
            <div className={`body-content body_h d_flex`}>
                <div className={`${style['project-content']} of_auto sb_none`}>
                    <Project />
                </div>
            </div>
        </div>
    );
}

export default HomePage;