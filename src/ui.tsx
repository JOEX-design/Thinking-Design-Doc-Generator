import * as React from "react";
import { createRoot } from 'react-dom/client'

const PluginUI = () => {
    const generate = () => {
        parent.postMessage({ pluginMessage: { type: 'generate' } }, '*')
    }
    const copyJSON = () => {
        parent.postMessage({ pluginMessage: { type: 'showImg' } }, '*')
    }

    let jsonString = 'fdsfdsfsd'

    onmessage = msg => {
        if (msg.data.pluginMessage.type === 'showImg') {
            const resultString = JSON.stringify(msg.data.pluginMessage.data)
            const img = document.getElementById('i') as HTMLImageElement
            const imgBuffer = msg.data.pluginMessage.data.definition.componentMainImg.buffer
            const blob = new Blob([imgBuffer], {'type': 'image/png'});
            img.src = URL.createObjectURL(blob);

        }
        if (msg.data.pluginMessage.type === 'jsonGenerated') {
            console.log('JSONGEEEEEEEEEEEE')
            jsonString = JSON.stringify(msg.data.pluginMessage.data);
            jsonString = '哈哈哈'
            console.log(jsonString)

        }



        // onmessage = (event) => {
//   console.log(event.data.pluginMessage);
//   const jsonContainer = document.getElementById('jsonContainer');
//   jsonContainer.textContent = JSON.stringify(event.data.pluginMessage);
// }
    }

    return (
        <div>
            <h2>Design Doc Generator</h2>
            <button onClick={generate}>生成</button>
            <button onClick={copyJSON}>展示图片</button>
            <img id="i" width="200"></img>
            <div>{jsonString}</div>
        </div>
    );
}

const root = createRoot(document.getElementById('pluginUI')!)
root.render(<PluginUI />)