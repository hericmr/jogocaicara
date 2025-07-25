import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminFamousPlaces } from './components/admin/AdminFamousPlaces';
import Map from './components/Map'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/jogocaicara">
      <Routes>
        {/* Outras rotas do seu app */}
        {/* <Route path="/" element={<AppMain />} /> */}
        <Route path="/admin/famous-places" element={<AdminFamousPlaces />} />
        <Route path="/" element={
          <div style={{
            margin: 0,
            padding: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden'
          }}>
            <Map center={[-23.9618, -46.3322]} zoom={13} />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
