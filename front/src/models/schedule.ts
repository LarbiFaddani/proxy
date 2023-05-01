export interface ISchedule {
    id?: number;
    opening_hour: string;
    closing_hour: string;
    day: string;
    business_id:any;
  };
  export interface IScheduleList extends ISchedule {
      dateCreated: any
  };