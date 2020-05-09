import { OnInitialize } from './index';

export const onInitialize: OnInitialize = async ({ actions }) => {
  actions.setLoading(true);
  await actions.fetchOffers();
  actions.setLoading(false);
};
