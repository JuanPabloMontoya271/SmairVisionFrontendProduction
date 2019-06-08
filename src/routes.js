import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import HttpExample from './Components/Test/tests'
import App from './App';
import DicomViewer from './Components/DicomViewerComponent/index';
import PatientManager from './Components/PatientManager/index';
import Page404 from './Components/Page404/index';
import MyEditor from './Components/Reports/editor'
import HomeMenu from './Components/MenuPrincipal/menu'
import UploadTest from './Components/UploadTest.js'
const AppRoutes = ()=>
  <App>
      <Switch>
          <Route path='/Patients' component = {PatientManager}/>
          <Route path='/Viewer/:param' component = {DicomViewer}/>

          <Route path = '/DefaultView' component = {DicomViewer}/>
          <Route path = '/Reportes' component= {MyEditor}/>
          <Route path ='/Test' component = {UploadTest}/>
          <Route path ='/HomeMenu' component = {HomeMenu}/>

          <Route path = '/' component= {PatientManager}/>

          <Route  component = {Page404}/>


      </Switch>


  </App>;

export default AppRoutes;
