/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import Maps from "./views/examples/Maps.js";
import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";
import Tables from "./views/examples/Tables.js";
import AddNews from "./views/examples/AddNews.js";
// import NewsList from "./views/examples/NewsList.js";
import CreateUser from "./views/examples/CreateUser.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/add_news",
    name: "Add News",
    icon: "ni ni-planet text-blue",
    component: AddNews,
    layout: "/admin"
  },
  //    {
  //   path: "/news_list",
  //   name: "News List",
  //   icon: "ni ni-planet text-green",
  //   component: NewsList,
  //   layout: "/admin"
  // },
  {
    path: "/create_user",
    name: "Create User",
    icon: "ni ni-single-02 text-yellow",
    component: CreateUser,
    layout: "/admin"
  },
 
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
];
export default routes;
