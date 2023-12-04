import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocSimilar = ({
  similar,
}) => {
  const similarList = similar.similarList?.map((item, itemIndex) =>
    <li key={itemIndex} className="type-list-item row">
      <img className="component-showcase-half" src={generateImgSrc(item.image)}></img>
      <div className="type-item-content half">
        <div className="content-header">
          <h3 id={'similar_item_' + item.header.replace(/\s/g, '')}>{item.header}</h3>
        </div>
        {item.description && (
          <div className="content-desc"> {item.description}</div>
        )}
        <ul className="content-desc">{
          item.descriptionBullets?.map((bullet, bulletIndex) =>
            <li key={bulletIndex} className="bullet">{bullet}</li>
          )}
        </ul>
      </div>
    </li>
  )

  return (
    <div className="doc-section-wrapper">
      <div className="doc-section">
        <h2 id={similar.title.replace(/\s/g, '')}>{similar.title}</h2>
        <p>{similar.subtitle}</p>
        <ul className="type-list">{similarList}</ul>
      </div>
    </div>
  )
}