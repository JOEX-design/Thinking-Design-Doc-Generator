import * as React from "react";
import { useState, useEffect } from 'react';
import { DocContainer } from "../docs/DocContainer"
import { CodeResult } from "./components/CodeResult";
import { Button } from "./components/Button";

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
            <div className="flex items-center p-2.5">
                <Button variant="secondary" onClick={endPreviewMode} className="mr-3">← 返回</Button>
                <h2 className="text-base text-slate-600 font-medium">预览生成网页</h2>
            </div>
            <div className="flex-1 overflow-y-auto bg-white rounded-md shadow-xl">
                <DocContainer data={jsonData}></DocContainer>
            </div>
        </div>
    )} else { return (
        <div className={'overflow-x-visible bg-slate-200 shadow-md rounded-md border border-slate-100 flex flex-col p-6 pb-0'} style={{width: '340', height: '420'}}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex justify-start flex-col">
                    <h2 className="text-lg text-slate-600 font-medium">组件文档 Design to Code</h2>
                    <div className="text-sm text-slate-500">选择文档图层后，点击“生成”</div>
                </div>
                <Button variant="primary" className="px-3.5 py-2.5" onClick={generate} isDisabled={loadingJson}>⚡️生成</Button>
            </div>
            <CodeResult code={jsonData} isLoading={loadingJson}></CodeResult>
        </div>
    )}
}