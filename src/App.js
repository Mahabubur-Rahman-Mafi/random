import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Primary from './Layout/Primary';
import Home from './Pages/Home';

function App() {
  const router = createBrowserRouter([
    {
    path: '/',
      element: <Primary></Primary>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
