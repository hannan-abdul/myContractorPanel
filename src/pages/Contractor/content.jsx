/* eslint-disable react/display-name*/
import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Icon from '../../components/icon';
import "./style.scss";
import { allContractorList, approveUserData } from '../../services/Contractor';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const content = () => {
    const [showModel, setShowModal] = useState(false);
    const [showDialog, setshowDialog] = useState({ type: "", id: "" });
    const [contractor, setContractor] = useState([]);
    const [status, setStatus] = useState('all');
    // const [totalRows, setTotalRows] = useState(0);
    // const [perPage, setPerPage] = useState(10);

    // get contractor list 
    const contractorList = async (value) => {
        allContractorList(value)
            .then(response => {
                if (response.data.code === 200) {
                    setContractor(response.data.data.userList)
                } else {
                    console.log("Something went wrong");
                }
            })
    }

    useEffect(() => {
        contractorList(status);
    }, [status])
    console.log(contractor);

    // Filter Contractor
    const handleFilter = (item) => {
        if (item === "all") {
            setStatus("all")
        } else if (item === "suspended") {
            setStatus("suspended")
        } else if (item === "locked") {
            setStatus("locked")
        } else {
            setStatus("unlocked")
        }
    }

    // Approve user 
    const approveUser = (id) => {
        let data = {
            id: id,
        }
        console.log(data);
        approveUserData(JSON.stringify(data))
            .then((response) => {
                console.log(data);
                if (response) {
                    window.location.reload()
                    closeModal(false)
                    console.log(response)
                } else {
                    console.log('Something went wrong')
                }
            })
    }

    //opening the delete modal
    const handleToggleDelete = () => {
        window.location.reload()
    };

    // expandable component
    const ExpandableComponent = ({ data }) =>
        <div style={{ backgroundColor: "rgb(240 236 255)", textAlign: "center" }}>
            <div className="row justify-content-center p-10">
                <div className="col-2" style={{ textAlign: "left" }}>
                    <h5 className="mt-5">
                        <strong>Mobile No:</strong>
                    </h5>
                    <h6>{data.mobile}</h6>
                </div>
                <div className="col-2" style={{ textAlign: "left" }}>
                    <h5 className="mt-5">
                        <strong>User Type:</strong>
                    </h5>
                    <h6>{data.userType}</h6>
                </div>
                <div className="col-2" style={{ textAlign: "left" }}>
                    <h5 className="mt-5">
                        <strong>IC Number:</strong>
                    </h5>
                    <h6>{data.icNumber}</h6>
                </div>
                <div className="col-2" style={{ textAlign: "left" }}>
                    <h5 className="mt-5">
                        <strong>SSM Number:</strong>
                    </h5>
                    <h6>{data.ssmNumber}</h6>
                </div>
                <div className="col-2" style={{ textAlign: "left" }}>
                    <h5 className="mt-5">
                        <strong>Country:</strong>
                    </h5>
                    <h6>{data.country}</h6>
                </div>
                <div className="col-2" style={{ textAlign: "left" }}>
                    <h5 className="mt-5">
                        <strong>Job Category:</strong>
                    </h5>
                    <h6>{data.jobCategory}</h6>
                </div>
            </div>
        </div>;

    // const fetchUsers = async page => {
    //     getAllContractor({ "page": `${page}`, "limit": `${perPage}` })
    //         .then((response) => {
    //             setContractor(response.data.data.userList)
    //             setTotalRows(response);
    //         }).catch((error) => {
    //             console.log({ error })
    //         })
    // };

    // const handlePageChange = page => {
    //     fetchUsers(page);
    // };

    // const handlePerRowsChange = async (newPerPage, page) => {
    //     getAllContractor({ "page": `${page}`, "limit": `${newPerPage}` })
    //     .then((response) => {
    //         setContractor(response.data.data.userList)
    //          setPerPage(newPerPage);
    //     }).catch((error) => {
    //         console.log({ error })
    //     })
    // };

    // React.useEffect(() => {
    //     fetchUsers(1); // fetch page 1 of users
    // }, []);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Full Name",
            selector: (row) => row.fullName,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Action",
            selector: (row) => row.action,
            cell: (value) => (
                <>
                    <button
                        title="View Review"
                        type="button"
                        className="btn btn-brand btn-sm btn-uniform btn-round btn-fix rui-filemanager-file-button"
                    >
                        <Link to={`/contractor-review/${value.id}`}>
                            <Icon className="edit-icon" name="star" />
                        </Link>
                    </button>
                    <button
                        title="Approve User"
                        type="button"
                        className="btn btn-brand btn-sm btn-uniform btn-round btn-fix rui-filemanager-file-button"
                        onClick={() => {
                            setshowDialog({ type: "approveItem", id: value.id });
                        }}
                    >
                        <Icon className="edit-icon" name="user" />
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
                                onClick={() => handleFilter("all")}
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform complain-btn-fix"
                            >All
                            </button>
                            <button
                                onClick={() => handleFilter("locked")}
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform complain-btn-fix"
                            >Locked
                            </button>
                            <button
                                onClick={() => handleFilter("unlocked")}
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform complain-btn-fix"
                            >Unlocked
                            </button>
                            <button
                                onClick={() => handleFilter("suspended")}
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform complain-btn-fix"
                            >Suspended
                            </button>
                        </div>
                    </div>
                </div>
                <div className="rui-filemanager-content">
                    <div className="table-responsive-lg mb-20">
                        <DataTable
                            className="rui-datatable rui-filemanager-table table mb-20 mt-10"
                            columns={columns}
                            data={contractor}
                            key={contractor.id}
                            pagination={true}
                            highlightOnHover={true}
                            expandableRows
                            expandableRowsComponent={<ExpandableComponent />}
                        // paginationServer
                        // paginationTotalRows={totalRows}
                        // onChangeRowsPerPage={handlePerRowsChange}
                        // onChangePage={handlePageChange}
                        />
                    </div>
                </div>
                {showDialog.type == "approveItem" && (
                    <Modal
                        isOpen={showDialog}
                        toggle={handleToggleDelete}
                        fade
                        id={contractor.id}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Approve User</h5>
                            <Button className="close" color="" onClick={handleToggleDelete}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                            <h1>Are you want to Approve this User?</h1>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={handleToggleDelete}>
                                Close
                            </Button>
                            <Button color="brand" onClick={() => approveUser(showDialog.id)}>
                                Approve
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </div>
        </Fragment>
    );
};

export default content;