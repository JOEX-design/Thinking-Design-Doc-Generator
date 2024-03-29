import * as React from "react";
import { useState, useEffect } from 'react';
import { DocContainer } from "../docs/DocContainer"
import { CodeResult } from "./components/CodeResult";
import { Button } from "./components/Button";
import { ToggleButton } from "./components/ToggleButton";
import { SettingContext } from "./context/SettingContext";
import "../ui/ui.css"

export const App = (settingData) => {
    const [jsonData, setJsonData] = useState(null);
    const [loadingJson, setLoadingJson] = useState(false);
    const [previewMode, setPreviewMode] = useState(null);

    const [setting, setSetting] = useState({
        git_token: '',
        git_repo: 'Tikit-Design-Doc-Data',
        git_owner: 'JOEX-Design'
    });
    const value = { setting, setSetting };

    const generate = () => {
        setLoadingJson(true)
        parent.postMessage({ pluginMessage: { type: 'clickGenerate' } }, '*')
    }

    const endPreviewMode = () => {
        setPreviewMode(false)
        parent.postMessage({ pluginMessage: { type: 'previewEnd' } }, '*')
    }


    useEffect(() => {
        setSetting(settingData.settingData)
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
        // <div className={'bg-slate-200 shadow-md rounded-md flex flex-col h-full w-full'} >
        <div className={'doc-page'} id="doc-container" data-mode="light">
            <div className="flex justify-between p-2.5">
                <div className="flex items-center">
                    <Button variant="secondary" onClick={endPreviewMode} className="mr-3">← 返回</Button>
                    <div className="doc-page-header">预览生成网页</div>
                </div>
                <ToggleButton></ToggleButton>
            </div>
            <div className="doc-wrapper" >
                <DocContainer data={jsonData}></DocContainer>
            </div>
        </div>
    )} else { return (
        <SettingContext.Provider value={value}>
            <div className={'overflow-x-visible bg-slate-200 shadow-md rounded-md border border-slate-100 flex flex-col p-6 pb-0'} style={{width: '340', height: '520'}}>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex justify-start flex-col">
                        <h2 className="text-lg text-slate-600 font-medium">组件文档 Design to Code</h2>
                        <div className="text-sm text-slate-500">选择文档图层后，点击“生成”</div>
                    </div>
                    <Button variant="primary" className="px-3.5 py-2.5" onClick={generate} isDisabled={loadingJson}>⚡️生成</Button>
                </div>
                <CodeResult code={jsonData} isLoading={loadingJson}></CodeResult>
                <span className="text-xs text-slate-400 font-medium mb-2">v1.05</span>
            </div>
        </SettingContext.Provider>
    )}
}