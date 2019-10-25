import React, {lazy, Suspense} from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import Header from './components/header/header.component'
import './App.scss'
import ErrorBoundary from './components/error/error-boundary.component'
const MainPage = lazy(() => import('./pages/main-page.component'))
const ProjectPage = lazy(() => import('./pages/project-page.component'))

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return null
  }
}

const Scroll = withRouter(ScrollToTop)

function App() {
  
  return (
   
    <div className="App">
      
      <Header/>
      <Switch>
        <ErrorBoundary>
        <Suspense fallback={<div>Loading</div>}>
          <Route 
          exact
          path={'/'}
          component={MainPage}
          />
          <Route 
          path={'/project/:projectId'}
          component={ProjectPage}
          />
        </Suspense>
        </ErrorBoundary>
      </Switch>
      <Scroll />
    </div>
    
  )
}

export default App
