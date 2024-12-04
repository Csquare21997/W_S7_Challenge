import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import axios from 'axios';


// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const schema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required('FullName is required'),
  
  size: Yup.string()
    .oneOf(['S', 'M', 'L'], validationErrors.sizeIncorrect)
    .required('Size is required')
});

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
];
const initalFormValues = {
  fullName:'',
  size:'',
  toppings:[] 
}
const initalErrors = {
  fullName:'',
  size:'',

}


export default function Form() {
  const [formValues, setFormValues] = useState (initalFormValues);
  const [errors, setErrors] = useState (initalErrors);
  const [isDisabled, setisDisabled ] = useState (false);
  const [message, setMessage] = useState ('')

  useEffect (() => {                               
  schema.isValid(formValues).then ((valid) => {
    setisDisabled (valid);
})
.catch(() => setisDisabled(false))
  },[formValues]);

  const handleTextChange = (e) => {
    const {value, id} = e.target;
    setFormValues({...formValues,[id]:value})

    Yup.reach (schema, id).validate (value.trim ())
    .then (() => setErrors({...errors,[id]: ''}))
    .catch ((error) => setErrors({...errors,[id]:error.errors[0] }))
    }

  const handleCheckboxChange = (e)=>{
    const {checked, name}=e.target;
    if(checked){
      setFormValues({...formValues,toppings: [...formValues.toppings, name]})
    }else{
      setFormValues({...formValues, toppings:formValues.toppings.filter (t=>t !== name)})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault ();
    const response = await axios.post('http://localhost:9009/api/order', formValues);
    setMessage (response.data.message);
    setFormValues (initalFormValues);
  }
 
  
  console.log (formValues)
  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {message && <div className="success">{message}</div>}
      

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input onChange={handleTextChange} value={formValues.fullName} placeholder="Type fullName" id="fullName" type="text" />
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
      </div>
      
      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select onChange={handleTextChange} value={formValues.size} id="size">
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">medium</option>
            <option value="L">Large</option>
          </select>
        </div>
        {errors.size && <div className='error'>{errors.size}</div>}
      </div>

      <div className="input-group">
        {toppings.map ((topping)=>
        <label key={topping.topping_id}>
        <input onChange= {handleCheckboxChange} checked={formValues.toppings.includes(topping.topping_id)} name={topping.topping_id}type="checkbox"/>
        {topping.text}
        <br />
      </label>
        
        )}
        
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input disabled= {!isDisabled} type="submit" />
    </form>
  )
}
