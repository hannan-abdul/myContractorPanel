/* eslint-disable react/jsx-key */
import "./style.scss";
import React, { useEffect } from "react";
import Icon from "../../components/icon";
import {
  getCartItem,
  deleteItem,
  placeOrder,
  updateCart,
} from "../../services/ShoppingCart";
import { getShops } from "../../services/Shop";
import {
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from "reactstrap";
import Cart from "./Cart";
import ReactStars from "react-rating-stars-component";
import SweetAlert from "sweetalert2-react";

let totalPrice = 0;
let qty = 0;
let price = 0;
let shopId;
let userId;
let cartID;
const Checkout = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [shopName, setShopName] = React.useState([]);
  const [alert, setAlert] = React.useState(false);
  const [showDialog, setshowDialog] = React.useState({ type: "", id: "" });
  const [close, setClose] = React.useState(false);
  const [dropdownValue, setDropdownValue] = React.useState("");
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  //Fetchng the cart item

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    getCartItem().then((response) => {
      console.log({ response });
      if (response) {
        setItems(response.data.data);
        return true;
      } else {
        console.log("Something went wrong");
      }
    });
  };

  //Fetching the shop list
  React.useEffect(() => {
    getShops().then((response) => {
      setShopName(response.data.data);
    });
  }, []);

  //Ratingi icon
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  //deleting the cart item
  const Delete = (id) => {
    deleteItem(id).then((response) => {
      if (response) {
        getCart();
      }
    });
    setshowDialog(!showDialog);
  };

  const handleToggleDelete = () => {
    getCart();
  };

  const CloseModal = () => {
    setClose(!close);
  };

  //Checkout
  const Checkout = (item) => {
    let inintParams = {
      subLicenseeUserId: userId,
      subLicenseeShopId: shopId,
      fmcgOwnerId: userId,
      paymentType: "Credit",
      cartId: [cartID],
    };
    debugger;
    placeOrder(inintParams).then((response) => {
      if (response) {
        setAlert(true);
        console.log("Checkout sucessful");
      } else {
        HTMLFormControlsCollection.log(
          "Somethig went wrong in place order api"
        );
      }
    });
  };

  //Select item from doropdown
  const changeDropdownValue = (e) => {
    setDropdownValue(e.currentTarget.textContent);
  };

  //Update cart item

  const addQuantity = (item) => {
    let initiaParams = {
      cartId: item.id,
      quantity: item.quantity + 1,
      //price:price*price
    };

    updateCart(initiaParams).then((response) => {
      console.log({ response });
      if (response) {
        getCart();
      } else {
        console.log("something went wrong in the cart updatation");
      }
    });
  };

  const decreaseQuantity = (item) => {
    console.log({ quantity: item.quantity });
    if (item.quantity > 0) {
      let initiaParams = {
        cartId: item.id,
        quantity: item.quantity - 1,
      };
      updateCart(initiaParams).then((response) => {
        console.log({ response });
        if (response) {
          getCart();
        } else {
          console.log("something went wrong in the cart updatation");
        }
      });
    }
  };
  return (
    <Row className="xs-gap vertical-gap ">
      <Col sm="2">
        <div></div>
      </Col>
      <Col sm="6">
        {items.length === 0 && <div>Cart is empty</div>}
        {items.map((item) => {
          const itemImage = `https://api.ncig.store/${item.clustercubeProduct.Product.defaultImage}`;
          qty = item.quantity;
          price = item.clustercubeProduct.Product.productPrice;
          totalPrice += price;
          userId = item.subLicenseeUserId;
          cartID = item.id;
          return (
            <div className="uri-checkout-div">
              <Col sm="12">
                <Card>
                  <CardBody>
                    <div className="col">
                      <div className="rui-cart-items ">
                        <img src={itemImage} alt="" height={80} />
                        <div className="rui-product-details">
                          <p> {item.clustercubeProduct.Product.productName}</p>
                          <p> By:{item.clustercubeProduct.Product.brand}</p>
                          <p> Price: RM{price}</p>
                          <ReactStars
                            count={item.clustercubeProduct.Product.rating}
                            onChange={ratingChanged}
                            size={16}
                            activeColor="#ffd700"
                          />
                        </div>
                        <div style={{ marginLeft: "40%" }}>
                          <ButtonGroup className="margin">
                            <Button
                              color="brand"
                              className="rui-button-height"
                              onClick={() => addQuantity(item)}
                            >
                              <Icon name="plus" />
                            </Button>
                            <Button color="brand" className="rui-button-height">
                              {qty}
                            </Button>
                            <Button
                              color="brand"
                              className="rui-button-height "
                              onClick={() => decreaseQuantity(item)}
                            >
                              <Icon name="minus" />
                            </Button>
                          </ButtonGroup>
                          <Button
                            color="secondary"
                            className="rui-checkout-button rui-checkout-remove"
                            onClick={() => {
                              setshowDialog({
                                type: "deleteItem",
                                id: item.id,
                              });
                              setClose(true);
                            }}
                          >
                            {" "}
                            <Icon name="trash" /> Remove{" "}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  {showDialog.type == "deleteItem" && (
                    <Modal
                      isOpen={showDialog}
                      toggle={handleToggleDelete}
                      //className={props.className}
                      fade
                      id={items.id}
                    >
                      <div className="modal-header">
                        <h5 className="modal-title h2">Delete</h5>
                        <Button
                          className="close"
                          color=""
                          onClick={handleToggleDelete}
                        >
                          <Icon name="x" />
                        </Button>
                      </div>
                      <ModalBody>
                        <h1>Are sure to delete this record</h1>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary" onClick={CloseModal}>
                          Close
                        </Button>
                        <Button
                          color="brand"
                          onClick={() => Delete(showDialog.id)}
                        >
                          Delete
                        </Button>
                      </ModalFooter>
                    </Modal>
                  )}
                </Card>
              </Col>
            </div>
          );
        })}
      </Col>

      <div className="uri-checkout-div">
        <Col sm="8">
          <Card>
            <CardBody>
              <div className="col">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <h3>Total</h3>
                  <h3>RM:{totalPrice}</h3>
                </div>

                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  direction="down"
                  className="rui-checkout-button"
                >
                  <DropdownToggle caret>
                    {dropdownValue ? dropdownValue : "Select a shop"}
                  </DropdownToggle>
                  <DropdownMenu container="body">
                    {shopName.map((shop) => {
                      shopId = shop.id;
                      return (
                        <DropdownItem onClick={changeDropdownValue}>
                          {shop.name}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
                <Button
                  color="brand"
                  className="rui-checkout-button"
                  onClick={Checkout}
                  disabled={!dropdownValue}
                >
                  <Icon name="shopping-cart" /> Checkout
                </Button>
                <SweetAlert
                  show={alert}
                  title="Checkout Successful"
                  text="Your order has been placed successfully"
                  onConfirm={() => setAlert(false)}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    </Row>
  );
};

export default Checkout;
