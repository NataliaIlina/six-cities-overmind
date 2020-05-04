import React, { useState } from 'react';
import { SORTING_OPTIONS, SORTING_TITLE } from 'src/constants';
import { useOvermind } from 'src/overmind';

const SortingSelect: React.FC = () => {
  const [isSelectOpen, openSelect] = useState<boolean>(false);
  const { state, actions } = useOvermind();
  const { sorting } = state;
  const { changeSorting } = actions;

  return (
    <form className='places__sorting' action='#' method='get'>
      <span className='places__sorting-caption'>Sort by</span>
      <span
        className='places__sorting-type'
        tabIndex={0}
        onClick={() => {
          openSelect(!isSelectOpen);
        }}
      >
        {SORTING_TITLE[sorting]}
        <svg className='places__sorting-arrow' width='7' height='4'>
          <use xlinkHref='#icon-arrow-select' />
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
            className={`places__option ${option === sorting ? `places__option--active` : ``}`}
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

export default SortingSelect;
