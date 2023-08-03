/* eslint-disable react/display-name*/
import React, { useState } from 'react';
import { Fragment } from 'react';
import DataTable from 'react-data-table-component';
import Icon from '../../components/icon';
import "./style.scss";
import { deleteJobCategory, getJobList, getSingleJobCat } from '../../services/Job';
import JobType from './JobType';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import EditJobCat from './EditJobCat';

const content = () => {
    const [jobcat, setJobcat] = useState([]);
    const [showModel, setShowModal] = useState(false);
    const [showDialog, setshowDialog] = useState({ type: "", id: "", value: "" });
    const [filterJob, setFilterJob] = useState(true);

    // Get job category list
    const jobCategoryList = (value) => {
        getJobList(value)
            .then((response) => {
                if (response.data.code === 200) {
                    setJobcat(response.data.data.categoryList)
                } else {
                    console.log("Something went wrong");
                }
            })
    }
    React.useEffect(() => {
        jobCategoryList(filterJob)
    }, [filterJob])
    console.log("job", jobcat);

    // toggle item
    //   const handleFilter = () => {
    //     setFilterJob(!filterJob)
    // }

    // // Single Job Details
    // const jobDetails = ()=>{
    //     getSingleJobCat(id)
    //     .then(response=>{
    //         setSingleJobDetail(response.data.data.category);
    //     })
    // }

    // React.useEffect(() => {
    //     jobDetails()
    // }, [id])

    // Delete job category
    const deleteJobCat = (id) => {
        deleteJobCategory(id)
            .then(response => {
                if (response) {
                    window.location.reload()
                }
            })
        setshowDialog(!showDialog)
    }

    // Open the delete modal
    const handleToggleDelete = () => {
        window.location.reload()
    }

    // expandable component
    const ExpandableComponent = ({ data }) =>
        <div style={{ backgroundColor: "rgb(240 236 255)", textAlign: "center" }}>
            <div className="row justify-content-center p-10">
                <div className="col-3" style={{ textAlign: "left" }}>
                    <h3 className="mt-5">
                        <strong>Job Details:</strong>
                    </h3>
                    {data.details.map(name => <h5 key={name.id}>{name}</h5>)}
                </div>
                <div className="col-3" style={{ textAlign: "left" }}>
                    <h3 className="mt-5">
                        <strong>Materials:</strong>
                    </h3>
                    {data.materials.map(mat => <h5 key={mat.id}>{mat}</h5>)}
                </div>
                <div className="col-3" style={{ textAlign: "left" }}>
                    <h3 className="mt-5">
                        <strong>Property Size:</strong>
                    </h3>
                    {data.propertySize.map(pro => <h5 key={pro.id}>{pro[0]}, {pro[1]}</h5>)}
                </div>
            </div>
        </div>;

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => moment(row.updatedAt).format("DD-MM-YYYY hh:mm a"),
        },
        {
            name: "Action",
            selector: (row) => row.action,
            cell: (value) => (
                <>
                    <button
                        title="Edit Job"
                        type="button"
                        className="btn btn-brand btn-sm btn-uniform btn-round btn-fix rui-filemanager-file-button"
                        onClick={() => {
                            setshowDialog({ type: "editItem", id: value.id, value: value });
                        }}
                    >
                        <Icon name="edit" />
                    </button>
                    <button
                        title="Delete Job"
                        type="button"
                        className="btn btn-brand btn-sm btn-uniform btn-round btn-fix rui-filemanager-file-button"
                        onClick={() => {
                            setshowDialog({ type: "deleteItem", id: value.id });
                        }}
                    >
                        <Icon name="trash" />
                    </button>
                </>
            ),
        },
    ];

    return (
        <Fragment>
            <div className="rui-filemanager job-section">
                <div className="rui-filemanager-head">
                    <div className="row sm-gap vertical-gap align-items-center">
                        <div className="col">
                            <div className="input-group">
                            </div>
                        </div>
                        <div className="col-auto">
                            <button
                                title="Add Category"
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform btn-round"
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                <Icon name="plus" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="rui-filemanager-content">
                    <div className="table-responsive-lg mb-20">
                        <DataTable
                            className="rui-datatable rui-filemanager-table table mb-20 mt-10"
                            columns={columns}
                            data={jobcat}
                            key={jobcat.id}
                            expandableRows
                            expandableRowsComponent={<ExpandableComponent />}
                            pagination={true}
                            highlightOnHover={true}
                        />
                    </div>
                </div>
                {showDialog.type == "deleteItem" && (
                    <Modal
                        isOpen={showDialog}
                        toggle={handleToggleDelete}
                        fade
                        id={jobcat.id}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Delete</h5>
                            <Button className="close" color="" onClick={handleToggleDelete}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                            <h1>Are you sure to delete this record?</h1>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={handleToggleDelete}>
                                Close
                            </Button>
                            <Button color="brand" onClick={() => deleteJobCat(showDialog.id)}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
                {showDialog.type === "editItem" && (
                    <EditJobCat closeEdit={setshowDialog} id={showDialog?.id} value={showDialog?.value}
                    />
                )}
                {showModel == true && <JobType
                    closeModal={setShowModal}
                />}
            </div>
        </Fragment>
    );
};

export default content;