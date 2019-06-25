import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ContributionsDashBox = props => {
  const id = props.props.match.params.id;

  return (
    <div className="col-xl-3 col-md-6">
      <Link
        to={`/admin/organization/${id}/event/contributions`}
        className={
          "noTextDecoration" +
          (props.subroute === "contributions" ? " disabled-link" : "")
        }
      >
        <div className="card flex-row align-items-center align-items-stretch border-0">
          <div className="col-4 d-flex align-items-center bg-success-dark justify-content-center rounded-left">
            <em className="fa fa-calendar fa-3x" />
          </div>
          <div className="col-8 py-3 bg-success rounded-right">
            <div className="text-uppercase">Contributions</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

ContributionsDashBox.propTypes = {
  subroute: PropTypes.string.isRequired,
  props: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    })
  })
};

export default React.memo(ContributionsDashBox);
