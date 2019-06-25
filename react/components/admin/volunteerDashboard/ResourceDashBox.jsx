import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ResourceDashBox = props => {
  return (
    <Link
      to={`/admin/volunteer/${props.userId}/resources`}
      className={
        "noTextDecoration" +
        (props.subroute === "resources" ? " disabled-link" : "")
      }
    >
      <div className="card flex-row align-items-center align-items-stretch border-0">
        <div className="col-4 d-flex align-items-center bg-primary-dark justify-content-center rounded-left">
          <i className="far fa-folder fa-3x" />
        </div>
        <div className="col-8 py-3 bg-primary rounded-right">
          <div className="text-uppercase">Resources</div>
        </div>
      </div>
    </Link>
  );
};

ResourceDashBox.propTypes = {
  subroute: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

export default React.memo(ResourceDashBox);
