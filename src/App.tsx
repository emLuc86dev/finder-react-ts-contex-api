import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';
import Alert from './components/layout/Alert';
import AlertContext from './context/alert/AlertContext';
import { useContext } from 'react';
import User from './pages/User';

function App() {
  const {alert} = useContext(AlertContext)
  return (
        <Router>
    <GithubProvider>
      <AlertProvider>
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />

            <main className='container mx-auto px-3 pb-12'>
              { <Alert />}
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='users/:login' element={<User />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
      </AlertProvider>
    </GithubProvider>
        </Router>
  );
}

export default App;
