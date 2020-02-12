import React from "react";
import { Header, SvgSprite } from "components";
import { connect } from "react-redux";
import { getUserData } from "reducer/user/selectors";
import { IUser } from "src/interfaces";

interface LayoutProps {
  type: string;
  userData: IUser | null;
}

const Layout: React.FC<LayoutProps> = ({ children, type, userData }) => (
  <div
    className={`page
    ${type === `login` ? `page--login page--gray` : ``}
    ${type === `main` ? `page--main page--gray` : ``}`}
  >
    <SvgSprite />
    <Header userData={userData} />
    {children}
  </div>
);

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    userData: getUserData(state)
  });

export default connect(mapStateToProps)(Layout);
