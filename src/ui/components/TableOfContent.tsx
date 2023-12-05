import * as React from "react";
import { useEffect, useState } from 'react';
import { useHeadsObserver } from "../../modules/observeActiveHeading";


export const TableOfContent = () => {
    const [headings, setHeadings] = useState([])
    const {activeId} = useHeadsObserver()


    const getStyle = (level) => {
        switch (level) {
          case 2:
            return 'level-1'
          case 3:
            return 'level-2'
          default:
            return null
        }
      }
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3"))
          .map((elem) => ({
            id: elem.id,
            text: elem.innerHTML,
            level: Number(elem.nodeName.charAt(1))
          }))
        setHeadings(elements)
        console.log(elements)
      }, [])
      
      return (
          <nav>
            <ul>
              {headings.map(heading => (
                <li key={heading.text} className={`doc-table-content ${activeId === heading.id ? 'active': ''}`}>
                    <a
                        className={`table-content-text ${activeId === heading.id ? 'active' : ''} ${getStyle(heading.level)}`}
                        href={`#${heading.id}`}
                        onClick={(e) => {
                            e.preventDefault()
                            document.querySelector(`#${heading.id}`).scrollIntoView({
                                behavior: "smooth"})
                        }}>
                        {heading.text}
                    </a>
                </li>
              ))}
            </ul>
          </nav>
        )
}