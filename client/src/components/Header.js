import React, { Component } from 'react';
import { connect } from 'react-redux';
//react-router-dom - flavor of react for brosers
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent(){
        switch (this.props.auth){
            case null:
                // if null show nothing
                return;
            case false:
                return <li><a href="/auth/google/"> Login with Google</a> </li>;
            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }
    render () {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/' }
                        className="left brand-logo"> 
                        Gritty! 
                    </Link>
                    <ul className="right">
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}
function mapStateToProps({ auth }) {
    return { auth };
}

export default  connect(mapStateToProps)(Header);
