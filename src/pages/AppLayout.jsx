import Map from "../components/Map";
import Sidebar from "../components/SideBar";
import User from "../components/User";
import styled from "./AppLayout.module.css";
function AppLayout() {
  return (
    <div className={styled.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
