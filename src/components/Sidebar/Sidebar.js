import React from "react";
import "./Sidebar.css";
import user from '../../images/teacher.png'
const mail = sessionStorage.getItem('mail');
export default class Sidebar extends React.Component {
    constructor() {
        super()
        this.state = {
            MenuItems: []
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem('role') == 'ADMIN') {
            var items = [
                {
                    title: 'Müəllimlər',
                    url: '/ADMIN'
                },
                {
                    title: 'Tələbələr',
                    url: '/students'
                },
                {
                    title: 'Fakültələr',
                    url: '/faculties'
                },
            ];
            console.log(items)
            this.setState({ MenuItems: items })
        }
        else {

            console.log(items)
            fetch('http://localhost:8080/v1/teams')
                .then((response) => response.json())
                .then((res) => {
                    var myObject = [];
                    const DisplayData = res.map(
                        (info) => {
                            let newData = {
                                url: '/group/:' + info.id,
                                title: info.name
                            }

                            myObject.push(newData);
                        }
                    )
                    console.log(myObject)
                    this.setState({ MenuItems: myObject })

                })

        }
    }
    render() {

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

                            className="fa fa-times"
                            id="sidebarIcon"
                            aria-hidden="true"
                        />
                    </div>

                    <div className="sidebar__menu">
                        {this.state.MenuItems.map((item, index) => {
                            return (

                                <div className="sidebar__link " id="sidebar_2">
                                    <a href={item.url}>{item.title}</a>
                                </div>
                            )
                        })}


                    </div>
                </div>
            </div>
        );
    }
}; 