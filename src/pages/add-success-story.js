"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import StoryTransactions from "@/components/Miscellaneous/add_success_story";


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

function AddStory(props) {
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const dispatch = useDispatch();
    const uid = Cookies.get('uid');
    return (


        <Layout>
            <StoryTransactions  />
        </Layout>


    );
}
export default withAuth(AddStory);

