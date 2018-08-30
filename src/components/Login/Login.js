import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { Toaster, Intent } from "@blueprintjs/core"

import firebase  from '../../config'

const app = firebase

const loginStyles = {
    width: "90%",
    maxWidth: "315px",
    margin: "20px auto",
    border: "1px solid #ddd",
    padding: "10px"
  };


class Login extends Component {

    constructor(){
        super()
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)

        this.state = {
            redirect: false
        }
    }

    authWithEmailPassword(e) {
        e.preventDefault()

        const email = this.emailInput.value
        const password = this.passwordInput.value

        app.auth().fetchProvidersForEmail(email)
            .then((providers) => {
                if (providers.indexOf("password") === -1) {
                    this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
                } else {
                // sign in with email/password
                return app.auth().signInWithEmailAndPassword(email, password)
                }
            })
            .then((user) => {
                this.setState({ redirect: true })
            })
            .catch((error) => {
                this.toaster.show({ intent: Intent.DANGER, message: error.message })
            })
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/admin' } }

        if (this.state.redirect === true) {
            console.log('LOGIN SUCCESSFUL')
          return <Redirect to={from} />
        }

        return (
            <div style={loginStyles}>
                <Toaster ref={(e) => { this.toaster = e }} />
                <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                    <label>
                        Email
                        <input style={{width: "100%"}}  name="email" type="email" ref={(input) => {this.emailInput = input}} placeholder="Email" autoComplete="email" required />
                    </label>
                    <label>
                        Password
                        <input style={{width: "100%"}}  name="password" type="password" ref={(input) => {this.passwordInput = input}} placeholder="Password" autoComplete="password" required />
                    </label>
                    <input style={{width: "100%"}} type="submit"value="Log In"></input>
                </form>
            </div>
        );
    }
}

export default Login;