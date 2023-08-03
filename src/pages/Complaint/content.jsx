/* eslint-disable react/display-name*/
import React, { useState } from 'react';
import { Fragment } from 'react';
import DataTable from 'react-data-table-component';
import Icon from '../../components/icon';
import "./style.scss";
import Complaint from './Complaint';
import { getComplaintList } from '../../services/Complaint';
import moment from 'moment';

const content = () => {
    const [showModel, setShowModal] = useState(false);
    const [showDialog, setshowDialog] = React.useState({ type: "", id: "" });
    const [complaint, setComplaint] = useState([]);
    const [status, setStatus] = useState("Pending Review");

    // get complaint list 
    console.log(complaint);
    const complaintList = async (value) => {
        getComplaintList(value)
            .then((response) => {
                setComplaint(response.data.data.list)
            }).catch((error) => {
                console.log({ error })
            })
    }

    React.useEffect(() => {
        complaintList(status);
    }, [status])

    // Filter complaint status 
    const handleFilter = (item) => {
        if (item === "Pending Review") {
            setStatus("Pending Review")
        } else if (item === "Resolved") {
            setStatus("Resolved")
        } else {
            setStatus("Review In Progress")
        }
    }

    const columns = [
        {
            name: "Job ID",
            selector: (row) => row.jobID,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Issue",
            selector: (row) => row.issue,
        },
        {
            name: "Message",
            selector: (row) => row.message,
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
                        title="Update Status"
                        type="button"
                        className="btn btn-brand btn-sm btn-uniform btn-round btn-fix rui-filemanager-file-button"
                        onClick={() => {
                            setshowDialog({ type: "editItem", id: value.jobID });
                        }}
                    >
                        <Icon name="edit" />
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
                                onClick={() => handleFilter("Pending Review")}
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform complain-btn-fix"
                            >Pending Review
                            </button>
                            <button
                                onClick={() => handleFilter("Review In Progress")}
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform complain-btn-fix"
                            >In Progress
                            </button>
                            <button
                                onClick={() => handleFilter("Resolved")}
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform complain-btn-fix"
                            >Resolved
                            </button>
                        </div>
                    </div>
                </div>
                <div className="rui-filemanager-content">
                    <div className="table-responsive-lg mb-20">
                        <DataTable
                            className="rui-datatable rui-filemanager-table table mb-20 mt-10"
                            columns={columns}
                            data={complaint}
                            key={complaint.id}
                            pagination={true}
                            highlightOnHover={true}
                            dense={true}
                        // paginationServer
                        // paginationTotalRows={totalRows}
                        // onChangeRowsPerPage={handlePerRowsChange}
                        // onChangePage={handlePageChange}
                        />
                    </div>
                </div>
                {showDialog.type === "editItem" && (
                    <Complaint
                        closeEdit={setshowDialog}
                        id={showDialog?.id}
                    />
                )}
                {showModel == true && <Complaint
                    closeModal={setShowModal}
                />}
            </div>
        </Fragment>
    );
};

export default content;