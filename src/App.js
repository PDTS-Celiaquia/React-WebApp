import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from './components/common/NavBar.jsx';
import ListaRecetas from './components/ListaRecetas.jsx';
import RecetaForm from './components/RecetaForm.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route path="/receta/:id" component={RecetaForm} />
        <Route exact path="/receta" component={ListaRecetas} />
      </div>
    </BrowserRouter>
  );
}

export default App;
