import { OnInitialize } from './index';

export const onInitialize: OnInitialize = async ({ actions }, overmind) => {
  actions.setLoading(true);
  await actions.fetchOffers();
  actions.setLoading(false);
};
