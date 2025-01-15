import withAuth from "../../utils/withAuth";
import Layout from "@/components/Dashboard/layout";
import Dashboard from "@/components/Dashboard/dashboard";
import Image from 'next/image';
import banner from '../../public/banner.jpg'
import StickyTable from "./table";

const dashboard = () => {


    return (
        <>
        <StickyTable />
            {/* <Layout > */}
                {/* <br/> */}
                {/* <br/> */}
                {/* <Dashboard/> */}
            {/* <Image
                src={banner}
                alt="Banner"
                style={{width: '100%', height: 'auto'}}
                
            /> */}
            {/* </Layout> */}
        </>
    )
}
export default withAuth(dashboard);