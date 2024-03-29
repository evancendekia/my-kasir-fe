import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { NavbarComponent } from './components'
import { Dashboard, Home, Sukses, Table, Resto, Report, Chart, Setting } from './pages'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <NavbarComponent />
          <main className='px-3 py-2'>
            <Switch>
              <Route  path="/" component={Dashboard} exact/>
              {/* <Route  path="/" component={Home} exact/> */}
              <Route  path="/sukses" component={Sukses} exact/>
              <Route  path="/table" component={Table} exact/>
              <Route  path="/resto" component={Resto} exact/>
              <Route  path="/report" component={Report} exact/>
              <Route  path="/chart" component={Chart} exact/>
              <Route  path="/setting" component={Setting} exact/>
            </Switch>
          </main>
      </BrowserRouter>
    )
  }
}
