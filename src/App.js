import React, {Component} from 'react';
import './App.scss';
import {Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import {Hub} from "aws-amplify";
import {restoreSession} from "./store/actions/auth";
import {connect} from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);

    Hub.listen('auth', (data) => {
      console.log('AUTH EVENT', data.payload.event);
      switch (data.payload.event) {
        case 'signIn':
          props.restoreSession();
          break;
        case 'signIn_failure':
          console.log('Login Failed', data);
          break;
        default:
          console.log('DEFAULT EVENT');
          break;
      }
    });
  }

  async componentDidMount() {
    await this.props.restoreSession();
  }

  render() {
    return (
      <>
        <Switch>
          <Route path={'/'} exact component={HomePage} />
          <Redirect to={'/'}/>
        </Switch>
      </>
    );
  }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
      restoreSession: () => dispatch(restoreSession())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

