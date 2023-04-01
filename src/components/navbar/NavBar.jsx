import { useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { deleteSession } from "../Redux/Action/ActionSession";
import setCookie from '../../setCookie';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idUser = localStorage.getItem('id_user');
  const nameUser = localStorage.getItem('name_user');

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
		const action = deleteSession('');
		dispatch(action);
    setCookie('deleted', null, +0);
    navigate('/auth/login');
  };

  return (
    <div className={`spaceContent navItems`}>
      {idUser && (
        <div>{nameUser}</div>
      )}
      {idUser && (
        <button className="navButton" onClick={logoutHandler}>Logout</button>
      )}
      {!idUser && (
        <Link to="/auth/signup">
          <button className="navButton">Sign Up</button>
        </Link>
      )}
      {!idUser && (
        <Link to="/auth/login">
          <button className="navButton">Login</button>
        </Link>
      )}
    </div>
  );
};

export default NavBar;