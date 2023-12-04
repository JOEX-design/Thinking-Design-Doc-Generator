import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocBestPractice = ({
  bestPractice,
}) => {
  const bestPracticeList = bestPractice.practiceList?.map((item, itemIndex) =>
    <li key={itemIndex} className="type-list-item col">
      <h3 id={item.header.replace(/\s/g, '')}>{item.header}</h3>
      <div className="type-item-content">
        {item.description && (
          <div className="content-desc"> {item.description}</div>
        )}
        {item.descriptionBullets?.length !== 0 && (
          <ul className="content-desc">{
            item.descriptionBullets?.map((bullet, bulletIndex) =>
              <li key={bulletIndex} className="bullet">{bullet}</li>
            )}
          </ul>
        )}
      </div>
     <img className="component-showcase bordered" src={generateImgSrc(item.image)}></img>
    </li>
  )

  return (
      <div className="doc-section-wrapper">
        <div className="doc-section">
          <h2 id={bestPractice.title.replace(/\s/g, '')}>{bestPractice.title}</h2>
          {bestPractice.subtitle && (
            <p >{bestPractice.subtitle}</p>
          )}
          <ul className="type-list">{bestPracticeList}</ul>
        </div>
      </div>
  )
}