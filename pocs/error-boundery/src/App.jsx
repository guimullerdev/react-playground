import './App.css'

import BombInEffect from './components/BombInEffect'
import ErrorBoundary from './components/ErrorBoundary'
import UserProfile from './components/UserProfile'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <>
      <section id="center">
        <ErrorBoundary fallback={<p>algo quebrou no bomb in effect</p>} >
          <BombInEffect />
        </ErrorBoundary>

        <ErrorBoundary fallback={<p>algo quebrou no user profile</p>} >
          <UserProfile userId={1} />
        </ErrorBoundary>

        <ErrorBoundary fallback={<p>algo quebrou no dashboard</p>} >
          {/* <Dashboard config={{ title: "Dashboard", settings: { theme: "dark" } }} /> */}
          {/* <Dashboard config={{ settings: { theme: "Title" } }} /> */}
          <Dashboard config={{}} />
        </ErrorBoundary>
      </section>  
    </>
  )
}

export default App
