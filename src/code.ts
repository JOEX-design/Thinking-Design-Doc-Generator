import generateJSON from "./modules/generateJSON";

const PREVIEW_ENV = process.env.PREVIEW_ENV

figma.showUI(__html__, {
  // themeColors: true
});

figma.skipInvisibleInstanceChildren = true;

if (PREVIEW_ENV === 'figma') {
  figma.ui.resize(300, 100);
} else {
  figma.ui.resize(340, 530);
}

figma.ui.onmessage = async msg => {
  if (msg.type === 'clickGenerate') {
    const result = await generateJSON();
    figma.ui.postMessage({type: 'jsonGenerated', data: result})
  }
  if (msg.type === 'clickPreview') {
    if (PREVIEW_ENV !== 'figma') {
      figma.ui.resize(800, 500);
    }
    figma.ui.postMessage({type: 'previewResized'})
  }
  if (msg.type === 'previewEnd') {
    if (PREVIEW_ENV === 'figma') {
      figma.ui.resize(300, 100);
    } else {
      figma.ui.resize(340, 520);
    }
  }

  // if (msg.type === 'onPreviewMode') {
  //   if (PREVIEW_ENV !== 'figma') {
  //     figma.ui.resize(800, 500);
  //   }
  // }
    // figma.ui.postMessage({type: 'showImg', data: result})
    // console.log('Result: ')
    // const resultString = JSON.stringify(result)
    // // document.execCommand(resultString);
    // try {
    // console.log(document)
    // document.execCommand(resultString)
    // // figma.notify("JSON 复制成功")
    // } catch (e) {
    // console.error('Unable to copy content to clipboard!', e);
    // }

    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
};