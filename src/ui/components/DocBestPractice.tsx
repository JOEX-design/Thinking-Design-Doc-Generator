import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocBestPractice = ({
  bestPractice,
}) => {
  const bestPracticeList = bestPractice.practiceList?.map((item, itemIndex) =>
    <li key={itemIndex} className="flex flex-col gap-2">
      <p id={item.header.replace(/\s/g, '')} className="text-lg text-slate-700 font-medium">{item.header}</p>
      <div className="mb-4">{item.description}</div>
     <img className="w-auto rounded-xl" src={generateImgSrc(item.image)}></img>
    </li>
  )

  return (
      <div className="max-w-[850px] m-auto">
        <div className="py-12">
          <h2 id={bestPractice.title.replace(/\s/g, '')} className="text-2xl text-slate-700 font-medium mb-2">{bestPractice.title}</h2>
          <p className="text-lg text-slate-500 font-normal mb-5">{bestPractice.subtitle}</p>
          <div className="pt-10">
            <ul className="flex flex-col gap-20">{bestPracticeList}</ul>
          </div>
        </div>
      </div>
  )
}