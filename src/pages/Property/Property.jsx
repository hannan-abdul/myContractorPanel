import React from 'react';
import Icon from "../../components/icon";
import { Col, FormGroup, Label, Input, Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const serviceModal = {
    name: '',
    ownerName: '',
    contact: '',
    address: '',
    googleAddress: [{ name: "", lat: '', lng: '' }],
  }

const Property = ({ id, closeModal, closeEdit }) => {
  const [values, setValues] = React.useState(serviceModal);
  const [loading, setLoading] = React.useState(false)
  const [validate, setValidate] = React.useState({
    nameError: '',
    ownerNameError: '',
    contactError: '',
    googleAddress: [{
      name: ''
    }],
  })

  const checkName = () => {
    const {
      name,
    } = values.name;

    const isValid = values.name && values.name.length >= 0;
    setValidate({
      nameError: isValid ? '' : 'Name must be at least 3 characters long',
    });
    return isValid;
  }

  //Posting the data via model
//   const AddShop =  async() => {

//     let data = {
//       name: nameInput1.value,
//       ownerName: nameInput2.value,
//       contact: contact.value,
//       googleAddress: [{
//         name: values.value?.description, lat: latlng.lat, lng: latlng.lng
//       }]
//     }

//     setLoading(true)
//     createShop(JSON.stringify(data)).then((response) => {
//       if (response) {
//         window.location.reload()
//         closeModal(false)
//         console.log(response)
//       } else {
//         console.log('Something went wrong')
//         setLoading(false)
//       }
//     })
//   }

  return (
    <React.Fragment>
      <Modal
        isOpen={true}
        fade
        on
      >
        <div className="modal-header">
          <h5 className="modal-title h2">{id ? 'Edit Property' : 'Add Property'}</h5>
          <Button className="close" color="" onClick={() => { id ? closeEdit(false) : closeModal(false) }}>
            <Icon name="x" />
          </Button>
        </div>
        <ModalBody>
          <FormGroup row >
            <Label for="nameInput1" sm={2}>
              Name
            </Label>
            <Col sm={10}>
              <Input
                id="nameInput1"
                name="Name"
                placeholder="Name"
                type="text"
                required
                value={values?.name}
                onChange={(e) => {
                  setValues({
                    name: e.target.value,
                  }, validate.nameError ? checkName : () => { });
                }}
                onBlur={checkName}
                disabled={loading}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="nameInput2" sm={2}>
              Owner name
            </Label>
            <Col sm={10}>
              <Input
                id="nameInput2"
                name="Owner_name"
                placeholder="Owner Name"
                type="text"
                value={values?.ownerName}
                onChange={(e) => {
                  setValues({
                    ownerName: e.target.value,
                  });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="contact" sm={2}>
              Contact
            </Label>
            <Col sm={10}>
              <Input
                id="contact"
                name="contact"
                placeholder="Contact Number"
                type="number"
                value={values?.contact}
                onChange={(e) => {
                  setValues({
                    contact: e.target.value,
                  });
                }}
              />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => { id ? closeEdit(false) : closeModal(false) }}>
            Close
          </Button>
          {id ? <Button color="brand" onClick={EditShop}>
            {
              loading ? <div className="spinner-border spinner-fix" role="status">
                <span className="visually-hidden"></span></div> : "Update"
            }
          </Button> : <Button color="brand" onClick={() => AddShop()}>
            {
              loading ? <div className="spinner-border spinner-fix" role="status">
                <span className="visually-hidden"></span></div> : "Save"
            }
          </Button>}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}
export default Property;
