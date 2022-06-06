import React from "react";
import MUIDataTable from "mui-datatables";
import "react-data-table-component-extensions/dist/index.css";
import avatar from '../../images/avatar.png'
import { Form, Modal, Navbar, Nav, NavDropdown, Row, Col, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";

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

export function Test() {
    const { id } = useParams();
    sessionStorage.setItem('id', id);


};

class TeamData extends React.Component {

    constructor() {
        super()
        this.state = {
            info: [],
            columns: [],
            show: false,
            lastDate: '',
            startDate: new Date(),
        }
    }
    logout() {
        sessionStorage.clear();
        window.location.href = '/';
    }


    componentDidMount() {
        var column = [
            {
                name: "firstname",
                label: "Adı"
            },
            {
                name: "lastname",
                label: "Soyadı"
            }
        ];
        var p = 0;
        fetch('http://localhost:8080/v1/scores/1/2')
            .then((response) => response.json())
            .then((res) => {
                var arr = [], data = [];
                for (let i = 0; i < res.length; i++) {
                    arr = {
                        "firstname": res[i].firstName,
                        "lastname": res[i].lastName
                    };
                    for (let j = 0; j < res[i].scores.length; j++) {
                        var txt = res[i].scores[j].lessonDate.substring(0, 10)
                        if (txt != this.state.lastDate)
                            arr[txt] = res[i].scores[j].grade;
                        else
                            arr[txt] = <input type='text' class="form-control" value={res[i].scores[j].grade} />
                        p++;
                        if (p <= res[i].scores.length) {
                            var obj = {
                                name: txt,
                                label: txt
                            }
                            column.push(obj);
                        }
                    }
                    data.push(arr)
                    arr = []
                }
                this.setState({ columns: column });
                this.setState({ info: data });

            }
            );


    }
    showModal() {
        this.setState({ show: true })
    }
    addColumn() {

        var column = this.state.columns;
        var day = this.state.startDate.getDate();
        if (day < 10) day = "0" + day;
        var month = this.state.startDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var date = this.state.startDate.getFullYear() + '-' + month + '-' + day;
        var obj = {
            name: '"' + date + '"',
            label: date
        }
        var teamId = sessionStorage.getItem('id').substring(1);
        var subjectId = sessionStorage.getItem('subjectId')

        var formData = {
            "teamId": teamId,
            "subjectId": subjectId,
            "lessonDate": date
        }
        this.setState({ lastDate: date });
        console.log(formData)
        const url = 'http://localhost:8080/v1/lessons';
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch(url, params)
            .then((responce) => {
                var column = [
                    {
                        name: "firstname",
                        label: "Adı"
                    },
                    {
                        name: "lastname",
                        label: "Soyadı"
                    }
                ];
                var p = 0;
                fetch('http://localhost:8080/v1/scores/1/2')
                    .then((response) => response.json())
                    .then((res) => {
                        var arr = [], data = [];
                        for (let i = 0; i < res.length; i++) {
                            arr = {
                                "firstname": res[i].firstName,
                                "lastname": res[i].lastName
                            };
                            for (let j = 0; j < res[i].scores.length; j++) {
                                var txt = res[i].scores[j].lessonDate.substring(0, 10);
                                if (txt != this.state.lastDate)
                                    arr[txt] = res[i].scores[j].grade;
                                else
                                    arr[txt] = <input type='text' class="form-control" value={res[i].scores[j].grade} />
                                p++;
                                if (p <= res[i].scores.length) {
                                    var obj = {
                                        name: txt,
                                        label: txt
                                    }
                                    column.push(obj);
                                }

                            }

                            data.push(arr)

                            arr = []
                        }
                        this.setState({ columns: column });
                        this.setState({ info: data });

                    }
                    );
            }
            )
        this.setState({ show: false })

    }


    render() {
        return (

            < div className="main" >
                <Test />
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })} key={2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tarixi seçin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form autocomplete="off" className="addInformation">
                            <Row>
                                <DatePicker selected={this.state.startDate} className="form-control" onChange={(date) => this.setState({ startDate: date })} />

                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                            Bağla
                        </Button>
                        <Button variant="primary" onClick={() => this.addColumn()} >
                            Yadda saxla
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Row>
                    <Col className="dropdown_menu">
                        <Navbar bg="light" expand="lg" className="nav">
                            <Navbar.Toggle aria-controls="dropdown-menu-right" />
                            <Navbar.Collapse id="dropdown-menu-left">
                                <Nav className="me-auto dropdown-menu-left">
                                    <NavDropdown title={<img src={avatar} alt="logo" className="avatar" />} className="avatar  dropdown-menu-left" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#">Parolu dəyiş</NavDropdown.Item>
                                        <NavDropdown.Item href="#" onClick={this.logout}>Çıxış</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>

                        </Navbar>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Button key={1} className="me-2 mb-2" onClick={() => this.showModal()}>
                            Yeni Tarix
                        </Button>
                    </Col>
                </Row>

                <MUIDataTable
                    title={""}
                    data={this.state.info}
                    columns={this.state.columns}
                    options={options}
                />


            </div >
        )
    }
}
export default TeamData;