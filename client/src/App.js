import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Error from './Components/Screens/Error/Error';
import Home from './Components/Screens/Home/Home';
import Employee from './Components/Screens/Employee/Employee';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/home'>
          <Redirect to='/'/>
        </Route>
        <Route path='/employee' component={Employee} />
        {/* <Route to='/admin' component={}> */}
        <Route component={Error} /> 
      </Switch>
    </div>
  );
}

export default App;
