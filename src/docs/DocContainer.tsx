import * as React from "react"
import { DocDefinition } from "../ui/components/DocDefinition";
import { DocBreakdown } from "../ui/components/DocBreakdown";
import { DocPrinciple } from "../ui/components/DocPrinciple";
import generateImgSrc from "../modules/generateImgSrc";

// type  = {
//   label: string,
//   width: number
// }
// const arrary = TestImg.definition.componentMainImg

// console.log(arrary)

export const DocContainer = ({
  data=null,
}) => {
  const docData = data ? {...data} : null;

  return (
    <div className="bg-white h-full overflow-auto pb-10 text-slate-500 font-normal">
      <DocDefinition definition={docData.definition}></DocDefinition>
      <DocBreakdown breakdown={docData.breakdown}></DocBreakdown>
      <DocPrinciple principle={docData.principle}></DocPrinciple>
    </div>
  )
}