import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocDefinition = ({
  definition,
}) => {
  console.log('definition', definition)
  // const jsonData = code ? {...code} : null;

    return (
      <div className="border-b border-slate-200">
        <div className="w-4/5 m-auto">
          <div className="py-12">
            <h2 className="text-3xl text-slate-900 font-medium mb-4">{definition.componentName}</h2>
            <h5 className="text-xl text-slate-500 font-normal">{definition.componentDesc}</h5>
          </div>
          <img className="w-full rounded-xl" src={generateImgSrc(definition.componentMainImg)}></img>
          <div className="py-10 w-3/4">
            <h2 className="text-base text-slate-500 font-normal">{definition.componentDefine}</h2>
          </div>
        </div>
      </div>
  )
}

