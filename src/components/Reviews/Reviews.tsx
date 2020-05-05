import React from 'react';
import { IComment } from 'src/types';

interface ReviewsProps {
  comments: IComment[];
}

const Reviews: React.FC<ReviewsProps> = ({ comments }) => (
  <ul className='reviews__list'>
    <h2 className='reviews__title'>
      Reviews &middot;
      <span className='reviews__amount'>{comments.length}</span>
    </h2>
    {comments.map(({ comment, user, rating, id, date }) => {
      const reviewDate = new Date(date);
      const dateLocaleValue = reviewDate.toLocaleDateString(`en`, {
        month: `long`,
        year: `numeric`,
      });
      const dateTextValue = `${reviewDate.getFullYear()}-${reviewDate.getMonth()}-${reviewDate.getDay()}`;

      return (
        <li className='reviews__item' key={id}>
          <div className='reviews__user user'>
            <div className='reviews__avatar-wrapper user__avatar-wrapper'>
              <img
                className='reviews__avatar user__avatar'
                src={user.avatarUrl}
                width='54'
                height='54'
                alt='Reviews avatar'
              />
            </div>
            <span className='reviews__user-name'>{user.name}</span>
          </div>
          <div className='reviews__info'>
            <div className='reviews__rating rating'>
              <div className='reviews__stars rating__stars'>
                <span style={{ width: `${(rating * 100) / 5}%` }} />
                <span className='visually-hidden'>Rating</span>
              </div>
            </div>
            <p className='reviews__text'>{comment}</p>
            <time className='reviews__time' dateTime={dateTextValue}>
              {dateLocaleValue}
            </time>
          </div>
        </li>
      );
    })}
  </ul>
);

export default Reviews;
