import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/routes';
import './App.css';

function App() {
    const routes = useRoutes(routeObjects);

    return (
        <div className='App'>
            {routes}
        </div>
    );
}

export default App;
