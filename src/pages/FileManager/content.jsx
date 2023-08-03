/* eslint-disable react/display-name */
import "./style.scss";
import React, { Fragment, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Icon from "../../components/icon";
import DataTables from "react-data-table-component";
import { getShops, deleteShop } from '../../services/Shop';
import Shops from "./Shops";

const Content = () => {
  const [items, setItems] = React.useState([]);
  const [showModel, setShowModal] = useState(false);
  const [showDialog, setshowDialog] = React.useState({ type: "", id: "" });
  const [loading, setLoading] = React.useState(false);
  const [validate, setValidate] = React.useState({
    nameError: '',
    ownerNameError: '',
    contactError: ''
  })

  //Fetching the shop list
  React.useEffect(() => {
    getShops()
      .then((response) => {
        setItems(response.data.data);
      });
  }, []);

  //Deleting API call
  const Delete = (id) => {
    deleteShop(id)
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

  //creating the table coloum
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "owner",
      selector: (row) => row.ownerName,
      sortable: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (value) => (
        <>
          <button
            type="button"
            className="btn btn-brand btn-sm btn-uniform btn-round rui-filemanager-file-button"
            onClick={() => {
              setshowDialog({ type: "editItem", id: value.id });
            }}
          >
            <Icon name="edit" />
          </button>
          <button
            type="button"
            className="btn btn-brand btn-sm btn-uniform btn-round rui-filemanager-file-button"
            onClick={() => {
              //Delete(value.id)
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
      <div className="rui-filemanager">
        <div className="rui-filemanager-head">
          <div className="row sm-gap vertical-gap align-items-center">
            <div className="col">
              <div className="input-group">
                <div className="input-group-prepend mnl-3">
                  <button
                    type="button"
                    className="btn btn-clean btn-grey-5 mb-0 mnl-10"
                  >
                    <Icon name="search" />
                  </button>
                </div>
                <input
                  type="search"
                  className="form-control form-control-clean rui-search-input"
                  placeholder="Type to search..."
                />
              </div>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-brand btn-custom-round mnt-2"
              >
                <Icon name="more-vertical" />
              </button>
            </div>
            <div className="col-auto">
              <button
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
          <div className="table-responsive-lg">
            <DataTables
              className="rui-datatable rui-filemanager-table table mb-10"
              columns={columns}
              data={items}
              key={items.id}
              pagination={true}
              highlightOnHover={true}
              dense={true}
            />
          </div>
        </div>
      </div>
      {showDialog.type == "deleteItem" && (
        <Modal
          isOpen={showDialog}
          toggle={handleToggleDelete}
          fade
          id={items.id}
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
            <Button color="brand" onClick={() => Delete(showDialog.id)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      )}
      {showDialog.type === 'editItem' && (
        <Shops
          closeEdit={setshowDialog}
          id={showDialog?.id}
        />
      )}
      {showModel == true && <Shops closeModal={setShowModal} />}
    </Fragment>
  );
};

export default Content;

