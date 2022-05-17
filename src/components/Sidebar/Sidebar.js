import React from "react";
import "./Sidebar.css";
import user from '../../images/teacher.png'

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
    const mail = sessionStorage.getItem('mail');

    return (
        <div>

            <div id="sidebar">
                <div className="sidebar__title">
                    <div className="sidebar__img">
                        <img src={user} alt="logo" />
                        <div>
                            <h3> Admin</h3>
                            <span>{mail}</span>
                        </div>
                    </div>
                    <i
                        onClick={() => closeSidebar()}
                        className="fa fa-times"
                        id="sidebarIcon"
                        aria-hidden="true"
                    />
                </div>

                <div className="sidebar__menu">
                    <div className="sidebar__link " id="sidebar_1">
                        <a href="/TEACHER"> Müəllimlər </a>
                    </div>
                    <div className="sidebar__link " id="sidebar_2">
                        <a href="/students">Tələbələr</a>
                    </div>
                    <div className="sidebar__link sidebar_3">
                        <a href="/faculties">Fakültələr</a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;
