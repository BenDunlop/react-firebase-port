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
            data:[],
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
            let data = snapshot.val();

            let newData = this.state.data.concat([data])
            //console.log(heros)
            this.setState({
                data:newData
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

                    {this.state.data.map(d =>
                        <div key={d.id}>
                            <input text="text" name="brand" onChange={this.onChangeHandler} value={d.brand} onBlur={this.onSubmitHandler} />
                        </div>
                    )}


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