import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CollaborationsDashBox = props => {
  const id = props.props.match.params.id;

  return (
    <div className="col-xl-2 col-md-6">
      <Link
        to={`/admin/organization/${id}/collaborations`}
        className={
          "noTextDecoration" +
          (props.subroute === "collaborations" ? " disabled-link" : "")
        }
      >
        <div className="card flex-row align-items-center align-items-stretch border-0">
          <div className="col-4 d-flex align-items-center bg-primary-dark justify-content-center rounded-left">
            <em className="fas fa-users fa-3x" />
          </div>
          <div className="col-8 py-3 bg-primary rounded-right">
            <div className="h2 mt-0">3 </div>
            <div className="text-uppercase">Collaborations</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

CollaborationsDashBox.propTypes = {
  subroute: PropTypes.string.isRequired,
  props: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    })
  })
};

export default React.memo(CollaborationsDashBox);
