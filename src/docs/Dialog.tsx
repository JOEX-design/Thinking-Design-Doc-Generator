// import React, { Component } from 'react';
import * as React from "react"
import { Component } from "react"
import * as TestImg from "../../data/testImg.json"

type FooterProps = {
  content: any
}
const arrary = TestImg.definition.componentMainImg

console.log(arrary)
export const App = () => {
  // const imgSrc = URL.createObjectURL(
  //   new Blob([arrary], { type: 'image/png' } /* (1) */)
  // );
  // console.log(img.src)
  return (
    <footer>
    </footer>
  )
}