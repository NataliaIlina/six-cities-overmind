import React, { useState } from "react";
import { connect } from "react-redux";
import { SORTING_OPTIONS, SORTING_TITLE } from "src/constants";
import { getSorting } from "reducer/data/selectors";
import { changeSorting } from "src/actions";
import { RootStateType } from "src/reducer";
import { ComponentProps, SortingSelectProps } from "./types";

const SortingSelect: React.FC<SortingSelectProps> = ({
  changeSorting,
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
              changeSorting(option);
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

const mapStateToProps = (state: RootStateType, ownProps: ComponentProps) =>
  Object.assign({}, ownProps, {
    sorting: getSorting(state)
  });

const mapDispatchToProps = { changeSorting };

export { SortingSelect };

export default connect(mapStateToProps, mapDispatchToProps)(SortingSelect);
