import * as React from "react";
import { useState } from 'react';
import { createRoot } from 'react-dom/client'
import { DocContainer } from "../docs/DocContainer"

export const App = () => {
    const [jsonData, setJsonData] = useState(null);

    const generate = () => {
        parent.postMessage({ pluginMessage: { type: 'generate' } }, '*')
    }

    const showImg = () => {
        parent.postMessage({ pluginMessage: { type: 'showImg' } }, '*')
    }

    const processData = (msg) => {
        if (msg.data.pluginMessage && msg.data.pluginMessage.type === 'jsonGenerated') {
            // Convert base64 image string to Unit8Array imgages
            const imgStr = msg.data.pluginMessage.data.definition.componentMainImg
            const parsedImg = new Uint8Array(atob(imgStr).split("").map(
                (char)=>char.charCodeAt(0)
              )
            )
            const resultString = JSON.stringify(msg.data.pluginMessage.data)
            const imgElement = document.getElementById('i') as HTMLImageElement
            const blob = new Blob([parsedImg.buffer], {'type': 'image/png'})
            imgElement.src = URL.createObjectURL(blob)
            setJsonData(resultString)
        }
    }

    onmessage = msg => processData(msg)

    return (
        <div>
            <h2>Design Doc Generate</h2>
            <button className="bg-blue-500 text-white rounded-md py-2 px-3"  onClick={generate}>生成</button>
            <button onClick={showImg}>展示图片</button>
            <div>
                <img id="i" width="300"></img>
            </div>
            <code>{jsonData}</code>
            <DocContainer></DocContainer>
        </div>
    );
}