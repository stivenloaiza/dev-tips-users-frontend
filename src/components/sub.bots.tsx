import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  SubFormProperties, SubscriptionForm } from "../common/subscription.field"
import PopupStep from "./popup";
const FormBot: FC<SubFormProperties<SubscriptionForm>> = ({nextStep, prevStep, SetSubData, SubData, addSubscription, removeUndefinedFields}) => {

    const {formState: {errors}, register, setValue, handleSubmit} = useForm<SubscriptionForm>({
        defaultValues: {
         ...SubData,
         type: "bot"
        }
      });
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        (Object.keys(SubData) as Array <keyof SubscriptionForm>).forEach(key => {
            console.log(SubData)
            setValue(key, SubData[key])
        })
    }, [SubData, setValue])

    const onSubmit = (data:SubscriptionForm) => {
        const correctData = removeUndefinedFields(data)
        addSubscription({...correctData})
        SetSubData({...SubData, ...correctData}) 
    }

    const openPop = () => {
        setIsPopupOpen(true)
    }

    const closePop = () => {
        setIsPopupOpen(false)
    }

    return (

        <div className="subContainer bots"> 
        <h1>Bots Subscription</h1>
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="">type</label>
                <input type="text" id="type" readOnly className='user'{...register("type", {
                        required: "type is required",
                    })} />
                {errors.type && typeof errors.type.message === 'string' && <span>{errors.type.message}</span>}
    
                <label htmlFor="">levels: </label>
                <select id="level" {...register("level", {
                    required: "The seniority is required"
                    })}>
                    <option value="junior">Junior level</option>
                    <option value="mid">MID Level</option>
                    <option value="senior">Senior level</option>
                </select>
                {errors.level && typeof errors.level.message === 'string' && <span>{errors.level?.message}</span>}
    
                <label htmlFor="">Programming Language</label>
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
    
                <label htmlFor="">Frecuency</label>
                <select id="frequency" {...register("frequency", {
                    required: "Please select the frecuency configuration"
                })}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                </select>
                {errors.frequency && typeof errors.frequency.message === 'string' && <span>{errors.frequency.message}</span>}
    
    
                <label htmlFor="">Channel</label>
                <select id="channel" {...register("channel", {
                    required: "Please select the channel"
                })}>
                    <option value="Telegram">Telegram</option>
                    <option value="Discord">Discord</option>
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
                <input type="text" id="channelId" className='sub'
                {...register("channelId", {
                    required: "The channel ID is required",
                })} />
                {errors.channelId && typeof errors.channelId.message === 'string' && <span>{errors.channelId.message}</span>}
                <div className="buttons">
                    <button type="button" onClick={prevStep}>Volver</button>
                    <button type="button" onClick={nextStep}>Siguiente</button>
                    <button type="submit">Añadir subscripción</button>
                </div>

                <button className="show" onClick={openPop}>Watch tutorial How get my channel ID</button>
        </form>

        <PopupStep openPop={isPopupOpen} closePop={closePop}>
            <div className="info">
            <div className="telegram container">
                <h1>Get your channel ID in Telegram</h1>
                <div className="images">
                <img src="telegram-step1.png" alt="Telegram Step 1" />
                <img src="telegram-step2.png" alt="Telegram Step 2" />
                <img src="telegram-step3.png" alt="Telegram Step 3" />
                </div>
            </div>
            <div className="discord container">
                <h1>Get your channel ID in Discord</h1>
                <div className="images">
                <img src="discord-step1.png" alt="Discord Step 1" />
                <img src="discord-step2.png" alt="Discord Step 2" />
                <img src="discord-step3.png" alt="Discord Step 3" />
                </div>
            </div>
            </div>
      </PopupStep>

        </div>
    );
}

export default FormBot; 