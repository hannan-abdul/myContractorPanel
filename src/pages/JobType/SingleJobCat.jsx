import React from 'react';
import Icon from "../../components/icon";
import { Col, FormGroup, Label, Input, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import DataTable from 'react-data-table-component';
import "./style.scss";
import { getSingleJobCat } from '../../services/Job';

const SingleJobCat = ({ id, closeModal, closeEdit }) => {
    const [singleJobDetail, setSingleJobDetail] = React.useState({})
    console.log(singleJobDetail);

    // Single Job Details
    const jobDetails = () => {
        getSingleJobCat(id)
            .then(response => {
                setSingleJobDetail(response.data.data.category);
            })
    }

    React.useEffect(() => {
        jobDetails()
    }, [id])

    // const columns = [
    //     {
    //         name: 'Product Name',
    //         selector: row => row.name,
    //     },
    //     {
    //         name: 'Quantity',
    //         selector: row => row.quantity,
    //     },
    //     {
    //         name: 'Price',
    //         selector: row => row.productPrice,
    //     },
    // ];

    return (
        <React.Fragment>
            <Modal
                fullscreen="sm"
                size="lg"
                isOpen={true}
                fade
                on
            >
                <div className="modal-header">
                    <h4 className="modal-title">Name: {singleJobDetail.name}</h4>
                    <div className="row">
                        <div className="col-3">
                            <h3 className="mt-5">
                                <strong>Details:</strong>
                            </h3>
                            {singleJobDetail.details}
                        </div>
                        <div className="col-3">
                            <h3 className="mt-5">
                                <strong>Materials:</strong>
                            </h3>
                            {singleJobDetail.materials}
                        </div>
                        <div className="col-3">
                            <h3 className="mt-5">
                                <strong>Property Size:</strong>
                            </h3>
                            {singleJobDetail.propertySize}
                        </div>
                    </div>
                    <Button className="close" color="" onClick={() => { item ? closeEdit(false) : closeModal(false) }}>
                        <Icon name="x" />
                    </Button>
                </div>
                {/* <ModalBody>
                    <div className="table-responsive-lg order-details">
                        <DataTable
                            className="rui-datatable rui-filemanager-table table mb-10"
                            columns={columns}
                            data={singleJobDetail}
                            key={singleJobDetail.id}
                            // pagination={true}
                            highlightOnHover={true}
                            dense={true}
                        />
                    </div>
                </ModalBody> */}
                <ModalFooter>
                    <Button color="secondary" onClick={() => { id ? closeEdit(false) : closeModal(false) }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}
export default SingleJobCat;