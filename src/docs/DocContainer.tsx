import * as React from "react"
import { DocDefinition } from "../ui/components/DocDefinition";
import { DocBreakdown } from "../ui/components/DocBreakdown";
import { DocPrinciple } from "../ui/components/DocPrinciple";
import { DocCompoType } from "../ui/components/DocCompoType";
import { DocBestPractice } from "../ui/components/DocBestPractice";
import { DocSimilar } from "../ui/components/DocSimilar";

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
      <DocCompoType compoType={docData.componentTypes}></DocCompoType>
      {docData.similar && <DocSimilar similar={docData.similar}></DocSimilar>}
      <DocPrinciple principle={docData.principle}></DocPrinciple>
      {docData.bestPractice && <DocBestPractice bestPractice={docData.bestPractice}></DocBestPractice>}
    </div>
  )
}