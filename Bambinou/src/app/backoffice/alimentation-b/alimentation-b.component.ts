import { Component, OnInit } from '@angular/core';
import { AlimentationService, Alimentation } from '../../alimentation.service';
import {UserServiceService} from "../../service/user-service.service"

@Component({
  selector: 'app-alimentation-b',
  templateUrl: './alimentation-b.component.html',
  styleUrls: ['./alimentation-b.component.css',
    "../../../assets/BackOffice/assets/css/bootstrap.min.css",
              "../../../assets/BackOffice/assets/css/demo.css",
              "../../../assets/BackOffice/assets/css/fonts.css",
              "../../../assets/BackOffice/assets/css/fonts.min.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.min.css"]

})
export class AlimentationBComponent implements OnInit {
  alimentations: Alimentation[] = [];
  filteredAlimentations: Alimentation[] = [];
  // currentAlimentation: Alimentation | null = null;
  isEditMode = false;
  error: string | null = null;
  loading = false;
  availableUsers: any[] = [];

  showForm = false;


  // currentAlimentation: Alimentation | null = {
  //   recommendation: '',
  //   description: '',
  //   nbFollowers: 0,
  //   calories: 0,
  //   protein: 0,
  //   glucide: 0,
  //   lipide: 0,
  //   vitamin: 0,
  //   userName: ''
  // };
  
  // Cela évite d'avoir un objet pré-initialisé qui pourrait causer l'affichage non désiré du formulaire.
  currentAlimentation: Alimentation | null = null;
  
  

  // Search and filter state
  searchQuery: string = '';
  filters: { [key: string]: { min: number | null, max: number | null } } = {
    calories: { min: null, max: null },
    protein: { min: null, max: null },
  };

  // Sort state
  sortColumn: string = 'idNutrition';
  sortDirection: 'asc' | 'desc' = 'asc';
  displayedColumns: string[] = [
    'idNutrition',
    'recommendation',
    'description',
    'nbFollowers',
    'calories',
    'protein',
    'glucide',
    'lipide',
    'vitamin'
  ];

  constructor(
    private alimentationService: AlimentationService, private userService: UserServiceService )
     {}

  ngOnInit(): void {
    this.loadAlimentations();
    this.loadAvailableUsers();
  }

  loadAlimentations(): void {
    this.loading = true;
    this.error = null;
    this.alimentationService.getAllAlimentation().subscribe({
      next: (data) => {
        this.alimentations = data;
        this.applyFiltersAndSort();
        this.error = null;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data: ' + err.message;
        this.loading = false;
      }
    });
  }

  loadAvailableUsers(): void {
    this.userService.getAvailableUsersForNutrition().subscribe({
      next: (users) => {
        console.log("Utilisateurs disponibles :", users); // 👈 test ici
        this.availableUsers = users;
      },
      error: () => {
        this.error = "Impossible de charger les utilisateurs disponibles.";
      }
    });
  }

  applyFiltersAndSort(): void {
    let result = [...this.alimentations];

    // Apply search
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      result = result.filter(item =>
        (item.recommendation?.toLowerCase().includes(query) || '') ||
        (item.description?.toLowerCase().includes(query) || '')
      );
    }

    // Apply filters
    Object.keys(this.filters).forEach(key => {
      const { min, max } = this.filters[key];
      if (min !== null && min !== undefined) {
        result = result.filter(item => (item as any)[key] >= min);
      }
      if (max !== null && max !== undefined) {
        result = result.filter(item => (item as any)[key] <= max);
      }
    });

    // Apply sorting
    result.sort((a, b) => {
      const valueA = (a as any)[this.sortColumn];
      const valueB = (b as any)[this.sortColumn];
      if (typeof valueA === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return this.sortDirection === 'asc'
        ? valueA - valueB
        : valueB - valueA;
    });

    this.filteredAlimentations = result;
  }

  initNewAlimentation(): void {
    this.currentAlimentation = {
      idNutrition: 0,
      recommendation: '',
      description: '',
      nbFollowers: 0,
      calories: 0,
      protein: 0,
      glucide: 0,
      lipide: 0,
      vitamin: 0,
      userName: ''
    };
    this.isEditMode = false;

    this.showForm = true; // ✅ afficher le formulaire
  }

  editAlimentation(alimentation: Alimentation): void {
    this.currentAlimentation = { ...alimentation };
    this.isEditMode = true;

    this.showForm = true;
  }

  saveAlimentation(): void {
    if (!this.currentAlimentation) return;
  
    this.loading = true;
    this.error = null;
  
    const operation = this.isEditMode
      ? this.alimentationService.updateAlimentation(this.currentAlimentation)
      : this.alimentationService.addAlimentation(this.currentAlimentation);
  
    operation.subscribe({
      next: () => {
        this.loadAlimentations();
        this.cancelEdit();
      },
      error: (err) => {
        if (err.status === 409) {
          this.error = "⚠️ Ce bébé a déjà une fiche nutritionnelle. Vous pouvez la modifier plutôt que  créer une nouvelle.";
        } else if (err.status === 400) {
          this.error = "Requête invalide. Veuillez vérifier les champs.";
        } else if (err.status === 0) {
          this.error = "Le serveur ne répond pas. Vérifiez votre connexion.";
        } else {
          this.error = `Échec de ${this.isEditMode ? 'la modification' : 'la création'} : ${err.message}`;
        }
  
        this.loading = false;
      }
    });
  }
  
  

  deleteAlimentation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      this.loading = true;
      this.error = null;
      this.alimentationService.deleteAlimentation(id).subscribe({
        next: () => {
          this.loadAlimentations();
        },
        error: (err) => {
          this.error = 'Failed to delete item: ' + err.message;
          this.loading = false;
        }
      });
    }
  }

  cancelEdit(): void {
    this.currentAlimentation = null;
    this.isEditMode = false;
    this.error = null;

    this.showForm = false; // ✅ cacher le formulaire
  }

  onSearchChange(): void {
    this.applyFiltersAndSort();
  }

  onFilterChange(): void {
    this.applyFiltersAndSort();
  }

  onSortChange(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
  }

  resetFilters(): void {
    this.searchQuery = '';
    Object.keys(this.filters).forEach(key => {
      this.filters[key] = { min: null, max: null };
    });
    this.sortColumn = 'idNutrition';
    this.sortDirection = 'asc';
    this.applyFiltersAndSort();
  }
}