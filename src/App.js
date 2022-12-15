import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Primary from './Layout/Primary';
import Home from './Pages/Home';
import { Toaster } from 'react-hot-toast';
import RightSide from './Pages/Right/RightSide';
import { Spinner } from 'react-bootstrap';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Primary></Primary>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
          children: [
            {
              path: "/users/:id",
              element: <RightSide></RightSide>,
              loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`),
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} fallbackElement={
        <Spinner></Spinner>
      } />
      <Toaster/>
    </>
  );
}

export default App;
