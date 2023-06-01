import * as React from "react";
import { useState } from 'react';
import { createRoot } from 'react-dom/client'
import { DocContainer } from "../docs/DocContainer"

const PluginUI = () => {
    const [jsonData, setJsonData] = useState(null);

    const generate = () => {
        parent.postMessage({ pluginMessage: { type: 'generate' } }, '*')
    }

    const showImg = () => {
        console.log('clicked showImg')
        parent.postMessage({ pluginMessage: { type: 'showImg' } }, '*')
    }

    const processData = (msg) => {
        if (msg.data.pluginMessage.type === 'showImg') {
            const resultString = JSON.stringify(msg.data.pluginMessage.data)
            const img = document.getElementById('i') as HTMLImageElement
            const imgBuffer = msg.data.pluginMessage.data.definition.componentMainImg.buffer
            const blob = new Blob([imgBuffer], {'type': 'image/png'})
            img.src = URL.createObjectURL(blob)
            setJsonData(resultString)
            console.log(img.src)
        }
    }

    onmessage = msg => processData(msg)

    return (
        <div>
            <h2>Design Doc Generator</h2>
            <button onClick={generate}>生成</button>
            <button onClick={showImg}>展示图片</button>
            <div>
                <img id="i" width="200"></img>
            </div>
            <div>{jsonData}</div>
            <DocContainer></DocContainer>
        </div>
    );
}

const root = createRoot(document.getElementById('pluginUI')!)
root.render(<PluginUI />)