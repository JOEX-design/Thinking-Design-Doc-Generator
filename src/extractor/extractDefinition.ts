// Image Unit8Array Compressor
// import {gzip} from 'pako'
import {Buffer} from 'buffer';


function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const extractDefinition = async (frameNode: FrameNode) => {

  console.log("----DocGen-----: start extract definition")

  const frameTitle = frameNode.findAll(n => n.name === "标题") as FrameNode[]
  const frameDefine = frameNode.findAll(n => n.name === "component-define") as FrameNode[]
  const frameFileLink = frameNode.findAll(n => n.name === "原始组件链接") as FrameNode[]
  const frameImgShowcase = frameNode.findOne(n => n.name === "component-showcase") as FrameNode
  const textNodeLink = frameFileLink[0].children[1] as TextNode
  const link = textNodeLink.hyperlink as HyperlinkTarget

  // TODO: Extract into an image array generator
  console.log("----DocGen-----: start export img")
  const imgBytes = await frameImgShowcase.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } }).catch(e => console.log(e)) as Uint8Array
  const imgBytesStr = Buffer.from(imgBytes).toString('base64')
  console.log("----DocGen-----: finished export img")
  console.log("----DocGen-----: finished extract definition")

  console.log(`----DocGen-----: start compressing img: ${formatBytes(imgBytes.length)}`)
  // TODO: Compress and decompress!!!
  // const compressedImgBytes = await gzip(imgBytes);
  // console.log(`----DocGen-----: compreesed img: ${formatBytes(compressedImgBytes.length)}`)

  // console.log('extract img bufer', imgBytes.buffer)
  const componentDescFrame = frameTitle[0].children[1] as TextNode || null
  const componentDefineFram = frameDefine[0].children[0] as TextNode || null
  return {
    componentName: frameTitle[0].children[0] ? frameTitle[0].children[0].name : null,
    componentDesc: componentDescFrame.characters,
    componentDefine: componentDefineFram.characters,
    componentLink: link.value,
    componentMainImg: imgBytesStr
  }
}

export default extractDefinition