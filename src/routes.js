import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import HttpExample from './Components/Test/tests'
import App from './App';
import DicomViewer from './Components/DicomViewerComponent/index';
import PatientManager from './Components/PatientManager/index';
import Page404 from './Components/Page404/index';

const AppRoutes = ()=>
  <App>
      <Switch>
          <Route path='/Patients' component = {PatientManager}/>
          <Route path='/Viewer/:param' component = {DicomViewer}/>
          <Route path ='/Test' component = {HttpExample}/>
          <Route path = '/DefaultView' component = {DicomViewer}/>
          <Route path = '/' component= {PatientManager}/>
          <Route  component = {Page404}/>


      </Switch>


  </App>;

export default AppRoutes;
