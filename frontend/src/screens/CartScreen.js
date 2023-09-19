import React, { useContext, useState } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './rabbit.css';
import { Container } from 'react-bootstrap';

export default function CartScreen() {
  const [selectedGiftBoxType, setSelectedGiftBoxType] = useState('4');
  const [expandedProduct, setExpandedProduct] = useState(null);

  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
    selectedProducts,
    selectedProducts6,
    selectedProducts9,
    selectedCard,
    cardContent,
    _id,
  } = state;

  const productMap = selectedProducts.reduce((map, product) => {
    const { _id, name } = product;
    if (!map[_id]) {
      map[_id] = { ...product, count: 0 };
    }
    map[_id].count += 1;
    return map;
  }, {});

  const productMap6 = selectedProducts6.reduce((map, product) => {
    const { _id, name } = product;
    if (!map[_id]) {
      map[_id] = { ...product, count: 0 };
    }
    map[_id].count += 1;
    return map;
  }, {});

  const productMap9 = selectedProducts9.reduce((map, product) => {
    const { _id, name } = product;
    if (!map[_id]) {
      map[_id] = { ...product, count: 0 };
    }
    map[_id].count += 1;
    return map;
  }, {});

  const toggleProductContent = (itemId, giftBoxType) => {
    if (expandedProduct === itemId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(itemId);
      setSelectedGiftBoxType(giftBoxType);
    }
  };

  const updateCartHandler = async (item, quantity) => {
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

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <Container>
      <Helmet>
        <title>購物車內容</title>
      </Helmet>
      <h1 className="mb-4 fw-bold">購物車內容</h1>
      
      <Row>
        <Col md={8} className="border-0">
          {cartItems.length === 0 ? (
            <div className="allForRabbit">
              <div className="clouds"></div>
              <div className="rabbit"></div>
              <br />
              <div className="carp fs-4 fw-bold">購物車目前空空的，快點去挑選喜歡的產品</div>
            </div>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={3}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                        style={{
                          height: '10rem',
                          width: '10rem',
                          objectFit: 'cover',
                        }}
                        onClick={() => {
                          if (item.isGiftBox) {
                            toggleProductContent(item._id, item.giftBoxType);
                          }
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <Link
                        to={`/product/${item.slug}`}
                        className="text-decoration-none text-black"
                        style={{ fontSize: '1.5rem' }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        className="btn fw-bolder rounded-circle fs-5 p-0 border-0"
                        style={{
                          width: '2rem',
                          height: '2rem',
                          lineHeight: '0.5rem',
                          backgroundColor: '#9a2540',
                        }}
                        disabled={item.quantity === 1}
                      >
                        -
                      </Button>
                      <span className="p-2">{item.quantity}</span>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        className="btn fw-bolder rounded-circle fs-5 p-0 border-0"
                        style={{
                          width: '2rem',
                          height: '2rem',
                          lineHeight: '0.5rem',
                          backgroundColor: '#9a2540',
                        }}
                        disabled={item.quantity === item.countInStock}
                      >
                        +
                      </Button>
                    </Col>
                    <Col md={2}>
                      <div className="fs-5">NT$&nbsp;{item.price}</div>
                    </Col>

                    <Col md={1}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="none"
                      >
                        <i
                          className="fas fa-trash-alt"
                          style={{ fontSize: '1.5rem', color: '#9a2540' }}
                        ></i>
                      </Button>
                    </Col>
                  </Row>
                  {item.isGiftBox && expandedProduct === item._id && (
                    <div>
                      <div className=" ">
                        {/* 渲染选定的商品信息 */}
                        {(() => {
                          const productCounts =
                            selectedGiftBoxType === '4'
                              ? productMap
                              : selectedGiftBoxType === '6'
                              ? productMap6
                              : productMap9;

                          return Object.entries(productCounts).map(
                            ([productId, product]) => {
                              const count = product.count;

                              return (
                                count > 0 && (
                                  <div
                                    key={productId}
                                    className="product-details"
                                  >
                                    <img
                                      src={product.image}
                                      alt={`selected product ${productId}`}
                                      className="selected-product-image"
                                    />
                                    <span className="ms-3 fs-5">{`${product.slug} x ${count}`}</span>
                                  </div>
                                )
                              );
                            }
                          );
                        })()}
                      </div>
                      <h4>卡片內容：</h4>
                      <p>樣式:{selectedCard}</p>
                      <p>內容:{cardContent}</p>
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    商品數量 ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    件) : NT$&nbsp;
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      style={{ backgroundColor: '#9a2540' }}
                      className="text-white border-0 fs-4"
                      onClick={checkoutHandler}
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      前往結帳
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
  );
}
