import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from '../components/common/NavBar.js';
import AnalisisCuestionario from '../components/AnalisisCuestionario.js';
import ListaAlimentos from '../components/ListaAlimentos.js';
import ListaRecetas from '../components/ListaRecetas.js';
import RecetaForm from '../components/RecetaForm.js'

function MainRouter() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route path="/cuestionario" component={AnalisisCuestionario} />
        <Route path="/receta/:id" component={RecetaForm} />
        <Route exact path="/receta" component={ListaRecetas} />
        <Route exact path="/alimento" component={ListaAlimentos} />
      </div>
    </BrowserRouter>
  );
}

export default MainRouter;
