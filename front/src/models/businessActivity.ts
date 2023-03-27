export interface BusinessActivity{
    id:number,
    name: string;
}
export interface BusinessActivityList extends BusinessActivity {
    dateCreated: any
}