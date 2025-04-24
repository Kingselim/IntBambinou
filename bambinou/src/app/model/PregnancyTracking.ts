/*export class PregnancyTrackings {
    idPregnancyTracking ! : number
    NamePregnancyTracking !: string
    DatePregnancyTracking! : Date
    intervalChoice ! : string
    }*/
    export interface PregnancyTrackings {
        idPregnancyTracking: number;
        namePregnancyTracking: string;
        datePregnancyTracking: Date | string;
        intervalChoice: string;
        id: number | null;
        userPatient: any;
        userExpert: any;
        forums: any[];
      }
      