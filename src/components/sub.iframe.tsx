import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { SubscriptionForm, SubFormProperties} from "../common/subscription.field"

const FormIframe:FC<SubFormProperties<SubscriptionForm>> = ({nextStep, prevStep, SetSubData, SubData, addSubscription, removeUndefinedFields}) => {
    const { register, setValue, formState: {errors}, handleSubmit} = useForm({
      defaultValues: {
        ...SubData,
        type: "iframe", 
      }
    });

      const onSubmit = (data: SubscriptionForm) => {
        const correctData = removeUndefinedFields(data)
        addSubscription({...correctData})
        SetSubData({...SubData, ...correctData}) 
        
      }

      useEffect(() => {
        (Object.keys(SubData) as Array <keyof SubscriptionForm>).forEach(key => {
          setValue(key, SubData[key])
        })
      }, [SubData, setValue])
  
    return (
        <div className="subContainer">
          <h1>Iframe Subscription</h1>
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>

                  <label htmlFor="">type</label>
                  <input type="text" id="type" readOnly className='user' {...register("type", {
                      required: "type is required",
                  })}/>
                  {errors.type && typeof errors.type.message === 'string' && <span>{errors.type.message}</span>}
          
                  <label htmlFor=""> Level: </label>
                  <select id="" {...register("level", {
                      required: "The seniority is required"
                      })}>
                      <option value="junior">Junior level</option>
                      <option value="mid">MID Level</option>
                      <option value="senior">Senior level</option>
                  </select>
                  {errors.level && typeof errors.level.message === 'string' && <span>{errors.level?.message}</span>}
          
                  <label htmlFor=""> Technology: </label>
                  <select id="technology" {...register("technology", {
                      required: "The programming language is required"
                  })}>
                      <option value="nodejs"> Node JS </option>
                      <option value="javascript"> Javascript </option>
                      <option value="typescript">Typescript</option>
                      <option value="java">Java</option>
                      <option value="c-sharp">C-Sharp</option>
                  </select>
                  {errors.technology && typeof errors.technology.message === 'string' && <span>{errors.technology.message}</span>}
          
                  <label htmlFor=""> Domains: </label>
                  <input type="text" {...register("domains", {
                    required: "Please enter your domains"
                  })}/>
                  {errors.domains && typeof errors.domains.message === 'string' && <span>{errors.domains.message}</span>}
      
                  <label htmlFor=""> Color: </label>
                  <input type="text" {...register("color", {
                    required: "Please select the color for the styles"
                  })}/>
                  {errors.color && typeof errors.color.message === 'string' && <span>{errors.color.message}</span>}
      
                  <label htmlFor=""> Tipography: </label>
                  <input type="text" {...register("typography", {
                    required: "Please select a tipography"
                  })}/>
                  {errors.typography && typeof errors.typography.message === 'string' && <span>{errors.typography.message}</span>}
                  

                  <label htmlFor=""> Language: </label>
                  <select id="language" {...register("lang", {
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

 export default FormIframe
