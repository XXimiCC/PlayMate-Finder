import React, {Component} from 'react';
import css from './UserAuth.module.scss';
import {fbLogin, googleLogin, logout} from "../../../store/actions/auth";
import {connect} from "react-redux";
import Loader from "../Loader/Loader";

class UserAuth extends Component {
  render() {
    const props = this.props;

    return (
      <>
        {props.user
        ?
          <li className="nav-item active dropdown">
            <button className="nav-link d-inline-block dropdown-toggle link-button"
               data-toggle="dropdown">
              {props.user.name}
            </button>
            <img className={css.avatar} src={props.user.picture} alt={''}/>
            <div className="dropdown-menu">
              <button className="dropdown-item link-button" onClick={props.logout}>Выйти</button>
            </div>
          </li>
        :
          <>
            <li className="nav-item">
              <button className="btn btn-outline-danger ml-2" onClick={props.googleLogin}>Google</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-primary ml-2" onClick={props.fbLogin}>Facebook</button>
            </li>
            <Loader show={props.isLoading}/>
          </>
        }
      </>
    );
  }
}

function mapStateToProps(state) {
    return {
      user: state.auth.user,
      isAuth: state.auth.isAuth,
      isLoading: state.auth.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
      fbLogin: () => dispatch(fbLogin()),
      googleLogin: () => dispatch(googleLogin()),
      logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);
