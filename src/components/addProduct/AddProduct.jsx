import axios from "axios";
import { useContext, useEffect, useState } from 'react';
import './AddProduct.css';
import { useNavigate } from "react-router-dom";
import PageContainer from "../pageContainer/PageContainer";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { onBlurHandler, onChangeHanlder, onFileHandler, validLength, validNumber, validRequire } from "../../util/validators";
import { setTouched } from "../hook/lib";
import ErrorModal from "../UI/ErrorModal";
import FilePicker from "../UI/FilePicker";
import queryString from "query-string";
import ProductAPI from "../../API/ProductAPI";
import Image from "../UI/Image";
import { generateBase64FromImage } from "../../util/image";

const AddProduct = () => {
  const [name, setName] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [validLength({ min: 4 }), validRequire]
  });
  const [category, setCategory] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [validLength({ min: 4 }), validRequire]
  });
  const [price, setPrice] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [validNumber({ min: 1 }), validRequire]
  });
  const [shortDesc, setShortDesc] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [validLength({ min: 4 }), validRequire]
  });
  const [longDesc, setLongDesc] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [validLength({ min: 4 }), validRequire]
  });
  const [images, setImages] = useState({
    value: '',
    valid: false,
    touched: false,
    validators: [validRequire]
  });
  const [error, setError] = useState();
  const navigate = useNavigate();
  const cookieId = document.cookie.split('=')[1];

  const addHandler = async(e) => {
    e.preventDefault();

    setTouched(setName);
    setTouched(setCategory);
    setTouched(setPrice);
    setTouched(setShortDesc);
    setTouched(setLongDesc);

    if(images.value.length > 5) {
      setError({
        title: 'Images invalid',
        message: 'Limit 5 images!'
      })
      return;
    }

    if(
      !name.valid ||
      !category.valid ||
      !price.valid ||
      !shortDesc.valid ||
      !longDesc.valid
    ) {
      return;
    } else {
      const params = {
        category: category.value,
        img1: images.value[0],
        // img2: images.value[1],
        // img3: images.value[2],
        // img4: images.value[3],
        // img5: images.value[4],
        long_desc: longDesc.value,
        name: name.value,
        price: Math.random(),
        short_desc: shortDesc.value,
        price: price.value,
        cookieId: cookieId
      }
      // const query = '?' + queryString.stringify(params);
      // const response = await ProductAPI.postAddProduct(query, params.img1);
      const response = await fetch('http://localhost:5000/add-product', {
        method: 'POST',
        body: params.img1,
        // query: cookieId,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response);
      // console.log(images.value[0])
    }
  }

  const onChange = e => {
    console.log(e.target)
  }

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={() => setError(null)}
          error={!!error}
        />
      )}
      <PageContainer>
        <Card className="ahCard">
          <div className="listTitle ahListTitle">add product</div>
        </Card>
        <Card className="ahCardForm">
          <form className="ahFormControl">
            <Input 
              control="input"
              id="name"
              type="text"
              placeholder="Enter Product Name"
              label="Product Name"
              required={true}
              onChange={e => onChangeHanlder(e, setName, name.validators)}
              onBlur={e => onBlurHandler(e, setName, name.validators)}
              value={name.value}
              isValid={name.valid}
              isTouched={name.touched}
            />
            <Input 
              control="input"
              id="category"
              type="text"
              placeholder="Enter Category"
              label="Category"
              required={true}
              onChange={e => onChangeHanlder(e, setCategory, category.validators)}
              onBlur={e => onBlurHandler(e, setCategory, category.validators)}
              value={category.value}
              isValid={category.valid}
              isTouched={category.touched}
            />
            <Input 
              control="input"
              id="price"
              type="Number"
              placeholder="Enter price"
              label="price"
              required={true}
              onChange={e => onChangeHanlder(e, setPrice, price.validators)}
              onBlur={e => onBlurHandler(e, setPrice, price.validators)}
              value={price.value}
              isValid={price.valid}
              isTouched={price.touched}
              min={1}
            />
            <Input 
              control="textarea"
              id="shortDesc"
              type="text"
              placeholder="Enter Short Description"
              label="Short Description"
              required={true}
              onChange={e => onChangeHanlder(e, setShortDesc, shortDesc.validators)}
              onBlur={e => onBlurHandler(e, setShortDesc, shortDesc.validators)}
              value={shortDesc.value}
              isValid={shortDesc.valid}
              isTouched={shortDesc.touched}
              rows={5}
              cols={5}
            />
            <Input 
              control="textarea"
              id="longDesc"
              type="text"
              placeholder="Enter Long Description"
              label="Long Description"
              required={true}
              onChange={e => onChangeHanlder(e, setLongDesc, longDesc.validators)}
              onBlur={e => onBlurHandler(e, setLongDesc, longDesc.validators)}
              value={longDesc.value}
              isValid={longDesc.valid}
              isTouched={longDesc.touched}
              rows={5}
              cols={5}
            />
            <FilePicker
              control="input"
              id="images"
              placeholder="Enter Images"
              label="Upload image (5 images)"
              required={true}
              onChange={e => onFileHandler(e, setImages)}
              multiple={true}
            />
            <div style={{ marginTop: '15px' }}>
              {images.imagePreview && 
                images.imagePreview.map(i => <Image imageUrl={i} key={i} contain />)
              }
            </div>
            <button 
              className="btnSend"
              onClick={addHandler}
            >Submit
            </button>
          </form>
        </Card>
      </PageContainer>
    </>
  );
};

export default AddProduct;