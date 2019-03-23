import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
// import HomePage from '../pages/HomePage/HomePage'
import MyInf from '../pages/MyInf/MyInf'
import InfItem from '../pages/MyInf/InfItem/InfItem'
import ItemName from '../pages/MyInf/InfItem/ItemName'
import ItemPhone from '../pages/MyInf/InfItem/ItemPhone'
import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Shops from '../pages/Shops/Shops'
// import MyCar from '../pages/MyCar/MyCar'
// import MyOrder from '../pages/MyOrder/MyOrder'
import App from '../App'


const Router = () => (
    <HashRouter >
        <Switch>
            <Route exact path="/" component={MyInf}/>
            <Route  path="/V1" component={App}/>
            <Route  path="/search" component={Search}/>
            <Route  path="/login" component={Login}/>
            <Route  path="/shops" component={Shops}/>
            <Route  path="/infitem" component={InfItem}/>
            <Route  path="/itemname" component={ItemName}/>
            <Route  path="/itemphone" component={ItemPhone}/>
            {/* <Route exact path="/mycar" component={MyCar}/>
            <Route exact path="/myorder" component={MyOrder}/>
            <Route exact path="/myinf" component={MyInf}/> */}
        </Switch>
    </HashRouter>
);

export default Router;