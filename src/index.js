import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './store'
import App from './app/App'
//import { worker } from './mocks/browser';

const container = document.getElementById('root')
const root = createRoot(container)

/* worker.start({ onUnhandledRequest: "bypass", serviceWorker: { url: './mockServiceWorker.js' } }).then(
    root.render(<Provider store={store}><App /></Provider>)
) */

root.render(<Provider store={store}><App /></Provider>)
//root.render(<App />)

