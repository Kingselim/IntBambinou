
export interface Task {
    id?: number;
    text: string;
    status: 'todo' | 'inProgress' | 'done';
    date: string;           // format ISO string: 'YYYY-MM-DD'
    time: string;           // format 'HH:mm'
    phoneNumber: string;    // numéro Twilio ou personnel
    pregnancyTracking: {

      idPregnancyTracking: number;
  
    };
    }
  