import React from 'react';
import { ICity } from 'src/types';
import { useOvermind } from 'src/overmind';

const CitiesList: React.FC = () => {
  const { state, actions } = useOvermind();

  const { cities, currentCity } = state;
  const { changeCity } = actions;

  return (
    <div className='cities tabs'>
      <section className='locations container'>
        <ul className='locations__list tabs__list'>
          {cities?.map((city: ICity, index: number) => (
            <li className='locations__item' key={`${city.name}_${index}`}>
              <a
                className={`locations__item-link tabs__item ${
                  currentCity.name === city.name ? `tabs__item--active` : ``
                }`}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  changeCity(city);
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CitiesList;
