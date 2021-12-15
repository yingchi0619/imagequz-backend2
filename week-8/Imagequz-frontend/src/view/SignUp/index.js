import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../../api/user";
import "./style.scss";
let baseInfo = {
    userName: "",
    password: "",
    enterPassword: "",
    sex: 1,
    email: "",
    phone: ""
};
function SignUp(props) {
    let toLogin = function () {
        props.history.push({
            pathname: "/login",
        });
    };
    let toSignUp = function () {
        let msg = '';
        // eslint-disable-next-line default-case
        switch(true){
            case !userInfo.userName:
                msg = 'User name is required'
                break;
            case !userInfo.password:
                msg = "Password is required"
                break;
            case !userInfo.enterPassword:
                msg = "Enter password is required"
                break;
            case userInfo.enterPassword !== userInfo.password:
                msg = "Inconsistent passwords"
                break;
            case !userInfo.email:
                msg = "Email is required"
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

        signup({...userInfo}).then((res) => {
            if(res.code === 200){
                setAlertState({
                    show: true,
                    variant: 'success',
                    text: res.msg
                });
                props.history.push({
                    pathname: "/list",
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
        });
    };

    const [userInfo, setUserInfo] = useState(baseInfo);
    const [alertState, setAlertState] = useState({
        show: false,
        variant: 'success',
        text: ''
    });

    const changeInput = function(e){
        let targetDom = e.target;
        let getDataSet = targetDom.dataset;
        userInfo[getDataSet.type] = targetDom.value;
        setUserInfo(userInfo)
    }

    return (
        <div className="sign-up-wrap">
            <div className="sign-up-box">
            {
                alertState.show ?
                <Alert className="tip-alert" variant={alertState.variant}>
                    {alertState.text}
                </Alert>
                :''
            }
                <Form className="sign-form">
                    <Form.Group className="mb-3" controlId="formBasicUser">
                        {/*<Form.Label>Email address</Form.Label>*/}
                        <Form.Control
                            type="text"
                            defaultValue={userInfo.userName}
                            placeholder="User Name"
                            onInput={changeInput}
                            data-type="userName"
                        />
                        {/* <Form.Text className="text-muted">
                            We'll never share your user name.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Sex：</Form.Label>
                        <Form.Check
                            inline
                            name="sex"
                            type="radio"
                            label="man"
                            id="man"
                            value="1"
                            data-type="sex"
                            checked={userInfo.sex}
                            onChange={changeInput}
                        />
                        <Form.Check
                            inline
                            name="sex"
                            type="radio"
                            label="woman"
                            id="woman"
                            value="2"
                            data-type="sex"
                            onChange={changeInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            defaultValue={userInfo.password}
                            placeholder="Password"
                            data-type="password"
                            onInput={changeInput}
                        />
                        {/* <Form.Text className="text-muted">
                           We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="formBasicEnterPassword"
                    >
                        {/*<Form.Label>Email address</Form.Label>*/}
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            defaultValue={userInfo.enterPassword}
                            data-type="enterPassword"
                            onInput={changeInput}
                        />
                        {/*<Form.Text className="text-muted">*/}
                        {/*    We'll never share your email with anyone else.*/}
                        {/*</Form.Text>*/}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        {/*<Form.Label>Email address</Form.Label>*/}
                        <Form.Control
                            type="text"
                            placeholder="Phone"
                            defaultValue={ userInfo.phone }
                            data-type="phone"
                            onInput={changeInput}
                        />
                        {/*<Form.Text className="text-muted">*/}
                        {/*    We'll never share your email with anyone else.*/}
                        {/*</Form.Text>*/}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {/*<Form.Label>Email address</Form.Label>*/}
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            defaultValue={userInfo.email}
                            data-type="email"
                            onInput={changeInput}
                        />
                        {/*<Form.Text className="text-muted">*/}
                        {/*    We'll never share your email with anyone else.*/}
                        {/*</Form.Text>*/}
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button
                            variant="primary"
                            type="button"
                            onClick={toSignUp}
                        >
                            Sign Up
                        </Button>
                    </div>
                    <div className="form-bottom">
                        <p>
                            Have an account??
                            <b onClick={toLogin}>Log In Now!</b>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
}
export default SignUp;
