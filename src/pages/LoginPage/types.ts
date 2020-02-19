export interface ComponentProps {}

export interface StateProps {
  isUserAuth: boolean;
}

export interface DispatchProps {
  authorizeUser: (email: string, password: string) => void;
}

export type LoginPageProps = ComponentProps & StateProps & DispatchProps;
