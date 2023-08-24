import {Buffer} from 'buffer';

const extractBreakdown = async (frameNode: FrameNode) => {

  const breakdownFrameList = frameNode.findAll(n => n.name === "breakdown-list") as FrameNode[]
  const itemFrameList = breakdownFrameList[0].children as FrameNode[]
  const frameImgShowcase = frameNode.findOne(n => n.name === "component-showcase") as FrameNode

  console.log("----DocGen-----: start extract breakdowns")

  const imgBytes = await frameImgShowcase.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } }).catch(e => console.log(e)) as Uint8Array
  const imgBytesStr = Buffer.from(imgBytes).toString('base64')

  const breakdownList = itemFrameList.map((listItem, index) => {
    const contents = listItem.findAll(n => n.type === "TEXT")
    return {
      key: index,
      breakdownItem: contents[1].name,
      breakdownValue: contents[2].name
    }
  })

  console.log("----DocGen-----: finished extract breakdowns")

  return { 
    breakdownImg: imgBytesStr,
    breakdownList: breakdownList
  }
}

export default extractBreakdown