import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// connect enables certains components to call action creators
import { connect } from 'react-redux';
// import all (*) actions we have. 
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <div><h2>Dashboard</h2><a href="/surveys/new">new</a></div>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component { 
    // execute this when component loaded/mounted
    componentDidMount(){
       this.props.fetchUser(); 
    }
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route exact path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect (null, actions)(App);
