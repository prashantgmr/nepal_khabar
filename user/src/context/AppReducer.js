export default (state, action) => {
  switch (action.type) {

      case 'ADD_NEWS':
        return {
          ...state,
          news: [...state.news, action.payload]
        }
    case 'NEWS_ERROR':
      return {
        ...state,
        error: action.payload
      }
      case 'ADD_USER':
        return {
          ...state,
          user: [...state.user, action.payload]
        }
    case 'USER_ERROR':
      return {
        ...state,
        error: action.payload,
      }
      
      default:
        return state;
    }
};
