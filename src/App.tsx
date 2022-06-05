import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/routes';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const routes = useRoutes(routeObjects);

    return (
        <div className='App'>
            {routes}
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </div>
    );
}

export default App;
