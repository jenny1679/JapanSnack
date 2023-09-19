import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Page from './page';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import './nav.css'
import './start.css'; 
import './App.css';  
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';

// import Transition from './components/Transition';



function HomeTest() {
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

    // pages 等於總和頁數
    //offest 
   
    <div className="App my-background"  >

      <Parallax pages={4} style={{ top: '0', left: '0' }} class="animation">

      <ParallaxLayer offset={0} speed={0}>
          <div class="animation_layer parallax" id="block"></div>
        </ParallaxLayer>  
{/* --------------------------------------------------------------- */}
        <ParallaxLayer offset={0} speed={0.25}>
          <div class="animation_layer parallax" id="bg"></div>
          <div className="vertical-text text-wrap fs-2 fw-bold h-100 ">
              <div>每</div>
              <div>一</div>
              <div>口</div>
              <div>，</div>
              <div>都</div>
              <div>是</div>
              <div>和</div>
              <div>菓</div>
              <div>子</div>
              <div>的</div>
              <div>味</div>
              <div>道</div>
            </div>

            <div className="vertical-text2 text-wrap fs-2 fw-bold ">
              <div>伝</div>
              <div>統</div>
              <div>說</div>
              <div>の</div>
              <div>、</div>
              <div>新</div>
              <div>し</div>
              <div>い</div>
              <div>出</div>
              <div>会</div>
              <div>い</div>
            </div>
        </ParallaxLayer>   

        
        <ParallaxLayer offset={0} speed={0.55}>
          <div class="animation_layer parallax" id="cloud"></div>
        </ParallaxLayer>  

       {/* --------------------------------------------------------------- */}
       
        <ParallaxLayer offset={0} speed={0.5}>
          <div class="animation_layer parallax" id="sun"></div>
        </ParallaxLayer>
       {/* --------------------------------------------------------------- */}
  
        <ParallaxLayer offset={0} speed={0.6}>
          <div class="animation_layer parallax" id="logo"></div>
        </ParallaxLayer>  

       {/* --------------------------------------------------------------- */}

        <ParallaxLayer offset={0} speed={0.68}>
          <div class="animation_layer parallax" id="rabbit"></div>
        </ParallaxLayer>  
       {/* --------------------------------------------------------------- */}

        
        <ParallaxLayer offset={0} speed={0.25}>
 
        </ParallaxLayer>   
        {/* <ParallaxLayer offset={0} speed={-0.1}>
          <div class="animation_layer parallax" id="closeshot"></div>
        </ParallaxLayer>   */}

        {/* --------------------------------------------------------------- */}

        <ParallaxLayer offset={0} speed={-0.8}>
          <div class="animation_layer parallax" id="Torii"></div>
          
        </ParallaxLayer>  

        {/* --------------------------------------------------------------- */}

        <ParallaxLayer offset={0} speed={0}>
          <div class="animation_layer parallax" id="Cherryblossoms"></div>
          
        </ParallaxLayer>  
         {/* --------------------------------------------------------------- */}

          <ParallaxLayer offset={0} speed={0.25}>
          <div class="animation_layer parallax" id="Mountain"></div>
         
        </ParallaxLayer>  

         {/* --------------------------------------------------------------- */}
        {/* 森林與門 */}
         <ParallaxLayer offset={0} speed={0.20}>
          <div class="animation_layer parallax" id="bottom"></div>

          <div className="ldoor ldoorleave">
            <img
              className="position-absolute bottom-0 end-0 h-100"
              src={require('./images/leftDoor.png')}
              alt=""
            />
          </div>
          <div className="rdoor ldoorleave">
            <img className="h-100 " src={require('./images/rightDoor.png')} alt="" />
          </div>
          </ParallaxLayer>

       

          <ParallaxLayer offset={1}  >
          <Page/>
          </ParallaxLayer>

          <ParallaxLayer offset={2}  >
          <Page2/>
          </ParallaxLayer>
         

          <ParallaxLayer offset={3}  >
          <Page3/>
          </ParallaxLayer>

          <ParallaxLayer offset={4}  >
          <Page4/>
          </ParallaxLayer>
         
         
        

      
          {/* speed={-1} */}

      <ParallaxLayer  >
      {/* <div className='nav  justify-content-center '>特價活動</div> */}


      {/* <nav class="nav navbar navbar-expand-lg navbar-light  fixed-top ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link fw-bold text-light"  href="#">品牌故事</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-bold text-light" href="#">所有商品</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-bold text-light" href="#">客製化禮物盒</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-bold text-light" href="#">常見問題</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-bold text-light" href="#">登入</a>
        </li>
        <li class="nav-item">
          <a class="nav-link fw-bold text-light" href="#">購物車</a>
        </li>
       
      </ul>
    </div>
  </div>
</nav> */}




   
          <Navbar  className='fixed-top  animate__animated animate__fadeIn animate__delay-3s ' bg="none" variant="">
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
        
      
        </ParallaxLayer> 
        </Parallax>
       

      

    </div>
  


  );

  
}


export default HomeTest;