import * as React from "react";

export const DocPatternEnd = ({
  patternEnd,
}) => {
    const contentList = patternEnd.typeList.map((item, itemIndex) => 
      <li key={itemIndex}>
        <div id={item.header.replace(/\s/g, '')} className="pattern-header">{item.header}</div>
        <ul className="content-desc">{
          item.bulletPointList?.map((bullet, bulletIndex) =>
            <li key={bulletIndex} className="bullet">{bullet}</li>
          )
        }</ul>
      </li>
    )

    return (
      <div className="doc-section-wrapper">
        <div className="doc-section">
          <ul className="type-list">{contentList}</ul>
        </div>
      </div>
  )
}

