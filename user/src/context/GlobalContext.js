import React, {
  createContext,
  useReducer,
  useState,
  useEffect,
  useContext,
} from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import {  useSnackbar } from 'notistack';
// Initial state
const initialState = {
  news: [],
  user: [],
  currentUser: [],
  error:null
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [user , setUser] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  
  async function getCurrentUser(id){
  const res = await axios.get(`http://localhost:5000/api/v1/user/${id}`);
    const data = await res.data.data;
    if(data){
          setUser(data);
        }
    }
    async function getAllNews() {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/news`)
  
        dispatch({
          type: 'GET_NEWS',
          payload: res.data.data
        });
      } catch (err) {
        dispatch({
          type: 'NEWS_ERROR',
          payload: err.response.data.error
        });
      }
  
    }

  async function addedNews(newNews) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/v1/news',newNews , config);
            // res = await response.data.data;
            console.log(res);
            dispatch({
                type: 'ADD_NEWS',
                payload: res.data.data
              });
              enqueueSnackbar('News added successfully', {variant : 'success'})
        } 
        catch (err) {
            dispatch({
                type: 'NEWS_ERROR',
                payload: err.response.data.error
              });
              // enqueueSnackbar(err.response.data.error, {variant : 'error'})
        }
    }
    
    async function updateNews(updatedData, id) {
      const config = {
          headers: {
          'Content-Type': 'application/json'
          }
      }

      try {
          const res = await axios.put(`http://localhost:5000/api/v1/news/update/${id}`,updatedData , config);
          // res = await response.data.data;
          console.log(res);
          dispatch({
              type: 'UPDATE_NEWS',
              payload: {update : res.data.data, id:id }
            });
            enqueueSnackbar('News Updated successfully', {variant : 'success'})
      } 
      catch (err) {
          dispatch({
              type: 'NEWS_ERROR',
              payload: err.response.data.error
            });
            // enqueueSnackbar(err.response.data.error, {variant : 'error'})
      }
  }
   async function addedUser(user) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/v1/user', user , config);
            // res = await response.data.data;
            console.log(res);
            dispatch({
                type: 'ADD_USER',
                payload: res.data.data
              });
              enqueueSnackbar('New user created', {variant : 'success'})
        } 
        catch (err) {
            dispatch({
                type: 'USER_ERROR',
                payload: err.response.data.error
              });
              enqueueSnackbar(err.response.data.error, {variant : 'error'})
        }
    }

    async function deleteNews(id) {
      try {
        await axios.delete(`/api/v1/news/${id}`);
  
        dispatch({
          type: 'DELETE_NEWS',
          payload: id
        });
      } catch (err) {
        dispatch({
          type: 'NEWS_ERROR',
          payload: err.response.data.error
        });
      }
    }

  return (
    <GlobalContext.Provider
      value={{
        news:state.news,
        user:state.user,
        error:state.error,
        dispatch,
        user,
        getAllNews,
        addedNews,
        updateNews,
        addedUser,
        deleteNews,
        getCurrentUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
