import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Board from './boards/Board';

export const urls = {
  index: '/',
};

const routes = (
  <Route path={urls.index} component={Board}/>
);

export default routes;
