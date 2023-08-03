import React from 'react';
import Icon from "../../components/icon";
import { Col, FormGroup, Input, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { getSingleJobCat, postJobCategory, updateJobCategory } from '../../services/Job';
import Select from 'react-select';
import "./style.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

const JobType = ({ id, closeModal, closeEdit, value }) => {
  const [names, setNames] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [detail, setDetail] = React.useState([])
  const [material, setMaterial] = React.useState([])
  const [propertysize, setPropertysize] = React.useState([])
  
  //Posting the data via model
  const AddJob = async () => {
    let data = {
      name: nameInput.value,
      details: detail,
      materials: material,
      propertySize: propertysize
    }
    // debugger
    setLoading(true)
    postJobCategory(JSON.stringify(data))
      .then((response) => {
        if (response) {
          window.location.reload()
          closeModal(false)
          console.log(response)
        } else {
          console.log('Something went wrong')
          setLoading(false)
        }
      })
  }

  //update Job data
  const EditJob = () => {
    let data = {
      name: nameInput.value,
      details: detail,
      materials: material,
      propertySize: propertysize
    }
    // debugger
    setLoading(true)
    updateJobCategory(JSON.stringify(data), id)
      .then((response) => {
        if (response) {
          // window.location.reload()
          // closeModal(false)
          console.log(response)
        } else {
          console.log('Soething went wrong')
          setLoading(false)
        }
      })
  }

  // Single Job Details
  const jobDetails = () => {
    getSingleJobCat(id)
      .then(response => {
        if (response) {
          const val = {
            // name: response.data.data.category?.name,
            // details: response.data.data.category?.details,
            // materials: response.data.data.category?.materials,
            propertySize: response.data.data.category?.propertySize,
          }
          setPropertysize(val)
        } else {
          console.log('Something Wrong')
        }

      })
  }

  React.useEffect(() => {
    jobDetails()
  }, [id])

    // add details section 
    const addDet = (e) => {
      if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          setDetail([...detail, e.target.value]);
          e.target.value = "";
        }
      }
    };
    const removeDet = (removedDetail) => {
      const newDetail = detail.filter((det) => det !== removedDetail);
      setDetail(newDetail);
    };
  
    // add material section 
    const addMat = (e) => {
      if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          setMaterial([...material, e.target.value]);
          e.target.value = "";
        }
      }
    };
    const removeMat = (removedMaterial) => {
      const newMaterial = material.filter((mat) => mat !== removedMaterial);
      setMaterial(newMaterial);
    };

  // Property size handle 
  const options = [
    { value: [0, 500], label: '0, 500' },
    { value: [501, 900], label: '501, 900' },
    { value: [901, 1400], label: '901, 1400' },
    { value: [1401, 2200], label: '1401, 2200' },
    { value: [2201, 4000], label: '2201, 4000' },
    { value: [4001, -1], label: '4001, -1' }
  ]
  const propertyhandle = (e) => {
    setPropertysize(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={true}
        fade
        on
      >
        <div className="modal-header">
          <h5 className="modal-title h2">{id ? 'Edit Category' : 'Add Category'}</h5>
          <Button className="close" color="" onClick={() => { id ? closeEdit(false) : closeModal(false) }}>
            <Icon name="x" />
          </Button>
        </div>
        <ModalBody>
          <FormGroup>
            <Col>
              <Input
                id="nameInput"
                name="Name"
                placeholder="Name"
                type="text"
                required
                value={names?.name}
                onChange={(e) => {
                  setNames({
                    name: e.target.value,
                  });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup className="tag-container">
            {detail.map((det, index) => {
              return (
                <span key={index} className="tag">
                  {det} <span aria-hidden="true" 
                  onClick={() => removeDet(det)}>
                    <FontAwesomeIcon className="removeicon" icon={faTimesCircle} />
                    </span>
                </span>
              );
            })}
            <Col>
              <Input
                placeholder="Details"
                type="text"
                onKeyDown={addDet}
              />
            </Col>
          </FormGroup>
          <FormGroup className="tag-container">
            {material.map((mat, index) => {
              return (
                <span key={index} className="tag">
                  {mat} <span aria-hidden="true" 
                  onClick={() => removeMat(mat)}>
                    <FontAwesomeIcon className="removeicon" icon={faTimesCircle} />
                    </span>
                </span>
              );
            })}
            <Col>
              <Input
                placeholder="Materials"
                type="text"
                onKeyDown={addMat}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col>
              <Select
                options={options}
                isMulti
                onChange={propertyhandle}
              />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => { id ? closeEdit(false) : closeModal(false) }}>
            Close
          </Button>
          {id ? <Button color="brand" onClick={EditJob}>
            {
              loading ? <div className="spinner-border spinner-fix" role="status">
                <span className="visually-hidden"></span></div> : "Update"
            }
          </Button> : <Button color="brand" onClick={() => AddJob()}>
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
export default JobType;

