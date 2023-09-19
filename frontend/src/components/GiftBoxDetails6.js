// 第四步 6格禮盒 確認內容
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyProgress from '../components/MyProgress';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function GiftBoxDetails6() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const [currentStep, setCurrentStep] = useState(3);

  const {
    userInfo,
    selectedProducts6,
    selectedCard,
    cardContent,
    cart: { cartItems },
    giftBox, // 添加禮盒訊息
    giftBoxQuantity, // 添加禮盒數量
  } = state;

  const productMap = selectedProducts6.reduce((map, product) => {
    const { _id, name } = product;
    if (!map[_id]) {
      map[_id] = { ...product, count: 0 };
    }
    map[_id].count += 1;
    return map;
  }, {});
  //將產品 map 轉換為產品列表
  const productList = Object.values(productMap);

  // 在組件加載時從本地存儲中加載之前存放的禮盒資料
  useEffect(() => {
    const storedGiftBox = localStorage.getItem('giftBox');
    const storedGiftBoxQuantity = localStorage.getItem('giftBoxQuantity');

    if (storedGiftBox) {
      // 如果之前存放的禮盒資料存在，則加載到state中
      dispatch({
        type: 'UPDATE_CART_GIFT_BOX',
        payload: JSON.parse(storedGiftBox),
      });
    }

    if (storedGiftBoxQuantity) {
      // 如果之前存放的禮盒數量存在，則加載到state中
      dispatch({
        type: 'UPDATE_GIFT_BOX_QUANTITY',
        payload: parseInt(storedGiftBoxQuantity),
      });
    }
  }, [dispatch]);

  const addToCart = (giftBoxId) => {
    let giftBox = {};
    if (giftBoxId === 20) {
      giftBox = {
        _id: 20,
        name: '4格禮盒',
        image: '/images/four_gift.png',
        price: 480,
        quantity: 1,
        isGiftBox: true, //標記是禮盒產品
      };
    } else if (giftBoxId === 21) {
      giftBox = {
        _id: 21,
        name: '6格禮盒',
        image: '/images/six_gift.png',
        price: 680,
        quantity: 1,
        giftBoxType: '6', // 添加giftBoxType
        isGiftBox: true,
      };
    } else if (giftBoxId === 22) {
      giftBox = {
        _id: 22,
        name: '9格禮盒',
        image: '路徑/到/9格禮盒圖片',
        price: 980,
        quantity: 1,
        isGiftBox: true,
      };
    }

    // 增加禮盒數量
    dispatch({ type: 'ADD_GIFT_BOX' });

    // 更新禮盒資料到本地存儲
    localStorage.setItem('giftBox', JSON.stringify(giftBox));
    localStorage.setItem('giftBoxQuantity', giftBoxQuantity.toString());

    // 添加禮盒到購物車，並傳遞 _id
    dispatch({ type: 'CART_ADD_ITEM', payload: giftBox });

    // 更新購物車中的禮盒信息
    dispatch({
      type: 'UPDATE_CART_GIFT_BOX',
      payload: giftBox,
    });
    console.log(giftBox);

    // 更新 totalItems 和 cartCount，包括禮盒數量
    const updatedTotalItems =
      cartItems.reduce((acc, item) => {
        const itemQuantity = item.quantity || 0;
        return acc + itemQuantity;
      }, 0) + giftBoxQuantity;

    const updatedCartCount = cartItems.length + giftBoxQuantity;

    // 更新 totalItems 和 cartCount 的值
    dispatch({
      type: 'UPDATE_TOTAL_ITEMS',
      payload: updatedTotalItems,
    });

    dispatch({
      type: 'UPDATE_CART_COUNT',
      payload: updatedCartCount,
    });
    alert('成功加入購物車!');
    navigate('/cart');
  };
  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      //取得登入的使用者的 資料庫_id
      const userId = userInfo._id;
      // console.log('userId', userId);
      const cardType = selectedCard;
      // console.log('cardType', cardType);
      // console.log('cardContent', cardContent);
      // const selectedProduct = state.selectedProducts;
      const selectedProduct = JSON.stringify(state.selectedProducts6);
      console.log('selectedProduct', selectedProduct);
      const response = await axios.post('/save-card-info', {
        userId,
        cardType,
        cardContent,
        selectedProduct,
      });

      if (response.status === 200) {
        navigate('/cart');
      } else {
        alert('卡片資訊儲存失敗');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('卡片資訊儲存失敗');
    }
  };
  return (
    <Container>
      <Row>
        <Col md={12}>
          <MyProgress currentStep={currentStep} />
        </Col>
      </Row>

      <h3 className="fs-2 fw-bolder text-center mb-5 mt-3">確認禮盒內容</h3>
      {
        <div className="selected-six-box mx-auto">
          {/* 渲染選定的商品信息 */}
          {selectedProducts6.map((selectedProduct) => (
            <img
              key={selectedProduct._id}
              src={selectedProduct.product_package}
              className="selected-product-image"
              alt={`selected product ${selectedProduct._id}`}
            />
          ))}
        </div>
      }
      <div className="text-center mt-5">
        <div
          className="text-center mt-5 fs-4 fw-bolder"
          style={{ color: '#9A2540' }}
        >
          六格家庭組合&nbsp;&nbsp;NT$680
        </div>
        <div
          className="mx-auto mt-1 mb-3"
          style={{ width: '40%', border: '0.01rem dashed #9A2540' }}
        ></div>
        {/* 渲染選定的商品信息 */}
        {productList.map((selectedProduct) => (
          <div
            key={selectedProduct._id}
            className="product-details d-flex justify-content-center"
          >
            <div
              className="d-flex align-items-center"
              style={{ width: '30%', border: '0.05rem solid #fcdde2' }}
            >
              <img
                src={selectedProduct.product_package}
                className="selected-product-image m-1"
                style={{ width: '5rem', height: '5rem' }}
                alt={`selected product ${selectedProduct._id}`}
              />
              <div className="fs-5 m-3">{selectedProduct.name}</div>
              <div
                className="fs-5 pe-3"
                style={{ marginLeft: 'auto', color: '#9A2540' }}
              >
                x{selectedProduct.count}
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <hr />
      <div>
        {/* 顯示用戶選擇的卡片樣式與內容 */}
        <div
          className="text-center mt-5 fs-4 fw-bolder"
          style={{ color: '#9A2540' }}
        >
          選擇的卡片樣式
        </div>
        <p>{selectedCard}</p>
        <div
          className="text-center mt-5 fs-4 fw-bolder"
          style={{ color: '#9A2540' }}
        >
          卡片內容
        </div>
        <p>{cardContent}</p>
      </div>
      {/* 添加禮盒到購物車的按鈕 */}
      <div className="d-flex justify-content-end">
        <Button
          variant="color"
          style={{ backgroundColor: '#9a2540', color: 'white' }}
          className="btn-color"
          onClick={() => {
            handleSubmit(); // 调用 handleSubmit 函数
            addToCart(21);
          }}
        >
          加到購物車
        </Button>
      </div>
    </Container>
  );
}
