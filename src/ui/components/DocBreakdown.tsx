import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocBreakdown = ({
  breakdown,
}) => {
  console.log('breakdown', breakdown)
  // const jsonData = code ? {...code} : null;

  const breakdownItems = breakdown.breakdownList.map(item =>
    <li key={item.key} className="flex items-start text-sm mb-3">
        <div className="flex items-center mr-3">
          <div className="rounded-full mr-2 w-4 h-4 text-center bg-purple-500 text-white text-xs leading-4">{item.key+1}</div>
          <span className="text-purple-500">{item.breakdownItem}</span>
        </div>
        <span className="flex-1">{item.breakdownValue}</span>
    </li>
  );

  return (
    <div className="border-b border-slate-200">
      <div className="max-w-[850px] m-auto">
        <div className="pt-12 pb-8">
          <h2 id="组件解构" className="text-2xl text-slate-700 font-medium mb-5">组件解构</h2>
          <ul>{breakdownItems}</ul>
        </div>
        <img className="w-full rounded-xl mb-12" src={generateImgSrc(breakdown.breakdownImg)}></img>
      </div>
    </div>
  )
}

