import * as React from "react";

export const DocPatternStart = ({
  patternStart,
}) => {
    const contentList = patternStart.typeList.map((item, itemIndex) => 
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
          <div className="doc-header">
            <h1 id={`compoName_${patternStart.title.replace(/\s/g, '')}`}>{patternStart.title}</h1>
          </div>
          <div className="full-width-text">
            <ul className="type-list">{contentList}</ul>
          </div>
        </div>
      </div>
  )
}

