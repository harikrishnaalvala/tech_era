import {Route, Switch, Redirect} from 'react-router-dom'

import Courses from './components/Courses'
import CourseItemDetails from './components/CourseItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Courses} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
