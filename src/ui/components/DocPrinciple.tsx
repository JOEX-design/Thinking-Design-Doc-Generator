import * as React from "react";
import generateImgSrc from "../../modules/generateImgSrc";

const dotContent = (colorType) => {
  if (colorType === 'green') return '✓';
  else if (colorType === 'red') return '✗';
  else if (colorType === 'orange') return '!';
  else return '';
}


export const DocPrinciple = ({
  principle,
}) => {
  const principleItem = principle.map(row =>
    <div key={row.rowId} className="principle-row">
      {row.item.map(item => {
        return (
          <div key={item.itemId}  className={`principle-item ${row.length==2 ? "half" : "full"}`}>
            <img src={generateImgSrc(item.img)}></img>
              <div className="principle-item-content">
                <div className={`principle-dot ${item.type}`}>{dotContent(item.type)}</div>
                <div className={`principle-dot-desc ${item.type}`}>{item.title}</div>
              </div>
            <p>{item.desc}</p>
          </div>
        )
      })}
    </div>
  );

  return (
    <div className="doc-section-wrapper">
      <div className="doc-section">
        <h2 id="使用原则">使用原则</h2>
        <div className="type-list">{principleItem}</div>
      </div>
    </div>
  )
}

