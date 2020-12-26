import React,{useState,useEffect,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {

    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,

    FormGroup,
    Label,
    Input,

  } from "reactstrap";
import MaterialTable from "material-table";
import axios from 'axios'

import { tableIcons } from "../../components/MaterialTableIcons";
import { GlobalContext } from '../../context/GlobalContext';

export default function TableData(props) {
    const history = useHistory();
    const {deleteNews}  = useContext(GlobalContext)
;    const {status, setStatus,  news} = props
     function handleStatus(id,status){
        // console.log(id,status);
         setStatus(status)
          fetchStatusAPI(id,status);
      }
        async function fetchStatusAPI(id,status) {
          
              await axios.post(`http://localhost:5000/api/v1/news/change_status`, {id:id, status:status})
          };
      

        function handleEdit(id){
            history.push(`edit/${id}`)
        }

    return (
        <MaterialTable className="px-0"
        icons={tableIcons}
        columns={[
          { title: "Featured Image",
          render :(rowData)=><img src={`../../${rowData.imageFile}`} width="100%" height="50" style={{objectFit:"contain"}}/>
          
        },

          {
            title: "Date",
            field: "createdAt",
            // render :(rowData)=> rowData.createdAt.toUTCString()

          },
          {
            title: "District",
            field : "district",
          //   render : (rowData)=> {
          //     let dist = mapData.features.filter(x=>x.idx == rowData.district);
          //     console.log(dist, "dist")
          //     return (
          //     false //  dist.length && dist[0].properties.जिल्ला
          //     );
          //   }
          },
          { title: "Title", field: "newsTitle" },

          {
            title: "Status",
            render: (rowData) => {
              let bgColor;
            if(rowData.status=='approved'){
              bgColor="green"
            }
            else if(rowData.status=='rejected')
            {
              bgColor="red"
            }
            else if(rowData.status=='archived')
            {
              bgColor="gray"
            }
              return (
              rowData.status == "" ?
               <FormGroup  check  >
                <Label className="d-block">
                    <Input type="radio" name={`${rowData._id}status`} value="approved"  onChange={(e)=>handleStatus(rowData._id, e.target.value)}/>
                Approve
                </Label>
                {/* </FormGroup>
                <FormGroup check> */}
                <Label className="d-block">
                    <Input type="radio" name={`${rowData._id}status`} value="rejected"  onChange={(e)=>handleStatus(rowData._id, e.target.value)}/>
                    Reject
                </Label>
               </FormGroup> :
               <span style={{textTransform:"capitalize",backgroundColor:bgColor, color:"#fff",padding:".25rem .75rem"}}>{rowData.status}</span>
              )},
          },
          {
            title: "",
            render: (rowData) => (
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={e => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    onClick={()=>handleEdit(rowData._id)}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={()=>deleteNews(rowData._id)}
                  >
                   Delete
                  </DropdownItem>
   
                  <DropdownItem
                    onClick={()=>handleStatus(rowData._id,"archived")}
                  >
                    Archive
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ),
          },
        ]}
        data={news}
        title=""
      />
    )
}
