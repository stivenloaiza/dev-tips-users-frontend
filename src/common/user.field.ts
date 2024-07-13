import { SubscriptionForm } from "./subscription.field";

export interface UserForm {
        name: string,
        email: string,
        phone: string,
        role: string,
        manager_name?: string,
        manager_email?: string,
        contact_number?: string,
}

export interface UserFormProperties {
    FormData: UserForm;
    SetFormData:React.Dispatch<React.SetStateAction<UserForm>>;
    subData: SubscriptionForm;
    setSubData: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
    nextStep:() => any; 
    prevStep?:() => any;
}
    

   

