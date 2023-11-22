import * as React from "react"
import { DocDefinition } from "../ui/components/DocDefinition";
import { DocPatternStart } from "../ui/components/DocPatternStart";
import { DocPatternEnd } from "../ui/components/DocPatternEnd";
import { DocBreakdown } from "../ui/components/DocBreakdown";
import { DocPrinciple } from "../ui/components/DocPrinciple";
import { DocCompoType } from "../ui/components/DocCompoType";
import { DocBestPractice } from "../ui/components/DocBestPractice";
import { DocSimilar } from "../ui/components/DocSimilar";
import { TableOfContent } from "../ui/components/TableOfContent";

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
      <div className="absolute right-4 top-20 backdrop-blur-sm bg-white/80">
        <TableOfContent/>
      </div>
      {docData.definition.componentName && <DocDefinition definition={docData.definition}></DocDefinition>}
      {docData.patternStart && <DocPatternStart patternStart={docData.patternStart}></DocPatternStart>}
      {docData.breakdown && <DocBreakdown breakdown={docData.breakdown}></DocBreakdown>}
      {docData.componentTypes && docData.componentTypes.map((type, index) => {
        return (<DocCompoType key={index} compoType={type}></DocCompoType>)
      })}
      {docData.similar && <DocSimilar similar={docData.similar}></DocSimilar>}
      {docData.principle && <DocPrinciple principle={docData.principle}></DocPrinciple>}
      {docData.bestPractice && <DocBestPractice bestPractice={docData.bestPractice}></DocBestPractice>}
      {docData.patternEnd && <DocPatternEnd patternEnd={docData.patternEnd}></DocPatternEnd>}
    </div>
  )
}