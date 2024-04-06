import "vite/modulepreload-polyfill";


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {Toaster} from "sonner";
import { Route, Switch } from "wouter";
import Dashboard from "./pages/Dashboard.tsx";
import Temp from "./pages/temp.tsx";
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/temp" component={Temp} />
    </Switch>
    <Toaster/>
    </QueryClientProvider>
  </React.StrictMode>
);
