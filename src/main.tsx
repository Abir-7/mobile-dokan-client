import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Routers from "./routes/Router";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routers />
        <Toaster></Toaster>
      </PersistGate>
    </Provider>
  </StrictMode>
);
