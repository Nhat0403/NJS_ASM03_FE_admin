import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faUser,
  faBox,
  faRightToBracket
} from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSession } from "../Redux/Action/ActionSession";
import setCookie from "../../setCookie";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idUser = useSelector((state) => state.Session.idUser);
  const userRole = useSelector((state) => state.Session.role);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
		const action = deleteSession('');
		dispatch(action);
    setCookie('deleted', null, +0);
    navigate('/auth/login');
  }

  return (
    <div className="sideBarContainer">
      <div className="sbSubContainer">
        <div className="sbHeader">
          <h1>Admin Page</h1>
        </div>
        {idUser && (
          <div className="sbListContainer">
            <div className="sbListContent">
              <div className="sbListTitle">
                main
              </div>
              { userRole === 'admin' &&
              <ul className="sbList">
                <li className="sbListItem">
                  <FontAwesomeIcon icon={faFile} className="sbIcon" />
                  <NavLink 
                    to="/home" 
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={(e) => idUser ? "" : e.preventDefault()}
                  >
                    <div>dashboard</div>
                  </NavLink>
                </li>
              </ul>}
            </div>
            <div className="sbListContent">
              <div className="sbListTitle">
                list
              </div>
              <ul className="sbList">
                <li className="sbListItem">
                  <FontAwesomeIcon icon={faUser} className="sbIcon" />
                  {/* <NavLink 
                    to="/user" 
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={(e) => idUser ? "" : e.preventDefault()}
                  > */}
                    <div>users</div>
                  {/* </NavLink> */}
                </li>
                { userRole === 'admin' && <li className="sbListItem">
                  <FontAwesomeIcon icon={faBox} className="sbIcon" />
                  <NavLink 
                    to="/product" 
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={(e) => idUser ? "" : e.preventDefault()}
                  >
                    <div>products</div>
                  </NavLink>
                </li>}
                <li className="sbListItem">
                  <FontAwesomeIcon icon={faBox} className="sbIcon" />
                  <NavLink 
                    to="/chat" 
                    className={({ isActive }) => (isActive ? "active" : "")}
                    onClick={(e) => idUser ? "" : e.preventDefault()}
                  >
                    <div>chat</div>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="sbListContent">
              <div className="sbListTitle">
                user
              </div>
              <ul className="sbList">
                <li className="sbListItem">
                  <FontAwesomeIcon icon={faRightToBracket} className="sbIcon" />
                  <div className="sbLogout" onClick={logoutHandler}>logout</div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideBar;