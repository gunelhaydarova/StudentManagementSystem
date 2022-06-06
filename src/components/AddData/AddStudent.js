import React from 'react';
import { Button, Modal, Row, Col, Form, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactPhoneInput from "react-phone-input-2";

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

const academicDegree = [{ id: "BACHELOR", name: "BACHELOR" }, { id: "MASTER", name: "MASTER" }]
const semestr = [{ id: "FIRST", name: "I" }, { id: "SECOND", name: "II" }, { id: "THIRD", name: "III" }, { id: "FOURTH", name: "IV" }, { id: "FIFTH", name: "V" }, { id: "SIXTH", name: "VI" }, { id: "SEVENTH", name: "VII" }]

export default class AddStudent extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
            variant: 'danger',
            alert: '',
            collection: [],
            acdegree: [],
            semestr: [],
            show: false,
            startDate: new Date(),
            fullscreen: true,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            subject: '',
            teams: '',
            phone: '',
            sem: '',
            degree: ''
        }
    }
    componentDidMount() {
        fetch('http://localhost:8080/v1/teams')
            .then((response) => response.json())
            .then((res) => this.setState({ collection: res }))
        this.setState({ acdegree: academicDegree })
        this.setState({ semestr: semestr })
    }

    onChange = (event) => {

        this.setState({ teams: event.target.value })
    }
    handleOnChange = value => {
        console.log(value);
        this.setState({ phone: value.substring(1) }, () => {
            // console.log(this.state.phone);
        });
    };
    handleShow(breakpoint) {
        this.setState({ show: breakpoint })

    }
    validateForm() {

        return this.state.firstname.length > 0 && this.state.lastname.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.teams.length > 0 && this.state.sem.length > 0 && this.state.degree.length > 0;
    }
    saveData() {
        //alert(this.state.startDate)
        var message, variant;
        if (this.state.phone.length != 12) {
            message = 'Telefon nömrəsini düzgen daxil edin!';
            variant = 'danger';
            this.setState({ alert: message, variant: variant, showModal: true })
            return false
        }
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!this.state.email.match(validRegex)) {
            message = 'Maili düzgen daxil edin!';
            variant = 'danger';
            this.setState({ alert: message, variant: variant, showModal: true })
            return false
        }

        var formData = {
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "email": this.state.email,
            "password": this.state.password,
            "teamId": this.state.teams,
            "birthdate": this.state.startDate,
            "phone": this.state.phone,
            "academicDegree": this.state.degree,
            "semester": this.state.sem

        }
        const url = 'http://localhost:8080/v1/students';
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
                console.log(response)
                if (!response.error) {

                    message = 'Məlumat əlavə edildi';
                    variant = 'success';
                    // this.handleShow(false)
                }
                else {
                    message = response.error;
                    variant = 'danger';
                }
                this.setState({ alert: message, variant: variant, showModal: true })
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
                    Yeni Tələbə
                </Button>
                <Modal show={this.state.show} fullscreen={this.state.fullscreen} onHide={() => this.setState({ show: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tələbəni daxil edin</Modal.Title>
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
                                    <Form.Group className="mb-3" controlId="formBasicselect">
                                        <Form.Label>Doğum tarixi</Form.Label>

                                        <DatePicker selected={this.state.startDate} className="form-control" onChange={(date) => this.setState({ startDate: date })} />


                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicselect">
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
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3"  >
                                        <Form.Label>Phone *</Form.Label>
                                        <ReactPhoneInput
                                            inputExtraProps={{
                                                required: true,
                                                autoFocus: true
                                            }}
                                            defaultCountry={"az"}
                                            value={this.state.phone}
                                            onChange={this.handleOnChange}
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
                                        <Form.Label>Qrup</Form.Label>
                                        <CustomDropdown
                                            name={this.state.username}
                                            multiple={false}
                                            options={this.state.collection}
                                            onChange={this.onChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicselect">
                                        <Form.Label>Dərəcəsi</Form.Label>
                                        <CustomDropdown
                                            name={this.state.username}
                                            multiple={false}
                                            options={this.state.acdegree}
                                            onChange={(e) => { this.setState({ degree: e.target.value }); }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formBasicselect">
                                        <Form.Label>Semestr</Form.Label>
                                        <CustomDropdown
                                            name={this.state.username}
                                            multiple={false}
                                            options={this.state.semestr}
                                            onChange={(e) => { this.setState({ sem: e.target.value }); }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col></Col>
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
