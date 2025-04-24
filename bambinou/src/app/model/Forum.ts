import { PregnancyTrackings } from "./PregnancyTracking";

export interface Forum {
  idForum?: number;
  month: number;
  weight: number;
  bloodPressure?: string;
  symptoms?: string;
  pregnancyPain?: string;
  pregnancyCravings?: string;
  moodSwings?: string;
  description?: string;
  breathelessness?: string;
 
  pregnancyTracking: {

    idPregnancyTracking: number;

  };
}

