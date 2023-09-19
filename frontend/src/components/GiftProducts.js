import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './product.css';
import './GiftProducts.css';

import axios from 'axios';
import { Store } from '../Store';

function GiftProducts(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  if (product._id === 20 || product._id === 21 || product._id === 22) {
    return null;
  }

  return (
    <div className="gift-product">
      <img
        src={product.gift_product}
        className="card-img-tops"
        alt={product.name}
      />
      <p className="product-name">{product.slug}</p>
      <Button
        variant="color"
        style={{ backgroundColor: '#9a2540', color: 'white' }}
        className="btn-plus"
        onClick={() => addToCartHandler(product)}
      >
        +
      </Button>
    </div>
  );
}

export default GiftProducts;
