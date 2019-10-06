import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "reducer/data/data";
import PropTypes from "prop-types";
import {getSorting} from "reducer/data/selectors";
import {SORTING_OPTIONS, SORTING_TITLE} from "src/constants";

const SortingSelect = ({onSortingChange, sorting}) => (
  <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span className="places__sorting-type" tabIndex="0">
      {SORTING_TITLE[sorting]}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select" />
      </svg>
    </span>
    <ul className="places__options places__options--custom places__options--opened">
      {SORTING_OPTIONS.map((option) => (
        <li
          key={option}
          className={`places__option ${
            option === sorting ? `places__option--active` : ``
          }`}
          tabIndex="0"
          onClick={() => {
            onSortingChange(option);
          }}
        >
          {SORTING_TITLE[option]}
        </li>
      ))}
    </ul>
  </form>
);

SortingSelect.propTypes = {
  sorting: PropTypes.string.isRequired,
  onSortingChange: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    sorting: getSorting(state)
  });

const mapDispatchToProps = (dispatch) => ({
  onSortingChange: (sortingValue) => {
    dispatch(ActionCreator.changeSorting(sortingValue));
  }
});

export {SortingSelect};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SortingSelect);
