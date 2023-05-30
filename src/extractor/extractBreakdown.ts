const extractBreakdown = (frameNode: FrameNode) => {

  const breakdownFrameList = frameNode.findAll(n => n.name === "breakdown-list") as FrameNode[]
  const itemFrameList = breakdownFrameList[0].children as FrameNode[]

  console.log("----DocGen-----: start extract breakdowns")

  const breakdownList = itemFrameList.map(listItem => {
    const contents = listItem.findAll(n => n.type === "TEXT")
    return {
      breakdownItem: contents[1].name,
      breakdownValue: contents[2].name
    }
  })

  console.log("----DocGen-----: finished extract breakdowns")

  return breakdownList
}

export default extractBreakdown