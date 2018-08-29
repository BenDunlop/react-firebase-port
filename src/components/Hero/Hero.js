import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import firebase from '../../config'


import Login from '../Login/Login'


const app = firebase
const databaseHeroRef = app.database().ref('hero')



class Hero extends Component {

    constructor(){
        super()
        this.state = {
            heros:[],
            authenticated: false
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this)

    }
    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e){
        e.preventDefault();
        databaseHeroRef.update({
            [e.target.name]: e.target.value
        });
        this.setState({value: ''})
    }

    componentWillMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              authenticated: true
            })
          } else {
            this.setState({
              authenticated: false
            })
          }
        })
    }

    componentDidMount(){
        databaseHeroRef.on('value', (snapshot) => {
            let heros = snapshot.val();
            //console.log(heros)
            this.setState({
            image: heros.image,
            caption: heros.caption
            });
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div>

                    {this.props.authenticated
                        ? (
                        <div>
                            <input
                                type="text"
                                name="image"
                                onChange={this.onChangeHandler}
                                value={this.state.image}
                                onBlur={this.onSubmitHandler}
                            />
                            <input
                                type="text"
                                name="caption"
                                value={this.state.caption}
                                onChange={this.onChangeHandler}
                                onBlur={this.onSubmitHandler}
                            />
                        </div>
                        )
                        : (
                            <div />
                        )
                    }
                    <header>
                        <Route exact path="/login" component={Login}/>
                    </header>
                    <img className="hero-image" src={this.state.image} alt={this.state.caption}/>

                    <p>{this.state.caption}</p>
                </div>
            </BrowserRouter>
        );
    }
}

export default Hero;