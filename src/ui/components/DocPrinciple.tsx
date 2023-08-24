import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

export const DocPrinciple = ({
  principle,
}) => {
  const principleItem = principle.map(row =>
    <div key={row.rowId} className="flex gap-10 items-start mb-20">
      {row.item.map(item => {
        return (
          <div className="w-1/2" key={item.itemId}>
            <img className="w-full rounded-xl mb-9" src={generateImgSrc(item.img)}></img>
            {item.type === 'green' && (
              <div className="flex items-center mb-2">
                <div className="rounded-full mr-2 w-5 h-5 text-center bg-green-700 text-white text-xs leading-5">✓</div>
                <div className={` text-green-700`}>{item.title}</div>
              </div>
              )}
            {item.type === 'red' && (
              <div className="flex items-center mb-2">
                <div className="rounded-full mr-2 w-5 h-5 text-center bg-red-500 text-white text-xs leading-5">✗</div>
                <div className={` text-red-500`}>{item.title}</div>
              </div>
            )}
            {item.type === 'orange' && (
              <div className="flex items-center mb-2">
                <div className="rounded-full mr-2 w-5 h-5 text-center bg-orange-500 text-white text-xs leading-5">!</div>
                <div className={` text-orange-500`}>{item.title}</div>
              </div>
            )}
            <div className='text-sm'>{item.desc}</div>
          </div>
        )
      })}
    </div>
  );

  return (
    <div className="border-b border-slate-200">
      <div className="w-4/5 m-auto">
        <div className="py-12">
          <h2 className="text-2xl text-slate-700 font-medium mb-5">使用原则</h2>
          <div className="py-10">
            {principleItem}
          </div>
        </div>

      </div>
    </div>
  )
}

