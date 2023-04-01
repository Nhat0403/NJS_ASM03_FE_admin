import './DashBoard.css';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ErrorModal from '../UI/ErrorModal';
import Card from '../UI/Card';
import OrderAPI from '../../API/OrderAPI';
import UserAPI from '../../API/UserAPI';
import queryString from 'query-string';
import convertMoney from '../../convertMoney';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faFile,
  faUser,
  
} from "@fortawesome/free-solid-svg-icons";
import alertify from 'alertifyjs';

const DashBoard = () => {
  const [error, setError] = useState();
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [earningThisMonth, setEarningThisMonth] = useState(0);
  const [newOrders, setNewOrders] = useState([]);
  const idUser = localStorage.getItem('id_user');

  const params = {
    idUser: idUser
  }
  const query = '?' + queryString.stringify(params);

  useEffect(() => {
    OrderAPI.getAllOrders(query)
      .then(res => {
        // console.log(res);
        setOrders(res.orders);
        setEarningThisMonth(res.earningThisMonth);
        setNewOrders(res.newOrders.length);
      })
      .catch(err => console.log(err));
    }, []);
    
  useEffect(() => {
    UserAPI.getAllClients(query)
      .then(res => {
        // console.log(res);
        setUsers(res);
      })
      .catch(err => console.log(err));
  }, []);

  const viewHandler = e => {
    e.preventDefault();
  }

  const errorHandler = e => {
    e.preventDefault();
  }

  return (
    <div className="listContainer">
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
          onCancel={errorHandler}
          isDelete={error.isDelete}
          showOkay={error.showOkay}
        />
      )}
      <Card className="listCard tstCard dashboard">
        <div>Dash Board</div>
        <div className="grid dbContainer">
          <div className="dbItem flex">
            <div className="dbInfo flex-column">
              <div className="dbTitle">{users.length}</div>
              <div className="dbText">Clients</div>
            </div>
            <div className="dbIcon">
              <FontAwesomeIcon icon={faUser} className="sbIcon" />
            </div>
          </div>
          <div className="dbItem flex">
            <div className="dbInfo flex-column">
              <div className="dbTitle earning">
                {convertMoney(earningThisMonth)}
                <sup>  VND</sup>
              </div>
              <div className="dbText">Earnings of Month</div>
            </div>
            <div className="dbIcon">
              <FontAwesomeIcon icon={faDollar} className="sbIcon" />
            </div>
          </div>
          <div className="dbItem flex">
            <div className="dbInfo flex-column">
              <div className="dbTitle">{newOrders}</div>
              <div className="dbText">New Order</div>
            </div>
            <div className="dbIcon">
              <FontAwesomeIcon icon={faFile} className="sbIcon" />
            </div>
          </div>
        </div>
        <h1>History</h1>
        <table>
          <thead>
            <tr>
              <th>
                <div>
                  <input type="checkbox" name="all" id="tstAll" />
                </div>
              </th>
              <th>
                <div>ID User</div>
              </th>
              <th>
                <div>Name</div>
              </th>
              <th>
                <div>Phone</div>
              </th>
              <th>
                <div>Address</div>
              </th>
              <th>
                <div>Total</div>
              </th>
              <th>
                <div>Delivery</div>
              </th>
              <th>
                <div>Status</div>
              </th>
              <th>
                <div>Detail</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map(i => 
              <tr key={i._id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{i.userId}</td>
                <td>{i.fullname}</td>
                <td>{i.phone}</td>
                <td>{i.address}</td>
                <td>{convertMoney(i.total)}</td>
                <td>{i.delivery || 'ok'}</td>
                <td>{i.status || 'ok'}</td>
                <td>
                  <button 
                    id={i._id}
                    className="update action-btn"
                    onClick={viewHandler}
                  >View</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default DashBoard;