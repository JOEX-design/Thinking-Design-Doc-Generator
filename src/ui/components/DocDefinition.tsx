import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocDefinition = ({
  definition,
}) => {
  console.log('definition', definition)
  // const jsonData = code ? {...code} : null;

    return (
      <div className="border-b border-slate-200">
        <div className="max-w-[850px] m-auto">
          <div className="py-12">
            <h1 id={`compoName_${definition.componentName.replace(/\s/g, '')}`} className="text-3xl text-slate-900 font-medium mb-4">{definition.componentName}</h1>
            <p className="text-xl text-slate-500 font-normal">{definition.componentDesc}</p>
          </div>
          <img className="w-full rounded-xl" src={generateImgSrc(definition.componentMainImg)}></img>
          <div className="py-10 w-3/4">
            <p className="text-base text-slate-500 font-normal">{definition.componentDefine}</p>
          </div>
        </div>
      </div>
  )
}

