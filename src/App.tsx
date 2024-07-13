import {SubscriptionForm } from './common/subscription.field';
import FormBot from './components/sub.bots';
import FormEmail from './components/sub.email';
import FormIframe from './components/sub.iframe';
import Formtv from './components/sub.tv';
import { UserForm } from './common/user.field';
import UserFormStep from './components/useForm';
import { useEffect, useState } from 'react'
import './styles/App.css'
import SubFormStep from './components/subscription';
import axios from 'axios'


const App:React.FC = () => {

      const [step, setStep] = useState<number>(0);

      const [FormData, SetFormData] = useState<UserForm>({

        name: "",
        email: "",
        phone: "",
        role: "",
        manager_name: undefined,
        manager_email: undefined,
        contact_number: undefined,

      }); 

      const [subArray, setSubArray] = useState<Array<SubscriptionForm>>([])
      const [errorMessage, setErrorMessage] = useState<string | null>(null)
      const [responseMessage, setResponseMessage] = useState('')

      useEffect(() => {
        SetSubData(getDefaultSubData(step));
      }, [step]);

      useEffect(() => {
        console.log('updated sub array', subArray)
      }), [subArray]

      const getDefaultSubData = (step: number): SubscriptionForm => {
        if (step === 1) {
            return {
                userId: "",
                communication: "bots",
                levels: "",
                lang: "",
                technology: "",
                channel: "",
                channelId: "",
                frecuency: undefined,
                domains: undefined,
                color: undefined,
                tipography: undefined,
                apikey: "",
            } as SubscriptionForm;
        } else if (step === 2) {
            return {
                userId: "",
                communication: "email",
                levels: "",
                lang: "",
                technology: "",
                frecuency: undefined,
                channel: undefined,
                domains: undefined,
                color: undefined,
                tipography: undefined,
                apikey: "",
            } as SubscriptionForm;
        } else if (step === 3) {
            return {
                userId: "",
                communication: "iframe",
                levels: "",
                lang: "",
                technology: "",
                frecuency: undefined,
                channel: undefined,
                domains: undefined,
                color: undefined,
                tipography: undefined,
                apikey: "",
            } as SubscriptionForm;
        } else if (step === 4) {
            return {
                userId: "",
                communication: "tv",
                levels: "",
                lang: "",
                technology: "",
                frecuency: undefined,
                channel: undefined,
                domains: undefined,
                color: undefined,
                tipography: undefined,
                apikey: "",
            } as SubscriptionForm;
        } else if (step === 5) {
            return {
                userId: "",
                communication: "pepe",
                levels: "",
                lang: "",
                technology: "",
                frecuency: undefined,
                channel: undefined,
                domains: undefined,
                color: undefined,
                tipography: undefined,
                apikey: "",
            } as SubscriptionForm;
        } else {
          console.log("el step en el que estamos es", step);
          
            return {
                userId: "",
                communication: "caremonda",
                levels: "",
                lang: "",
                technology: "",
                frecuency: undefined,
                channel: undefined,
                domains: undefined,
                color: undefined,
                tipography: undefined,
                apikey: "",
            };
        }
    };

      const [subData, SetSubData] = useState<SubscriptionForm>(getDefaultSubData(step));

      const addSubscription = (newSub:SubscriptionForm) => {
        const exists = subArray.some(sub => sub.communication === newSub.communication)

        if(!exists){
          setSubArray(prevSubArray => {
            const updatedArray = [...prevSubArray, newSub]
            return updatedArray
           
          })
          setErrorMessage(null)

        } else {
          setErrorMessage('Already exists a sub with this channel')
          return false; 
        }
        
      }

      const validateArray = () => {
        
        if(subArray.length === 0){
          setErrorMessage('You must register almost one subscription in one channel')
          return false; 
        } 

        setErrorMessage(null)
        return true;
      }

      const nextStep = () => {

        const newStep = step + 1;
        setStep(newStep)
      }

      const prevStep = () => {
        const newStep = step - 1;
        setStep(newStep)
      }

      const submitForm = async () => {

        const data = {...FormData, ...subArray}

        try {
            const response = await axios.post('http://localhost:3000/register/form/data', data);
            console.log(response)
            setResponseMessage('Form submitted successfully!');
            console.log(response.data);
        } catch (error) {
            setResponseMessage('Error submitting the form');
            console.error(error);
        }
    };

    
      return (
        <div>
          {step === 0 && <UserFormStep FormData={FormData} subData={subData} setSubData={SetSubData} SetFormData={SetFormData} nextStep={nextStep} /> }
          {step === 1 && <FormBot subData={subData} setSubData={SetSubData} nextStep={nextStep} prevStep={prevStep} validateArray={validateArray} addSubscription={addSubscription} subArray={subArray}/>}
          {step === 2 && <FormEmail subData={subData} setSubData={SetSubData} nextStep={nextStep} prevStep={prevStep} validateArray={validateArray} addSubscription={addSubscription} subArray={subArray}/>}
          {step === 3 && <FormIframe subData={subData} setSubData={SetSubData} nextStep={nextStep} prevStep={prevStep} validateArray={validateArray} addSubscription={addSubscription} subArray={subArray}/>}
          {step === 4 && <Formtv subData={subData} setSubData={SetSubData} nextStep={nextStep} prevStep={prevStep} validateArray={validateArray} addSubscription={addSubscription} subArray={subArray}/>}
          {step === 5 && <SubFormStep subData={subData} setSubData={SetSubData} nextStep={submitForm} prevStep={prevStep} validateArray={validateArray} addSubscription={addSubscription} subArray={subArray}/>}
          
          {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
      )
      
}

export default App