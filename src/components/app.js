import React, { Component } from 'react';
import firebase from 'firebase'

import DB_CONFIG  from '../config'

import './app.css'


class App extends Component {

  constructor(){
    super()
    this.app = firebase.initializeApp(DB_CONFIG)

    this.database = this.app.database().ref()

    this.state = {
      hero_caption: null,
      hero_image: null
    }
  }
  componentDidMount(){
    const heroImage = this.database.child('hero_image')
    const heroCaption = this.database.child('hero_caption')

    heroImage.on('value', snaphot => {
      this.setState({
        hero_image: snaphot.val()
      })
    })

    heroCaption.on('value', snaphot => {
      this.setState({
        hero_caption: snaphot.val()
      })
    })
  }

  render() {
    return (
      <div>
        <header>
          <h1>Welcome to React</h1>
        </header>
        <img className="hero-image" src={this.state.hero_image} alt={this.state.hero_caption}/>
        <p>{this.state.hero_caption}</p>
      </div>
    );
  }
}

export default App;
