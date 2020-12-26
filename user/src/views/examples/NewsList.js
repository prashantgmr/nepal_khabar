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

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios'
// core components
import Header from "../../components/Headers/Header.js";
import mapData from "../../data/districts.json";
import TableData from './TableData.js';
import { GlobalContext } from '../../context/GlobalContext.js';


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
export default function NewsList(props) {   
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const {news, getAllNews} = useContext(GlobalContext)
    const [status, setStatus] = useState(null)

    useEffect(() => {
      getAllNews();
      

        return  ()=>{
          setStatus(null);
        }
    }, [status]);


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
                    <Tab label={`Approved(${news.filter(x=>x.status == 'approved').length})`} {...a11yProps(1)} />
                    <Tab label={`Archived(${news.filter(x=>x.status == 'archived').length})`} {...a11yProps(2)} />
                  </Tabs>
                  {/* <h3 className="mb-0">news List</h3> */}
                </CardHeader>
                <TabPanel value={value} index={0}>
                 <TableData setStatus={setStatus} news={news}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <TableData setStatus={setStatus} news={news.filter(x=>x.status == 'approved')}/>

                </TabPanel>
                <TabPanel value={value} index={2}>
                <TableData setStatus={setStatus} news={news.filter(x=>x.status == 'archived')}/>

                </TabPanel>
              </Card>
            </div>
          </Row>
        </Container>
            
        </>
    )
}
