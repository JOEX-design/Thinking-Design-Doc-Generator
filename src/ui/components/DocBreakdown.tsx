import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocBreakdown = ({
  breakdown,
}) => {
  const contentList = breakdown.contents.map ((content, index) =>
    <div key={index}>
      {content.header && <h4>{content.header}</h4>}
      <ul>
        {content.breakdownList.map(item =>
          <li key={item.key} className="breakdown-item">
            <div className="breakdown-item-header">
              <div className="breakdown-item-dot">{item.key+1}</div>
              <span>{item.breakdownItem}</span>
            </div>
            <span className="breakdown-item-value">{item.breakdownValue}</span>
          </li>        
        )}
      </ul>
      <img className="component-showcase" src={generateImgSrc(content.breakdownImg)}></img>
    </div>
  );

  return (
    <div className="doc-section-wrapper">
      <div className="doc-section">
        <h2 id={breakdown.title || "组件解构"}>{breakdown.title || "组件解构"}</h2>
        {contentList}
      </div>
    </div>
  )
}

