import styled from "./sidebar.module.css";
import { Link, Outlet } from "react-router-dom";
import AppNav from "../components/AppNav";
import Logo from "./Logo";
function Sidebar() {
  return (
    <div className={styled.sidebar}>
      <Link to="/">
        <Logo />
      </Link>
      <AppNav />
      <Outlet />
      <footer className={styled.footer}>
        <p className={styled.copyright}>
          &copy;Copyright {new Date().getFullYear()} by <strong>Habib</strong>
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
