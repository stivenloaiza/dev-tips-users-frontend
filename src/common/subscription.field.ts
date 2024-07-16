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
    color?: string;
    iframeCode?: string; 
    typography?: string;
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