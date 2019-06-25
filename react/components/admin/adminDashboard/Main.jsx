import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "../DashBox.css";

import HomeDisplay from "./HomeDisplay";

import MsgCenterDashBox from "./MsgCenterDashBox";
import Messages from "../../messages/Messages";

import UsersDashBox from "./UsersDashBox";
import UserProfiles from "../../users/profiles/UserProfiles";

import logger from "../../../logger";
const _logger = logger.extend("AdminDash");

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashDisplay: null,
      subroute: ""
    };
  }

  componentDidMount() {
    _logger("AdminDash Mounted");

    let dashDisplay = null;
    const subroute = this.getSubroute();

    switch (subroute) {
      case "users":
        dashDisplay = <UserProfiles />;
        break;
      case "messages":
        dashDisplay = <Messages currentUser={this.props.currentUser} />;
        break;
      default:
        break;
    }
    this.setState(() => {
      return {
        dashDisplay: dashDisplay,
        subroute: subroute
      };
    });
  }

  getSubroute = () => {
    const pathname = this.props.location.pathname;
    const index = pathname.lastIndexOf("/");
    const subroute = pathname.substring(index + 1);
    return subroute;
  };

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-heading">
          <div>System Admin Dashboard</div>

          <div className="ml-auto">
            <div className="dropdown">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                className="btn btn-secondary"
              >
                English
              </button>

              <div
                tabIndex={-1}
                role="menu"
                aria-hidden="true"
                className="dropdown-menu-right-forced animated fadeInUpShort dropdown-menu"
              >
                <button type="button" tabIndex={0} className="dropdown-item">
                  English
                </button>

                <button type="button" tabIndex={0} className="dropdown-item">
                  Spanish
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-xl-3">
            <UsersDashBox subroute={this.state.subroute} />
          </div>

          <div className="col-md-6 col-xl-3">
            <MsgCenterDashBox subroute={this.state.subroute} />
          </div>

          <div className="col-md-12 col-lg-6 col-xl-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div className="col-4 d-flex align-items-center bg-green-dark justify-content-center rounded-left">
                <i className="fas fa-question fa-3x" />
              </div>
              <div className="col-8 py-3 bg-green rounded-right">
                <div className="text-uppercase">Anything</div>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-6 col-xl-3">
            <div className="card flex-row align-items-center align-items-stretch border-0">
              <div className="col-4 d-flex align-items-center bg-green-dark justify-content-center rounded-left">
                <i className="fas fa-question fa-3x" />
              </div>
              <div className="col-8 py-3 bg-green rounded-right">
                <div className="text-uppercase">Anything</div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {this.state.dashDisplay !== null ? (
            this.state.dashDisplay
          ) : (
            <HomeDisplay />
          )}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.shape({
      dashDisplayType: PropTypes.string
    })
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    name: PropTypes.string,
    roles: PropTypes.array
  })
};

export default withRouter(Main);
