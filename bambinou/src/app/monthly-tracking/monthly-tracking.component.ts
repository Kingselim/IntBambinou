import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Forum } from '../model/Forum';
import { HttpErrorResponse } from '@angular/common/http';
import { ForumService } from 'src/app/service/forum.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PregnancyJournal } from '../model/PregnancyJournal';
import { TrackingContextService } from '../service/tracking-context.service';
import { ChartDataset, ChartOptions ,Chart, registerables} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation'; // ✅ plugin des annotations
import { PregnancyTrackings } from '../model/PregnancyTracking';
import { PregnancyTrackingService } from 'src/app/service/pregnancy-tracking.service';
Chart.register(...registerables, annotationPlugin);
@Component({
  selector: 'app-monthly-tracking',
  templateUrl: './monthly-tracking.component.html',
  styleUrls: ['./monthly-tracking.component.css']
})
export class MonthlyTrackingComponent implements OnInit {
  monthlyForm: FormGroup;
  idPregnancyTracking: number | null = null;
  currentMonth: number = 1;
  trackings: Forum[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  selectedForumId: number | null = null;
  isEditing: boolean = false;
  savedMonths: number[] = [];
  labels: string[] = [];
  currentView: 'form' | 'todo' = 'form';
  currentTrackingType: 'monthly' | 'semester' = 'monthly'; // ou 'semester'
  moodCounts: { [mood: string]: number } = {};
  adviceMessage: string = '';
  tasks: { text: string; done: boolean }[] = [];
  newTask: string = '';
  aiResult: any = null;
  autoInterpretationMessage: string | null = null;
  chatbotMessage: string | null = null;

  preg!: PregnancyTrackings;
  recupid!: number;

  weightData: ChartDataset<'line'>[] = [
    { data: [], label: 'Poids (kg)', tension: 0.4 }
  ];
  
  pressureData: ChartDataset<'line'>[] = [
    { data: [], label: 'Tension (mmHg)', tension: 0.4 }
  ];
  
  // 🔵 Options pour le graphique de poids
weightChartOptions: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    y: {
      min: 40,
      max: 100,
      title: {
        display: true,
        text: 'Poids (kg)'
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        weightLimit: {
          type: 'line',
          yMin: 80,
          yMax: 80,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            content: '⚠ Limite poids (80kg)',
            color: 'red',
            position: 'end'
          }
        }
      }
    }
  }
  
};

// 🔴 Options pour le graphique de tension
pressureChartOptions: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    y: {
      min: 5,
      max: 15,
      title: {
        display: true,
        text: 'Tension (mmHg)'
      }
    }
  },
  plugins: {
    annotation: {
      annotations: {
        pressureLimit: {
          type: 'line',
          yMin: 14,
          yMax: 14,
          borderColor: 'red',
          borderWidth: 2,
          label: {
            enabled: true,
            content: '⚠ Limite tension (14)',
            color: 'red',
            position: 'end'
          }
        }
      }
    }
  }
};
moodChartLabels: string[] = ['😊 Happy', '😌 Stable', '😠 Irritable', '😢 Sad'];
moodChartColors: string[] = ['#8BC34A', '#4FC3F7', '#FFC107', '#E57373'];
moodData: ChartDataset<'doughnut'>[] = [
  {
    data: [],
    label: 'Répartition des émotions',
    backgroundColor: ['#8BC34A', '#4FC3F7', '#FFC107', '#E57373']
  }
];


moodChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom'
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
          const value = context.raw as number;
          const percent = ((value / total) * 100).toFixed(1);
          return `${context.label}: ${percent}%`;
        }
      }
    }
    
  }
};


  updateCharts(): void {
    // Filtrer les mois enregistrés jusqu'au mois courant
    const filtered = this.trackings
      .filter(t => t.month <= this.currentMonth)
      .sort((a, b) => a.month - b.month); // assure l'ordre croissant
  
    this.labels = filtered.map(t => `Mois ${t.month}`);
    this.weightData[0].data = filtered.map(t => t.weight);
    this.pressureData[0].data = filtered.map(t => +(t.bloodPressure ?? 0));
  }
    // 👉 Méthode pour changer d'affichage
    toggleView(view: 'form' | 'todo') {
      this.currentView = view;
    
      if (view === 'todo') {
        if (this.idPregnancyTracking) {
          this.router.navigate(['/todo-list', this.idPregnancyTracking], {
            queryParams: { context: 'monthly' }
          });
          
                  } else {
          this.snackBar.open('ID de grossesse manquant !', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      }
    }
    
    
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({ text: this.newTask.trim(), done: false });
        this.newTask = '';
      }
    }
    
    removeTask(index: number) {
      this.tasks.splice(index, 1);
    }
    
    toggleDone(index: number) {
      this.tasks[index].done = !this.tasks[index].done;
    }
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private trackingService: PregnancyTrackingService,
    private trackingContext: TrackingContextService,


    private forumService: ForumService
    
  ) {
    this.monthlyForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(30)]],
      bloodPressure: ['', Validators.required],
      symptoms: ['', Validators.required],
      pregnancyPain: ['', Validators.required],
      pregnancyCravings: ['', Validators.required],
      moodSwings: ['', Validators.required],
      description: ['', Validators.required],
      breathelessness: ['', Validators.required]
    });
  }

  /*ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idPregnancyTracking = +id;
      if (!isNaN(this.idPregnancyTracking)) {
        this.loadTrackings();
      } else {
        this.errorMessage = 'ID de grossesse invalide';
      }
    });
  }*/
    ngOnInit(): void {

      this.route.params.subscribe(params => {

        let id = +this.route.snapshot.params['id']; // 🔁 Remplacer 'const' par 'let'

        const url = this.router.url;

        this.currentTrackingType = url.includes('semester') ? 'semester' : 'monthly';

        const reloadToken = this.route.snapshot.queryParamMap.get('reload');

     

     

   

        if (isNaN(id) || !id) {

          const storedId = this.trackingContext.getId();

          if (storedId) id = storedId;

        }

   

        if (!isNaN(id)) {

          this.idPregnancyTracking = id;

          this.trackingContext.setId(id); // ✅ Toujours enregistrer

   

          const cachedTrackings = this.forumService.trackings;

   

          // ✅ Vérifie si le cache correspond au bon suivi

          if (

            cachedTrackings.length > 0 &&

          //  cachedTrackings[0]?.idPregnancyTracking === id // ✅ au lieu de .pregnancyTracking.idPregnancyTracking

          cachedTrackings[0]?.pregnancyTracking?.idPregnancyTracking === id

 

          ) {

            this.trackings = cachedTrackings;

            this.savedMonths = cachedTrackings.map(t => t.month);

            this.loadMonthData();

            this.updateCharts();

                    // ✅ 🟢 Restaurer le formulaire si une version temporaire existe

        if (this.forumService.currentMonthlyForm) {

          this.monthlyForm.patchValue(this.forumService.currentMonthlyForm);

        }

 

          } else {

            this.idPregnancyTracking = id; // 🟢 à mettre avant le this.loadTrackings()

 

            this.loadTrackings(); // 🔁 sinon, re-fetch depuis backend

          }

        } else {

          this.errorMessage = 'ID de grossesse invalide';

        }

        if (this.trackings.length === 2) {

          const moodCounts = this.getMoodSummary();

          this.moodData[0].data = [

            moodCounts['HAPPY'],

            moodCounts['STABLE'],

            moodCounts['IRRITABLE'],

            moodCounts['SAD']

          ];

        }

       

       

      });

      this.updateMoodChart(); // doit être après assignation this.trackings

      if (this.idPregnancyTracking) {

        this.forumService.getInterpretation(this.idPregnancyTracking).subscribe({

          next: (msg) => this.autoInterpretationMessage = msg,

          error: () => this.autoInterpretationMessage = 'Erreur d’analyse automatique.'

        });

      }

      if (this.idPregnancyTracking) {

        this.checkForChatbotTrigger();

      }

     

    }

  onSubmit(): void {
    if (!this.idPregnancyTracking || this.monthlyForm.invalid) {
      this.monthlyForm.markAllAsTouched();
      this.errorMessage = 'Formulaire invalide';
      return;
    }

    const forum: Forum = {
      idForum: this.selectedForumId ?? undefined,
      month: this.currentMonth,
      weight: this.monthlyForm.value.weight,
      bloodPressure: this.monthlyForm.value.bloodPressure,
      symptoms: this.monthlyForm.value.symptoms,
      pregnancyPain: this.monthlyForm.value.pregnancyPain,
      pregnancyCravings: this.monthlyForm.value.pregnancyCravings,
      moodSwings: this.monthlyForm.value.moodSwings,
      description: this.monthlyForm.value.description,
      breathelessness: this.monthlyForm.value.breathelessness,
      /*pregnancyTracking: {
        idPregnancyTracking: this.idPregnancyTracking
      }*/
       // idPregnancyTracking: this.idPregnancyTracking! // ✅ on envoie juste l’ID à plat
      pregnancyTracking:{ idPregnancyTracking: this.idPregnancyTracking }
    };

    const request$ = this.selectedForumId
      ? this.forumService.updateForum(this.selectedForumId, forum)
      : this.forumService.addForum(forum);

      request$.subscribe({
        next: (updatedForum) => {
          this.snackBar.open(
            this.selectedForumId ? '✅ Month successfully updated!' : '✅ Month successfully saved!',
            'Close',
            {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-success']
            }
          );
                
          if (!this.savedMonths.includes(this.currentMonth)) {
            this.savedMonths.push(this.currentMonth);
          }
      
          const index = this.trackings.findIndex(t => t.month === this.currentMonth);
          if (index !== -1) {
            this.trackings[index] = { ...updatedForum };
          } else {
            this.trackings.push({ ...updatedForum });
          }
      
          this.selectedForumId = updatedForum.idForum ?? null;
          this.isEditing = true;
          this.monthlyForm.patchValue(updatedForum);
      
          // ✅ Appelle ici, bien dans le bloc `next`
          this.updateCharts();
        },
       
          error: () => {
            this.errorMessage = "Erreur lors de l'enregistrement ou mise à jour";
            this.snackBar.open('❌ Failed to save or update this month!', 'Close', {
              duration: 4000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-error']
            });
          }
                  
      });
      
  }

  nextMonth(): void {
    if (this.currentMonth < 9) {
      this.currentMonth++;
      this.selectedForumId = null;
       this.isEditing = false;

      this.loadMonthData();
    }
  }

  previousMonth(): void {
    if (this.currentMonth > 1) {
      this.currentMonth--;
      this.selectedForumId = null;
      this.isEditing = false;

      this.loadMonthData();
    }
  }

  loadMonth(month: number): void {
    if (month >= 1 && month <= 9) {
      this.currentMonth = month;
      this.loadMonthData();
    } else {
      this.selectedForumId = null;
      this.isEditing = false;
      this.monthlyForm.reset();
    }
    
    
    
  }

  private loadMonthData(): void {
    const monthData = this.trackings.find(t => t.month === this.currentMonth);
    if (monthData) {
      this.selectedForumId = monthData.idForum ?? null;
      this.isEditing = true;
      this.monthlyForm.patchValue({
        weight: monthData.weight,
        bloodPressure: monthData.bloodPressure,
        symptoms: monthData.symptoms,
        pregnancyPain: monthData.pregnancyPain,
        pregnancyCravings: monthData.pregnancyCravings,
        moodSwings: monthData.moodSwings,
        description: monthData.description,
        breathelessness: monthData.breathelessness
        
      });
    } else {
      this.selectedForumId = null;
      this.isEditing = false;
      this.monthlyForm.reset();
    }
  }
  

  loadTrackings(): void {
    if (this.trackings.length >= 4) {
      const conclusion = this.getMoodConclusion();
      this.snackBar.open(conclusion, 'Fermer', {
        duration: 7000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
    }
     else {
      this.forumService.getForumsByPregnancy(this.idPregnancyTracking!).subscribe({
        next: (data) => {
          this.trackings = data;
          this.savedMonths = data.map(item => item.month);
          this.forumService.trackings = data;
          this.isLoading = false;
          this.loadMonthData();
          this.updateCharts();
          this.updateMoodChart();
        
          // ✅ Affichage de la conclusion après 4 mois
          if (this.trackings.length >= 4) {
            const conclusion = this.getMoodConclusion();
            this.snackBar.open(conclusion, 'Fermer', {
              duration: 7000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['snackbar-success']
            });
          }
        }
        
      });
    }
  }
  getMoodSummary(): { [key: string]: number } {
    const moodCounts: { [key: string]: number } = {
      HAPPY: 0,
      STABLE: 0,
      IRRITABLE: 0,
      SAD: 0
    };

    this.trackings.forEach(t => {
      const mood = t.moodSwings?.toUpperCase();
      if (mood && moodCounts.hasOwnProperty(mood)) {
        moodCounts[mood]++;
      }
    });

    const dominantMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);

    if (dominantMood === 'SAD') {
      this.adviceMessage = "It's important to take care of your emotional well-being ❤️";
    } else if (dominantMood === 'HAPPY') {
      this.adviceMessage = "Your pregnancy has been full of joyful moments 😊. Keep going and enjoy these positive experiences!";
    } else if (dominantMood === 'IRRITABLE') {
      this.adviceMessage = "Some moments of irritability were present 😠. Make sure to rest and seek support if needed.";
    } else if (dominantMood === 'STABLE') {
      this.adviceMessage = "Your mood has remained mostly stable 😌. Keep taking care of yourself and listening to your needs.";
    }

    return moodCounts;
  }
  getMoodConclusion(): string {
    const moodCounts = this.getMoodSummary();
    const maxMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
  
    const messages: { [key: string]: string } = {
      HAPPY: 'Your pregnancy has been filled with joyful moments 🌞.',
      STABLE: 'Your pregnancy has been mostly stable and balanced ⚖️.',
      IRRITABLE: 'Your pregnancy has had some irritable moments 😤. Stay strong!',
      SAD: 'Your pregnancy has been emotionally challenging 😢. Be proud of yourself ❤️.'
    };
  
    return messages[maxMood] ||  "Thank you for completing the 9 months!";
  }
  updateMoodChart(): void {
    const moodCounts = this.getMoodSummary();
    const total = Object.values(moodCounts).reduce((sum, count) => sum + count, 0) || 1;
  
    this.moodData[0].data = [
      Math.round((moodCounts['HAPPY'] * 100) / total),
      Math.round((moodCounts['STABLE'] * 100) / total),
      Math.round((moodCounts['IRRITABLE'] * 100) / total),
      Math.round((moodCounts['SAD'] * 100) / total)
    ];
  }
  getMoodStatsSummary(): string {
    const moodCounts = this.getMoodSummary();
    const total = Object.values(moodCounts).reduce((sum, count) => sum + count, 0) || 1;
  
    const percentages = {
      HAPPY: Math.round((moodCounts['HAPPY'] / total) * 100),
      STABLE: Math.round((moodCounts['STABLE'] / total) * 100),
      IRRITABLE: Math.round((moodCounts['IRRITABLE'] / total) * 100),
      SAD: Math.round((moodCounts['SAD'] / total) * 100)
    };
  
    const parts = [];
    if (percentages.HAPPY > 0) parts.push(`😊 ${percentages.HAPPY}% Happy`);
    if (percentages.STABLE > 0) parts.push(`😌 ${percentages.STABLE}% Stable`);
    if (percentages.IRRITABLE > 0) parts.push(`😠 ${percentages.IRRITABLE}% Irritable`);
    if (percentages.SAD > 0) parts.push(`😢 ${percentages.SAD}% Sad`);
  
    return parts.length > 0 ? parts.join(' / ') : 'No data available.';
  }
  
  
  
  
  analyzeSymptoms(): void {
    if (!this.selectedForumId) {
      this.snackBar.open('No trimester selected for analysis.', 'Close', {
        duration: 3000
      });
      return;
    }
  
    this.forumService.analyzeSymptomsByForum(this.selectedForumId).subscribe({
      next: (result) => {
        this.aiResult = result;
      },
      error: () => {
        this.snackBar.open("❌ Error during symptom analysis.", 'Close', {
          duration: 4000
        });
      }
    });
  }
  

checkForChatbotTrigger() {
  this.forumService.checkChatbotAlert(this.idPregnancyTracking!).subscribe({
    next: (res: any) => {
      if (res.triggerChat) {
        this.chatbotMessage = res.message;
      }
    }
  });
}

  
}
