import NavBar from '../navbar/NavBar';
import SideBar from '../sidebar/SideBar';
import './PageContainer.css';

const PageContainer = (props) => {
  return (
    <div className="container">
      <SideBar />
      <div>
        <NavBar />
        <div className="pageContent">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;