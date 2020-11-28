import React from 'react'
import parse from "html-react-parser"

export default function NewsBrief({newsTitle, newsContent, imageFile}) {
    return (
        <div className="newsbrief ">
            <img src={`http://localhost:3000/${imageFile}`} width="100%"/>
            <div><h1>{newsTitle}</h1>
            <p>{parse(newsContent)}</p>
            </div>
        </div> 
    )
}
