import React from 'react';
import { Switch, Route} from 'react-router-dom'
import NepalMap from './components/NepalMap';
import NewsUpload from './components/NewsUpload';
import './components/Map.css'

function App() {
  return (
      <Switch>
        <Route exact path= "/" render = {(props)=><NepalMap {...props}/> }/>
        <Route exact path="/admin" render ={(props) => <NewsUpload {...props} />} />

    </Switch>
  );
}

export default App;
