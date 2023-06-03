import * as React from "react";
import { useState } from 'react';
import { DocContainer } from "../docs/DocContainer"
import { CodeResult } from "./components/CodeResult";
import ReactJson from 'react-json-view'


export const App = () => {
    const [jsonData, setJsonData] = useState(null);
    const [previewMode, setPreviewMode] = useState(null);

    const generate = () => {
        parent.postMessage({ pluginMessage: { type: 'generate' } }, '*')
    }



    const processData = (msg) => {
        if (msg.data.pluginMessage && msg.data.pluginMessage.type === 'jsonGenerated') {
            // Convert base64 image string to Unit8Array imgages
            const imgStr = msg.data.pluginMessage.data.definition.componentMainImg
            const parsedImg = new Uint8Array(atob(imgStr).split("").map(
                (char)=>char.charCodeAt(0)
              )
            )
            const result = msg.data.pluginMessage.data
            const imgElement = document.getElementById('i') as HTMLImageElement
            const blob = new Blob([parsedImg.buffer], {'type': 'image/png'})
            // imgElement.src = URL.createObjectURL(blob)
            setJsonData(result)
        }
    }

    onmessage = msg => processData(msg)

    return (
        <div className="bg-slate-200 h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex justify-start flex-col">
                    <h2 className="text-lg text-slate-600 font-medium">组件文档 Design to Code</h2>
                    <div className="text-sm text-slate-500">选择文档图层后，点击“生成”</div>
                </div>
                <button className="bg-purple-500 text-white rounded-md py-2.5 px-3 text-base"  onClick={generate}>⚡️生成</button>
            </div>

            {/* <button onClick={showImg}>展示图片</button> */}
            {/* <div>
                <img id="i" width="300"></img>
            </div> */}
            {/* <code>{JSON.parse(jsonData)}</code> */}
            {previewMode ? (
                <DocContainer></DocContainer>
            ):(
                <CodeResult code={jsonData} onPreview={() => setPreviewMode(true)}></CodeResult>
            )}
        </div>
    );
}