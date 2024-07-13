import { useForm } from "react-hook-form"
import { SubFormProperties, SubscriptionForm } from "../common/subscription.field"
import { FC, useEffect } from "react"


const Formtv:FC<SubFormProperties<SubscriptionForm>> = ({nextStep, prevStep, setSubData, subData, addSubscription, validateArray}) => {

    const { register, setValue, formState: {errors}, handleSubmit} = useForm({
        defaultValues: {
         ...subData,
         communication: "tv"
        }
      });

      const onSubmit = (data:SubscriptionForm) => { 

        addSubscription({...FormData, ...data})
        setSubData({...FormData, ...data})
      }

      useEffect(() => {
        (Object.keys(subData) as Array <keyof SubscriptionForm>).forEach(key => {
          setValue(key, subData[key])
        })
      }, [subData, setSubData])

    return (
        <div className="subContainer">
            <h1>TV Subscription</h1>
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="">Communication</label>
                    <input type="text" id="communication" readOnly className='user' defaultValue='tv' {...register("communication", {
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
                    

                    <label htmlFor="">Language</label>
                    <select id="lang" {...register("lang", {
                        required: "The language is required"
                    })}>
                        <option value="spanish"> Spanish </option>
                        <option value="english"> English </option>
                    </select>
                    {errors.technology && typeof errors.technology.message === 'string' && <span>{errors.technology.message}</span>}


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