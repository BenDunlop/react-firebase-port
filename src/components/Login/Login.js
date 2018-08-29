import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Toaster, Intent } from "@blueprintjs/core";

import firebase  from '../../config'

class Login extends Component {

    constructor(){
        super()
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)

        this.state = {
            redirect: false
        }
    }

    authWithEmailPassword(e){
        e.preventDefault()

        const email = this.emailInput.value
        const password = this.passwordInput.value

        firebase.auth().fetchProvidersForEmail(email)
            .then((providers) => {

                console.log("we're hitting the first then")

                if(providers.length === 0) {

                } else if (providers.indexOf("password") === -1) {
                    this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
                } else {
                    // sign in with email/password
                    return firebase.auth().signInWithEmailAndPassword(email, password)
                }
            })
            .then((user) => {
                if(user && user.email) {
                    this.LoginForm.reset()
                    this.setState({ redirect: true })
                }
            })
            .catch((error) => {
                this.toaster.show({ intent: Intent.DANGER, message: error.message })
            })

    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirect } = this.state

        if (redirect) {
          return (
            <Redirect to={from} />
          )
        }

        return (
            <div>
                <Toaster ref={(e) => { this.toaster = e }} />
                <form onSubmit={(e) => this.authWithEmailPassword(e)}>
                    <label>
                        Email
                        <input name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="Email"></input>
                    </label>
                    <label>
                        Password
                        <input name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="*******"></input>
                    </label>
                    <input type="submit" value="Log In"></input>
                </form>
            </div>
        );
    }
}

export default Login;