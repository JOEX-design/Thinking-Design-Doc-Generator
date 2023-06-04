import * as React from "react";
import ReactJson from 'react-json-view'
import { Button } from "./Button";
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
      <div className="flex flex-1 overflow-y-auto overflow-x-visible flex-col">
        <div className="flex-1 overflow-auto bg-slate-100 rounded-md p-3 shadow-sm mb-2">
          <ReactJson
              src={code}
              displayDataTypes={false}
              enableClipboard={false}
              collapseStringsAfterLength = {4}
          ></ReactJson>
        </div>
        <Button variant="secondary" onClick={previewMode} className="mb-6">💊 预览网站</Button>
      </div>
  )}
  else {
    return (
      <div className="flex-1 overflow-auto rounded-md p-3 mb-6 border-2 border-dashed border-slate-300">
        {(isLoading) ? <Loading></Loading> : null}
      </div>
    )
  }
}

