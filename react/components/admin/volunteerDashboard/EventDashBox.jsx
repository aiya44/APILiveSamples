import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EventDashBox = props => {
  return (
    <Link
      to={`/admin/volunteer/${props.userId}/events`}
      className={
        "noTextDecoration" +
        (props.subroute === "events" ? " disabled-link" : "")
      }
    >
      <div className="card flex-row align-items-center align-items-stretch border-0">
        <div className="col-4 d-flex align-items-center bg-yellow-dark justify-content-center rounded-left">
          <i className="mr-2 far fa-calendar-alt fa-3x" />
        </div>
        <div className="col-8 py-3 bg-yellow rounded-right">
          <div className="text-uppercase">Events</div>
        </div>
      </div>
    </Link>
  );
};

EventDashBox.propTypes = {
  subroute: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

export default React.memo(EventDashBox);
