import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import ListaRecetas from './components/ListaRecetas.jsx';
import RecetaForm from './components/RecetaForm.jsx'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route path="/:id" component={RecetaForm} />
      <Route exact path="/" component={ListaRecetas}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
