import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import RegisterForm from './RegisterForm';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';
import NavBar from './NavBar';

const AppWithRouterAccess = () => {
    const history = useHistory();
    const onAuthRequired = () => {
        history.push('/login');
    };

    return (
        <Security issuer='/oauth2/default'
            clientId=''
            redirectUri={window.location.origin + '/implicit/callback'}
            onAuthRequired={onAuthRequired}
            pkce={true} >
            <NavBar />
            <Route path='/' exact={true} component={Home} />
            <SecureRoute path='/protected' component={Protected} />
            <Route path='/login' render={() => <Login baseUrl='' />} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
    );
};
export default AppWithRouterAccess;