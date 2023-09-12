import * as React from "react";
import ReactJson from 'react-json-view'
import {Button} from "./Button";
import {Loading} from "./Loading";
import {GithubDialog} from "./GithubDialog";

export const CodeResult = ({code, isLoading}) => {

  const previewMode = () => {
    parent.postMessage({
      pluginMessage: {
        type: 'clickPreview'
      }
    }, '*')
  }

  const downloadJSONAsFile = (jsonObject, fileName) => { // Convert JSON object to a string
    const jsonString = JSON.stringify(jsonObject, null, 2);
    // The third argument specifies the indentation level

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], {type: 'application/json'});

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    // Trigger a click event on the anchor element
    document.body.appendChild(a);
    a.click();

    // Clean up resources
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  const calculateJSONSize = (jsonObject) => { // Convert JSON object to a string
    const jsonString = JSON.stringify(jsonObject);

    // Create a TextEncoder instance
    const encoder = new TextEncoder();

    // Get the byte length of the encoded string
    const encodedBytes = encoder.encode(jsonString);
    const byteLength = encodedBytes.length;

    // Convert bytes to megabytes
    const sizeInMB = byteLength / (1024 * 1024); // 1 MB = 1024 * 1024 bytes

    return sizeInMB;
  }

  if (code && !isLoading) {
    return (
      <div className="flex flex-1 overflow-y-auto overflow-x-visible flex-col">
        <div className="flex-1 overflow-auto bg-slate-100 rounded-md p-3 shadow-sm mb-2">
          <ReactJson src={code}
            displayDataTypes={false}
            enableClipboard={false}
            collapseStringsAfterLength={4}></ReactJson>
        </div>
        <Button variant="secondary"
          onClick={previewMode}
          className="mb-2">💊 预览网站</Button>
        <Button variant="secondary"
          onClick={
            () => downloadJSONAsFile(code, 'test.json')
          }
          className="mb-2">🔫 导出文件 ({
          calculateJSONSize(code).toFixed(2)
        }
          MB)</Button>
        {/* <Button variant="secondary" onClick={async() => await commitToGithub(code)} className="mb-6">🔫 同步至Github ({calculateJSONSize(code).toFixed(2)} MB)</Button> */}
        <GithubDialog jsonObject={code}/>
      </div>
    )
  } else {
    return (
      <div className="flex-1 overflow-auto rounded-md p-3 mb-2 border-2 border-dashed border-slate-300">
        {
        (isLoading) ? <Loading text="生成中..."></Loading> : null
      } </div>
    )
  }
}
