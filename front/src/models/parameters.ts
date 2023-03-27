export interface parameters{
    id:number;
    ad_price_advertiser:number;
    ad_price_business :number;
    com_display_time:number;
}
interface parametersState {
    values: parameters[];
  }
  
export  const initialState: parametersState = {
    values: [],
  };
export interface parametersList extends parameters{
dateCreated:any
}