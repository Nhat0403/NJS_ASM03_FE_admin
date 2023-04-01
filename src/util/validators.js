import { generateBase64FromImage } from "./image";

export const validate = (value, set, validators) => {
  let valid = true;
  for(const validator of validators) {
    valid = valid && validator(value);
  };
  set(prev => ({
    ...prev,
    value: value,
    valid: valid
  }));
};

export const onChangeHanlder = (e, setInput, validators) => {
  const value = e.target.value;
  validate(value, setInput, validators);
};

export const onBlurHandler = (e, setInput, validators) => {
  const value = e.target.value;
  validate(value, setInput, validators);
  setInput(prev => ({
    ...prev,
    touched: true
  }));
};

export const onFileHandler = (e, setInput) => {
  const files = e.target.files;
  let imagePreview = [];
  for(const file of files) {
    generateBase64FromImage(file)
      .then(b64 => {
        imagePreview.push(b64);
      })
      .catch(err => console.log(err));
  }
  setInput(prev => ({
    ...prev,
    value: files,
    imagePreview: imagePreview
  }))
}

export const validRequire = value => value.trim() !== '';

export const validLength = config => value => {
  let isValid = true;
  if(config.min) {
    isValid = isValid && value.toString().trim().length >= config.min;
  }
  if(config.max) {
    isValid = isValid && value.toString().trim().length <= config.max;
  }
  return isValid;
};

// export const validEmail = value => {
//   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
//     value
//   );
// };

export const validEmail = value => value.includes('@');

export const validSelect = config => value => {
  let isValid = true;
  if(config.defaultSelect) {
    isValid = isValid && value !== config.defaultSelect;
  }
  return isValid;
};

export const validNumber = config => value => {
  let isValid = true;
  if(config.min) {
    isValid = isValid && +value >= config.min;
  }
  if(config.max) {
    isValid = isValid && +value <= config.max;
  }
  return isValid;
};

export const valid = config => value => {
  let isValid = true;
  isValid = isValid && config.type;
  return isValid;
}

