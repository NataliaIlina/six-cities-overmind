import React, { useState } from "react";
import { connect } from "react-redux";
import { SORTING_OPTIONS, SORTING_TITLE } from "src/constants";
import { getSorting } from "reducer/data/selectors";
import { changeSorting } from "src/actions";

interface SortingSelectProps {
  onSortingChange: (option: string) => void;
  sorting: string;
}

const SortingSelect: React.FC<SortingSelectProps> = ({
  onSortingChange,
  sorting
}) => {
  const [isSelectOpen, openSelect] = useState<boolean>(false);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => {
          openSelect(!isSelectOpen);
        }}
      >
        {SORTING_TITLE[sorting]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isSelectOpen ? `places__options--opened` : ``
        }`}
      >
        {SORTING_OPTIONS.map((option: string) => (
          <li
            key={option}
            className={`places__option ${
              option === sorting ? `places__option--active` : ``
            }`}
            tabIndex={0}
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

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    sorting: getSorting(state)
  });

const mapDispatchToProps = dispatch => ({
  onSortingChange: sortingValue => {
    dispatch(changeSorting(sortingValue));
  }
});

export { SortingSelect };

export default connect(mapStateToProps, mapDispatchToProps)(SortingSelect);
