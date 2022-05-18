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
export default class AddFaculty extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
            variant: 'danger',
            alert: '',
            collection: [],
            value: '',
            show: false,
            fullscreen: true,
            name: '',
            university: ''
        }
    }
    componentDidMount() {
        fetch('http://localhost:8080/v1/universities')
            .then((response) => response.json())
            .then((res) => this.setState({ collection: res }))

    }


    handleShow(breakpoint) {
        this.setState({ show: breakpoint })

    }
    validateForm() {
        return this.state.name.length > 0 && this.state.university.length > 0;
    }
    saveData() {
        var message, variant;
        var formData = {
            "name": this.state.name,
            "universityId": this.state.university

        }
        const url = 'http://localhost:8080/v1/faculties';
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
                    Yeni Fakültə
                </Button>
                <Modal show={this.state.show} fullscreen={this.state.fullscreen} onHide={() => this.setState({ show: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Fakültəni daxil edin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form autocomplete="off" className="addInformation">
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Fakültə Adı * </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Adı"
                                            value={this.state.name}
                                            onChange={(e) => { this.setState({ name: e.target.value }); }}
                                            required
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3"  >
                                        <Form.Label>Universitet *</Form.Label>
                                        <CustomDropdown
                                            name={this.state.username}
                                            id='team'
                                            multiple={false}
                                            options={this.state.collection}
                                            onChange={(e) => { this.setState({ university: e.target.value }); }}
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
