import { Component, OnInit } from '@angular/core';
import { Forum } from '../model/Forum';
import { ForumService } from 'src/app/service/forum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions, Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PregnancyTrackings } from '../model/PregnancyTracking';

Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-semester-tracking',
  templateUrl: './semester-tracking.component.html',
  styleUrls: ['./semester-tracking.component.css']
})
export class SemesterTrackingComponent implements OnInit {
  monpreg!:PregnancyTrackings
  semesterForm: FormGroup;
  idPregnancyTracking: number | null = null;
  currentTrimester: number = 1;
  trackings: Forum[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  selectedForumId: number | null = null;
  isEditing: boolean = false;
  savedTrimesters: number[] = [];
  labels: string[] = [];
  currentView: 'form' | 'todo' = 'form';
  currentTrackingType: 'monthly' | 'semester' = 'monthly'; // ou 'semester'
  moodCounts: { [mood: string]: number } = {};
  adviceMessage: string = '';
  aiResult: any = null;
  autoInterpretationMessage: string | null = null;
  chatbotMessage: string | null = null;
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

  tasks: { text: string; done: boolean }[] = [];
  newTask: string = '';
  weightData: ChartDataset<'line'>[] = [
    { data: [], label: 'Poids (kg)', tension: 0.4 }
  ];

  pressureData: ChartDataset<'line'>[] = [
    { data: [], label: 'Tension (mmHg)', tension: 0.4 }
  ];

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,

    private forumService: ForumService
  ) {
    this.semesterForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(30)]],
      bloodPressure: ['', [Validators.required]],
      symptoms: ['', [Validators.maxLength(255)]],
      pregnancyPain: ['', [Validators.maxLength(255)]],
      pregnancyCravings: ['', [Validators.maxLength(255)]],
      moodSwings: ['', [Validators.required]],
      description: ['', [Validators.maxLength(255)]],
      breathelessness: ['', [Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      const url = this.router.url;
      this.currentTrackingType = url.includes('semester') ? 'semester' : 'monthly';
      this.idPregnancyTracking = +id;
      if (!isNaN(this.idPregnancyTracking)) {
        this.loadTrackings();
      } else {
        this.errorMessage = 'ID de grossesse invalide';
      }
    });
    this.updateMoodChart();
if (this.idPregnancyTracking) {
  this.forumService.getInterpretation(this.idPregnancyTracking).subscribe({
    next: (msg) => this.autoInterpretationMessage = msg,
    error: () => this.autoInterpretationMessage = 'Erreur d’analyse automatique.'
  });

  this.checkForChatbotTrigger();
}

  }

  onSubmit(): void {
    if (!this.idPregnancyTracking || this.semesterForm.invalid) {
      this.semesterForm.markAllAsTouched();
      this.errorMessage = 'Formulaire invalide';
      return;
    }

    const forum: Forum = {
      idForum: this.selectedForumId ?? undefined,
      month: this.currentTrimester,
      weight: this.semesterForm.value.weight,
      bloodPressure: this.semesterForm.value.bloodPressure,
      symptoms: this.semesterForm.value.symptoms,
      pregnancyPain: this.semesterForm.value.pregnancyPain,
      pregnancyCravings: this.semesterForm.value.pregnancyCravings,
      moodSwings: this.semesterForm.value.moodSwings,
      description: this.semesterForm.value.description,
      breathelessness: this.semesterForm.value.breathelessness,
      pregnancyTracking: {
        idPregnancyTracking: this.idPregnancyTracking!
      }
        //idPregnancyTracking: this.idPregnancyTracking! // ✅ on envoie juste l’ID à plat
    };

    const request$ = this.selectedForumId
      ? this.forumService.updateForum(this.selectedForumId, forum)
      : this.forumService.addForum(forum);

    request$.subscribe({
      next: (updatedForum) => {

        this.snackBar.open('Pregnancy tracking successfully saved!', 'Close', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        if (!this.savedTrimesters.includes(this.currentTrimester)) {
          this.savedTrimesters.push(this.currentTrimester);
        }

        const index = this.trackings.findIndex(t => t.month === this.currentTrimester);
        if (index !== -1) {
          this.trackings[index] = { ...updatedForum };
        } else {
          this.trackings.push({ ...updatedForum });
        }

        this.selectedForumId = updatedForum.idForum ?? null;
        this.isEditing = true;
        this.semesterForm.patchValue(updatedForum);

        this.updateCharts();
      },
      error: () => {
        this.snackBar.open('Error while saving tracking!', 'Close', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });      }
    });
  }

  updateCharts(): void {
    const filtered = this.trackings
      .filter(t => t.month <= this.currentTrimester)
      .sort((a, b) => a.month - b.month);

    this.labels = filtered.map(t => `T${t.month}`);
    this.weightData[0].data = filtered.map(t => t.weight);
    this.pressureData[0].data = filtered.map(t => +(t.bloodPressure ?? 0));
  }
  // 👉 Méthode pour changer d'affichage
  toggleView(view: 'form' | 'todo') {
    this.currentView = view;
    if (this.idPregnancyTracking) {
      this.router.navigate(['/todo-list', this.idPregnancyTracking], {
        queryParams: { context: 'semester' }
      });
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
  nextTrimester(): void {
    if (this.currentTrimester < 3) {
      this.currentTrimester++;
      this.loadTrimesterData();
    }
  }

  previousTrimester(): void {
    if (this.currentTrimester > 1) {
      this.currentTrimester--;
      this.loadTrimesterData();
    }
  }

  loadTrimester(trimester: number): void {
    if (trimester >= 1 && trimester <= 3) {
      this.currentTrimester = trimester;
      this.loadTrimesterData();
    }
  }

  private loadTrimesterData(): void {
    const data = this.trackings.find(t => t.month === this.currentTrimester);
    if (data) {
      this.selectedForumId = data.idForum ?? null;
      this.isEditing = true;
      this.semesterForm.patchValue(data);
    } else {
      this.selectedForumId = null;
      this.isEditing = false;
      this.semesterForm.reset();
    }
  }

  loadTrackings(): void {
    if (!this.idPregnancyTracking) return;

    this.isLoading = true;
    this.forumService.getForumsByPregnancy(this.idPregnancyTracking).subscribe({
      next: (data) => {
        this.trackings = data;
        this.savedTrimesters = data.map(item => item.month);
        this.isLoading = false;
        this.loadTrimesterData();
        this.updateCharts();
      },
      error: (error) => {
        console.error('Erreur de chargement:', error);
        this.isLoading = false;
        this.errorMessage = 'Erreur lors du chargement des données';
      }
    });
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
  
    return messages[maxMood] || "Thank you for completing the 9 months!";
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
  
    return parts.length > 0 ? parts.join(' / ') : 'No data available..';
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
