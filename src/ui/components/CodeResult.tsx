import * as React from "react";
import { useState, useEffect } from 'react';
import ReactJson from 'react-json-view'
import { Loading } from "./Loading";

export const CodeResult = ({
  code,
  isLoading
}) => {

  const previewMode = () => {
    parent.postMessage({ pluginMessage: { type: 'clickPreview' } }, '*')
  }

  if (code && !isLoading) {
    return (
      <div className="flex flex-1 overflow-auto flex-col">
        <div className="flex-1 overflow-auto bg-slate-100 rounded-md p-3 shadow-sm mb-2">
          <ReactJson
              src={code}
              displayDataTypes={false}
              enableClipboard={false}
              collapseStringsAfterLength = {4}
          ></ReactJson>
        </div>
        <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-md py-1.5 px-3 text-sm shadow-md shadow-purple-200 text-opacity-90"  onClick={previewMode}>💊 预览网站</button>
      </div>
  )}
  else {
    return (
      <div className="flex-1 overflow-auto rounded-md p-3 border-2 border-dashed border-slate-300">
        {(isLoading) ? <Loading></Loading> : null}
      </div>
    )
  }
}

