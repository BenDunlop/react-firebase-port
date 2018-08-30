import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Firebase from '../../config'

import Header from '../Header/Header'
import Login from '../Login/Login'
import Logout from '../Logout/Logout'



const app = Firebase
const databaseHeroRef = app.database().ref('hero')



class CMS extends Component {

    constructor(){
        super()
        this.state = {
            authenticated: false,
            heros:[],
            brand:'',
            image:'',
            caption:'',
            paragraph:''
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this)

    }

    onSubmitHandler(e){
        e.preventDefault();
        databaseHeroRef.update({
            [e.target.name]: e.target.value
        });
        this.setState({value: ''})
    }


    onChangeHandler(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    setCurrentUser(user) {
        if (user) {
          this.setState({
            authenticated: true
          })
        } else {
          this.setState({
            authenticated: false
          })
        }

    }
    componentDidMount(){
        databaseHeroRef.on('value', (snapshot) => {
            let heros = snapshot.val();
            //console.log(heros)
            this.setState({
            image: heros.image,
            caption: heros.caption,
            brand: heros.brand
            });
        })
    }

    componentWillMount() {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({
              authenticated: true,

            })
          } else {
            this.setState({
              authenticated: false,
            })
          }
        })

    }

    componentWillUnmount() {
        this.removeAuthListener();
    }


    render() {

        let loggedIn;

        if(this.state.authenticated){
            loggedIn =
                <form>
                    <label>Brand</label>
                    <input
                        text="text"
                        name="brand"
                        onChange={this.onChangeHandler}
                        value={this.state.brand}
                        onBlur={this.onSubmitHandler}
                    />
                    <br />
                    <label>Hero Image</label>
                    <input
                        type="text"
                        name="image"
                        onChange={this.onChangeHandler}
                        value={this.state.image}
                        onBlur={this.onSubmitHandler}
                    />
                    <br />
                    <label>Hero Caption</label>
                    <input
                        type="text"
                        name="caption"
                        value={this.state.caption}
                        onChange={this.onChangeHandler}
                        onBlur={this.onSubmitHandler}
                    />
                    <br />
                    <label>Paragraph</label>
                    <input
                        type="text"
                        name="paragraph"
                        value={this.state.paragraph}
                        onChange={this.onChangeHandler}
                        onBlur={this.onSubmitHandler}
                    />
                </form>
        }
        return (
            <BrowserRouter>
                <div>
                    <Header authenticated={this.state.authenticated} />
                    <Route exact path="/login" render={(props) => {
                        return <Login  setCurrentUser={this.setCurrentUser} {...props} />
                    }} />
                    <Route exact path="/logout" component={Logout} />
                    {loggedIn}
                </div>
            </BrowserRouter>
        );
    }
}
export default CMS;