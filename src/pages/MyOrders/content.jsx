/* eslint-disable react/display-name */
/**
 * Styles
 */
import "./style.scss";

/**
 * External Dependencies
 */
import React, { Fragment } from "react";
import moment from "moment";
/**
 * Internal Dependencies
 */
import Icon from "../../components/icon";
import DataTables from "react-data-table-component";
import { myOrders } from "../../services/ShoppingCart";

const content = () => {
  const [items, setItems] = React.useState([]);

  //Fetching the order list
  debugger;
  React.useEffect(() => {
    myOrders().then((response) => {
      if (response) {
        setItems(response.data.data.rows);
      }
    });
  }, []);
  //creating the table coloum
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Products",
      selector: (row) =>
        row.products.map((name) => {
          let productName = name.productName;
          return productName;
        }),
      sortable: true,
    },
    {
      name: "Order Status",
      selector: (row) => row.orderStatus,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => moment(row.createdAt).format("DD MMM YYYY"),
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
            {/* <div className="col-auto">
              <button
                type="button"
                className="btn btn-brand btn-sm btn-uniform btn-round"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <Icon name="plus" />
              </button>
            </div> */}
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
    </Fragment>
  );
};

export default content;
