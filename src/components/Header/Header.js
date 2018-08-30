import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
      return (
        <nav>

            {this.props.authenticated
                ? (
                    <div>
                        <h3>EDIT / UPDATE</h3>
                        <Link to="/logout">Log Out</Link>
                    </div>
                )
                : null
            }
        </nav>
      );
    }
  }

  export default Header;