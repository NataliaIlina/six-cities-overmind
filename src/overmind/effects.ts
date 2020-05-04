import API from 'src/utils/api'
import {IUser} from "src/interfaces";

export const api = {
  getCurrentUser: (): Promise<{data: IUser}> =>
    API.get('/login')
  ,
  authorizeUser: (email: string, password: string): Promise<{ data: IUser }> => {
    return API
      .post(`/login`, { email, password })
  },
  fetchOffers() {
    return API
      .get(`/hotels`)
  },
  fetchFavorite() {
    return API
      .get(`/favorite`)
  },
  toggleFavoriteStatus(hotelId, status) {
    return API
      .post(`/favorite/${hotelId}/${status}`)
  },
  fetchComments(hotelId) {
    return API
      .get(`/comments/${hotelId}`)
  },
  addComment  (hotelId, rating, comment){
    return API
      .post(`/comments/${hotelId}`, { rating, comment })
  },
}
