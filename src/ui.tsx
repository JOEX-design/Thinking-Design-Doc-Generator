import * as React from "react";
import { createRoot } from 'react-dom/client'

const PluginUI = () => {
    const generate = () => {
        parent.postMessage({ pluginMessage: { type: 'generate' } }, '*')
    }
    const copyJSON = () => {
        parent.postMessage({ pluginMessage: { type: 'copyJSON' } }, '*')
    }

    onmessage = async msg => {
        console.log("hasnsg")
        console.log(msg)
        if (msg.data.pluginMessage.type === 'copyJSON') {
            // let result ={}
            // console.log(msg.data.pluginMessage)
            console.log(msg.data.pluginMessage.data)
            const resultString = JSON.stringify(msg.data.pluginMessage.data)
            // document.execCommand(resultString);
            try {
                console.log(resultString)
                document.execCommand(resultString)
                // navigator.clipboard.writeText(resultString)
            // figma.notify("JSON 复制成功")
            } catch (e) {
            console.error('Unable to copy content to clipboard!', e);
            }
        }
    }
 
    return (
        <div>
            <h2>Design Doc Generator</h2>
            <button id="generate" onClick={generate}>生成</button>
            <button id="generate" onClick={copyJSON}>复制 JSON</button>
            <div id="jsonContainer"></div>
        </div>
    );
}

const root = createRoot(document.getElementById('pluginUI')!) // createRoot(container!) if you use TypeScript
root.render(<PluginUI />)