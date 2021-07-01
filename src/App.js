import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from './axios';

const App = () => {
  //State
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    try{
      const user = jwtDecode(jwt);
      setUser(user);
      console.log(user);
    } catch {
      console.log('no token');
    }
  }, [] );

  const getToken = async(values) => {
    try {
      async function postData() {
        const response =  await axios.post(`auth/login/`, values);
        localStorage.setItem('token', JSON.stringify(response.data))
        console.log()
      }
      await postData();
    } catch (e) {
      console.log(e)
    }
}
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path ='/' exact component={Home}/>
        <Route path ='/login' render={(props) => (
          <Login {...props} getToken={getToken} />
        )}
        />
        <Route path ='/profile' render={props => {
          if (!user){
            return <Redirect to='/login' />;
          } else {
            return <Profile {...props} user={user} />
          }
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
