import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "src/reducer";
import PropTypes from "prop-types";

const SORTING_OPTIONS = [
  {value: `popular`, title: `Popular`},
  {value: `to-high`, title: `Price: low to high`},
  {value: `to-low`, title: `Price: high to low`},
  {value: `top-rated`, title: `Top rated first`}
];

const Sorting = ({onSortingChange, sorting}) => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex="0">
      Popular
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select" />
      </svg>
    </span>
    <ul className="places__options places__options--custom places__options--opened">
      {SORTING_OPTIONS.map((option) => (
        <li
          key={option.value}
          className={`places__option ${
            option.value === sorting ? `places__option--active` : ``
          }`}
          tabIndex="0"
          onClick={() => {
            onSortingChange(option.value);
          }}
        >
          {option.title}
        </li>
      ))}
    </ul>
  </form>
);

Sorting.propTypes = {
  sorting: PropTypes.string.isRequired,
  onSortingChange: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    sorting: state.sorting
  });

const mapDispatchToProps = (dispatch) => ({
  onSortingChange: (sortingValue) => {
    dispatch(ActionCreator.changeSorting(sortingValue));
  }
});

export {Sorting};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sorting);
