import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import HttpExample from './Components/tests'
import App from './App';

import PatientManager from './Components/PatientManager/index';
import Page404 from './Components/Page404/index';
import MyEditor from './Components/Reports/editor'

import Login from './Components/Login/index.js'
import Profile from './Components/Profile/index.js'
import PdfGenerator from './Components/ReportGenerator/pdf.js'

import GenerateReport from './Components/ReportGenerator/GenerateReport.js'

import PatientTable from './Components/PatientManager/patientTable.js'
const AppRoutes = ()=>
  <App>
      <Switch>
          <Route path='/Patients2/:key/:owner' component = {PatientTable}/>
          <Route path  = '/Profile' component = {Profile}/>
        
          <Route path ='/Test/:keys/:key/:param' component = {HttpExample}/>
          <Route path = '/PdfGenerator/:key/:owner/:patient/:ruta' component = {PdfGenerator}/>
          <Route path = '/PdfTest' component = {GenerateReport}/>
          <Route path = '/' exact component= {Login}/>
          

          <Redirect from ="*" to= "/"/>


      </Switch>


  </App>;

export default AppRoutes;
