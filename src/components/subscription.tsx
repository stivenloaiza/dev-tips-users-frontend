import { SubFormProperties, SubscriptionForm} from "../common/subscription.field";
import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import '../styles/summary.css'

interface subformStep extends SubFormProperties<SubscriptionForm> {
  subscriptions: Array<SubscriptionForm>
}

const SubFormStep: FC<SubFormProperties<SubscriptionForm>> = ({subData, setSubData, nextStep, prevStep, subscriptions}) => {

    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()
    const [apikey, setApikey] = useState<string>('')

    useEffect(() => {
      (Object.keys(subData) as Array <keyof SubscriptionForm>).forEach(key => {
        setValue(key, subData[key])
      })
    }, [subData, setSubData])

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
        <form method="POST" className="summary" onSubmit={handleSubmit(nextStep)} >
          <h2>RESUMEN DE SUBSCRIPCIONES</h2>

          <div className="container-summaries">
            {
              subscriptions.map((subscription, index) => (
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
            <button type="submit">Finalizar Registro</button>
        </form>
    )

}

export default SubFormStep