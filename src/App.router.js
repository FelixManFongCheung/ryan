import { Navigate, RouteObject } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Works from './components/Works';
import AppLayout from './App.layout';

const RouterBuilder = () => {
  const generalRoutes = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/About',
      element: <About />,
    },
    {
      path: '/Contact',
      element: <Contact />,
    },
    {
      path: '/Works',
      element: <Works />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ];

  const routes = [
    {
      element: <AppLayout />,
      children: generalRoutes,
    },
  ];

  return routes;
};

export default RouterBuilder;