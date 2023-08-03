/* eslint-disable react/display-name*/
import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useParams } from 'react-router-dom';
import Icon from '../../components/icon';
import "./style.scss";
import { contractorJobReviews } from '../../services/Contractor';
import Review from './Review';

const content = () => {
    const [showModel, setShowModal] = useState(false);
    const [showDialog, setshowDialog] = useState({ type: "", id: "" });
    const [review, setReview] = useState([]);
    const {id} = useParams();
    console.log(id);

    // get contractor review list 
    const contractorReviewList = async () => {
        contractorJobReviews(id)
            .then(response => {
                if (response.data.code === 200) {
                    setReview(response.data.data.reviewList)
                } else {
                    console.log("Something went wrong");
                }
            })
    }

    useEffect(() => {
        contractorReviewList();
    }, [])
    console.log(review);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Review",
            selector: (row) => row.review,
            sortable: true,
        },
        {
            name: "Rating",
            selector: (row) => row.rating,
        },
        // {
        //     name: "Action",
        //     selector: (row) => row.action,
        //     cell: (value) => (
        //         <>
        //             <button
        //                 title="View Details"
        //                 type="button"
        //                 className="btn btn-brand btn-sm btn-uniform btn-round btn-fix rui-filemanager-file-button"
        //                 onClick={() => {
        //                     //    setshowDialog({ type: "editItem", id: value.id });
        //                 }}
        //             >
        //                 <Link>
        //                     <Icon className="edit-icon" name="eye" />
        //                 </Link>
        //             </button>
        //             <button
        //                 title="Edit Contractor"
        //                 type="button"
        //                 className="btn btn-brand btn-sm btn-uniform btn-round btn-fix rui-filemanager-file-button"
        //                 onClick={() => {
        //                     //    setshowDialog({ type: "editItem", id: value.id });
        //                 }}
        //             >
        //                 <Link>
        //                     <Icon className="edit-icon" name="edit" />
        //                 </Link>
        //             </button>
        //         </>
        //     ),
        // },
    ];

    return (
        <Fragment>
            <div className="rui-filemanager job-section">
                <div className="rui-filemanager-content">
                    <div className="table-responsive-lg mb-20">
                        <DataTable
                            className="rui-datatable rui-filemanager-table table mb-20 mt-10"
                            columns={columns}
                            data={review}
                            key={review.id}
                            pagination={true}
                            highlightOnHover={true}
                        />
                    </div>
                </div>
                {/* {showDialog.type === "editItem" && (
                    <Review
                        closeEdit={setshowDialog}
                        id={showDialog?.id}
                    />
                )}
                {showModel == true && <Review
                    closeModal={setShowModal}
                />} */}
            </div>
        </Fragment>
    );
};

export default content;
