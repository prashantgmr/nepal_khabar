import React, { useState, useEffect, useRef} from 'react';
import { Map, GeoJSON} from "react-leaflet";
import mapData from "./../data/districts.json";
import "leaflet/dist/leaflet.css";
import axios from 'axios'
import NewsBrief from './NewsBrief';

export default function NepalMap() {
    const [selectDistrict, setSelectDistrict] = useState('');
    const [news, setNews] = useState([]);
    const geojson = useRef();
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get(`http://localhost:5000/api/v1/news`)
            response = await response.data.data;
            const newsData = response.filter(x=>x.district == selectDistrict)
            setNews(newsData);
        };
        if(selectDistrict){
        fetchMyAPI()
        }

    }, [selectDistrict]);


    var i = 1 ,fillColour;
    Object.keys(mapData.features).map(
    (e) => {
        mapData.features[e]["idx"] = i;
        i++
    });
    const districtStyle = {
        fillColor: fillColour,
        fillOpacity: 1,
        color: "black",
        weight: .75,
        };
    
    const districtClicked = (e) => {
        e.target.setStyle({
            fillColor : "yellow",
            fillOpacity: 1,
            weight:1
        });
        setSelectDistrict(e.target.feature.idx);
        
    }
   
    
    const onEachDistrict = (district, layer) => {
        const id = district.idx;
        if (id < 15) {
            fillColour = "#ffcebc"
        } else if (id < 23) {
            fillColour = "#addeff"
        } else if (id < 36) {
            fillColour = "#daf7a2"
        } else if (id < 47) {
            fillColour = "#e0bdee"
        } else if (id < 59) {
            fillColour = "#ffcc78"
        } else if (id < 69) {
            fillColour = "#b2ee97"
        } else {
            fillColour = "#f5b4ef"
        }
        layer.options.fillColor = fillColour;
        const name = district.properties.जिल्ला;
        console.log(name, district.idx)
        layer.bindTooltip(name,{permanent: true, direction:"center" , className:"leaflet-label"});
        layer.bindPopup(name);
        layer.on({
            click: districtClicked,
        });
      };
    return (
        <div>
        <Map style={{ height: "80vh" }} center={[28.5,84]} zoom={7.35} minZoom={6} maxZoom={8}>
    
          <GeoJSON
            ref= {geojson}
            style={districtStyle}
            data={mapData.features}
            onEachFeature={onEachDistrict}
          />
        </Map>
        <div className="news_section">
            {news.length && news.map((item)=>(
                   <NewsBrief  key={item._id} {...item}/>
            ))}
        </div>
      </div>
    )
}
