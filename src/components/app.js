import React, { Component } from 'react';
import firebase from 'firebase'

import DB_CONFIG  from '../config'

import './app.css'


class App extends Component {

  constructor(){
    super()
    this.app = firebase.initializeApp(DB_CONFIG)

    this.database = this.app.database().ref('hero')

    this.state = {
      hero_caption: '',
      hero_image: null
    }

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount(){
    const heroImage = this.database.child('image')
    const heroCaption = this.database.child('caption')

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
  onChangeHandler(e){
    this.setState({hero_caption: e.target.value})
  }

  render() {
    return (
      <div>
        <header>
          <h1>Welcome to React</h1>
        </header>
        <img className="hero-image" src={this.state.hero_image} alt={this.state.hero_caption}/>
        <form>
          <input type="text" value={this.state.hero_caption} onChange={this.onChangeHandler} />
          <p>{this.state.hero_caption}</p>
        </form>
      </div>
    );
  }
}

export default App;
