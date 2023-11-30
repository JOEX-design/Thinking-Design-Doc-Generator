import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocDefinition = ({
  definition,
}) => {
  console.log('definition', definition)
  // const jsonData = code ? {...code} : null;

    return (
      <div className="doc-section-wrapper">
        <div className="doc-section">
          <div className="doc-header">
            <h1 id={`compoName_${definition.componentName.replace(/\s/g, '')}`}>{definition.componentName}</h1>
            <p>{definition.componentDesc}</p>
          </div>
          <img className="component-showcase" src={generateImgSrc(definition.componentMainImg)}></img>
          <p className="full-width-text">{definition.componentDefine}</p>
        </div>
      </div>
  )
}

