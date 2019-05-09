import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import App from './App';
import DicomViewer from './Components/DicomViewerComponent/index';
import PatientManager from './Components/PatientManager/index';
import Page404 from './Components/Page404/index';
const AppRoutes = ()=>
  <App>
      <Switch>
          <Route path='/Patients' component = {PatientManager}/>
          <Route path='/Viewer' component = {DicomViewer}/>
          <Route  component = {Page404}/>


      </Switch>


  </App>;

export default AppRoutes;
