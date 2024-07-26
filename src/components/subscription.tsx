import { SubFormProperties, SubscriptionForm} from "../common/subscription.field";
import { useForm } from "react-hook-form";
import { FC, useEffect, useState } from "react";
import '../styles/summary.css'

const SubFormStep: FC<SubFormProperties<SubscriptionForm>> = ({SubData, SetSubData, nextStep, subscriptions}) => {

    const { handleSubmit, setValue} = useForm()

    const [isLoading] = useState(false)

    useEffect(() => {
      (Object.keys(SubData) as Array <keyof SubscriptionForm>).forEach(key => {
        setValue(key, SubData[key])
      })
    }, [SubData, SetSubData])

    return (
        <form method="POST" className="summary" onSubmit={handleSubmit(nextStep)} >

          <h2>RESUMEN DE SUBSCRIPCIONES</h2>

          {
            isLoading ? <div>cargando....</div> : <div className="container-summaries">
            {
              subscriptions.map((subscription, index) => (
                <div className="container">
                  <p className="subTitle">Subscription {index + 1}</p>
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
          }
            <button type="submit">Finalizar Registro</button>
        </form>
    )

}

export default SubFormStep