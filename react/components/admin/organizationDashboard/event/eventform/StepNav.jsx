import React from "react";
import PropTypes from "prop-types";

const StepNav = props => {
  let dotSpans = props.stepMeta.map((_, index) => {
    if (index === 0) {
      return (
        <span
          key={index}
          className={
            "dot" +
            (props.currentStep === index + 1 ? " activeDot disabled" : "")
          }
          onClick={() => props.goToStep(index + 1)}
        >
          •
        </span>
      );
    } else {
      return (
        <span
          key={index}
          className={
            "dot" +
            (props.currentStep === index + 1
              ? " activeDot disabled"
              : !props.stepMeta[index - 1].valid
              ? " disabled"
              : "")
          }
          onClick={() => props.goToStep(index + 1)}
        >
          •
        </span>
      );
    }
  });

  return (
    <div className="card mb-0 bgTransparent">
      <div className="card-body text-center">
        <h3>
          <i className={props.stepMeta[props.currentStep - 1].icon + " mr-2"} />
          {props.stepMeta[props.currentStep - 1].title}
        </h3>

        {dotSpans}
      </div>
    </div>
  );
};

StepNav.propTypes = {
  isActive: PropTypes.bool.isRequired,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  firstStep: PropTypes.func.isRequired,
  lastStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,

  stepMeta: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.string,
      valid: PropTypes.bool
    })
  ).isRequired
};

export default React.memo(StepNav);
