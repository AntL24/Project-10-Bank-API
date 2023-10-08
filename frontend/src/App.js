import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './layout/NavBar';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';
import Footer from './layout/Footer';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
