/* eslint-disable react/display-name*/
import React, { useState } from 'react';
import { Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Icon from '../../components/icon';
import { deleteServey, getAllServey } from '../../services/Survey';
import Editsurvey from './Editsurvey';
import "./style.scss";
import Survey from './Survey';

const content = () => {
    const [survey, setSurvey] = useState([]);
    const [showModel, setShowModal] = useState(false);
    const [showDialog, setshowDialog] = useState({ type: "", id: "", value: "" });
    const [filter, setFilter] = useState(true);

    // get active survey list 
    const surveyList = (value) => {
        getAllServey(value)
            .then((response) => {
                if (response.data.code === 200) {
                    setSurvey(response.data.data.list)
                } else {
                    console.log("Something went wrong");
                }
            })
    }

    React.useEffect(() => {
        surveyList(filter)
    }, [filter])

    // toggle item
    const handleFilter = () => {
        setFilter(!filter)
    }

    //Deleting Survey
    const Delete = (id) => {
        deleteServey(id)
            .then((response) => {
                if (response) {
                    window.location.reload()
                }
            });
        setshowDialog(!showDialog)

    };

    //opening the delete modal
    const handleToggleDelete = () => {
        window.location.reload()
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Order Number",
            selector: (row) => row.order,
            sortable: true,
        },
        {
            name: "Questions",
            selector: (row) => row.question,
        },
        {
            name: "Action",
            selector: (row) => row.action,
            cell: (value) => (
                <>
                    <button
                        title="Edit Survey"
                        type="button"
                        className="btn btn-brand btn-sm btn-uniform btn-fix btn-round rui-filemanager-file-button"
                        onClick={() => {
                            setshowDialog({ type: "editItem", id: value.id, value: value });
                        }}
                    >
                        <Icon name="edit" />
                    </button>
                    {filter && <button
                        title="Deactivate Survey"
                        type="button"
                        className="btn btn-brand btn-sm btn-uniform btn-fix rui-filemanager-file-button"
                        onClick={() => {
                            setshowDialog({ type: "deleteItem", id: value.id });
                        }}
                    >Disable</button>}
                </>
            ),
        },
    ];

    return (
        <Fragment>
            <div className="rui-filemanager material-section">
                <div className="rui-filemanager-head">
                    <div className="row sm-gap vertical-gap align-items-center">
                        <div className="col">
                            <div className="input-group">
                            </div>
                        </div>
                        <div className="col-auto">
                            {!filter ? <button
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform"
                                onClick={handleFilter}
                            >active survey
                            </button> : <button
                                onClick={handleFilter}
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform"
                            >inactive survey
                            </button>}
                            <button
                                title="Add Survey"
                                type="button"
                                className="btn btn-brand btn-sm btn-uniform btn-round filter-btn-fix"
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
                            data={survey}
                            key={survey.id}
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
                        id={survey.id}
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Disable Survey</h5>
                            <Button className="close" color="" onClick={handleToggleDelete}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                            <h1>Are you sure to Deactivate this record?</h1>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={handleToggleDelete}>
                                Close
                            </Button>
                            <Button color="brand" onClick={() => Delete(showDialog.id)}>
                                Disable
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
                {showDialog.type === "editItem" && (
                    <Editsurvey
                        closeEdit={setshowDialog}
                        id={showDialog?.id}
                        value={showDialog?.value}
                    />
                )}
                {showModel == true && <Survey
                    closeModal={setShowModal}
                />}
            </div>
        </Fragment>
    );
};

export default content;