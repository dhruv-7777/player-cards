import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayerDashboard from './PlayerDashboard.jsx';
import PlayerContextProvider from './playerContextProvider.js';
import AddPlayer from "./AddPlayer.jsx";
import './App.css';

function App() {
  return (
    <PlayerContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlayerDashboard />} />
          <Route path="/create" element={<AddPlayer />} />
          <Route path="/:playerId" element={<AddPlayer />} />
        </Routes>
      </BrowserRouter>
    </PlayerContextProvider>
  );
}

export default App;

