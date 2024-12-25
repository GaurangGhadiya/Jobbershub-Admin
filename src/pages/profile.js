"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import api from "../../utils/api";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import EmployeeProfile from "../components/userManagement/profile";
import { useRouter } from "next/router"; 
import Cookies from "js-cookie";


const Profile = () => {
  const [showProfile, setShowProfile] = useState({});
  const [assets, setAssets] = useState([]);
  const [video, setVideo] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter(); 

  const employeeId = Cookies.get('employee_id'); 
  console.log(Cookies.get());
  useEffect(() => {
    if (!employeeId) return; 

    const getProfile = async () => {
      const reqData = { employee_id: employeeId };  
      try {
        const response = await api.post("/api/employee/get-employee", reqData);
        if (response.status === 200) {
          setShowProfile(response.data.data); 
          setAssets(response.data.assets);
          setAssets(response.data.assets);
          setVideo(response.data.videos);

         // console.log("Employee data is    ", response.data.data);
        }
      } catch (error) {
        dispatch(
          callAlert({
            message: error?.response?.data?.error || error.message,
            type: "FAILED",
          })
        );
      }
    };

    getProfile();  
  }, [employeeId, dispatch]);  

  return (
    <Layout>
      <EmployeeProfile showProfile={showProfile} assets={assets}  video={video} />  
    </Layout>
  );
};

export default Profile;
