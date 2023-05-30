/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RyeS8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgIHRoZW1lQ29sb3JzOiB0cnVlXG59KTtcbmZpZ21hLnNraXBJbnZpc2libGVJbnN0YW5jZUNoaWxkcmVuID0gdHJ1ZTtcbmZpZ21hLnVpLnJlc2l6ZSgzODAsIDQ4MCk7XG5maWdtYS51aS5wb3N0TWVzc2FnZSh7fSk7XG5jb25zb2xlLmxvZyhcInN0YXJ0IHJ1bm5pbmcuLi5cIik7XG5jb25zdCBGcmFtZU5hbWVJc1ZhbGlkID0gKGZyYW1lTmFtZSkgPT4ge1xuICAgIHN3aXRjaCAoZnJhbWVOYW1lKSB7XG4gICAgICAgIGNhc2UgJ2RvYy1zdGFydGVyJzpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5jb25zdCBFeHRyYWN0RG9jRGVmaW5hdGlvbiA9IChmcmFtZU5vZGUpID0+IHtcbiAgICBjb25zdCBmcmFtZVRpdGxlID0gZnJhbWVOb2RlLmZpbmRBbGwobiA9PiBuLm5hbWUgPT09IFwi5qCH6aKYXCIpO1xuICAgIGNvbnN0IGZyYW1lRGVmaW5lID0gZnJhbWVOb2RlLmZpbmRBbGwobiA9PiBuLm5hbWUgPT09IFwiY29tcG9uZW50LWRlZmluZVwiKTtcbiAgICBjb25zdCBmcmFtZUZpbGVMaW5rID0gZnJhbWVOb2RlLmZpbmRBbGwobiA9PiBuLm5hbWUgPT09IFwi5Y6f5aeL57uE5Lu26ZO+5o6lXCIpO1xuICAgIGNvbnN0IHRleHROb2RlTGluayA9IGZyYW1lRmlsZUxpbmtbMF0uY2hpbGRyZW5bMV07XG4gICAgY29uc3QgbGluayA9IHRleHROb2RlTGluay5oeXBlcmxpbms7XG4gICAgY29uc29sZS5sb2coXCJGb3VuZCBEZWZpbmF0aW9uXCIpO1xuICAgIGNvbnNvbGUubG9nKGZyYW1lRGVmaW5lKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb21wb25lbnROYW1lOiBmcmFtZVRpdGxlWzBdLmNoaWxkcmVuWzBdID8gZnJhbWVUaXRsZVswXS5jaGlsZHJlblswXS5uYW1lIDogbnVsbCxcbiAgICAgICAgY29tcG9uZW50RGVzYzogZnJhbWVUaXRsZVswXS5jaGlsZHJlblsxXSA/IGZyYW1lVGl0bGVbMF0uY2hpbGRyZW5bMV0ubmFtZSA6IG51bGwsXG4gICAgICAgIGNvbXBvbmVudERlZmluZTogZnJhbWVEZWZpbmVbMF0uY2hpbGRyZW5bMF0gPyBmcmFtZURlZmluZVswXS5jaGlsZHJlblswXS5uYW1lIDogbnVsbCxcbiAgICAgICAgY29tcG9uZW50TGluazogbGluay52YWx1ZVxuICAgIH07XG59O1xuY29uc3QgRXh0cmFjdERvY0JyZWFrZG93biA9IChmcmFtZU5vZGUpID0+IHtcbiAgICBjb25zdCBicmVha2Rvd25GcmFtZUxpc3QgPSBmcmFtZU5vZGUuZmluZEFsbChuID0+IG4ubmFtZSA9PT0gXCJicmVha2Rvd24tbGlzdFwiKTtcbiAgICBjb25zdCBpdGVtRnJhbWVMaXN0ID0gYnJlYWtkb3duRnJhbWVMaXN0WzBdLmNoaWxkcmVuO1xuICAgIGNvbnNvbGUubG9nKFwiRm91bmQgQnJlYWtkb3duXCIpO1xuICAgIGNvbnN0IGJyZWFrZG93bkxpc3QgPSBpdGVtRnJhbWVMaXN0Lm1hcChsaXN0SXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gbGlzdEl0ZW0uZmluZEFsbChuID0+IG4udHlwZSA9PT0gXCJURVhUXCIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnJlYWtkb3duSXRlbTogY29udGVudHNbMV0ubmFtZSxcbiAgICAgICAgICAgIGJyZWFrZG93blZhbHVlOiBjb250ZW50c1syXS5uYW1lXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGJyZWFrZG93bkxpc3Q7XG59O1xuY29uc3QgRXh0cmFjdERvY0NvbXBvVHlwZXMgPSAoZnJhbWVOb2RlKSA9PiB7XG4gICAgY29uc3QgdHlwZUxpc3RGcmFtZVdyYXAgPSBmcmFtZU5vZGUuZmluZEFsbChuID0+IG4ubmFtZSA9PT0gXCJ0eXBlLWxpc3RcIik7XG4gICAgY29uc3QgdHlwZUxpc3RGcmFtZSA9IHR5cGVMaXN0RnJhbWVXcmFwWzBdLmNoaWxkcmVuO1xuICAgIGNvbnN0IHR5cGVMaXN0ID0gdHlwZUxpc3RGcmFtZS5tYXAobGlzdEl0ZW0gPT4ge1xuICAgICAgICBjb25zdCBjb250ZW50cyA9IGxpc3RJdGVtLmZpbmRBbGwobiA9PiBuLnR5cGUgPT09IFwiVEVYVFwiKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJyZWFrZG93bkl0ZW06IGNvbnRlbnRzWzFdLm5hbWUsXG4gICAgICAgICAgICBicmVha2Rvd25WYWx1ZTogY29udGVudHNbMl0ubmFtZVxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiB0eXBlTGlzdDtcbn07XG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuICAgIGlmIChtc2cudHlwZSA9PT0gJ2dlbmVyYXRlJykge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEZyYW1lID0gZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmZpbHRlcihub2RlID0+IG5vZGUudHlwZSA9PT0gXCJGUkFNRVwiKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkRnJhbWUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoRnJhbWVOYW1lSXNWYWxpZChzZWxlY3RlZEZyYW1lWzBdLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9jRGVmaW5hdGlvbk5vZGUgPSBzZWxlY3RlZEZyYW1lWzBdLmZpbmRBbGwobm9kZSA9PiBub2RlLm5hbWUgPT09IFwiZG9jLWRlZmluYXRpb25cIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZG9jQnJlYWtkb3duTm9kZSA9IHNlbGVjdGVkRnJhbWVbMF0uZmluZEFsbChub2RlID0+IG5vZGUubmFtZSA9PT0gXCJkb2MtYnJlYWtkb3duXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvY0NvbXBvVHlwZXMgPSBzZWxlY3RlZEZyYW1lWzBdLmZpbmRBbGwobm9kZSA9PiBub2RlLm5hbWUgPT09IFwiZG9jLWNvbXBvbmVudC10eXBlXCIpO1xuICAgICAgICAgICAgICAgIC8vIFJlZmFjdG9yIGxhdGVyXG4gICAgICAgICAgICAgICAgaWYgKGRvY0RlZmluYXRpb25Ob2RlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWYgPSBFeHRyYWN0RG9jRGVmaW5hdGlvbihkb2NEZWZpbmF0aW9uTm9kZVswXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJyZWFrZG93bkxpc3QgPSBFeHRyYWN0RG9jQnJlYWtkb3duKGRvY0JyZWFrZG93bk5vZGVbMF0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBjb21wb1R5cGVzTGlzdCA9IEV4dHJhY3REb2NDb21wb1R5cGVzKGRvY0NvbXBvVHlwZXNbMF0pXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmF0aW9uOiBPYmplY3QuYXNzaWduKHt9LCBkZWYpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtkb3duOiBicmVha2Rvd25MaXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29tcG9uZW50VHlwZXM6IGNvbXBvVHlwZXNMaXN0XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlnbWEubm90aWZ5KFwiRnJhbWXlkI3np7Dlv4XpobvkuLrjgIxkb2Mtc3RhcnRlcuOAjVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeShcIuivt+mAieaLqeS4gOS4qkZyYW1lXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcbiAgICAvLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cbiAgICAvLyBmaWdtYS5jbG9zZVBsdWdpbigpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==