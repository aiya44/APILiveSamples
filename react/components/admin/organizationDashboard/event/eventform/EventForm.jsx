import React from "react";
import PropTypes from "prop-types";
import swal from "sweetalert";
import * as venueService from "../../../../../services/venueService";
import * as eventService from "../../../../../services/eventService";
import * as eventTypeService from "../../../../../services/eventTypeService";
import * as locationService from "../../../../../services/locationService";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "./EventForm.css";

import StepWizard from "react-step-wizard";
import StepNav from "./StepNav";
// Other co-workers content
import EventMainStep from "./EventMainStep";
// Other co-workers content
import FilesStep from "./FilesStep";
// Other co-workers content

import logger from "../../../../../logger";
const _logger = logger.extend("EventForm");

class EventForm extends React.Component {
  constructor(props) {
    const tempId = 9999;
    super(props);
    this.state = {
      event: {
        organizationId: props.orgId,
        eventStatusId: 1,
        venueId: tempId,

        name: "",
        headline: "",
        summary: "",
        description: "",
        eventTypeId: -1,
        eventTypeName: "",
        dateStart: "",
        dateEnd: "",
        setupTime: ""
      },

      venue: {
        name: "",
        headline: "",
        description: "",
        locationId: 97,
        url: "",
        isApproved: true
      },

      location: {
        locationTypeId: 0,
        location: "",
        placeId: "",
        lineOne: "",
        lineTwo: undefined,
        city: "",
        stateId: 0,
        state: "",
        zip: "",
        country: "",
        latLng: {}
      },

      parking: {
        locationTypeId: 0,
        location: "",
        placeId: "",
        lineOne: "",
        lineTwo: undefined,
        city: "",
        stateId: 0,
        state: "",
        zip: "",
        country: "",
        latLng: {}
      },

      miscDetails: {
        acceptVolunteer: false,
        allowContributions: false,
        acceptDonation: false,
        createBlog: false,
        twitterUrl: "",
        facebookUrl: "",
        instagramUrl: "",
        isChecked: false
      },

      stepMeta: [
        {
          title: "General Event Info",
          icon: "fas fa-calendar-plus",
          valid: false
        },
        { title: "Venue", icon: "fas fa-hotel", valid: false },
        { title: "Location", icon: "fas fa-road", valid: false },
        { title: "Parking", icon: "fas fa-car", valid: false },
        { title: "Files", icon: "fas fa-folder-open", valid: false },
        {
          title: "Misc Event Details",
          icon: "far fa-calendar-alt",
          valid: false
        },
        { title: "Final Review", valid: false }
      ],

      eventTypes: [],
      contributionTypes: [],
      contributionTypeNames: [],
      advertisementDocuments: [],
      images: [],
      locationStates: [],
      locationTypes: [],
      urls: [],
      parkingOnSite: false,
      isSubmitted: false,
      parkingImageUrl: "",
      isSearching: false,
      searchQuery: "",
      collapse: false,
      venueSugestions: [],
      isFinalSubmitReady: false
    };
  }

  componentDidMount() {
    // Other co-workers content
  }

  // Other co-workers content

  updateEvent = values => {
    this.setState(
      prevState => {
        const index = this.stepNavIndex("General Event Info");
        let stepMeta = [...prevState.stepMeta];
        stepMeta[index].valid = true;

        return {
          event: {
            ...prevState.event,
            ...values
          },
          stepMeta
        };
      },
      () => _logger(this.state.event.eventTypeId)
    );
  };

  // Other co-workers content

  updateFiles = values => {
    this.setState(
      prevState => {
        const index = this.stepNavIndex("Files");
        let stepMeta = [...prevState.stepMeta];
        stepMeta[index].valid = true;

        return {
          advertisementDocuments: values.adDocs,
          images: values.images,
          stepMeta
        };
      },
      () => _logger(this.state)
    );
  };

  updateStepTracker = title => {
    this.setState(
      prevState => {
        const index = this.stepNavIndex(title);
        let stepMeta = [...prevState.stepMeta];
        stepMeta[index].valid = true;

        return {
          stepMeta
        };
      },
      () => _logger(this.state)
    );
    this.getEventTypeName();
  };

  stepNavIndex = title => {
    return this.state.stepMeta.findIndex(dot => {
      return dot.title === title;
    });
  };

  createEvent = () => {
    const payload = {
      ...this.state.event,

      venue: this.state.venue,

      advertisementDocuments: this.state.advertisementDocuments,
      images: this.state.images,

      allowContributions: this.state.miscDetails.allowContributions,
      contributionTypes: this.state.contributionTypes,

      urls: this.state.urls
    };
    _logger("payload===>", payload);
    eventService
      .create(payload)
      .then(this.createEventSuccess)
      .catch(this.createEventError);
  };

  createEventSuccess = response => {
    _logger(response);
    swal({
      title: "Creating an Event successful",
      text: `Event Id: ${response.item}`,
      icon: "success",
      button: false,
      timer: 3500
    });
    this.props.toggleModal();
  };

  getEventTypeName = () => {
    const event = this.state.eventTypes.findIndex(
      eventType => eventType.id === this.state.event.eventTypeId
    );
    const eventTypeName = this.state.eventTypes[event].name;
    this.setState(
      () => {
        return { event: { ...this.state.event, eventTypeName } };
      },
      () => _logger(this.state.event.eventTypeName)
    );
  };

  createEventError = error => {
    const errMsg =
      error.response && error.response.data.error
        ? error.response.data.errors[0]
        : "Please try again later.";
    swal({
      title: "Creating an Event unsuccessful",
      text: errMsg,
      icon: "error"
    });
  };

  // Other co-workers content

  render() {
    return (
      <div className="col mx-auto">
        <StepWizard nav={<StepNav stepMeta={this.state.stepMeta} />}>
          <EventMainStep
            updateValues={this.updateEvent}
            eventTypes={this.state.eventTypes}
            isFinalSubmitReady={this.state.isFinalSubmitReady}
          />
          <VenueStep
          // Other co-workers content
          />
          <LocationStep
          // Other co-workers content
          />
          <ParkingStep
            value={this.state.parking.location}
            handleGoogleLocationSelect={this.handleGoogleParkingLocationSelect}
            setGoogleMapLocation={this.setGoogleMapParkingLocation}
            parkingInfo={this.state.parking}
            handleSubmit={this.handleParkingLocationSubmit}
            locationTypes={this.state.locationTypes}
            locationStates={this.state.locationStates}
            isSubmitted={this.state.isSubmitted}
            updateStepTracker={this.updateStepTracker}
            isFinalSubmitReady={this.state.isFinalSubmitReady}
          />
          <FilesStep
            updateValues={this.updateFiles}
            isFinalSubmitReady={this.state.isFinalSubmitReady}
          />
          <MiscDetailsStep
          // Other co-workers content
          />
          <EventConfirmation
          // Other co-workers content
          />
        </StepWizard>
      </div>
    );
  }
}

EventForm.propTypes = {
  orgId: PropTypes.number.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default EventForm;
