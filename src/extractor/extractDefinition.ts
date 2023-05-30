const extractDefinition = async (frameNode: FrameNode) => {

  console.log("----DocGen-----: start extract definition")

  const frameTitle = frameNode.findAll(n => n.name === "标题") as FrameNode[]
  const frameDefine = frameNode.findAll(n => n.name === "component-define") as FrameNode[]
  const frameFileLink = frameNode.findAll(n => n.name === "原始组件链接") as FrameNode[]
  const frameImgShowcase = frameNode.findOne(n => n.name === "component-showcase") as FrameNode
  const textNodeLink = frameFileLink[0].children[1] as TextNode
  const link = textNodeLink.hyperlink as HyperlinkTarget

  console.log("----DocGen-----: start export img")
  const imgBytes = await frameImgShowcase.exportAsync({ format: 'SVG' }).catch(e => console.log(e))
  console.log("----DocGen-----: finished export img")
  console.log("----DocGen-----: finished extract definition")

  return {
    componentName: frameTitle[0].children[0] ? frameTitle[0].children[0].name : null,
    componentDesc: frameTitle[0].children[1] ? frameTitle[0].children[1].name : null,
    componentDefine: frameDefine[0].children[0] ? frameDefine[0].children[0].name : null,
    componentLink: link.value,
    componentMainImg: imgBytes
  }
}

export default extractDefinition