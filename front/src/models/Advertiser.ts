export interface Advertiser{
    id?:Number;
    email?:string;
    password?:string;
    name?:string;
    phone?:string;
    adress?:string;
    status?:string;
    act_id?:number;
    act_name?:string;
};

export interface AdvertiserList extends Advertiser{
    dateCreated:any
}