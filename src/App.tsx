import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/routes';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
    const routes = useRoutes(routeObjects);

    return (
        <div className='App'>
            {routes}
            <Toaster position='bottom-center' />
        </div>
    );
}

export default App;
