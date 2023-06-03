import * as React from "react";
import { useState } from 'react';
import ReactJson from 'react-json-view'

export const CodeResult = ({
  code,
  onPreview
}) => {
  // const [jsonData] = useState(null);
  console.log('jsonData', code)
  const jsonData = code ? {...code} : null;
  const [uiMode, setUiMode] = useState(null);

  const previewMode = () => {
    // parent.postMessage({ pluginMessage: { type: 'showImg' } }, '*')
  }

  if (jsonData) {
    return (
      <div className="flex flex-1 overflow-auto flex-col">
        <div className="flex-1 overflow-auto bg-slate-100 rounded-md p-3 shadow-sm mb-2">
          <ReactJson
              src={jsonData}
              displayDataTypes={false}
              enableClipboard={false}
              collapseStringsAfterLength = {4}
          ></ReactJson>
        </div>
        <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-md py-1.5 px-3 text-sm shadow-md shadow-purple-200 text-opacity-90"  onClick={onPreview}>💊 预览网站</button>
      </div>
  )}
  else {
    return (
      <div className="flex-1 overflow-auto rounded-md p-3 border-2 border-dashed border-slate-300">
      </div>
    )
  }
}

