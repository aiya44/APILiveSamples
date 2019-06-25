import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "../DashBox.css";

import "react-big-calendar/lib/css/react-big-calendar.css";
import Calendar from "./Calendar";
import CalendarDashBox from "./CalendarDashBox";

import ResourceDashBox from "./ResourceDashBox";
import Resources from "../../resources/Resource";

import Events from "./events/feed/Events";
import EventDashBox from "./EventDashBox";

import logger from "../../../logger";
const _logger = logger.extend("VolunteerDash");

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashDisplay: null,
      subroute: "",
      userId: ""
    };
  }

  componentDidMount() {
    let dashDisplay = null;
    const subroute = this.getSubroute();

    switch (subroute) {
      case "resources":
        dashDisplay = <Resources />;
        break;
      case "events":
        dashDisplay = <Events currentUser={this.props.currentUser} />;
        break;
      default:
        dashDisplay = <Events currentUser={this.props.currentUser} />;
        break;
      case "calendar":
        dashDisplay = <Calendar props={this.props} />;
        break;
    }

    this.setState(() => {
      return {
        dashDisplay: dashDisplay,
        subroute: subroute,
        userId: this.props.match.params.id
      };
    });
  }

  onUpdateProfileClick = () => {
    _logger(this.props);
    this.props.history.push(
      `/admin/volunteer/${this.props.match.params.id}/update`
    );
  };

  getSubroute = () => {
    const pathname = this.props.location.pathname;
    const index = pathname.lastIndexOf("/");
    const subroute = pathname.substring(index + 1);
    return subroute;
  };

  render() {
    _logger(this.state.dashDisplay);

    return (
      <div className="content-wrapper">
        <div className="content-heading">
          <div>Volunteer Dashboard</div>

          <div className="ml-auto">
            <button
              type="button"
              className="btn btn-success"
              onClick={this.onUpdateProfileClick}
            >
              Update Profile {""} <span className="fas fa-user-edit" />
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-xl-3">
            <ResourceDashBox
              userId={this.state.userId}
              subroute={this.state.subroute}
            />
          </div>

          <div className="col-md-12 col-lg-6 col-xl-3">
            <EventDashBox
              userId={this.state.userId}
              subroute={this.state.subroute}
            />
          </div>
          <div className="col-md-12 col-lg-6 col-xl-3">
            <CalendarDashBox
              subroute={this.state.subroute}
              props={this.props}
            />
          </div>
        </div>

        <div className="row">{this.state.dashDisplay}</div>
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
  history: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
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
