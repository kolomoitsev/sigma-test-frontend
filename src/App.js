import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignInPage from "./SignInPage.component";
import HomePage from "./Homepage.component";

import './refreshToken';

const App = () => {

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={SignInPage}/>
                    <Route path='/home' component={HomePage}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;
