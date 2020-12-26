export default (state, action) => {
  switch (action.type) {
      case 'GET_NEWS':
        return {
          ...state,
          news: action.payload
      }
      case 'ADD_NEWS':
        return {
          ...state,
          news: [...state.news, action.payload]
        }
        case 'DELETE_NEWS':
      return {
        ...state,
        news: state.news.filter(news=> news._id !== action.payload)
      }
      case 'UPDATE_NEWS': {
        const index = state.news.findIndex(news => news._id == action.payload.id); //finding index of the item                                                                       action.payload); //finding index of the item
        const newArray = [...state.news]; //making a new array
        newArray[index].newsTitle= action.payload.update.newsTitle;
        newArray[index].newsContent= action.payload.update.newsContent;
        newArray[index].district= action.payload.update.district;
        newArray[index].imageFile= action.payload.update.imageFile
        return { 
         ...state, //copying the orignal state
         news: newArray, //reassingning news to new array
        }
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
