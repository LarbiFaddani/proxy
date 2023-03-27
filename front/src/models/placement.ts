export interface IPlacement {
    id: number;
    name: string;
    business_id: number;
  };
  export interface IPlacementList extends IPlacement {
      dateCreated: any
  };