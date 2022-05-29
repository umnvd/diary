import React from 'react';
import { NavLink } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import './App.css';
import { routeObjects, RoutePath } from './routes/routes';

function App() {
    const routes = useRoutes(routeObjects);

    return (
        <div className='App'>
            {routes}
        </div>
    );
}

export default App;
