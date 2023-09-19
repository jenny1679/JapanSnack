import { Outlet } from "react-router-dom";
// import SideBar from "./SideBar";
import Header from "./Header";

const Layout = () => {
    return (
        <main className="d-flex">
            {/* <div className="w-auto">
                <SideBar/>
            </div> */}
            <div className="col">
                <Header/>
                <Outlet/>
            </div>
        </main>
    )
}

export default Layout