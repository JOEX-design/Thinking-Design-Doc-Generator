import {Buffer} from 'buffer';

const extractSimilar = async (frameNode: FrameNode) => {
    const headerFrame = frameNode.findOne(n => n.name === "header") as FrameNode
    const headerTitleFrame = headerFrame.findOne(n => n.name === "title") as TextNode
    const headerSubtitleFrame = headerFrame.findOne(n => n.name === "subtitle") as TextNode
    const similarListFrameWrap = frameNode.findOne(n => n.name === "similar-list") as FrameNode
    const similarListFrame = similarListFrameWrap.children as FrameNode[]

    const similarList = await Promise.all(similarListFrame.map(async listItem => {
        const similarItemFrame = listItem.findOne(n => n.name === "similar-item-content") as FrameNode
        const headerFrame = similarItemFrame.findAll(n => n.type === 'TEXT') as TextNode[]

        // Extract showcase image
        const frameImgShowcase = listItem.findOne(n => n.name === "component-showcase") as FrameNode
        const imgBytes = await frameImgShowcase.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } }).catch(e => console.log(e)) as Uint8Array
        const imgBytesStr = Buffer.from(imgBytes).toString('base64')        

        return {
            header: headerFrame[0] && headerFrame[0].characters,
            description: headerFrame[1] && headerFrame[1].characters,
            image: imgBytesStr
        }
    }))

    return {
        title: headerTitleFrame && headerTitleFrame.characters,
        subtitle: headerSubtitleFrame && headerSubtitleFrame.characters,
        similarList: similarList
    }
}

export default extractSimilar