import React, { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RouterBuilder from './App.router';
import './styles/index.scss';

const App = () => {
  const routes = useMemo(() => RouterBuilder(), []);

  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default App;
