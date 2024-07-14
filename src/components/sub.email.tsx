import { useEffect } from "react"
import { FC } from "react"
import { useForm } from "react-hook-form"
import {  SubscriptionForm, SubFormProperties} from "../common/subscription.field"



const FormEmail:FC<SubFormProperties<SubscriptionForm>> = ({nextStep, prevStep, setSubData, subData, addSubscription}) => {

    const { register, setValue , formState:{errors}, handleSubmit} = useForm({
      defaultValues: {
        ...subData,
        communication: "email"
      }
    });

    const onSubmit = (data: SubscriptionForm) => {
      addSubscription({...subData, ...data})
      setSubData({...subData, ...data})
    }

    
    useEffect(() => {
      (Object.keys(subData) as Array <keyof SubscriptionForm>).forEach(key => {
        setValue(key, subData[key])
      })
    }, [subData, setSubData])


    return (
        <div className="subContainer">
          <h1>Email Subscription</h1>
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>

              <label htmlFor="">Type: </label>
                <input type="text" id="type" readOnly className='email'{...register("type", {
                    required: "type is required",
                  })}/>
              {errors.type && typeof errors.type.message === 'string' && <span>{errors.type.message}</span>}
      
      
              <label htmlFor="">Level: </label>
              <select id="" {...register("levels", {
                    required: "The seniority is required"
                  })}>
                  <option value="junior">Junior level</option>
                  <option value="mid">MID Level</option>
                  <option value="senior">Senior level</option>
              </select>
              {errors.levels && typeof errors.levels.message === 'string' && <span>{errors.levels?.message}</span>}
      
              <label htmlFor="">Technology: </label>
              <select id="technology" {...register("technology", {
                  required: "The programming language is required"
                })}>
                  <option value="nodejs"> Node JS </option>
                  <option value="javascript"> Javascript </option>
                  <option value="typescript">Typescript</option>
                  <option value="java">Java</option>
                  <option value="C-Sharp">C-Sharp</option>
              </select>
              {errors.technology && typeof errors.technology.message === 'string' && <span>{errors.technology.message}</span>}
      
                  <label htmlFor="">Frecuency: </label>
                  <select id="" {...register("frecuency", {
                    required: "Please select the frecuency configuration"
                  })}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                  {errors.frecuency && typeof errors.frecuency.message === 'string' && <span>{errors.frecuency.message}</span>}
                  

                  <label htmlFor="">Language: </label>
                  <select id="" {...register("lang", {
                      required: "The language is required"
                  })}>
                      <option value="spanish"> Spanish </option>
                      <option value="english"> English </option>
                  </select>
                  {errors.lang && typeof errors.lang.message === 'string' && <span>{errors.lang.message}</span>}

              <div className="buttons">
                  <button type="button" onClick={prevStep}>Volver</button>
                  <button type="button" onClick={nextStep}>Siguiente</button>
                  <button type="submit">Añadir subscripción</button>
              </div>
          </form>
        </div>

    )

}

export default FormEmail