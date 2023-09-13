import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocSimilar = ({
  similar,
}) => {
  const similarList = similar.similarList?.map((item, itemIndex) =>
    <li key={itemIndex}className="flex items-start justify-between gap-10">
      <img className="w-1/2 rounded-xl mr-4" src={generateImgSrc(item.image)}></img>
      <div className="w-1/2 flex flex-col">
        <h3 id={'similar_item_' + item.header.replace(/\s/g, '')} className="text-xl text-slate-700 font-medium mb-4">{item.header}</h3>
        <div className='text-sm'>{item.description}</div>
      </div>
    </li>
  )

  return (
    <div className="border-b border-slate-200">
      <div className="max-w-[850px] m-auto">
        <div className="py-12">
          <h2 id={similar.title.replace(/\s/g, '')} className="text-2xl text-slate-700 font-medium mb-2">{similar.title}</h2>
          <p className="text-lg text-slate-500 font-normal mb-5">{similar.subtitle}</p>
          <div className="pt-10">
            <ul className="flex flex-col gap-20">{similarList}</ul>
          </div>
        </div>
      </div>
    </div>
  )
}