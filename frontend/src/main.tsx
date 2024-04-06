import "vite/modulepreload-polyfill";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Route, Switch } from "wouter";
import Dashboard from "./pages/Dashboard.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </React.StrictMode>
);
