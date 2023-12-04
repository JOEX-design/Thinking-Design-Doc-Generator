import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocCompoType = ({
  compoType,
}) => {
  const componentTypeList = compoType.typeList?.map((item, itemIndex) =>
    <li key={itemIndex} className={`type-list-item ${item.verticalLayout ? "col-reversed" : "row"}`}>
        <img className={`${item.verticalLayout ? "component-showcase" : "component-showcase-half "}`} src={generateImgSrc(item.img)}></img>
        <div className={`type-item-content ${item.verticalLayout ? "full" : "half"}`}>
          <div className="content-header">
            <h3 id={item.title.replace(/\s/g, '')}>{item.title}</h3>
            <p >{item.subTitle}</p>
          </div>
          {item.content?.length !== 0 && (
          <ul className='content-desc'>{
            item.content?.map((content, contentIndex) =>
              <li key={contentIndex}>{content}</li>
            )
          }</ul>
          )}
          {item.bulletPointList?.length !== 0 && (
          <ul className='content-desc'>{
            item.bulletPointList?.map((bullet, bulletIndex) =>
              <li key={bulletIndex} className="bullet">{bullet}</li>
            )
          }</ul>
          )}
        </div>
    </li>
  );

  return (
    <div className="doc-section-wrapper">
      <div className="doc-section">
        <h2 id={compoType.typeTitle.replace(/\s/g, '')}>{compoType.typeTitle}</h2>
        <ul className="type-list">{componentTypeList}</ul>
      </div>
    </div>
  )
}