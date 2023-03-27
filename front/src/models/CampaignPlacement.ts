export interface CampaignPlacement{
    campaign_id:number,
    location_id:number,
    
}
export interface CampaignPlacementList extends CampaignPlacement {
    dateCreated:any
}