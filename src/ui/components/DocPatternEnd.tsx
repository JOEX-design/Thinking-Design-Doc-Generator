import * as React from "react";

export const DocPatternEnd = ({
  patternEnd,
}) => {
    const contentList = patternEnd.typeList.map((item, itemIndex) => 
        <li key={itemIndex}>
          <div className="flex gap-4 mb-2">
            <div id={item.header.replace(/\s/g, '')} className="text-lg text-slate-700 font-medium">{item.header}</div>
          </div>
          <div className='text-sm'>
            <ul className="list-disc ml-4">{
              item.bulletPointList?.map((bullet, bulletIndex) =>
                <li key={bulletIndex} className="mb-2">{bullet}</li>
              )
            }</ul>
          </div>
        </li>
    )

    return (
      <div className="border-t border-slate-200">
        <div className="max-w-[850px] m-auto">
          {/* <div className="py-12"> */}
            {/* <h1 id={`compoName_${patternStart.title.replace(/\s/g, '')}`} className="text-3xl text-slate-900 font-medium mb-4">{patternStart.title}</h1> */}
            {/* <h1 className="text-3xl text-slate-900 font-medium mb-4">{patternStart.title}</h1> */}
          {/* </div> */}
          <div className="py-10 w-3/4">
            <ul className="flex flex-col gap-10">{contentList}</ul>
          </div>
        </div>
      </div>
  )
}

