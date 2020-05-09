import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from 'src/constants/constants';

interface BaseLinkProps {
  to: string;
  className?: string;
}

const BaseLink: React.FC<BaseLinkProps> = ({ children, to, className }) => (
  <Link to={`${BASE_URL}${to}`} className={className}>
    {children}
  </Link>
);

export default BaseLink;
