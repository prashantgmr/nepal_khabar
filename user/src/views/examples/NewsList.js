import React , {useState, useEffect, useContext} from 'react'
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  FormGroup,
  Label,
  Input,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import { tableIcons } from "../../components/MaterialTableIcons";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios'
// core components
import Header from "../../components/Headers/Header.js";
import mapData from "../../data/districts.json";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
export default function NewsList() {
    const [news, setNews] = useState([]);
    const [status, setStatus] = useState(null);
    const [delClicked, setDelClicked]= useState(false)
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      fetchMyAPI();
      return  ()=>{
        setStatus(null);
        setDelClicked(false)
      }
  }, [status, delClicked]);
  
  async function fetchMyAPI() {
      let response = await axios.get(`http://localhost:5000/api/v1/news`)
      response = await response.data.data;
      setNews(response);
  };
    function handleStatus(id,status){
      // console.log(id,status);
       setStatus(status)
        fetchStatusAPI(id,status);
    }
      async function fetchStatusAPI(id,status) {
        
            await axios.post(`http://localhost:5000/api/v1/news/change_status`, {id:id, status:status})
        };
    
      function handleDel(id){
          deleteNews(id);
          setDelClicked(true);
      }
      async function  deleteNews(id) {
          try {
            await axios.delete(`/api/v1/news/${id}`);
      
          } catch (err) {
            // dispatch({
            //   type: 'TRANSACTION_ERROR',
            //   payload: err.response.data.error
            // });
          }
        }
    return (
        <>
        <Header />
        <Container className="mt-n4" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0 pb-0">
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label={`All(${news.length})`} {...a11yProps(0)} />
                    <Tab label="Approved" {...a11yProps(1)} />
                    <Tab label="Archived" {...a11yProps(2)} />
                  </Tabs>
                  {/* <h3 className="mb-0">news List</h3> */}
                </CardHeader>
                <TabPanel value={value} index={0}>
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
                    // {
                    //   title: "District",
                    //   render : (rowData)=> {
                    //     let dist = mapData.features.filter(x=>x.idx == rowData.district);
                    //     console.log(dist, "dist")
                    //     return (
                    //     false //  dist.length && dist[0].properties.जिल्ला
                    //     );
                    //   }
                    // },
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
                              onClick={e => e.preventDefault()}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              onClick={()=>handleDel(rowData._id)}
                            >
                             Delete
                            </DropdownItem>
                            <DropdownItem
                              onClick={e => e.preventDefault()}
                            >
                              Details
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
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
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
              </Card>
            </div>
          </Row>
        </Container>
            
        </>
    )
}
