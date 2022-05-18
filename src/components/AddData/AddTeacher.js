import React from 'react';
import { Button, Modal, Row, Col, Form, Alert } from "react-bootstrap";
export const CustomDropdown = (props) => (
    <div className="form-group"   >
        <select multiple={props.multiple}
            className="form-control"
            id={props.id}
            name={props.username}
            onChange={props.onChange}
        >
            <option defaultValue>Select {props.name}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    </div>
)

export default class AddTeacher extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
            variant: 'danger',
            alert: '',
            collection: [],
            test: [],
            value: '',
            show: false,
            fullscreen: true,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            subject: '',

            teams: []
        }
    }
    componentDidMount() {
        fetch('http://localhost:8080/v1/teams')
            .then((response) => response.json())
            .then((res) => this.setState({ collection: res }))
        fetch('http://localhost:8080/v1/subjects')
            .then((response) => response.json())
            .then((res) => this.setState({ test: res }))
    }
    onChange = (event) => {

        this.setState({ subject: event.target.value })
    }

    onChange2 = (e) => {
        var select = document.getElementById('team');
        var selected = [...select.options]
            .filter(option => option.selected)
            .map(option => option.value);
        this.setState({ team: selected })

    }

    handleShow(breakpoint) {
        this.setState({ show: breakpoint })

    }
    handleShow2(breakpoint) {
        this.setState({ showModal: breakpoint })

    }
    validateForm() {
        return this.state.firstname.length > 0 && this.state.lastname.length > 0 && this.state.email.length > 0 && this.state.password.length > 0;
    }
    saveData() {
        var message, variant;
        var formData = {
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "email": this.state.email,
            "password": this.state.password,
            "subjectId": this.state.subject,
            "teamsId": this.state.team

        }
        const url = 'http://localhost:8080/v1/teachers';
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch(url, params)

            .then(response => response.json())
            .then(response => {
                if (!response.error) {
                    message = 'Məlumat əlavə edildi';
                    variant = 'success';
                }

                else {
                    message = response.error;
                    variant = 'danger';
                }
                this.setState({ alert: message, variant: variant, showModal: true })

                //  this.handleShow(false)
            });

    }
    AlertDismissibleExample() {

        if (this.state.showModal) {
            return (
                <Alert variant={this.state.variant} onClose={() => this.setState({ showModal: false })} dismissible>
                    <Alert.Heading >{this.state.alert}</Alert.Heading>

                </Alert>
            );
        }
        return '';
    }
    render() {
        return (
            <div>
                <Button key={0} className="me-2 mb-2" onClick={() => this.handleShow(true)}>
                    Yeni Müəllim
                </Button>
                <Modal show={this.state.show} fullscreen={this.state.fullscreen} onHide={() => this.setState({ show: false })} key={2}>
                    <Modal.Header closeButton>
                        <Modal.Title>Müəllimi daxil edin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form autocomplete="off" className="addInformation">
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Adı * </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Adı"
                                            value={this.state.firstname}
                                            onChange={(e) => { this.setState({ firstname: e.target.value }); }}
                                            required
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3"  >
                                        <Form.Label>Soyadı *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Soyadı"
                                            value={this.state.lastname}
                                            onChange={(e) => { this.setState({ lastname: e.target.value }); }}
                                            autocomplete="false"
                                            required
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3"  >
                                        <Form.Label>Email *</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            value={this.state.email}
                                            autocomplete="false"
                                            onChange={(e) => { this.setState({ email: e.target.value }); }}
                                            required
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Parol *</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Parol"
                                            autocomplete="false"
                                            value={this.state.password}
                                            onChange={(e) => { this.setState({ password: e.target.value }); }}
                                            required

                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicselect">
                                        <Form.Label>Fənn</Form.Label>
                                        <CustomDropdown
                                            name={this.state.username}
                                            multiple={false}
                                            options={this.state.test}
                                            onChange={this.onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicselect">
                                        <Form.Label>Qrup</Form.Label>
                                        <CustomDropdown
                                            name={this.state.username}
                                            id='team'
                                            multiple={true}
                                            options={this.state.collection}
                                            onChange={this.onChange2}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                        </Form>
                        <Row>
                            <Col></Col>
                            <Col>
                                {this.AlertDismissibleExample()}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleShow(false)}>
                            Bağla
                        </Button>
                        <Button variant="primary" onClick={() => this.saveData()} disabled={!this.validateForm()}>
                            Yadda saxla
                        </Button>
                    </Modal.Footer>
                </Modal>



            </div>
        )
    }
}
