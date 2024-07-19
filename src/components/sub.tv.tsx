import { useForm } from "react-hook-form"
import { SubFormProperties, SubscriptionForm } from "../common/subscription.field"
import { FC, useEffect } from "react"


const Formtv:FC<SubFormProperties<SubscriptionForm>> = ({nextStep, prevStep, SetSubData, SubData, addSubscription, validateArray, removeUndefinedFields}) => {

    const { register, setValue, formState: {errors}, handleSubmit} = useForm({
        defaultValues: {
         ...SubData,
         type: "tv"
        }
      });

      const onSubmit = (data:SubscriptionForm) => { 
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
            <h1>TV Subscription</h1>
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="">Type: </label>
                    <input type="text" id="type" readOnly className='user' {...register("type", {
                        required: "type is required",
                    })}/>
                    {errors.type && typeof errors.type.message === 'string' && <span>{errors.type.message}</span>}
            
                    <label htmlFor="">Level: </label>
                    <select id="levels" {...register("level", {
                        required: "The seniority is required"
                        })}>
                        <option value="junior">Junior level</option>
                        <option value="mid">MID Level</option>
                        <option value="senior">Senior level</option>
                    </select>
                    {errors.level && typeof errors.level.message === 'string' && <span>{errors.level?.message}</span>}
                    

                    <label htmlFor="">Language: </label>
                    <select id="lang" {...register("lang", {
                        required: "The language is required"
                    })}>
                        <option value="spanish"> Spanish </option>
                        <option value="english"> English </option>
                    </select>
                    {errors.technology && typeof errors.technology.message === 'string' && <span>{errors.technology.message}</span>}


                    <label htmlFor="">Technology: </label>
                    <select id="technology" {...register("technology", {
                        required: "The programming language is required"
                    })}>
                        <option value="Python"> Python</option>
                        <option value="JavaScript"> Javascript </option>
                        <option value="typescript">Typescript</option>
                        <option value="java">Java</option>
                        <option value="c#">C-Sharp</option>
                    </select>
                    {errors.technology && typeof errors.technology.message === 'string' && <span>{errors.technology.message}</span>}

                <div className="buttons">
                    <button type="button" onClick={prevStep}>Volver</button>
                    <button type="button" onClick={() => { 
                        if(validateArray()){
                            nextStep()
                        }
                    }}>Siguiente</button>
                    <button type="submit">Añadir subscripción</button>
                </div>
                

            </form>
        </div>
    )
 }

export default Formtv