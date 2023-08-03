import React from 'react';
import Icon from "../../components/icon";
import { Col, FormGroup, Input, Button, Modal, ModalBody, ModalFooter, ButtonDropdown, DropdownMenu, DropdownItem } from "reactstrap";
import { addSurvey } from '../../services/Survey';

const optionsValue = {
  Field1: '',
  Field2: '',
  Field3: '',
  Field4: ''
}

const Survey = ({ id, closeModal, closeEdit }) => {
  const [loading, setLoading] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [questions, setQuestions] = React.useState("");
  const [next, setNext] = React.useState(false);
  const [option, setOption] = React.useState(optionsValue);

  console.log(option);
  console.log(questions);

  //Posting the data via model
  const AddSurvey = () => {
    let data = {
      order: orderNumber,
      active: activeValue.value,
      question: questions,
      options: {
        Field1: field1.value,
        Field2: field2.value,
        Field3: field3.value,
        Field4: field4.value
      }
    }
    console.log(data);
    addSurvey(JSON.stringify(data))
      .then((response) => {
        console.log(data);
        if (response) {
          // window.location.reload()
          closeModal(false)
          console.log(response)
        } else {
          console.log('Something went wrong')
        }
      })
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={true}
        fade
        on
      >
        <div className="modal-header">
          <h5 className="modal-title h2">{id ? 'Edit Survey' : 'Add Survey'}</h5>
          <Button className="close" color="" onClick={() => { id ? closeEdit(false) : closeModal(false) }}>
            <Icon name="x" />
          </Button>
        </div>
        <ModalBody>
          {!next && <FormGroup row>
            <Col>
              <Input
                className='mb-10'
                placeholder="Order Number"
                type="number"
                onChange={(e) => setOrderNumber(e.target.value)}
              />
              <Input
                id="questionInput"
                name="Question"
                placeholder="Question"
                type="text"
                onChange={(e) => setQuestions(e.target.value)}
              />
            </Col>
          </FormGroup>}
          {next &&
            <FormGroup row>
              <Col>
                <Input
                  className='mb-10'
                  name="activeValue" 
                  id="activeValue"
                  type="select"
                >
                  <option value="" disabled selected>
                    Action Value
                  </option>
                  <option value={true}>
                    Active
                  </option>
                  <option value={false}>
                    Inactive
                  </option>
                </Input>
                <h5>Select Option</h5>
                <Input
                  className='mb-10'
                  type="text"
                  id="field1"
                  placeholder="Option One"
                  value={option.Field1}
                  onChange={(e) => {
                    setOption({
                      Field1: e.target.value
                    })
                  }}
                />
                <Input
                  className='mb-10'
                  type="text"
                  id="field2"
                  placeholder="Option Two"
                  value={option.Field2}
                  onChange={(e) => {
                    setOption({
                      Field2: e.target.value
                    })
                  }}
                />
                <Input
                  className='mb-10'
                  type="text"
                  id="field3"
                  placeholder="Option Three"
                  value={option.Field3}
                  onChange={(e) => {
                    setOption({
                      Field3: e.target.value
                    })
                  }}
                />
                <Input
                  className='mb-10'
                  type="text"
                  id="field4"
                  placeholder="Option Four"
                  value={option.Field4}
                  onChange={(e) => {
                    setOption({
                      Field4: e.target.value
                    })
                  }}
                />
              </Col>
            </FormGroup>}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => { id ? closeEdit(false) : closeModal(false) }}>
            Close
          </Button>
          {!next ? (<Button onClick={() => setNext(true)} disabled={!questions && true}>Next</Button>) :
            (<Button disabled={!option && true} color="brand" onClick={() => AddSurvey()}>Save</Button>)}

          {/* {id ? <Button color="brand" onClick={EditShop}>
            {
              loading ? <div className="spinner-border spinner-fix" role="status">
                <span className="visually-hidden"></span></div> : "Update"
            }
          </Button> : <Button color="brand" onClick={() => AddSurvey()}>
            {
              loading ? <div className="spinner-border spinner-fix" role="status">
                <span className="visually-hidden"></span></div> : "Save"
            }
          </Button>} */}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  )
}
export default Survey;
