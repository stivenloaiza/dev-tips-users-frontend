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
import axios, { HttpStatusCode } from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

let isIframe:boolean = false; 
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
                channelType: "",
                channelId: "",
                frequency: undefined,
                domains: undefined,
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
                channelType: undefined,
                channelId: undefined,
                domains: undefined,
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
                channelType: undefined,
                channelId: undefined,
                domains: undefined,
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
                channelType: undefined,
                channelId: undefined,
                domains: undefined,
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
                channelType: undefined,
                channelId: undefined,
                domains: undefined,
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
          console.log("FIRST", isIframe)
          for(let subscription in subscriptions){

            if(subscriptions[subscription].type === "iframe"){
              isIframe = true
              break; 
            } else {
              isIframe = false
            }

          }
          console.log("SECOND", isIframe)
          const data = {...FormData, subscriptions}

          const response = await axios.post('http://localhost:3000/v1/api/users/create', data);
          console.log('RESPONSE OME', response)

          try {
            console.log("THIRD", isIframe)
            if(isIframe === false){

              if(response){
                toast.success(
                      <div className='alert'>
                        <h3>Registration Sucessfull!!!!!</h3>
                        <p>Welcome to this community</p>
                      </div>
                )
              }

            } else {

                try {
                  const iframeResponse = await axios.post('http://localhost:5173/iframe')
                  console.log('IFRAME HERE BROTHER', iframeResponse)

                  toast.success(
                    <div className='iframe_alert alert'>
                      <h3>Registration Sucessfull!!!!</h3>
                      <div>
                        <p>Your iframe code is: </p>
                        <code>
                          `${iframeResponse.data}`
                        </code>
                      </div>
                    </div>
                  )
                } catch (error) {
                  if (axios.isAxiosError(error)) {
                    console.error(`Error Submitting the form: ${error.response?.status} - ${error.response?.statusText}`);
                    toast.error(`Error Submitting the form: ${error.response?.status} - ${error.response?.statusText}`);
                  } else {
                    console.error('Unexpected error', error);
                    toast.error('Unexpected error occurred');
                  }
            }
          
            } 
          } catch(error){
            toast.error("Error Submiting the form")
            console.error("ERROR", error)
            throw new Error("THERE IS A ISSUE SAVING THE SUBSCRIPTION")
          } finally {
            setIsLoading(false)
          }
      }

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