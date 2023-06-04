const generateImgSrc = (imgStr : string) => {
  // console.log('docData', docData)
  // const imgStr = docData.definition.componentMainImg
  const parsedImg = new Uint8Array(atob(imgStr).split("").map(
      (char)=>char.charCodeAt(0)
      )
  )
  // const result = data.data
  const blob = new Blob([parsedImg.buffer], {'type': 'image/png'})
  return URL.createObjectURL(blob)
}

export default generateImgSrc