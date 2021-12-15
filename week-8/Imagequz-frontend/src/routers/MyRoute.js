import React, { Component } from 'react'
import {Redirect,Route} from "react-router-dom"
export default class myRouter extends Component {
    render() {
        let userInfo = sessionStorage.getItem('userInfo')
        return (
            <div>
                {
                   userInfo ? <Route {...this.props}></Route>:
                   <Redirect to="/login"></Redirect>
                }
            </div>
        )
    }
}
