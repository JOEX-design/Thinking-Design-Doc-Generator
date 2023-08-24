import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocBestPractice = ({
  bestPractice,
}) => {
  const bestPracticeList = bestPractice.practiceList?.map((item, itemIndex) =>
    <li key={itemIndex} className="flex flex-col gap-2">
      <h5 className="text-lg text-slate-700 font-medium">{item.header}</h5>
      <div className="mb-4">{item.description}</div>
     <img className="w-auto rounded-xl" src={generateImgSrc(item.image)}></img>
    </li>
  )

  return (
      <div className="w-4/5 m-auto">
        <div className="py-12">
          <h2 className="text-2xl text-slate-700 font-medium mb-2">{bestPractice.title}</h2>
          <h3 className="text-lg text-slate-500 font-normal mb-5">{bestPractice.subtitle}</h3>
          <div className="pt-10">
            <ul className="flex flex-col gap-20">{bestPracticeList}</ul>
          </div>
        </div>
      </div>
  )
}