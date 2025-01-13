"use client"
import React, { useContext, useEffect, useState } from "react";
import withAuth from "../../utils/withAuth";
import Layout from "@/components/Dashboard/layout";
import Transactions from "@/components/userManagement/all-affiliate-dashboard";


function TransactionHistory(props) {
    const [showServiceTrans, setShowServiceTrans] = useState({});
  
    return (
        
        <Layout>
                <Transactions showServiceTrans={TransactionHistory} />
        </Layout>

    );
}
export default withAuth(TransactionHistory);

