import React from "react";
import { ICity } from "src/interfaces";

interface CitiesListProps {
  cities: ICity[];
  currentCity: ICity;
  onCityChange: (city: ICity) => void;
}

const CitiesList: React.FC<CitiesListProps> = ({
  cities,
  currentCity,
  onCityChange
}) => (
  <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city: ICity, index: number) => (
          <li className="locations__item" key={`${city.name}_${index}`}>
            <a
              className={`locations__item-link tabs__item ${
                currentCity.name === city.name ? `tabs__item--active` : ``
              }`}
              href="#"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onCityChange(city);
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

export default CitiesList;
