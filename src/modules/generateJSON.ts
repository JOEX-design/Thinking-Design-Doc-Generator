import extractDefinition from "../extractor/extractDefinition";
import extractBreakdown from "../extractor/extractBreakdown";

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
      const docCompoTypes = selectedFrame[0].findAll(node => node.name === "doc-component-type") as FrameNode[];

      // Refactor later
      if (docDefinitionNode.length) {
      const def = await extractDefinition(docDefinitionNode[0])
      const breakdownList = extractBreakdown(docBreakdownNode[0])
      // const compoTypesList = ExtractDocCompoTypes(docCompoTypes[0])

      return {
          definition: {...def},
          breakdown: breakdownList,
          // componentTypes: compoTypesList
      }

      // figma.ui.postMessage(result)
      }
  } else {
      figma.notify("Frame名称必须为「doc-starter」")
  }
  } else {
  figma.notify("请选择一个Frame");
  }
}

export default generateJSON