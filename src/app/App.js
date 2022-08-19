import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/ui/navBar';
import Main from './layouts/main';
import Login from './layouts/login';
import CarMonitor from './layouts/carMonitor';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import AppLoader from './components/ui/hoc/appLoader';
import UserView from './layouts/userView';

function App() {
    return (
        <>
            <AppLoader>
                <NavBar/>
                <Switch>
                    <ProtectedRoute
                        path='/users/:userId?/:edit?/'
                        component={UserView}
                    />
                    <ProtectedRoute
                        path='/cars/:carId?/:edit?/:noteId?/'
                        component={CarMonitor}
                    />
                    <Route path="/login/:type?" component={Login}/>
                    <Route path="/logout" component={LogOut}/>
                    <Route path="/" exact component={Main}/>
                    <Redirect to="/"/>
                </Switch>
            </AppLoader>
            <ToastContainer/>
        </>
    );
}

export default App;
