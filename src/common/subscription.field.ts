export interface SubscriptionForm {
    userId: string;
    type: string;
    levels: string;
    lang: string;
    technology: string;
    frecuency?: string;
    channel?: string;
    channelId?:string; 
    domains?: string;
    color?: string;
    tipography?: string;
    apikey: any;
}

// export interface EmailSubscriptionForm extends SubscriptionForm {
//     communication: "email";
// }

// export interface BotSubscriptionForm extends SubscriptionForm {
//     communication: "bots";
// }

// export interface IframeSubscriptionForm extends SubscriptionForm {
//     communication: "iframe";
// }

// export interface TvSubscriptionForm extends SubscriptionForm {
//     communication: "tv";
// }

export interface SubFormProperties<T extends SubscriptionForm> {
    subData: T;
    setSubData: React.Dispatch<React.SetStateAction<T>>;
    addSubscription: (newSub: T) => void;
    validateArray: () => boolean;
    nextStep: () => void;
    prevStep?: () => void;
    subscriptions: Array<T>
}