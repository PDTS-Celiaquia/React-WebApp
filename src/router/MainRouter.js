import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from '../components/common/NavBar.js';
import ListaAlimentos from '../components/ListaAlimentos.js';
import ListaRecetas from '../components/ListaRecetas.js';
import RecetaForm from '../components/RecetaForm.js'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route path="/receta/:id" component={RecetaForm} />
        <Route exact path="/receta" component={ListaRecetas} />
        <Route exact path="/alimento" component={ListaAlimentos} />
      </div>
    </BrowserRouter>
  );
}

export default App;
