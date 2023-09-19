// 第一步 選擇禮盒規格
import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import fourBoxImage from '../images/four_boxBodyIn_0.png';
import sixBoxImage from '../images/six_boxBodyIn_0.png';
import nineBoxImage from '../images/nine_boxBodyIn_0.png';
import { Store } from '../Store';
import { Link } from 'react-router-dom';
import MyProgress from '../components/MyProgress';
import 'animate.css';

export default function CustomizedGiftBox() {
  const { state, dispatch } = useContext(Store);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBox, setSelectedBox] = useState('null');
  const [showNextButton, setShowNextButton] = useState(false);
  const handleBoxChange = (option) => {
    setSelectedBox(option);
    setShowNextButton(true);
    // console.log(selectedBox);
    // 點選禮盒後 添加 動畫
  };

  useEffect(() => {
    dispatch({ type: 'SET_SELECTED_BOX_SIZE', payload: selectedBox });
  }, [dispatch, selectedBox]);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <MyProgress currentStep={currentStep} />{' '}
          {/* 將 currentStep 作為屬性傳遞 */}
        </Col>
      </Row>
      <Row>
        <Col className="mt-3" style={{ minHeight: '44px' }}>
          {showNextButton && (
            <div className="d-flex justify-content-end align-items-center ">
              <Link to={`/select-content/${selectedBox}`}>
                <Button
                  variant="color"
                  style={{ backgroundColor: '#9a2540', color: 'white' }}
                  className="btn-color"
                >
                  下一步
                </Button>
              </Link>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="text-center mb-3">
          <p>四格小資組合</p>
          <p>NT$480</p>
          <label>
            <div className="d-flex flex-column align-items-center mt-3">
              <img
                src={fourBoxImage}
                alt="四格小資組合"
                height="200px"
                onClick={() => handleBoxChange('four')}
                className={`box-image ${
                  selectedBox === 'four'
                    ? 'animate__animated animate__pulse animate__infinite infinite'
                    : ''
                }`}
                style={{ cursor: 'pointer' }}
              />
              <Form.Check
                type="radio"
                label="四格小資組合  NT$480"
                price="480"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                className="visually-hidden"
              />
            </div>
          </label>
        </Col>
        <Col className="text-center mb-3">
          <p>六格家庭組合</p>
          <p>NT$680</p>
          <label>
            <div className="d-flex flex-column align-items-center mt-3">
              <img
                src={sixBoxImage}
                alt="六格家庭組合"
                height="200px"
                onClick={() => handleBoxChange('six')}
                className={`box-image ${
                  selectedBox === 'six'
                    ? 'animate__animated animate__pulse animate__infinite infinite'
                    : ''
                }`}
                style={{ cursor: 'pointer' }}
              />
              <Form.Check
                type="radio"
                label="六格家庭組合  NT$680"
                price="680"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                className="visually-hidden"
              />
            </div>
          </label>
        </Col>
        <Col className="text-center mb-3">
          <p>九格派對組合</p>
          <p>NT$980</p>
          <label>
            <div className="d-flex flex-column align-items-center mt-3">
              <img
                src={nineBoxImage}
                alt="九格派對組合"
                height="270px"
                onClick={() => handleBoxChange('nine')}
                className={`box-image ${
                  selectedBox === 'nine'
                    ? 'animate__animated animate__pulse animate__infinite infinite'
                    : ''
                }`}
                style={{ cursor: 'pointer' }}
              />
              <Form.Check
                type="radio"
                label="九格派對組合  NT$980"
                price="980"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
                className="visually-hidden"
              />
            </div>
          </label>
        </Col>
      </Row>
    </Container>
  );
}
