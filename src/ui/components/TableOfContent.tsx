import * as React from "react";
import { useEffect, useState } from 'react';
import { useHeadsObserver } from "../../modules/observeActiveHeading";


export const TableOfContent = () => {
    const [headings, setHeadings] = useState([])
    const {activeId} = useHeadsObserver()


    const getStyle = (level) => {
        switch (level) {
          case 2:
            return 'pl-0'
          case 3:
            return 'pl-3'
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
                <li key={heading.text} className={`text-sm text-slate-500 pr-2 border-r-2 ${activeId === heading.id ? 'border-slate-800' : 'border-slate-100'}  py-1 pr-3`}>
                    <a
                        className={`${activeId === heading.id ? 'text-slate-800 font-medium' : 'text-slate-400'} ${getStyle(heading.level)}  truncate max-w-[120px] inline-block hover:text-slate-900`}
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