import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './store'
import App from './app/App'
import AppWrapper from './app/AppWrapper';

async function enableMocking() {
    //return true
    if (process.env.NODE_ENV !== 'development') {
        return
    }

    const { worker } = await import('./mocks/browser')

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start(/* {onUnhandledRequest: () => {throw new Error("bla bla")}} */)
}

const container = document.getElementById('root')
const root = createRoot(container)

enableMocking().then(() => {
    root.render(<Provider store={store}><AppWrapper /></Provider>)
})

