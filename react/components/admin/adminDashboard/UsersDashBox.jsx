import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UsersDashBox = props => {
  return (
    <Link
      to="/admin/users"
      className={
        "noTextDecoration" +
        (props.subroute === "users" ? " disabled-link" : "")
      }
    >
      <div className="card flex-row align-items-center align-items-stretch border-0">
        <div className="col-4 d-flex align-items-center bg-primary-dark justify-content-center rounded-left">
          <i className="far fa-user fa-3x" />
        </div>

        <div className="col-8 py-3 bg-primary rounded-right">
          <div className="text-uppercase">Users</div>
        </div>
      </div>
    </Link>
  );
};

UsersDashBox.propTypes = {
  subroute: PropTypes.string.isRequired
};

export default React.memo(UsersDashBox);
