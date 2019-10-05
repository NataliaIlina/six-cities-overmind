import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ActionCreator, Operation } from "src/reducer";

const withActiveOffer = (Component) => {
  const WithActiveItem = ({ activeOffer, setActiveOffer, ...props }) => (
    <Component
      {...props}
      activeOffer={activeOffer}
      setActiveOffer={setActiveOffer}
    />
  );

  const mapStateToProps = (state, ownProps) =>
    Object.assign({}, ownProps, {
      activeOffer: state.activeOffer
    });

  const mapDispatchToProps = (dispatch) => ({
    setActiveOffer: (offer) => {
      dispatch(ActionCreator.setActiveOffer(offer));
    }
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithActiveItem);
};

export default withActiveOffer;
