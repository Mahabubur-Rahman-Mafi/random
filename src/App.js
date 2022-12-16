import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Primary from "./Layout/Primary";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import RightSide from "./Pages/Right/RightSide";
import { Spinner } from "react-bootstrap";
import Users from "./Pages/Users";
import Error from "./Pages/Error/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Primary></Primary>,
      errorElement:<Error></Error>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
          children: [
            {
              path: "/users/:id",
              element: <RightSide></RightSide>,
              loader: ({ params }) =>
                fetch(
                  `https://random-server-one.vercel.app/users/${params.id}`
                ),
            },
          ],
        },
        {
          path: "/users",
          element: <Users></Users>
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider
        router={router}
        fallbackElement={
          <div className="text-center py-3">
            <Spinner></Spinner>
          </div>
        }
      />
      <Toaster />
    </>
  );
}

export default App;
