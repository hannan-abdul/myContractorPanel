import React from 'react';
import { Col, FormGroup, Input, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Icon from "../../components/icon";
import './style.scss'
import { getSingleComplaint, updateComplaint } from '../../services/Complaint';

const serviceModal = {
    status: '',
}

const Complaint = ({ id, closeModal, closeEdit }) => {
    const [values, setValues] = React.useState(serviceModal);
    const [loading, setLoading] = React.useState(false);

    //update Complaint data
    const updateComplain = () => {
        let data = {
            status: activeValue.value,
        }

        // debugger
        setLoading(true)
        console.log(data);
        updateComplaint(JSON.stringify(data), id)
            .then((response) => {
                if (response) {
                    window.location.reload()
                    closeModal(false)
                    console.log(response);
                } else {
                    console.log('Soething went wrong')
                    setLoading(false)
                }
            })
    }

    //Fetch single Complaint data
    React.useEffect(() => {
        getSingleComplaint(id)
            .then((res) => {
                if (res) {
                    const val = {
                        status: res.data.data.complaint?.status
                    }
                    setValues(val)
                } else {
                    console.log('I am failed')
                }
            })
    }, [id])

    return (
        <React.Fragment>
            <Modal
                isOpen={true}
                fade
                on
            >
                <div className="modal-header">
                    <h5 className="modal-title h2">Edit Complaint</h5>
                    <Button className="close" color="" onClick={() => { id ? closeEdit(false) : closeModal(false) }}>
                        <Icon name="x" />
                    </Button>
                </div>
                <ModalBody>
                    <FormGroup row>
                        <Col>
                            <Input
                                className="mb-10"
                                name="activeValue"
                                id="activeValue"
                                type="select"
                            >
                                <option value="" disabled selected>
                                    Change Status
                                </option>
                                <option value={"Pending Review"}>
                                    Pending Review
                                </option>
                                <option value={"Review In Progress"}>
                                    Review In Progress
                                </option>
                                <option value={"Resolved"}>
                                    Resolved
                                </option>
                            </Input>
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => { id ? closeEdit(false) : closeModal(false) }}>
                        Close
                    </Button>
                    <Button color="brand" onClick={updateComplain}>
                        {
                            loading ? <div className="spinner-border spinner-fix" role="status">
                                <span className="visually-hidden"></span></div> : "Update"
                        }
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

export default Complaint;
