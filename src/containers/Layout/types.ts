import { IUser } from "src/interfaces";

export interface ComponentProps {
  type: string;
}

export interface StateProps {
  userData: IUser | null;
}

export type LayoutProps = ComponentProps & StateProps;
