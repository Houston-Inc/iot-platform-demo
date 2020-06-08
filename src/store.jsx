import { configureStore } from "@reduxjs/toolkit";
import denimMiddleware, {
    telemetryReducer,
    Auth0SessionProvider,
} from "@denim/iot-platform-middleware-redux";

require("dotenv").config();

const settingsProvider = {
    API_URL: process.env.REACT_APP_API_URL,
};

const cacheProvider = {};

const sessionProvider = new Auth0SessionProvider();
sessionProvider.setTenant(process.env.REACT_APP_AUTH0_TENANT);

const setToken = token => {
  sessionProvider.setToken(token);
};

const store = configureStore({
    reducer: {
        telemetry: telemetryReducer,
    },
    middleware: [
        ...denimMiddleware(settingsProvider, cacheProvider, sessionProvider),
    ],
});

export { store, setToken };