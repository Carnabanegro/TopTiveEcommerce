import * as React from 'react';
import {Link} from 'react-router-dom'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SellIcon from '@mui/icons-material/Sell';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {map} from "lodash";
import {ListItemText} from "@mui/material";

export default function Menu({menuItems}) {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };
    const list = () => (
        <Box
            sx={{width: 250, background:'#FC5130', height: '100%'}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {map(menuItems, function (item) {
                    if (item.name !== "Login" && item.name !== "Register") {
                        return (
                            <ListItem button key={item.key}  component={Link} to={item.path}>
                                <ListItemIcon>
                                    {item.name === "My Sells" && <SellIcon/>}
                                    {item.name === "My Buys" && <ShoppingBagIcon/>}
                                    {item.name === "Home" && <HomeIcon/>}
                                    {item.name === "Statistics" && <BarChartIcon/>}
                                    {item.name === "Admin panel" && <AdminPanelSettingsIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={item.name}/>
                            </ListItem>
                        );
                    }
                })}
            </List>
        </Box>
    );


    return (
        <div>
            <React.Fragment key={'left'}>
                <Button color="inherit" onClick={toggleDrawer('left', true)}>
                    <MenuIcon/>
                    &nbsp;
                    Menu
                </Button>
                <Drawer
                    anchor='left'
                    open={isOpen}
                    onClose={toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}