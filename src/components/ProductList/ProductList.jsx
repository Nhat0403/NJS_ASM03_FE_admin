import './ProductList.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../UI/ErrorModal';
import Card from '../UI/Card';
import ProductAPI from '../../API/ProductAPI';
import queryString from 'query-string';

const ProductList = () => {
  const [error, setError] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const idUser = localStorage.getItem('id_user');
  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      idUser: idUser
    }
    const query = '?' + queryString.stringify(params);
    ProductAPI.getAllProducts(query)
      .then(res => {
        console.log(res);
        setProducts(res);
      });
  }, []);

  useEffect(() => {
    const params = {
      idUser: idUser,
      searchQuery: searchQuery
    }
    const query = '?' + queryString.stringify(params);
    ProductAPI.searchProductByQuery(query)
      .then(res => {
        console.log(res);
        setProducts(res);
      });
  }, [searchQuery]);

  console.log(searchQuery);

  const deleteHandler = (e) => {
    e.preventDefault();
  }

  const deleteProduct = () => {
    setError(null);
  };

  const errorHandler = () => {
    setError(null);
  };
  
  const addNewHandler = (e) => {
    e.preventDefault();
    navigate('/product/add-product');
  }

  const editHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="listContainer">
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onDelete={deleteProduct}
          onConfirm={errorHandler}
          onCancel={errorHandler}
          isDelete={error.isDelete}
          showOkay={error.showOkay}
        />
      )}
      <Card className="listCard tstCard">
        <div className="listTitle tstTitle" style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>product list</div>
        </div>
        <div className="productList flex">
          <input 
            type='search'
            id='searchProduct'
            placeholder='Enter Search!'
            required={true}
            onChange={e => setSearchQuery(e.target.value)}
            onBlur={e => setSearchQuery(e.target.value)}
            value={searchQuery}
            className='searchInput'
          />
          <button className="plBtn edit" onClick={addNewHandler}>Add New</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <div>
                  <input type="checkbox" name="all" id="tstAll" />
                </div>
              </th>
              <th>
                <div>ID</div>
              </th>
              <th>
                <div>Name</div>
              </th>
              <th>
                <div>Price</div>
              </th>
              <th>
                <div>Image</div>
              </th>
              <th>
                <div>Category</div>
              </th>
              <th>
                <div>Action</div>
              </th>
              <th>
                <div>Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {products && products.map(i => 
              <tr key={i._id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{i._id}</td>
                <td>{i.name}</td>
                <td>{i.price}</td>
                <td>
                  <img src={i.img1} alt="..." width="100%"/>
                </td>
                <td>{i.category}</td>
                <td>
                  <button 
                    id={i._id}
                    className="update action-btn"
                    onClick={editHandler}
                  >Update</button>
                </td>
                <td>
                  <button 
                    id={i._id}
                    className="delete action-btn"
                    onClick={deleteHandler}
                  >Delete</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ProductList;