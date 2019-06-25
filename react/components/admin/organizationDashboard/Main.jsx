import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "../DashBox.css";

import Calendar from "./Calendar";
import CalendarDashBox from "./CalendarDashBox";
import "react-big-calendar/lib/css/react-big-calendar.css";

import ContributionsDashBox from "./ContributionsDashBox";

import EventContributions from "./event/eventcontributors/EventContributors";
import EventDashBox from "./EventsDashBox";
import Events from "./event/Events";

import HomeDisplay from "./OrganizationMainBody";

import Message from "./Message";
import Messages from "../../messages/Messages";
import MessageDashBox from "./MessagesDashBox";
import { timeAgo } from "../../../services/dateService";
import StripeExpress from "../../public/donations/StripeExpress";
import * as paymentService from "../../../services/paymentService";
import Invite from "./InviteMembers";

import * as fileService from "../../../services/fileService";
import * as messagesService from "../../../services/messagesService";
import * as organizationService from "../../../services/organizationService";
import * as userProfilesService from "../../../services/userProfilesService";
import OrganizationAdminDetails from "./organizationdetailsform/OrganizationAdminDetails";
import OrganizationFormButton from "./organizationdetailsform/OrganizationFormButton";

import logger from "../../../logger";
const _logger = logger.extend("Main");

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgId: 0,
      orgName: this.props.location.state
        ? this.props.location.state.orgName
        : "",

      dashDisplay: null,
      subroute: ""

      // Other co-workers content
    };
  }

  componentDidMount = () => {
    const orgId = Number(this.props.match.params.id);
    let orgIds = localStorage.getItem("orgIds");

    _logger(orgIds);
    if (orgIds !== null) {
      if (!orgIds.includes(orgId)) {
        this.props.history.replace("/restricted");
      } else {
        _logger(orgId);
        let dashDisplay = null;
        this.getMembersAndPositions();
        const subroute = this.getSubroute();
        this.getMessagesByOrganizationId(this.props.match.params.id);
        _logger("component mounted");
        this.checkStripeConnection(this.props.match.params.id);

        switch (subroute) {
          case "contributions":
            dashDisplay = <EventContributions />;
            break;
          case "events":
            dashDisplay = <Events />;
            break;
          case "messages":
            dashDisplay = <Messages currentUser={this.props.currentUser} />;
            break;
          case "calendar":
            dashDisplay = <Calendar props={this.props} />;
            break;
          case "invite":
            dashDisplay = <Invite props={this.props} />;
            break;
          case "organizationform":
            dashDisplay = <OrganizationAdminDetails orgId={orgId} />;
            break;
          default:
            this.getMessagesByOrganizationId(orgId);
            break;
        }

        let orgName = "";
        if (this.props.location.state) {
          localStorage.setItem("orgName", this.props.location.state.orgName);
        }
        orgName = localStorage.getItem("orgName");
        _logger(orgName);

        this.setState(() => {
          return {
            dashDisplay,
            subroute,
            orgId: orgId,
            orgName: orgName
          };
        });
      }
    } else {
      this.props.history.replace("/restricted");
    }
  };

  // Other co-workers content

  render() {
    // Other co-workers content

    return (
      <div className="content-wrapper">
        <div className="content-heading">
          <div>{this.state.orgName} Dashboard</div>

          <div className="ml-auto">
            <div className="dropdown">{/* Other co-workers content */}</div>
          </div>
        </div>
        <>
          <OrganizationFormButton
          // Other co-workers content
          />
        </>

        <div className="row justify-content-around">
          <ContributionsDashBox
            subroute={this.state.subroute}
            props={this.props}
          />

          <EventDashBox subroute={this.state.subroute} props={this.props} />

          <MessageDashBox
            subroute={this.state.subroute}
            props={this.props}
            orgName={this.state.orgName}
          />

          <CalendarDashBox
            subroute={this.state.subroute}
            props={this.props}
            orgName={this.state.orgName}
          />
        </div>

        <div className="row">
          {this.state.dashDisplay !== null ? (
            this.state.dashDisplay
          ) : (
            <HomeDisplay
            // Other co-workers content
            />
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
      dashDisplayType: PropTypes.string,
      orgName: PropTypes.string.isRequired
    })
  }),
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
  }),
  history: PropTypes.object,
  handleEdit: PropTypes.func
};

export default withRouter(Main);
