import {Buffer} from 'buffer';

const extractBestPractice = async (frameNode: FrameNode) => {
    console.log("----DocGen-----: start extract best practice")
    const headerFrame = frameNode.findOne(n => n.name === "header") as FrameNode
    const headerTitleFrame = headerFrame.findOne(n => n.name === "title") as TextNode
    const headerSubtitleFrame = headerFrame.findOne(n => n.name === "subtitle") as TextNode
    const practiceListFrameWrap = frameNode.findOne(n => n.name === "practice-list") as FrameNode
    const practiceListFrame = practiceListFrameWrap.children as FrameNode[]

    const practiceList = await Promise.all(practiceListFrame.map(async listItem => {
        const practiceItemFrame = listItem.findOne(n => n.name === "practice-content") as FrameNode
        const headerFrame = practiceItemFrame.findAll(n => n.type === 'TEXT') as TextNode[]
        // Extract showcase image
        const frameImgShowcase = listItem.findOne(n => n.name === "component-showcase") as FrameNode
        const imgBytes = await frameImgShowcase.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } }).catch(e => console.log(e)) as Uint8Array
        const imgBytesStr = Buffer.from(imgBytes).toString('base64')        

        const practiceBulletList = headerFrame
            .filter(textItem => textItem.name === "li")
            .map(textItem => textItem.characters)
        const practiceSentenceList = headerFrame
            .filter(textItem => textItem.name !== "li")
            .map(textItem => textItem.characters)

        return {
            header: practiceSentenceList[0],
            description: practiceSentenceList[1],
            descriptionBullets: practiceBulletList,
            image: imgBytesStr
        }
    }))

    console.log("----DocGen-----: finished extract best practice")

    return {
        title: headerTitleFrame && headerTitleFrame.characters,
        subtitle: headerSubtitleFrame && headerSubtitleFrame.characters,
        practiceList: practiceList
    }
}

export default extractBestPractice