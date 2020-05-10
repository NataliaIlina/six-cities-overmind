import { IUser } from 'src/types';
import { Derive } from '../index';

type State = {
  data: IUser | null;
  isUserAuth: Derive<State, boolean>;
};

export const state: State = {
  data: null,
  isUserAuth: ({ data }) => {
    return data !== null;
  },
};
