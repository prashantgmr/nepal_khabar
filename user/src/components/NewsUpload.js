import React, {useReducer} from 'react'
import mapData from '../data/districts.json'
import { useForm } from "react-hook-form";
import axios from 'axios';

const initialstate = {
    news : [],
    error: null
}
 const  reducer = (state = initialstate, action) => {
    switch(action.type) {
      case 'ADD_TENDER':
        return {
          ...state,
          news: [...state.news, action.payload]
        }
    case 'NEWS_ERROR':
      return {
        ...state,
        error: action.payload
      }
      
      default:
        return state;
    }
  }

export default function NewsUpload() {
    const { register, handleSubmit } = useForm();
    const [state, dispatch] = useReducer(reducer, initialstate)
    var i = 1 ;
    Object.keys(mapData.features).map(
    (e) => {
        mapData.features[e]["idx"] = `${i}`;
        i++
    });
    const district = mapData.features.map(x=>x);
    const onSubmit=(data) =>{
        // const newNews = {
        //     district : data.district,
        //     newsTitle : data.title,
        //     newsContent : data.content,
        //     imageFile : data.imageFile[0]
        // }
        let newNews = new FormData();
        newNews.append("district",data.district);
        newNews.append("newsTitle",data.title);
        newNews.append("newsContent",data.content);
        newNews.append("imageFile",data.imageFile[0])
        console.log(newNews)
        addedNews(newNews)
    }

    async function addedNews(newNews) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/v1/news',newNews , config);
            // res = await response.data.data;
            console.log(res);
            dispatch({
                type: 'ADD_NEWS',
                payload: res.data.data
              });
        } 
        catch (err) {
            dispatch({
                type: 'NEWS_ERROR',
                payload: err.response.data.error
              });
        }
    }

    return (
        <section>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">
                    <div className="form-group">
                    <label htmlFor="district">Select the district</label>
                    <select name="district" ref={register}>
                        {district.map(x=><option key={x.idx} value={x.idx}>{x.properties.जिल्ला}</option>)}
                    </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="title">Enter News Title</label>
                    <input name="title" placeholder="Enter the news title here" ref={register}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="content">Enter News Content</label>
                    <textarea name="content" defaultValue="Place your content here" ref={register}  rows="5"/>
                    </div>
                    <div className="form-group">
                     <input type="file" name="imageFile" ref={register}/>
                    </div>
                    <button type="submit">Publish</button>
                </form>
            </div>
        </section>
    )
}
