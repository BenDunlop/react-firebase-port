import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Spinner } from '@blueprintjs/core';
import firebase  from '../../config'

class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    firebase.auth().signOut()
        .then((user, error) => {
            console.log("Logout successful");
            this.setState({ redirect: true })
        });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />
    }

    return (
      <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
        <h3>Logging Out</h3>
        <Spinner />
      </div>
    )
  }
}

export default Logout