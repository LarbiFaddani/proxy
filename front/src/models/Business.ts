export interface IBusiness {
    id?:number;
    location_id?: any;
    altitude?: number;
    longitude?: number;
    email?: string;
    password?:string;
    name?: string;
    phone?: string;
    address?: string;
    status?:string;
    role?:number;
    region?:string;
    city?:string;
    secteur?:string;
    business_type_id?: number;
	business_activity_id?: number;
    placement?:string
};
export interface IBusinessList extends IBusiness {
    dateCreated: any
}