export interface PregnancyJournal {
    id?: number;
    title: string;
    content: string;
    mood: string;
    date: Date;
    imageUrls?: string; // chaîne de type "url1,url2,..."
    pregnancyTracking: {

      idPregnancyTracking: number;
  
    };

  }
  