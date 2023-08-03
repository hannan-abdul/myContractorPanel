/* eslint-disable react/display-name*/
import React, { useState } from 'react';
import { Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import Icon from '../../components/icon';
import "./style.scss";
import { getPropertyList } from '../../services/Property';
import Property from './Property';

const content = () => {
    const [property, setProperty] = useState([]);
    const [showModel, setShowModal] = useState(false);
    const [showDialog, setshowDialog] = React.useState({ type: "", id: "" });

    // get property list 
    const propertyList = () => {
        getPropertyList().then((response) => {
            console.log(response)
        })
    }
    React.useEffect(() => {
        propertyList()
    }, [])

    const columns = [
        {
            name: "ID",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Amount",
            selector: (row) => row.owoner,
            sortable: true,
        },
        {
            name: "Paid Amount",
            selector: (row) => row.contact,
            sortable: true,
        },
        {
            name: "Pending Amount",
            selector: (row) => row.address,
        },
        {
            name: "Date",
            selector: (row) => row.address,
        },
        {
            name: "Action",
            selector: (row) => row.action,
            cell: (value) => (
                <>
                    <button
                        title="Edit Property"
                        type="button"
                        className="btn btn-brand btn-sm btn-uniform btn-fix btn-round rui-filemanager-file-button"
                        onClick={() => {
                               setshowDialog({ type: "editItem", id: value.id });
                        }}
                    >
                        <Link>
                            <Icon className="edit-icon" name="edit" />
                        </Link>
                    </button>
                    <button
                        title="Delete Property"
                        type="button"
                        className="btn btn-brand btn-sm btn-uniform btn-fix btn-round rui-filemanager-file-button"
                        onClick={() => {
                            //    setshowDialog({ type: "editItem", id: value.id });
                        }}
                    >
                        <Link>
                            <Icon className="edit-icon" name="trash" />
                        </Link>
                    </button>
                </>
            ),
        },
    ];

    //    column data 
    const data = [
        {
            id: 1,
            title: 'property 1',
            year: '1988',
        },
        {
            id: 2,
            title: 'property 2',
            year: '1984',
        },
    ]

    return (
        <Fragment>
            <div className="rui-filemanager material-section">
                <div>
                    <button onClick={() => {
                        setShowModal(true);
                    }} className="btn update-btn">Add Property</button>
                </div>
                <div className="rui-filemanager-content">
                    <div className="table-responsive-lg mb-20">
                        <DataTable
                            className="rui-datatable rui-filemanager-table table mb-20 mt-10"
                            columns={columns}
                            data={data}
                            // key={history.id}
                            pagination={true}
                            highlightOnHover={true}
                            dense={true}
                        />
                    </div>
                </div>
                {showDialog.type === "editItem" && (
                    <Property closeEdit={setshowDialog}
                />
                )}
                {showModel == true && <Property
                    closeModal={setShowModal}
                />}
            </div>
        </Fragment>
    );
};

export default content;

// import React from 'react';
// import Property from './Property';

// const content = () => {
//     return (
//         <div>
//             <Property />
//         </div>
//     );
// };

// export default content;