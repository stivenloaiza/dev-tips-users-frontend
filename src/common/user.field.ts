import { SubscriptionForm } from "./subscription.field";

export interface UserForm {
        name: string,
        email: string,
        phone: string,
        role: string,
        managerName?: string,
        managerEmail?: string,
        managerPhone?: string,
}

export interface UserFormProperties {
    FormData: UserForm;
    SetFormData:React.Dispatch<React.SetStateAction<UserForm>>;
    SubData: SubscriptionForm;
    SetSubData: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
    nextStep:() => any; 
    prevStep?:() => any;
}
    

   

