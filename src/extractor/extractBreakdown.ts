import {Buffer} from 'buffer';

const extractBreakdown = async (frameNode: FrameNode) => {

  const breakdownContentListFrames = frameNode.findAll(n => n.name === 'content') as FrameNode[]
  const titleFrame = frameNode.findOne(n => n.name === 'title') as TextNode
  const contentList = await Promise.all(breakdownContentListFrames.map(async listItem => {
    const breakdownFrameList = listItem.findAll(n => n.name === "breakdown-list") as FrameNode[]
    const frameImgShowcase = listItem.findOne(n => n.name === "component-showcase") as FrameNode
    const contentHeader = listItem.findOne(n => n.name === 'header') as TextNode
    const itemFrameList = breakdownFrameList[0]?.children as FrameNode[] || []

    const imgBytes = await frameImgShowcase.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } }).catch(e => console.log(e)) as Uint8Array
    const imgBytesStr = Buffer.from(imgBytes).toString('base64')

    const breakdownList = itemFrameList.map((listItem, index) => {
      const contents = listItem.findAll(n => n.type === "TEXT")
      return {
        key: index,
        breakdownItem: contents[1]?.name,
        breakdownValue: contents[2]?.name
      }
    })
    return {
      breakdownImg: imgBytesStr,
      breakdownList: breakdownList,
      header: contentHeader?.characters
    }
  }))

  return {
    title: titleFrame?.characters,
    contents: contentList
  }
}

export default extractBreakdown