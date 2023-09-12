import * as React from "react";
import { createRoot } from 'react-dom/client'
import { App } from './App'
import PreviewApp from './PreviewApp'
import './ui.css'

const PREVIEW_ENV = process.env.PREVIEW_ENV

console.log("Current enviroment: ", PREVIEW_ENV)

const root = createRoot(document.getElementById('pluginUI')!)

window.addEventListener('message', async (event) => {
    if (!event || !event.data || !event.data.pluginMessage) {
        return;
    }

    let message = event.data.pluginMessage || {};

    if (message.type === 'uiInit') {
        console.log('uiInit', message.data)
        root.render(
            !PREVIEW_ENV ? <App settingData={message.data}/> : <PreviewApp />
        )
    }
});
