import {Buffer} from 'buffer';

const extractPrinciple = async (frameNode: FrameNode) => {
  const principleRowList = frameNode.findAll(n => n.name === "principle-row") as FrameNode[]
  var principleNamePattern = /^principle/i;

  return await Promise.all(principleRowList.map(async (rowItem, index) => {
    const itemFrameList = rowItem.children as FrameNode[]
    return {
      rowId: index,
      item: await Promise.all(itemFrameList.filter((item) => {
        if (principleNamePattern.test(item.name)) return item
      }).map(async (item, index) => {
        const frameImgShowcase = item.findOne(n => n.name === "component-showcase") as FrameNode
        const imgBytes = await frameImgShowcase.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } }).catch(e => console.log(e)) as Uint8Array
        const imgBytesStr = Buffer.from(imgBytes).toString('base64')

        const contentFrame = item.findOne(n => n.name === "principle-content") as FrameNode
        const contents = contentFrame.findAll(n => n.type === "TEXT") as TextNode[]
        const typeNamePrefix = /principle-item-/!
        return {
          itemId: index,
          title: contents[0]?.characters,
          desc: contents[1]?.characters,
          type: item.name.replace(typeNamePrefix, ''),
          img: imgBytesStr
        }
      }))
    }
  }))
}

export default extractPrinciple