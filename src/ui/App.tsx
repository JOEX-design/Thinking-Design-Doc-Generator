import * as React from "react";
import { useState, useEffect } from 'react';
import { DocContainer } from "../docs/DocContainer"
import { CodeResult } from "./components/CodeResult";


export const App = () => {
    const [jsonData, setJsonData] = useState(null);
    const [loadingJson, setLoadingJson] = useState(false);
    const [previewMode, setPreviewMode] = useState(null);

    const generate = () => {
        setLoadingJson(true)
        parent.postMessage({ pluginMessage: { type: 'clickGenerate' } }, '*')
    }

    const endPreviewMode = () => {
        setPreviewMode(false)
    }


    useEffect(() => {
        onmessage = msg => {
            const pluginMsg = msg.data.pluginMessage ? msg.data.pluginMessage : null

            if (pluginMsg && pluginMsg.type === 'jsonGenerated') {
                console.log("recieved json: ", pluginMsg.data)
                setJsonData(pluginMsg.data)
                setLoadingJson(false);
            }
            if (pluginMsg && pluginMsg.type === 'previewResized') {
                setPreviewMode(true)
            }
        }
    }, [])


    if (previewMode) { return (
        <div className={'bg-slate-200 shadow-md rounded-md border border-slate-100 flex flex-col h-full w-full'} >
            <div className="flex items-center p-2">
                <button className="bg-white text-slate-700 rounded-md py-1.5 px-2 h-fit mr-3 text-sm font-medium border border-slate-200 shadow-sm"  onClick={endPreviewMode}>← 返回</button>
                <h2 className="text-base text-slate-600 font-medium">预览生成网页</h2>
            </div>
            <div className="flex-1 overflow-y-auto bg-white rounded-md shadow-xl">
                <DocContainer data={jsonData}></DocContainer>
                {/* <img id="i" width="300"></img> */}
            </div>
        </div>
    )} else { return (
        <div className={'bg-slate-200 shadow-md rounded-md border border-slate-100 flex flex-col p-6'} style={{width: '340', height: '420'}}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex justify-start flex-col">
                    <h2 className="text-lg text-slate-600 font-medium">组件文档 Design to Code</h2>
                    <div className="text-sm text-slate-500">选择文档图层后，点击“生成”</div>
                </div>
                <button className="bg-purple-500 text-white rounded-md py-2.5 px-3 text-base"  onClick={generate}>⚡️生成</button>
            </div>
            <CodeResult code={jsonData} isLoading={loadingJson}></CodeResult>
        </div>
    )}
}