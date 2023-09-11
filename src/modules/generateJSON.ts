import extractDefinition from "../extractor/extractDefinition";
import extractBreakdown from "../extractor/extractBreakdown";
import extractPrinciple from "../extractor/extractPrinciple";
import extractCompoTypes from "../extractor/extractCompoTypes";
import extractBestPractice from "../extractor/extractBestPractice";
import extractSimilar from "../extractor/extractSimilar";

const FrameNameIsValid = (frameName: String) => {
  switch (frameName) {
    case 'doc-starter':
      return true;
    default:
      return false;
  }
}

const generateJSON = async () => {
  const selectedFrame = figma.currentPage.selection.filter(node => node.type ===  "FRAME") as FrameNode[];

  if (selectedFrame.length) {
  if (FrameNameIsValid(selectedFrame[0].name)) {
      const docDefinitionNode = selectedFrame[0].findAll(node => node.name === "doc-definition") as FrameNode[];
      const docBreakdownNode = selectedFrame[0].findAll(node => node.name === "doc-breakdown") as FrameNode[];
      const docPrincipleNode = selectedFrame[0].findAll(node => node.name === "doc-principle") as FrameNode[];
      const docCompoTypes = selectedFrame[0].findAll(node => node.name === "doc-component-type") as FrameNode[];
      const docBestPractice = selectedFrame[0].findAll(node => node.name === "doc-best-practice") as FrameNode[];
      const docSimilar = selectedFrame[0].findAll(node => node.name === "doc-similar") as FrameNode[];

      // Refactor later
      const def = docDefinitionNode.length != 0 && await extractDefinition(docDefinitionNode[0]).catch(e => {figma.notify("组件定义的图层结构不正确")})
      const breakdownList = await extractBreakdown(docBreakdownNode[0]).catch(e => {figma.notify("组件结构的图层结构不正确")})
      const principle = await extractPrinciple(docPrincipleNode[0]).catch(e => {figma.notify("使用原则的图层结构不正确")})
      const compoTypesList = await extractCompoTypes(docCompoTypes[0]).catch(e => {figma.notify("组件类型的图层结构不正确")})
      const bestPractice = docBestPractice.length != 0 && await extractBestPractice(docBestPractice[0]).catch(e => {figma.notify("最佳实践的图层结构不正确")})
      const similar = docSimilar.length != 0 && await extractSimilar(docSimilar[0]).catch(e => {figma.notify("相似组件的图层结构不正确")})

      return {
          definition: {...def},
          breakdown: breakdownList,
          principle: principle,
          componentTypes: compoTypesList,
          bestPractice: bestPractice,
          similar: similar
      }

      // figma.ui.postMessage(result)
  } else {
      figma.notify("Frame名称必须为「doc-starter」")
  }
  } else {
  figma.notify("请选择一个Frame");
  }
}

export default generateJSON