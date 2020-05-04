import React from 'react';
import { Header, SvgSprite } from 'src/components';
import { useOvermind } from 'src/overmind';

interface ILayoutProps {
  type?: string;
}

const Layout: React.FC<ILayoutProps> = ({ children, type }) => {
  return (
    <div
      className={`page
    ${type === `login` ? `page--login page--gray` : ``}
    ${type === `main` ? `page--main page--gray` : ``}`}
    >
      <SvgSprite />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
