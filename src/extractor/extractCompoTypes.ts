import {Buffer} from 'buffer';

const extractCompoTypes = async (frameNode: FrameNode) => {
  const typeListFrameWrap = frameNode.findAll(n => n.name === "type-list") as FrameNode[]
  const typeListFrame = typeListFrameWrap[0].children as FrameNode[]
  console.log("----DocGen-----: start extract compo types")

  return await Promise.all(typeListFrame.map(async listItem => {
    const contents = listItem.findOne(n => n.name === "type-item-content") as FrameNode

    // Extract showcase image
    const frameImgShowcase = listItem.findOne(n => n.name === "component-showcase") as FrameNode
    const imgBytes = await frameImgShowcase.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } }).catch(e => console.log(e)) as Uint8Array
    const imgBytesStr = Buffer.from(imgBytes).toString('base64')

    // Extract title texts
    const contentTitleFrame = contents.findOne(n => n.name === "type-title") as FrameNode
    const titleList = contentTitleFrame.children as TextNode[]

    // Extract content text
    const contentTextNodes = contents.findAll(n => n.type === "TEXT" && n.parent.name !== 'type-title') as TextNode[]
    const contentBulletList = contentTextNodes
      .filter(textItem => textItem.name === "li")
      .map(textItem => textItem.characters)
    const contentSentenceList = contentTextNodes
      .filter(textItem => textItem.name !== "li")
      .map(textItem => textItem.characters)

    console.log("----DocGen-----: finished extract compo types")
    
    return {
      title: titleList[0].characters,
      subTitle: titleList[1].characters,
      content: contentSentenceList,
      bulletPointList: contentBulletList,
      img: imgBytesStr
    }
  }))
}

export default extractCompoTypes