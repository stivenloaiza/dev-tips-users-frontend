import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import {  SubFormProperties, SubscriptionForm } from "../common/subscription.field";

const FormBot: FC<SubFormProperties<SubscriptionForm>> = ({nextStep, prevStep, setSubData, subData, addSubscription}) => {

    const {formState: {errors}, register, setValue, handleSubmit} = useForm<SubscriptionForm>();
    
    useEffect(() => {
        (Object.keys(subData) as Array <keyof SubscriptionForm>).forEach(key => {
            setValue(key, subData[key])
        })
    }, [subData, setSubData])

    const onSubmit = (data:SubscriptionForm) => {
        addSubscription({...data})
        setSubData({...subData, ...data})
    }

    return (

        <div className="subContainer"> 
        <h1>Bots Subscription</h1>
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="">Communication</label>
                <input type="text" id="communication" readOnly className='user'
                {...register("communication", {
                    required: "communication is required",
                })} />
                {errors.communication && typeof errors.communication.message === 'string' && <span>{errors.communication.message}</span>}
    
                <label htmlFor="">Senority</label>
                <select id="seniority" {...register("levels", {
                    required: "The seniority is required"
                    })}>
                    <option value="junior">Junior Developer</option>
                    <option value="mid_level">MID Level</option>
                    <option value="senior">Senior Developer</option>
                </select>
                {errors.levels && typeof errors.levels.message === 'string' && <span>{errors.levels?.message}</span>}
    
                <label htmlFor="">Programming Language</label>
                <select id="devLanguage" {...register("technology", {
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
                <select id="frecuency" {...register("frecuency", {
                    required: "Please select the frecuency configuration"
                })}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                </select>
                {errors.frecuency && typeof errors.frecuency.message === 'string' && <span>{errors.frecuency.message}</span>}
    
    
                <label htmlFor="">Channel</label>
                <select id="channel" {...register("channel", {
                    required: "Please select the channel"
                })}>
                    <option value="telegram">Telegram</option>
                    <option value="discord">Discord</option>
                </select>
                {errors.channel && typeof errors.channel.message === 'string' && <span>{errors.channel.message}</span>}
                  
            
                
              <label htmlFor="">Language</label>
                <select id="language" {...register("lang", {
                    required: "The language is required"
                })}>
                    <option value="spanish"> Spanish </option>
                    <option value="english"> English </option>
                </select>
                {errors.lang && typeof errors.lang.message === 'string' && <span>{errors.lang.message}</span>}

                <label htmlFor="">Your channel ID: </label>
                <input type="text" id="channelId" readOnly className='sub'
                {...register("channelId", {
                    required: "The channel ID is required",
                })} />
                {errors.channelId && typeof errors.channelId.message === 'string' && <span>{errors.channelId.message}</span>}

                <div className="buttons">
                    <button type="button" onClick={prevStep}>Volver</button>
                    <button type="button" onClick={nextStep}>Omitir</button>
                    <button type="submit">Añadir subscripción</button>
                </div>
            
        </form>
        </div>
    );
}

export default FormBot; 