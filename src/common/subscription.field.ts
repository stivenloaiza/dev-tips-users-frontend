export interface SubscriptionForm {
    userId: string;
    type: string;
    level: string;
    lang: string;
    technology: string;
    frequency?: string;
    channel?: string;
    channelId?:string; 
    domains?: string;
    iframe?: string; 
    apikey: any;
}

export interface SubFormProperties<T extends SubscriptionForm> {
    SubData: T;
    SetSubData: React.Dispatch<React.SetStateAction<T>>;
    addSubscription: (newSub: T) => void;
    removeUndefinedFields: (data:any) => any;
    validateArray: () => boolean;
    nextStep: () => void;
    prevStep?: () => void;
    subscriptions: Array<T>
}