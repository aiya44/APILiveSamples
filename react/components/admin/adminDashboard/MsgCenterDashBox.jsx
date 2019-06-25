import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MsgCenterDashBox = props => {
  return (
    <Link
      to="/admin/messages"
      className={
        "noTextDecoration" +
        (props.subroute === "messages" ? " disabled-link" : "")
      }
    >
      <div className="card flex-row align-items-center align-items-stretch border-0">
        <div className="col-4 d-flex align-items-center bg-purple-dark justify-content-center rounded-left">
          <i className="far fa-envelope fa-3x" />
        </div>

        <div className="col-8 py-3 bg-purple rounded-right">
          <div className="text-uppercase">Message Center</div>
        </div>
      </div>
    </Link>
  );
};

MsgCenterDashBox.propTypes = {
  subroute: PropTypes.string.isRequired
};

export default React.memo(MsgCenterDashBox);
