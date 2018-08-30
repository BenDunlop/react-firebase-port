import React, { Component } from 'react';
import Firebase from '../../config'

import './Hero.css'



const app = Firebase
const databaseHeroRef = app.database().ref('hero')


class Hero extends Component {

    constructor(props){
        super(props)
        this.state = {
            data:[],

        }
    }

    componentDidMount(){

        databaseHeroRef.on('value', (snapshot) => {
            let data = snapshot.val();

            let newData = this.state.data.concat([data]);;

            this.setState({data: newData});
        })

    }

    render() {
        return(
            <div>
                {this.state.data.map(d =>
                    <div key={d.id}>
                        <h1>{d.brand}</h1>
                        <img className="hero-image" src={d.image} alt={d.caption}/>
                        <p>{d.caption}</p>
                    </div>
                )}
            </div>
        )
    }
}

export default Hero;