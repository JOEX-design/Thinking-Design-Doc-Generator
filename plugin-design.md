## Content Extractor
- 负责将 Frame 中符合结构/命名的内容提取，组合成 CotentObject
## Image Extractor
- 负责将 ContentObject 中含有图片的文案对应图片提取为 base64 格式的string，塞进 CotentObject
## JSON Builder
- 将 ContentObject 转换为 JSON 格式
## File Export
- 导出 JSON、同步至 Github