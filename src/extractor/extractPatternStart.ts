
const extractPatternStart = async (frameNode: FrameNode) => {
    const headerFrame = frameNode.findOne(n => n.name === "title") as FrameNode
    const headerTitleFrame = headerFrame.findOne(n => n.type === "TEXT") as TextNode
    const typeListFrame = frameNode.findAll(n => n.name === "type-item-content") as FrameNode[]

    const typeList = typeListFrame.map(listItem => {
        const headerFrame = listItem.findOne(n => n.name === 'title-name') as TextNode
        const contentTextNodes = listItem.findAll(n => n.type === "TEXT" && n.parent.name !== 'type-title') as TextNode[]
        const contentBulletList = contentTextNodes
            .filter(textItem => textItem.name === "li")
            .map(textItem => textItem.characters)

        return {
            header: headerFrame?.characters,
            bulletPointList: contentBulletList
        }
    })

    return {
        title: headerTitleFrame?.characters,
        typeList
    }
}

export default extractPatternStart