"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import AddAffiliateLinkTransactions from "@/components/AffiliateLink/AddAffiliateLink";


const drawWidth = 220;


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    borderRadius: 2,
    // border: '2px solid #000',
    boxShadow: 24, overflow: 'auto'
};

const innerStyle = {
    overflow: 'auto',
    width: 400,
    height: 400,
};




function AddMeeting(props) {
    useEffect(() => {
        const getMenus = JSON.parse(localStorage.getItem('menu'));
        const page_url = 'affiliate-link-list';
        let foundMenu = false;
        
    
        for (const item of getMenus) {
            if (item.menu_url === page_url && item._insert == 1) {
                foundMenu = true;
                break; 
            }
            
        }
        if (!foundMenu) {
            window.location.href = '/dashboard'; 
        }
    }, []);
    return (

        <Layout>
            <AddAffiliateLinkTransactions  />
        </Layout>


    );
}
export default withAuth(AddMeeting);

