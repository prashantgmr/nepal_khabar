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
import CountDown from '../../components/CountDown.js';

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
    const [tender, setTender] = useState([]);
    const [status, setStatus] = useState(null)
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      fetchMyAPI();
      return  ()=>{
        setStatus(null)
      }
  }, [status]);
  async function fetchMyAPI() {
      let response = await axios.get(`http://localhost:5000/api/v1/news`)
      response = await response.data.data;
      setTender(response);
  };
    function handleStatus(id,status){
      // console.log(id,status);
       setStatus(status)
        fetchStatusAPI(id,status);
    }
      async function fetchStatusAPI(id,status) {
        
            await axios.post(`http://localhost:5000/api/v1/tender/change_status`, {id:id, status:status})
        };
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
                    <Tab label={`All(${tender.length})`} {...a11yProps(0)} />
                    <Tab label="Selected" {...a11yProps(1)} />
                    <Tab label="Rejected" {...a11yProps(2)} />
                  </Tabs>
                  {/* <h3 className="mb-0">Tender List</h3> */}
                </CardHeader>
                <TabPanel value={value} index={0}>
                  <MaterialTable className="px-0"
                  icons={tableIcons}
                  columns={[
                    {
                      title: "Project Title",
                      field: "ProjectTitle",
                    },
                    { title: "IFB NO:", field: "IFBNo" },
                    { title: "Procurement Method", field: "Procurement" },
                    {
                      title: "Project Address",
                      field: "PublicAddress",
                    },
                    { title: "Public Entity", field: "Publicentity" },
                    // { title: "Procurement Method", field: "Procurement" },
                    {
                      title: "Days Remaining",
                      render: (rowData) => (
                        <CountDown date={rowData.bidsubdate} dateAD={rowData.dateAD} />
                      ),
                    },

                    {
                      title: "Status",
                      render: (rowData) => {
                        let bgColor;
                      if(rowData.status=='selected'){
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
                              <Input type="radio" name={`${rowData._id}status`} value="selected"  onChange={(e)=>handleStatus(rowData._id, e.target.value)}/>
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
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                             Delete
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Details
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      ),
                    },
                  ]}
                  data={tender}
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
