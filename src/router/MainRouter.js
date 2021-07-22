import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../components/common/NavBar';
import Loader from '../components/common/Loader';

const LoginPage = lazy(() => import("../components/auth/LoginPage"));
const RegisterOperarioPage = lazy(() => import("../components/auth/RegisterOperarioPage"));
const AnalisisCuestionario = lazy(() => import("../components/AnalisisCuestionario"));
const RecetaForm = lazy(() => import("../components/RecetaForm"));
const ListaRecetas = lazy(() => import("../components/ListaRecetas"));
const ListaAlimentos = lazy(() => import("../components/ListaAlimentos"));

function MainRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/registerOperario" component={RegisterOperarioPage} />
          <Route path="/cuestionario" component={AnalisisCuestionario} />
          <Route path="/receta/:id" component={RecetaForm} />
          <Route exact path="/receta" component={ListaRecetas} />
          <Route exact path="/alimento" component={ListaAlimentos} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainRouter;
