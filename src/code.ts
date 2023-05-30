import generateJSON from "./modules/generateJSON";

figma.showUI(__html__, {
  themeColors: true
});
figma.skipInvisibleInstanceChildren = true;
figma.ui.resize(380, 480);


// onmessage = (event) => {
//   console.log(event.data.pluginMessage);
//   const jsonContainer = document.getElementById('jsonContainer');
//   jsonContainer.textContent = JSON.stringify(event.data.pluginMessage);
// }


  let result ={}
figma.ui.onmessage = async msg => {
  if (msg.type === 'generate') {
    result = await generateJSON();

    console.log(result)
  }

if (msg.type === 'copyJSON') {
  console.log(result)
  figma.ui.postMessage({type: 'copyJSON', data: result})
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
}
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};