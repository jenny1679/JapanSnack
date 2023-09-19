import {
    Link,
  } from 'react-router-dom';
  import { ToastContainer } from 'react-toastify';
  import { useEffect, useState } from 'react';
  
  import 'react-toastify/dist/ReactToastify.css';
  import Navbar from 'react-bootstrap/Navbar';
  import Badge from 'react-bootstrap/Badge';
  import Nav from 'react-bootstrap/Nav';
  import NavDropdown from 'react-bootstrap/NavDropdown';
  import Container from 'react-bootstrap/Container';
  import { LinkContainer } from 'react-router-bootstrap';
  import { useContext } from 'react';
import {Store} from '../Store'
import Transition from '../components/Transition';



  function Header() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo, giftBoxQuantity } = state;
    const [cartItemCount, setCartItemCount] = useState(0);
  
    useEffect(() => {
      // 計算購物車數量
      const itemCount = cart.cartItems.reduce(
        (count, item) => count + (item.quantity || 0),
        0
      );
  
      // 設定購物車數量
      setCartItemCount(itemCount);
    }, [cart, giftBoxQuantity]);
    const signoutHandler = () => {
      //ctxDispatch是Store.js裡的dispatch function
      ctxDispatch({ type: 'USER_SIGNOUT' });
      localStorage.removeItem('userInfo');
  
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      window.location.href = '/signin';
    };

    return (
        // <header className="bg-primary text-white text-center fs-1 mb-5 p-3">
        //     {success ? <button className="btn btn-light w-25 fs-5" onClick={signOut}>登出</button> : <Link to="/login" className="btn btn-light w-25 fs-5">登入</Link>}
        // </header>
<Transition>
        <header className="mb-5 headerLink">
        <Navbar  bg="" variant="">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>首頁</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                購物車
                {cartItemCount > 0 && (
                  <Badge pill bg="danger">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
              <Link className="nav-link " to="giftbox">
                客製禮盒
              </Link>

              <Link className="nav-link ms-auto" to="faq">
                常見問題
              </Link>
              <Link className="nav-link ms-auto" to="category">
                最新商品
              </Link>
              {userInfo ? (
     
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>使用者資料</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>歷史訂單</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    登出
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/signin">
                  登入
                </Link>
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>
      </Transition>
    );
}

export default Header;
