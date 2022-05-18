import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import "react-data-table-component-extensions/dist/index.css";
import avatar from '../../images/avatar.png'
import { Navbar, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import AddTeacher from "../AddData/AddTeacher";

const options = {
    filter: false,
    rowsPerPageOptions: [10, 20, 30],
    rowsPerPage: [10],
    jumpToPage: false,

    search: true,
    exportButton: false,
    pageSize: 10,
    textLabels: {
        pagination: {
            next: "Next >",
            previous: "< Previous",

            rowsPerPage: "Total items Per Page ",
            displayRows: "OF"
        }
    },
    onChangePage(currentPage) {
        console.log({ currentPage });
    },
    onChangeRowsPerPage(numberOfRows) {
        console.log({ numberOfRows });
    }
};
const TeacherData = () => {
    const [info, setInfo] = useState([])

    function logout() {
        sessionStorage.clear();
        window.location.href = '/';
    }
    const endpoint = 'http://localhost:8080/v1/teachers'

    const getData = async () => {
        await axios.get(endpoint).then((response) => {
            const data = response.data
            console.log(data)
            setInfo(data)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
            name: "firstName",
            label: "Adı"
        },
        {
            name: "lastName",
            label: "Soyadı"
        },
        {
            name: "email",
            label: "Mail ünvanı"
        },
        {
            name: "subjectName",
            label: "Fənn adı"
        }
    ]

    //4 - renderizamos la datatable
    return (
        <div className="main">
            <Row>
                <Col className="dropdown_menu">
                    <Navbar bg="light" expand="lg" className="nav">
                        <Navbar.Toggle aria-controls="dropdown-menu-right" />
                        <Navbar.Collapse id="dropdown-menu-left">
                            <Nav className="me-auto dropdown-menu-left">
                                <NavDropdown title={<img src={avatar} alt="logo" className="avatar" />} className="avatar  dropdown-menu-left" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#">Parolu dəyiş</NavDropdown.Item>
                                    <NavDropdown.Item href="#" onClick={logout}>Çıxış</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>

                    </Navbar>
                </Col>
            </Row>

            <Row>
                <Col>
                    <AddTeacher />
                </Col>

            </Row>

            <MUIDataTable
                title={""}
                data={info}
                columns={columns}
                options={options}
            />
        </div>
    )

}
export default TeacherData