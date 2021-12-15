import React, { useState } from 'react';
import {Form, Button, Row, Col, Alert} from 'react-bootstrap';
import {login} from '../../api/user';
import './index.scss';

function Login(props) {
    const [userInfo, setUserInfo] = useState({
        userName: '',
        password: ''
    });
    const [alertState, setAlertState] = useState({
        show: false,
        variant: 'success',
        text: ''
    });
    let toSignUp = function(){
        props.history.push({
            pathname: '/signUp'
        });
    };
    let toListPage = function(){
        let msg = '';
        // eslint-disable-next-line default-case
        switch(true){
            case !userInfo.userName:
                msg = 'User name is required'
                break;
            case !userInfo.password:
                msg = "Password is required"
                break;
        }
        if(msg){
            setAlertState({
                show: true,
                variant: 'danger',
                text: msg
            });
            setTimeout(() => {
                setAlertState({
                    show: false,
                    variant: 'danger',
                    text: ''
                });
            }, 2000);
            return;
        }
        login({...userInfo}).then(res=>{
            if(res.code === 200){
                setAlertState({
                    show: true,
                    variant: 'success',
                    text: res.msg
                });
                sessionStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                props.history.push({
                    pathname: '/list'
                });
            }else{
                setAlertState({
                    show: true,
                    variant: 'danger',
                    text: res.msg
                });
                setTimeout(() => {
                    setAlertState({
                        show: false,
                        variant: 'danger',
                        text: ''
                    });
                }, 2000);
            }
        })
    };

    const changeInput = function(e){
        let targetDom = e.target;
        let getDataSet = targetDom.dataset;
        userInfo[getDataSet.type] = targetDom.value;
        setUserInfo(userInfo)
    }
    return (
        <div className="login-wrap">
            <div className="login-box">
            {
                alertState.show ?
                <Alert className="tip-alert" variant={alertState.variant}>
                    {alertState.text}
                </Alert>
                :''
            }
                <div className="logo">LOGO</div>
                <Form className="login-form">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {/*<Form.Label>Email address</Form.Label>*/}
                        <Form.Control
                            type="text"
                            defaultValue={userInfo.userName}
                            placeholder="User Name"
                            onInput={changeInput}
                            data-type="userName"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        {/*<Form.Label>Password</Form.Label>*/}
                        <Form.Control
                            type="password"
                            defaultValue={userInfo.password}
                            placeholder="Password"
                            data-type="password"
                            onInput={changeInput}
                        />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Row>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="verification"/>
                            </Col>
                            <Col sm={3}>
                                <Button variant="primary" type="button">
                                    GET
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group> */}
                    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out"/>
                    </Form.Group> */}
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="button" onClick={toListPage}>
                            Log In
                        </Button>
                    </div>
                    <div className="form-bottom">
                        <p>
                            There is an account?
                            <b onClick={toSignUp}>Sign In Now!</b>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
