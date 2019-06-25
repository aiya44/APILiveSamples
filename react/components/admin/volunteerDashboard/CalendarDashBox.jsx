import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CalendarDashBox = props => {
  const id = props.props.match.params.id;

  return (
    <div>
      <Link
        to={`/admin/volunteer/${id}/calendar`}
        className={
          "noTextDecoration" +
          (props.subroute === "calendar" ? " disabled-link" : "")
        }
      >
        <div className="card flex-row align-items-center align-items-stretch border-0">
          <div className="col-4 d-flex align-items-center bg-warning-dark justify-content-center rounded-left">
            <i className="mr-2 far fa-calendar-alt fa-3x" />
          </div>
          <div className="col-8 py-3 bg-warning rounded-right">
            <div className="text-uppercase">Calendar</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

CalendarDashBox.propTypes = {
  subroute: PropTypes.string.isRequired,
  props: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    })
  })
};

export default React.memo(CalendarDashBox);
