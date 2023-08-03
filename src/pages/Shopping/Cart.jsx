/* eslint-disable react/jsx-key */
import "./style.scss";
import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ButtonGroup,
  ModalFooter,
  Badge,
  ModalBody,
  Card,
  CardBody,
} from "reactstrap";
import Icon from "../../components/icon";
import { useHistory } from "react-router-dom";
import {
  getCartItem,
  deleteItem,
  updateCart,
} from "../../services/ShoppingCart";

let totalPrice = 0;
let qty = 0;
let price = 0;

const Cart = ({ closeModal, id }, props) => {
  const history = useHistory();
  const [items, setItems] = React.useState([]);
  const [showDialog, setshowDialog] = React.useState({ type: "", id: "" });
  const [close, setClose] = React.useState(false);

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

  //deleting the cart item
  const Delete = (id) => {
    deleteItem(id).then((response) => {
      if (response) {
        getCart();
      }
    });
    setshowDialog(!showDialog);
  };

  //Update cart item

  const addQuantity = (item) => {
    let initiaParams = {
      cartId: item.id,
      quantity: item.quantity + 1,
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

  const handleToggleDelete = () => {
    window.location.reload();
  };

  const CloseModal = () => {
    setClose(!close);
  };

  return (
    <Modal
      isOpen={true}
      //toggle={}
      //className={.className}
      fade
      on
      className="my-modal"
    >
      <>
        <div className="rui-card-header">
          <h2 className="rui-margin">My Cart</h2>
          <Badge className="rui-margin" color="light">
            {items.length} items
          </Badge>
        </div>
        <div className="rui-cart-seprator" />
        {items.length === 0 && <div>Cart is empty</div>}
        {items.map((item) => {
          const itemImage = `https://api.ncig.store/${item.clustercubeProduct.Product.defaultImage}`;
          qty = item.quantity;
          price = item.clustercubeProduct.Product.productPrice;
          //setQuantity(item.quantity)
          totalPrice += price;
          // console.log("the vlaue of a is", a);
          return (
            <div>
              <Card>
                <CardBody>
                  <div className="col">
                    <div className="row sm-gap vertical-gap align-items-center">
                      <div className="rui-cart-items " key={item.productId}>
                        <img src={itemImage} alt="" height={80} />
                        <p>
                          <h5 className="margin " style={{ width: 80 }}>
                            {item.clustercubeProduct.Product.productName}
                          </h5>{" "}
                        </p>
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
                            className="rui-button-height"
                            onClick={() => decreaseQuantity(item)}
                          >
                            <Icon name="minus" />
                          </Button>
                        </ButtonGroup>
                        <p className="margin">RM{price}</p>
                        <Button
                          color="light"
                          className="rui-button-height margin "
                          onClick={() => {
                            //Delete(value.id)
                            setshowDialog({ type: "deleteItem", id: item.id });
                            setClose(true);
                          }}
                        >
                          <Icon name="trash" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          );
        })}
        <div className="rui-cart-total">
          <h3>Total</h3>
          <h3>RM:{totalPrice}</h3>
        </div>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              closeModal(false);
            }}
          >
            Close
          </Button>

          <Button color="brand" onClick={() => history.push("/Checkout")}>
            Checkout
          </Button>
        </ModalFooter>
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
              <Button className="close" color="" onClick={handleToggleDelete}>
                <Icon name="x" />
              </Button>
            </div>
            <ModalBody>
              <h1>Are sure to delete this record</h1>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button color="brand" onClick={() => Delete(showDialog.id)}>
                Delete
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </>
    </Modal>
  );
};

export default Cart;
