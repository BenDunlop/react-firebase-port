import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Firebase from '../../config'

import Header from '../Header/Header'
import Login from '../Login/Login'
import Logout from '../Logout/Logout'



const app = Firebase
const databaseHeroRef = app.database().ref('index')



class Admin extends Component {

    constructor(){
        super()
        this.state = {
            authenticated: false,
            data:[],
            id: null,
            brand:'',
            image:'',
            caption:'',
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this)

    }

    onSubmitHandler(brand, image, caption){

        let myRef = databaseHeroRef.push()

        myRef.set({
            brand: this.state.brand,
            image: this.state.image,
            caption: this.state.caption,
        })

        this.setState({
            value: myRef
        })
    }

    onChangeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log([e.target.value])
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
    componentWillMount() {

        databaseHeroRef.on('value', (snapshot) => {
            let data = snapshot.val();

            let newData = this.state.data.concat([data])
            //console.log(heros)
            this.setState({
                data:newData
            });

        })
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
        if(this.state.authenticated) {
            loggedIn =

            <form onSubmit={this.onSubmitHandler}>
                <label>Brand</label>
                <input
                    text="text"
                    name="brand"
                    onChange={this.onChangeHandler}
                    value={this.state.brand}
                />
                <br />
                <label>Hero Image</label>
                <input
                    type="text"
                    name="image"
                    onChange={this.onChangeHandler}
                    value={this.state.image}
                />
                <br />
                <label>Hero Caption</label>
                <input
                    type="text"
                    name="caption"
                    value={this.state.caption}
                    onChange={this.onChangeHandler}
                />
                <br />

                <button type="submit">Submit</button>
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
export default Admin;