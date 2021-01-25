import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar.jsx';
import ListaAlimentos from './components/ListaAlimentos.jsx';
import ListaRecetas from './components/ListaRecetas.jsx';
import RecetaForm from './components/RecetaForm.jsx'

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
