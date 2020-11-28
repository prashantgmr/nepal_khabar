import React,{useState,useEffect} from 'react';
import {  Route, Switch, Redirect} from "react-router-dom";
import {useLocation} from 'react-router-dom'
import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import NepalMap from "./components/NepalMap.js";
import {GlobalProvider} from './context/GlobalContext'
import {SnackbarProvider} from 'notistack'


export default function App() {
    const usertoken = localStorage.getItem('usertoken');
    const location = useLocation();
    const [token, setToken] = useState(usertoken);
    useEffect(() => {
        setToken(usertoken)
    },[location.pathname]);

    return (
      <SnackbarProvider maxSnack={2} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <GlobalProvider>
        <Switch>
          <Route exact path="/" render={props => <NepalMap {...props} />} />
          {token !== null ? 
          <>
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Redirect from="/auth" to="/admin/index" /></>
          :          
            <>
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Redirect from="/admin" to="/auth/login" />
          </>
            }
        </Switch>
      </GlobalProvider>
      </SnackbarProvider>
    )
}

