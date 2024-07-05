import {useForm} from 'react-hook-form'
import './App.css'

// type formRegisterUser = {

// id: string,
// apiKey: any, 
// name: String,
// email: String,
// phone: String,
// role: String,

// //If is a business 
// managerName: string,
// managerEmail: string,
// managerPhone: number,
// subscriptions: any,


// //subscription 
// status: String,
// subscriptionDate: Date,
// mediaTipType: Object,
// user: any,
// apikey: string,


// TV's
// seniority: String,
// Language: String,
// programmingLanguages: Object,


// Iframes 
// seniority: String,
// language: String,
// programmingLanguages: Object,
// domains: Object,
// color: String,
// typography: String,

// Email
// frequency: String,
// seniority: String,
// programmingLanguages: Object,


// Bots
// frequency: String
// channelId: string,
// channel: String,


// }

function App() {


  const {register, watch, handleSubmit, formState:{errors}} = useForm()

  const onSubmit = async (data: any) => {

    console.log('Buenas tardes campeon')
    try {
      const response = await fetch('http://localhost:3000/register/form', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if(response.ok){
        console.log(data)
        console.log(`The form was send`)
      }
  
      else {
        console.error(`We had a issue sending the data`)
      }

    } catch(error){
      throw new Error(`The form wasn't send cause ${error}`)
    }
  };

  return (
    <>

    <h1>Register</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
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
              value: 5,
              message: "Please valid your cellphone"
            },
            maxLength: {
              value: 11,
              message: "The maximun of the digits in your cellphone is 11, please confirm the cellphone" 
            }

          })}/>
          {errors.phone && typeof errors.phone.message === 'string' && <span>{errors.phone.message}</span>}

          <label htmlFor="">Role</label>
          <select id="role" className='user' {...register("role", {
            required: "role is required"
          })}>
          {errors.role && typeof errors.role.message === 'string' && <span>{errors.role.message}</span>}
            <option value="business">Business</option>
            <option value="person">Person</option>
          </select>

        {   
        watch("role") === "business" && (

              <>
              <label htmlFor="">Manager Name: </label>
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

              <label htmlFor="">Contact Number: </label>
              <input type="text" id="contact_number"/>
              </>
              
        ) 
        }
        

        <label htmlFor="">Communication</label>
        <select id="communication" className='user' {...register("communication", {
            required: "communication is required"
          })}>
            <option value="tv">TV</option>
            <option value="email">Email</option>
            <option value="bots">Bots</option>
            <option value="iframe">Iframe</option>
        </select>
        {errors.communication && typeof errors.communication.message === 'string' && <span>{errors.communication.message}</span>}

        <label htmlFor="">Senority</label>
        <select id="" {...register("seniority", {
              required: "The seniority is required"
            })}>
            <option value="junior">Junior Developer</option>
            <option value="mid_level">MID Level</option>
            <option value="senior">Senior Developer</option>
        </select>
        {errors.seniority && typeof errors.seniority.message === 'string' && <span>{errors.seniority?.message}</span>}

        <label htmlFor="">Programming Language</label>
        <select id="" {...register("language", {
             required: "The programming language is required"
          })}>
            <option value="nodejs"> Node JS </option>
            <option value="javascript"> Javascript </option>
            <option value="nestjs">Nest JS</option>
            <option value="java">Java</option>
        </select>
        {errors.language && typeof errors.language.message === 'string' && <span>{errors.language.message}</span>}

        {
        watch('communication') === "email" && (

            <>
            <label htmlFor="">Frecuency</label>
            <select id="" {...register("frecuency", {
              required: "Please select the frecuency configuration"
            })}>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            {errors.frecuency && typeof errors.frecuency.message === 'string' && <span>{errors.frecuency.message}</span>}
            </>  
        )
        }

        {
        watch('communication') === "bots" && (

          <div>
              <label htmlFor="">Frecuency</label>
              <select id="" {...register("frecuency", {
                required: "Please select the frecuency configuration"
              })}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              </select>
              {errors.frecuency && typeof errors.frecuency.message === 'string' && <span>{errors.frecuency.message}</span>}


              <label htmlFor="">Channel</label>
              <select id="" {...register("channel", {
                required: "Please select the channel"
              })}>
              {errors.channel && typeof errors.channel.message === 'string' && <span>{errors.channel.message}</span>}
                <option value="telegram">Telegram</option>
                <option value="discord">Discord</option>
              </select>
          </div>
        )
        }
        
        {
        watch('communication') === "iframe" && (

            <>
            <label htmlFor="">Domains: </label>
            <input type="text" {...register("domain", {
              required: "Please enter your domains"
            })}/>
            {errors.domain && typeof errors.domain.message === 'string' && <span>{errors.domain.message}</span>}

            <label htmlFor="">Color</label>
            <input type="text" {...register("color", {
              required: "Please select the color for the styles"
            })}/>
            {errors.color && typeof errors.color.message === 'string' && <span>{errors.color.message}</span>}

            <label htmlFor="">Tipography</label>
            <input type="text" {...register("tipography", {
              required: "Please select a tipography"
            })}/>
            {errors.tipography && typeof errors.tipography.message === 'string' && <span>{errors.tipography.message}</span>}
            </>
        )
        }

        <button type='submit'>enviar</button>
    </form>
    </>
  )
}

export default App
