import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../service/forum.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../model/Task'; // ✅ à importer
import { TaskService } from '../service/task.service';
/*interface Task {
  text: string;
  status: 'todo' | 'inProgress' | 'done';
  date?: string;
  time?: string;
  phoneNumber: '+21692238564', // numéro statique
  idPregnancyTracking: 0    
  
}*/

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  idPregnancyTracking!: number;

  newTask: Task = {
    text: '',
    status: 'todo',
    date: '',
    time: '',
    phoneNumber: '+21692238564', // numéro statique
    pregnancyTracking:{idPregnancyTracking: 0} 
 };

  tasks: Task[] = [];
  statuses: Array<'todo' | 'inProgress' | 'done'> = ['todo', 'inProgress', 'done'];
  currentTrackingType: 'monthly' | 'semester' = 'monthly';

  
  
  constructor(
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar,

       private forumService: ForumService,
       private taskService: TaskService ,// ✅ ici

       private router: Router
  ) {
    
  }
  ngOnInit(): void {
    // Récupérer l’ID
    this.route.params.subscribe(params => {
      this.idPregnancyTracking = +params['id'];
      this.newTask.pregnancyTracking.idPregnancyTracking = this.idPregnancyTracking 
  
      // 🟢 Charger les tâches existantes pour cet ID
      this.taskService.getTasksByTrackingId(this.idPregnancyTracking).subscribe({
        next: (data) => {
          this.tasks = data;
        },
        error: () => {
          this.snackBar.open("❌ Échec du chargement des tâches", 'Fermer', {
            duration: 3000
          });
        }
      });
    });
  
    // Récupérer le contexte (monthly ou semester)
    this.route.queryParams.subscribe(query => {
      const context = query['context'];
      this.currentTrackingType = context === 'semester' ? 'semester' : 'monthly';
      console.log('📌 Contexte détecté depuis URL :', this.currentTrackingType);
    });
  }
  
  
  
    addTask(): void {
      if (!this.newTask.text.trim() || !this.newTask.date || !this.newTask.time) {
        this.snackBar.open('❗ Merci de compléter tous les champs.', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
        return;
      }
      const normalize = (value: string) => value.trim().toLowerCase();

      // 🔒 Vérifie s’il existe déjà une tâche TODO à cette date et heure
      const alreadyExists = this.tasks.some(
        task =>
          normalize(task.date) === normalize(this.newTask.date) &&
          normalize(task.time) === normalize(this.newTask.time) &&
          task.status === 'todo'
      );
      if (alreadyExists) {
        this.snackBar.open('⚠️ Une tâche TODO existe déjà à cette date et heure.', 'Fermer', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
        return;
      }
    
      //this.newTask.phoneNumber = '+21692238564';
      this.newTask.pregnancyTracking.idPregnancyTracking = this.idPregnancyTracking
    
      this.taskService.createTask(this.newTask).subscribe({
        next: (createdTask) => {
          this.tasks.push(createdTask); // on ajoute dans la liste locale
          this.snackBar.open('✅ Tâche enregistrée !', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.resetNewTask();
        },
        error: () => {
          this.snackBar.open('❌ Échec de l’enregistrement de la tâche', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      });
    }
    
    
  

  toggleStatus(index: number): void {
    const task = this.tasks[index];
    if (task.status === 'todo') task.status = 'inProgress';
    else if (task.status === 'inProgress') task.status = 'done';
    else task.status = 'todo';
  }

  removeTask(index: number, taskId: number): void {
    this.tasks.splice(index, 1);
    this.taskService.deleteTask(taskId).subscribe();
  }

  getTasksByStatus(status: 'todo' | 'inProgress' | 'done'): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  getTitle(status: 'todo' | 'inProgress' | 'done'): string {
    switch (status) {
      case 'todo':
        return '📋 To Do';
      case 'inProgress':
        return '🚧 In Progress';
      case 'done':
        return '✅ Done';
      default:
        return '';
    }
  }
  

  private resetNewTask(): void {
    this.newTask = {
      text: '',
      status: 'todo',
      date: '',
      time: '',
      phoneNumber: '+21692238564', // numéro statique
      pregnancyTracking: { idPregnancyTracking: this.idPregnancyTracking },  
    };
  }
}
