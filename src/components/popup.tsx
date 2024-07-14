import { FC } from "react"
import '../styles/App.css'
import '../styles/popup.css'
import { popup } from "../common/popup"


const PopupStep:FC<popup> = ({openPop, closePop, children}) => {

    if(!openPop) return null

    return (

        <div className="parent_pop">
            <div className="info">
                <button className="close" onClick={closePop}>x</button>
                {children}
            </div>
        </div>
        
    )
}   

export default PopupStep