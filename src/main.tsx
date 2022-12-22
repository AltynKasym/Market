import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {store} from "./store";
import {App} from "./app/App";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
    .render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );