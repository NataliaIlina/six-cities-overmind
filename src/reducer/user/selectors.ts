export const getUserData = state => {
  return state[`USER`].userData;
};

export const getUserAuth = state => {
  return state[`USER`].isUserAuth;
};
