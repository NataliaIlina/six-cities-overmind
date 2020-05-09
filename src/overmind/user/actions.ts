import { Action, AsyncAction } from 'src/overmind';
import { IUser } from 'src/types';
import { transformKeysToCamel } from 'src/utils';

export const setUser: Action<IUser> = ({ state }, user) => {
  state.user.data = user;
};

export const getCurrentUser: AsyncAction = ({ state, effects, actions }) => {
  return effects.user.api.getCurrentUser().then((response) => {
    const data = transformKeysToCamel(response.data);
    actions.user.setUser(data);
  });
};

export const authorizeUser: AsyncAction<{ email: string; password: string }> = (
  { state, effects, actions },
  { email, password }
) => {
  return effects.user.api.authorizeUser(email, password).then((response) => {
    const data = transformKeysToCamel(response.data);
    actions.user.setUser(data);
  });
};
