"use strict";
figma.showUI(__html__, {
    themeColors: true
});
figma.skipInvisibleInstanceChildren = true;
figma.ui.resize(380, 480);
figma.ui.postMessage({});
console.log("start running...");
const FrameNameIsValid = (frameName) => {
    switch (frameName) {
        case 'doc-starter':
            return true;
        default:
            return false;
    }
};
const ExtractDocDefination = (frameNode) => {
    const frameTitle = frameNode.findAll(n => n.name === "标题");
    const frameDefine = frameNode.findAll(n => n.name === "component-define");
    const frameFileLink = frameNode.findAll(n => n.name === "原始组件链接");
    const textNodeLink = frameFileLink[0].children[1];
    const link = textNodeLink.hyperlink;
    console.log("Found Defination");
    console.log(frameDefine);
    return {
        componentName: frameTitle[0].children[0] ? frameTitle[0].children[0].name : null,
        componentDesc: frameTitle[0].children[1] ? frameTitle[0].children[1].name : null,
        componentDefine: frameDefine[0].children[0] ? frameDefine[0].children[0].name : null,
        componentLink: link.value
    };
};
const ExtractDocBreakdown = (frameNode) => {
    const breakdownFrameList = frameNode.findAll(n => n.name === "breakdown-list");
    const itemFrameList = breakdownFrameList[0].children;
    console.log("Found Breakdown");
    const breakdownList = itemFrameList.map(listItem => {
        const contents = listItem.findAll(n => n.type === "TEXT");
        return {
            breakdownItem: contents[1].name,
            breakdownValue: contents[2].name
        };
    });
    return breakdownList;
};
const ExtractDocCompoTypes = (frameNode) => {
    const typeListFrameWrap = frameNode.findAll(n => n.name === "type-list");
    const typeListFrame = typeListFrameWrap[0].children;
    const typeList = typeListFrame.map(listItem => {
        const contents = listItem.findAll(n => n.type === "TEXT");
        return {
            breakdownItem: contents[1].name,
            breakdownValue: contents[2].name
        };
    });
    return typeList;
};
figma.ui.onmessage = msg => {
    if (msg.type === 'generate') {
        const selectedFrame = figma.currentPage.selection.filter(node => node.type === "FRAME");
        if (selectedFrame.length) {
            if (FrameNameIsValid(selectedFrame[0].name)) {
                const docDefinationNode = selectedFrame[0].findAll(node => node.name === "doc-defination");
                const docBreakdownNode = selectedFrame[0].findAll(node => node.name === "doc-breakdown");
                const docCompoTypes = selectedFrame[0].findAll(node => node.name === "doc-component-type");
                // Refactor later
                if (docDefinationNode.length) {
                    const def = ExtractDocDefination(docDefinationNode[0]);
                    const breakdownList = ExtractDocBreakdown(docBreakdownNode[0]);
                    // const compoTypesList = ExtractDocCompoTypes(docCompoTypes[0])
                    let result = {
                        defination: Object.assign({}, def),
                        breakdown: breakdownList,
                        // componentTypes: compoTypesList
                    };
                    figma.ui.postMessage(result);
                }
            }
            else {
                figma.notify("Frame名称必须为「doc-starter」");
            }
        }
        else {
            figma.notify("请选择一个Frame");
        }
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
};
