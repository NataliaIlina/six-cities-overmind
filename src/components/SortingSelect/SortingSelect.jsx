import React, { useState } from "react";
import PropTypes from "prop-types";
import { SORTING_OPTIONS, SORTING_TITLE } from "src/constants";

const SortingSelect = ({ onSortingChange, sorting }) => {
  const [isSelectOpen, openSelect] = useState(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => {
          openSelect(!isSelectOpen);
        }}
      >
        {SORTING_TITLE[sorting]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSelectOpen ? `places__options--opened` : ``}`}>
        {SORTING_OPTIONS.map(option => (
          <li
            key={option}
            className={`places__option ${option === sorting ? `places__option--active` : ``}`}
            tabIndex="0"
            onClick={() => {
              onSortingChange(option);
              openSelect(!isSelectOpen);
            }}
          >
            {SORTING_TITLE[option]}
          </li>
        ))}
      </ul>
    </form>
  );
};

SortingSelect.propTypes = {
  sorting: PropTypes.string.isRequired,
  onSortingChange: PropTypes.func.isRequired,
};

export default SortingSelect;
