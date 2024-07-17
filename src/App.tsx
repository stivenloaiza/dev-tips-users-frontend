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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'


const App:React.FC = () => {

      const [step, setStep] = useState<number>(0);

      const [FormData, SetFormData] = useState<UserForm>({

        name: "",
        email: "",
        phone: "",
        role: "",
        managerName: undefined,
        managerEmail: undefined,
        managerPhone: undefined,

      }); 

      const [subscriptions, setSubscriptionsArray] = useState<Array<SubscriptionForm>>([])
      const [errorMessage, setErrorMessage] = useState<string | null>(null)
      const [isLoading, setIsLoading] = useState(false)


      const removeUndefinedFields = (obj: any) => {
        return Object.keys(obj).reduce((acc, key) => {
          if (obj[key] !== undefined) {
            acc[key] = obj[key];
          }
          return acc;
        }, {} as any);
      };

      useEffect(() => {
        SetSubData(getDefaultSubData(step));
      }, [step]);

      useEffect(() => {
        console.log('updated sub array', subscriptions)
      }), [subscriptions]

      const getDefaultSubData = (step: number): SubscriptionForm => {
        if (step === 1) {
            return {
                userId: "",
                type: "bot",
                level: "",
                lang: "",
                technology: "",
                channel: "",
                channelId: "",
                frequency: undefined,
                domains: undefined,
                color: undefined,
                typography: undefined,
                apikey: "",
            } as SubscriptionForm;
        } else if (step === 2) {
            return {
                userId: "",
                type: "email",
                level: "",
                lang: "",
                technology: "",
                frequency: undefined,
                channel: undefined,
                channelId: undefined,
                domains: undefined,
                color: undefined,
                typography: undefined,
                apikey: "",
            } as SubscriptionForm;
        } else if (step === 3) {
            return {
                userId: "",
                type: "iframe",
                level: "",
                lang: "",
                technology: "",
                frequency: undefined,
                channel: undefined,
                channelId: undefined,
                domains: undefined,
                color: undefined,
                typography: undefined,
                apikey: "",
            } as SubscriptionForm;
        } else if (step === 4) {
            return {
                userId: "",
                type: "tv",
                level: "",
                lang: "",
                technology: "",
                frequency: undefined,
                channel: undefined,
                channelId: undefined,
                domains: undefined,
                color: undefined,
                typography: undefined,
                apikey: "",
            } as SubscriptionForm;
        } else {
          console.log("el step en el que estamos es", step);
          
            return {
                userId: "",
                type: "",
                level: "",
                lang: "",
                technology: "",
                frequency: undefined,
                channel: undefined,
                channelId: undefined,
                domains: undefined,
                color: undefined,
                typography: undefined,
                apikey: "",
            };
        }
    };

      const [subData, SetSubData] = useState<SubscriptionForm>(getDefaultSubData(step));

      const addSubscription = (newSub:SubscriptionForm) => {
        const exists = subscriptions.some(sub => sub.type === newSub.type)

        if(!exists){
          setSubscriptionsArray(prevSubArray => {
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
        
        if(subscriptions.length === 0){
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
        setStep(newStep);
      }

      const submitForm = async () => {

        setIsLoading(true)

        const data = {...FormData, subscriptions}

        // try {
            const response = await axios.post('http://localhost:3000/v1/api/users/create', data);
            console.log('RESPONSE: ', response)
            return response

              

            //   if(response.data.iframe){

            //     const iframe = await axios.post('http://localhost:5003/v1/api/iframe/getIframe')
            //     toast.success(
            //       <div className='iframe_alert alert'>
            //         <h3>Registration Sucessfull!!!!</h3>
            //         <div>
            //           <p>Your iframe code is: </p>
            //           <code>
            //             `${response.data.iframe}`
            //           </code>
            //         </div>
            //       </div>
            //     )

            //   } else {

            //     toast.success(
            //       <div className='alert'>
            //         <h3>Registration Sucessfull!!!!!</h3>
            //         <p>Welcome to this community</p>
            //       </div>
            //     )

            //   }  
            // }


        // } catch (error) {
        //     toast.error("Error Submiting the form")
        //     console.error(error)
        // } finally {
        //   setIsLoading(false)
        // }
     };

    

    
      return (
        <div>
          {step === 0 && <UserFormStep FormData={FormData} SubData={subData} SetSubData={SetSubData} SetFormData={SetFormData} nextStep={nextStep} /> }
          {step === 1 && <FormBot SubData={subData} SetSubData={SetSubData} nextStep={nextStep} prevStep={prevStep} validateArray={validateArray} addSubscription={addSubscription} subscriptions={subscriptions} removeUndefinedFields={removeUndefinedFields}/>}
          {step === 2 && <FormEmail SubData={subData} SetSubData={SetSubData} nextStep={nextStep} prevStep={prevStep} validateArray={validateArray} addSubscription={addSubscription} subscriptions={subscriptions} removeUndefinedFields={removeUndefinedFields}/>}
          {step === 3 && <FormIframe SubData={subData} SetSubData={SetSubData} nextStep={nextStep} prevStep={prevStep} validateArray={validateArray} addSubscription={addSubscription} subscriptions={subscriptions} removeUndefinedFields={removeUndefinedFields}/>}
          {step === 4 && <Formtv SubData={subData} SetSubData={SetSubData} nextStep={nextStep} prevStep={prevStep} validateArray={validateArray} addSubscription={addSubscription} subscriptions={subscriptions} removeUndefinedFields={removeUndefinedFields}/>}
          {step === 5 && <SubFormStep SubData={subData} SetSubData={SetSubData} nextStep={submitForm} prevStep={prevStep} validateArray={validateArray} addSubscription={addSubscription} subscriptions={subscriptions} removeUndefinedFields={removeUndefinedFields}/>}
          
          {errorMessage && <span className="error-message">{errorMessage}</span>}
          <ToastContainer/>
        </div>
      )
      
}

export default App