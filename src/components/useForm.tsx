import { UserForm, UserFormProperties } from '../common/user.field';
import {useForm} from 'react-hook-form'
import { FC, useEffect } from 'react';
import '../styles/App.css'

const UserFormStep: FC<UserFormProperties> = ({FormData, SetFormData, nextStep}) => {

const {register, watch, handleSubmit, formState:{errors}, setValue} = useForm()
  

  //KEEP THE VALUES IN THE FIELD
  useEffect(() => {
    (Object.keys(FormData) as Array<keyof UserForm>).forEach(key => {
      setValue(key, FormData[key])
    })
  }, [FormData, SetFormData])

  const onSubmit = (data: any) => {
    SetFormData(data)
    nextStep()
  }

  return (
    <div className='container_parent' >
    <h1>Register</h1>
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Name and Last Name: </label>
          <input type="text" id="name" className='user' 
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 5,
              message: "Name must have minimun 5 characters"
            },
            maxLength: {
              value: 40,
              message:"Name must have maximun 40 characters"
            },
          })} />
          {errors.name && typeof errors.name.message === 'string' && <span>{errors.name.message}</span>}

          <label htmlFor="">Email</label>
          <input type="email" className='user' {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
              message: "The email is invalid, please try with another email"
            }
          })}/>
          {errors.email && typeof errors.email.message === 'string' && <span>{errors.email.message}</span>}

          <label htmlFor="">Cellphone</label>
          <input type="text" className='user' {...register("phone", {
            required: "Cellphone is required",
            minLength: {
              value: 10,
              message: "Please valid your cellphone"
            },
            maxLength: {
              value: 10,
              message: "The maximun of the digits in your cellphone is 11, please confirm the cellphone" 
            }

          })}/>
          {errors.phone && typeof errors.phone.message === 'string' && <span>{errors.phone.message}</span>}

          <label htmlFor="">Role</label>
          <select id="role" className='user' defaultValue={'person'} {...register("role", {
            required: "role is required"
          })}>
          {errors.role && typeof errors.role.message === 'string' && <span>{errors.role.message}</span>}
            <option value="business">Business</option>
            <option value="person">Person</option>
          </select>

        {   
        watch("role") === "business" && (

              <>
              <label htmlFor=""> Manager Name: </label>
              <input type="text" id="manager_name" {...register("manager_name", {
              required: "The manager name is required",
              minLength: {
                value: 2,
                message: "The minimun of characters for this name is 2"
              },
              maxLength: {
                value: 50,
                message: "The maximun of characters are 50"
              },  
              })}/>

              <label htmlFor="">Manager Email: </label>
              <input type="text" id="manager_email"/>

              <label htmlFor=""> Contact Number: </label>
              <input type="text" id="contact_number"/>
              </>
              
        ) 
        }

        <button type='submit' className='next'>Siguiente</button>
    </form>
    </div>
  )
}

export default UserFormStep;
