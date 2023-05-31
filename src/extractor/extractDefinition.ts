// Image Unit8Array Compressor
import {gzip} from 'pako'
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
  const imgBytes = await frameImgShowcase.exportAsync({ format: 'PNG' }).catch(e => console.log(e)) as Uint8Array
  const imgBytesStr = Buffer.from(imgBytes).toString('utf8')
  console.log("----DocGen-----: finished export img")
  console.log("----DocGen-----: finished extract definition")

  console.log(`----DocGen-----: start compressing img: ${formatBytes(imgBytes.length)}`)
  const compressedImgBytes = await gzip(imgBytes);
  console.log(`----DocGen-----: compreesed img: ${formatBytes(compressedImgBytes.length)}`)

  return {
    componentName: frameTitle[0].children[0] ? frameTitle[0].children[0].name : null,
    componentDesc: frameTitle[0].children[1] ? frameTitle[0].children[1].name : null,
    componentDefine: frameDefine[0].children[0] ? frameDefine[0].children[0].name : null,
    componentLink: link.value,
    componentMainImg: imgBytes
  }
}

export default extractDefinition