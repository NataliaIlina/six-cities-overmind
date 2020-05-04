import React, { useEffect, useState } from 'react';
import { useOvermind } from 'src/overmind';
import { Redirect } from 'react-router-dom';

const useAuth = () => {
  const { actions, state } = useOvermind();

  useEffect(() => {
    actions.getCurrentUser();
  });

  const { isUserAuth } = state;

  return isUserAuth;
};

export default useAuth;
