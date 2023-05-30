import * as React from "react";
import { createRoot } from 'react-dom/client'



const PluginUI = () => {
    const generate = () => {
        parent.postMessage({ pluginMessage: { type: 'generate' } }, '*')
    }
    
    onmessage = (event) => {
        console.log(event.data.pluginMessage);
        const jsonContainer = document.getElementById('jsonContainer');
        jsonContainer.textContent = JSON.stringify(event.data.pluginMessage);
    }

    return (
        <div>
            <h2>Design Doc Generator</h2>
            <button id="generate" onClick={generate}>生成</button>
            <div id="jsonContainer"></div>
        </div>
    );
}

const root = createRoot(document.getElementById('pluginUI')!) // createRoot(container!) if you use TypeScript
root.render(<PluginUI />)