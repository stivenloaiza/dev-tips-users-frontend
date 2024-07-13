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

              <label htmlFor="">Communication</label>
              <input type="text" id="communication" readOnly className='email'{...register("communication", {
                  required: "communication is required",
                })}/>
              {errors.communication && typeof errors.communication.message === 'string' && <span>{errors.communication.message}</span>}
      
      
              <label htmlFor="">Senority</label>
              <select id="" {...register("levels", {
                    required: "The seniority is required"
                  })}>
                  <option value="junior">Junior Developer</option>
                  <option value="mid_level">MID Level</option>
                  <option value="senior">Senior Developer</option>
              </select>
              {errors.levels && typeof errors.levels.message === 'string' && <span>{errors.levels?.message}</span>}
      
              <label htmlFor="">Programming Language</label>
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
      
                  <label htmlFor="">Frecuency</label>
                  <select id="" {...register("frecuency", {
                    required: "Please select the frecuency configuration"
                  })}>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                  {errors.frecuency && typeof errors.frecuency.message === 'string' && <span>{errors.frecuency.message}</span>}
                  

                  <label htmlFor="">Language</label>
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