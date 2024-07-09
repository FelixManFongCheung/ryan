import React, { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RouterBuilder from './App.router';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/index.scss';


const App = () => {
  const routes = useMemo(() => RouterBuilder(), []);

  return (
    <Provider store={store}>
      <RouterProvider router={createBrowserRouter(routes)} /> 
    </Provider>
  )
};

export default App;
