import React, {Component} from 'react';
import css from './Navbar.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import UserAuth from "../UI/UserAuth/UserAuth";

class Navbar extends Component {

  render() {
    // const props = this.props;

    return (
      <div className={`${css.NavbarWrapper} mb-5`}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="/"><FontAwesomeIcon icon="dice"/> Playmate Finder</a>
          <button className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse position-relative" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Домой <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Список игр</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Pricing</a>
              </li>
              <UserAuth />
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
