import { FAVORITES, DELETE } from "../constants/Types";

const Data = (state, action) => {
  switch (action.type) {
    case FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case DELETE:
      return {
        ...state,
        favorites: state.favorites.filter((product, i) => action.i !== i)
      };

    default:
      return state;
  }
};

export default Data;
