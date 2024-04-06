import "vite/modulepreload-polyfill";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { Route, Switch, Redirect } from "wouter";
import UploadData from "./pages/UploadData.tsx";
import Temp from "./pages/Preprocessing.tsx";
import Model from "./pages/ModelSelection.tsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={App} />
        <Route path="/dashboard">
          <Redirect href="/dashboard/upload" />
        </Route>
        <Route path="/dashboard/upload" component={UploadData} />
        <Route path="/dashboard/temp" component={Temp} />
        <Route path="/dashboard/model" component={Model} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
