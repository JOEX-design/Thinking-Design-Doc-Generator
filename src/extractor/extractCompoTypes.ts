const extractCompoTypes = (frameNode: FrameNode) => {
  const typeListFrameWrap = frameNode.findAll(n => n.name === "type-list") as FrameNode[]
  const typeListFrame = typeListFrameWrap[0].children as FrameNode[]
  const typeList = typeListFrame.map(listItem => {
    const contents = listItem.findAll(n => n.type === "TEXT")
    return {
      breakdownItem: contents[1].name,
      breakdownValue: contents[2].name
    }
  })
  return typeList
}

export default extractCompoTypes