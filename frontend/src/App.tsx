import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import TravelRequest from './containers/TravelRequest';
import TravelOptions from './containers/TravelOptions';
import TravelHistory from './containers/TravelHistory';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TravelRequest />} />
        <Route path="/travel-options" element={<TravelOptions />} />
        <Route path="/travel-history" element={<TravelHistory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
