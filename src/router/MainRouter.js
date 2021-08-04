import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../components/nav/NavBar';
import Loader from '../components/common/Loader';
import PrivateRoute from '../components/auth/PrivateRoute';
import roles from '../constants/roles';
import ModifyPasswordPage from '../components/auth/ModifyPasswordPage';
import AlimentoForm from '../components/alimentos/AlimentoForm';

const HomePage = lazy(() => import('../components/HomePage'));
const LoginPage = lazy(() => import("../components/auth/LoginPage"));
const RegisterOperarioPage = lazy(() => import("../components/auth/RegisterOperarioPage"));
const AnalisisCuestionario = lazy(() => import("../components/AnalisisCuestionario"));
const RecetaForm = lazy(() => import("../components/recetas/RecetaForm"));
const ListaRecetas = lazy(() => import("../components/recetas/ListaRecetas"));
const ListaAlimentos = lazy(() => import("../components/alimentos/ListaAlimentos"));

function MainRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute roles={[roles.ADMIN]} path="/registerOperario" component={RegisterOperarioPage} />
          <PrivateRoute path="/modifyPassword" component={ModifyPasswordPage} />
          <PrivateRoute path="/cuestionario" component={AnalisisCuestionario} />
          <PrivateRoute path="/receta/:id/edit" edit={true} component={RecetaForm} />
          <PrivateRoute path="/receta/:id" edit={false} component={RecetaForm} />
          <PrivateRoute exact path="/receta" component={ListaRecetas} />
          <PrivateRoute exact path="/alimento" component={ListaAlimentos} />
          <PrivateRoute exact path="/alimento/:id" component={AlimentoForm} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainRouter;
