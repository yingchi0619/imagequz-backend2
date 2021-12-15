import React from 'react';
import {HashRouter, Route, Switch, useHistory} from 'react-router-dom';

import MyRouter from './MyRoute';


import Login from '@/view/Login/';
import List from '@/view/List/';
import SignUp from '@/view/SignUp/';
import QuestionList from '@/view/QuestionList/';


const BasicRoute = () => (
    <HashRouter history={useHistory}>
        <Switch>
            <Route path="/login" component={Login}/>
            <MyRouter path="/list" component={List} />
            <MyRouter path="/questionList/:id" exact={false} component={QuestionList}/>
            <Route path="/signUp" component={SignUp}/>
            <Route path="*" component={Login}/>
        </Switch>
    </HashRouter>
);
export default BasicRoute;
