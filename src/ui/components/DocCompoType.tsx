import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocCompoType = ({
  compoType,
}) => {
  const componentTypeList = compoType.typeList?.map((item, itemIndex) =>
    <li key={itemIndex} className={`flex items-start justify-between gap-10 ${item.verticalLayout ? "flex-col" : "flex-row"}`}>
        <img className={`rounded-xl mr-4 ${item.verticalLayout ? "w-max" : "w-1/2"}`} src={generateImgSrc(item.img)}></img>
        <div className={`flex flex-col ${item.verticalLayout ? "w-max" : "w-1/2"}`}>
          <div className="flex gap-4 mb-4">
            <h3 id={item.title.replace(/\s/g, '')} className="text-xl text-slate-700 font-medium">{item.title}</h3>
            <p className="text-xl text-slate-500 font-normal">{item.subTitle}</p>
          </div>
          <div className='text-sm'>
            <ul>{
              item.content?.map((content, contentIndex) =>
                <li key={contentIndex} className="mb-2">{content}</li>
              )
            }</ul>
            <ul className="list-disc ml-4">{
              item.bulletPointList?.map((bullet, bulletIndex) =>
                <li key={bulletIndex} className="mb-2">{bullet}</li>
              )
            }</ul>
          </div>
        </div>
    </li>
  );

  return (
    <div className="doc-section-wrapper">
      <div className="doc-section">
        <h2 id={compoType.typeTitle.replace(/\s/g, '')}>{compoType.typeTitle}</h2>
        <ul className="flex flex-col gap-20">{componentTypeList}</ul>
      </div>
    </div>
  )
}