import { SubFormProperties, SubscriptionForm} from "../common/subscription.field";
import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import '../styles/summary.css'
import axios from 'axios'

interface subformStep extends SubFormProperties<SubscriptionForm> {
  subArray: Array<SubscriptionForm>
}

const SubFormStep: FC<SubFormProperties<SubscriptionForm>> = ({subData, setSubData, nextStep, prevStep, subArray}) => {

    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()
    const [apikey, setApikey] = useState<string>('')

    useEffect(() => {
      (Object.keys(subData) as Array <keyof SubscriptionForm>).forEach(key => {
        setValue(key, subData[key])
      })
    }, [subData, setSubData])


    //ENDPOINT DISPONIBLE PARA OTROS EQUIPOS
    const onSubmit = async (data:any) => {
      try {

          const response = await axios.post('http://localhost:3000/users/register/form', {
            Headers: {
              "Content-Type":"application/json"
            }
          });
      
          if(response.status === 200){
            
            try {
              SubFormStep({...FormData, ...data});
              nextStep();
            } catch(error){
              console.error(`There is a issue in the data post ${error}`)
            }
            
          }

      } catch(error){
        console.error(`There is a issue with the submit subscription action ${error}`)
      }
    }

    //FUNCIÓN OBTENER EL APIKEY 
    // const getApi = async() => {
    //   try {
    //     const response = await fetch('', {
    //       method: "POST",
    //       headers: { 
    //         "Content-Type":"application/json"
    //       },
    //       body: JSON.stringify({})
    //     })
  
    //     if(response.ok){
    //       const result = await response.json()
    //       setApikey(result.apikey)
    //     }
    //   } catch (error){
    //     console.error(`There is a problem catching the API`)
    //   }
    // }

    return (
        <div className="summary">
          <h2>RESUMEN DE SUBSCRIPCIONES</h2>

          <div className="container-summaries">
            {
              subArray.map((subscription, index) => (
                <div className="container">
                  <p>Subscription {index + 1}</p>
                    <div className="containSummary" key={index}>
                      {Object.keys(subscription).map((key: string) => (
                        <div>
                          <p className="summaries" key={key}>{key}:{subscription[key as keyof SubscriptionForm]} </p>
                        </div>
                      ))}
                    </div>
                </div>
              ))
            }
          </div>
            <button type="button" onClick={handleSubmit(onSubmit)}>Finalizar Registro</button>
        </div>
    )

}

export default SubFormStep