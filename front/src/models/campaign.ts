enum Status {
    Active = 'active',
    Inactive = 'inactive',
    Pending = 'pending',
    Finished = 'finished'
  }
export interface Campaign{
    id :number;
    name:string;
    budget_max:number;
    begin_date:Date;
    end_date:Date;
    file:string;
    display_hours:string;
    Status:Status;
    url:string;
    advertiser_id:number;
};
export interface CampaignList extends Campaign {
    dateCreated:any
}
