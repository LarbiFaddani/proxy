export interface ILocation {
    id: number;
    region: string;
    city: string;
    secteur: string;
    longitude: number;
  altitude: number;
  };
  export interface ILocationList extends ILocation {
      dateCreated: any
  };