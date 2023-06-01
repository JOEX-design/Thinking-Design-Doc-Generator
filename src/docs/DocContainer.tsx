import * as React from "react"
import { Component } from "react"
import * as TestImg from "../../data/testImg.json"

// type  = {
//   label: string,
//   width: number
// }
const arrary = TestImg.definition.componentMainImg

console.log(arrary)
export const DocContainer = () => {
  // const imgSrc = URL.createObjectURL(
  //   new Blob([arrary], { type: 'image/png' } /* (1) */)
  // );
  // console.log(img.src)
  return (
    <div>
      doc container
    </div>
  )
}