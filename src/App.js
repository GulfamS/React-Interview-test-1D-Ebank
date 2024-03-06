import {Route, Switch} from 'react-router-dom'
import Home from './component/Home'
import Login from './component/Login'
import NotFound from './component/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/ebank/login" component={Login} />
      <NotFound />
    </Switch>
  </div>
)
export default App
