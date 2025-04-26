import { Component, OnInit } from '@angular/core';
import { AlimentationService, Alimentation } from '../alimentation.service';
import { Router } from '@angular/router';
import { NutritionService } from '../service/nutrition.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AiNutritionService } from 'src/app/service/ai-nutrition.service';
import { AuthService } from '../backoffice/service/auth.service';
import {User} from "../model/User";
import { UserServiceService } from '../service/user-service.service';
interface NutritionForm {
  ageMonths: number | null;
  weight: number | null;
}

interface NutritionResults {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

@Component({
  selector: 'app-alimentation',
  templateUrl: './alimentation.component.html',
  styleUrls: ['./alimentation.component.css']
})
export class AlimentationComponent implements OnInit {
  alimentationData: Alimentation[] = [];
  filteredAndSortedData: Alimentation[] = [];
  loading: boolean = false;
  error: string | null = null;
  displayedColumns: string[] = [
    'idNutrition',
    'description',
    'recommendation',
    'calories',
    'protein',
    'glucide',
    'lipide',
    'vitamin',
    'nbFollowers',
  ];
  nutritionRecommendationForm!: FormGroup;
  recommendation = '';

  searchQuery: string = '';
  filters: { [key: string]: { min: number | null, max: number | null } } = {
    calories: { min: null, max: null },
    protein: { min: null, max: null },
  };

  sortColumn: string = 'idNutrition';
  sortDirection: 'asc' | 'desc' = 'asc';

  nutritionForm: NutritionForm = {
    ageMonths: null,
    weight: null,
  };

  nutritionResults: NutritionResults | null = null;
  calculationError: string | null = null;

  constructor(private alimentationService: AlimentationService, private router: Router,private nutritionService: NutritionService,private fb: FormBuilder, private aiService: AiNutritionService,
    private UserService: UserServiceService, private authService: AuthService

  ) { }
  User! : User;
  CurrentEmail! : string;
  ngOnInit(): void {
    console.log("dans peregnancy tracking -----------");
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.authService.getDecodedToken(token);
      if (decodedToken) {
        this.CurrentEmail = decodedToken.sub;
        this.UserService.getUserByEmail(this.CurrentEmail).subscribe(data => {
          this.User = data
          console.log('User ID:::::::::::', this.User.id);
        })
      }
    }else
    {
        console.log("pas de token");
    }
    this.loadAlimentationData();
    this.nutritionRecommendationForm = this.fb.group({
      calories: [2000, [Validators.required, Validators.min(1)]],
      protein: [50, [Validators.required, Validators.min(0)]],
      glucide: [300, [Validators.required, Validators.min(0)]],
      lipide: [70, [Validators.required, Validators.min(0)]],
      vitamin: [20, [Validators.required, Validators.min(0)]]
    });
    this.getDeficiencyReport(this.User.id);
  }

  loadAlimentationData(): void {
    this.loading = true;
    this.error = null;

    this.alimentationService.getAllAlimentation().subscribe({
      next: (data) => {
        console.log('API Response:', data);
        this.alimentationData = Array.isArray(data) ? data : [];
        this.applyFiltersAndSort();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load nutrition data. Please try again later.';
        this.loading = false;
        console.error('Error loading data:', err);
      }
    });
  }

  applyFiltersAndSort(): void {
    let result = [...this.alimentationData];

    // Apply search
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      result = result.filter(item =>
        item.description.toLowerCase().includes(query) ||
        item.recommendation.toLowerCase().includes(query)
      );
    }

    // Apply calorie filter based on baby's calculated needs
    if (this.nutritionResults && this.nutritionResults.calories) {
      // Filter items with calories >= 10% of daily needs (adjustable)
      // Example: If daily needs are 720 kcal, show items with >= 72 kcal/serving
      const minCalories = this.nutritionResults.calories / 10;
      result = result.filter(item => item.calories >= minCalories);
    }

    // Apply existing filters
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

    this.filteredAndSortedData = result;
  }

  calculateNutrition(): void {
    this.calculationError = null;

    if (!this.nutritionForm.ageMonths || !this.nutritionForm.weight) {
      this.calculationError = 'Please fill all required fields (age in months, weight)';
      return;
    }

    if (this.nutritionForm.ageMonths < 0 || this.nutritionForm.ageMonths > 12) {
      this.calculationError = 'Age must be between 0 and 12 months';
      return;
    }

    if (this.nutritionForm.weight < 2 || this.nutritionForm.weight > 15) {
      this.calculationError = 'Weight must be between 2 and 15 kg';
      return;
    }

    let caloriesPerKg: number;
    if (this.nutritionForm.ageMonths <= 3) {
      caloriesPerKg = 100;
    } else if (this.nutritionForm.ageMonths <= 6) {
      caloriesPerKg = 90;
    } else {
      caloriesPerKg = 80;
    }

    const totalCalories = this.nutritionForm.weight * caloriesPerKg;

    const proteinPercentage = 0.10;
    const fatPercentage = 0.45;
    const carbsPercentage = 0.45;

    const proteinCal = totalCalories * proteinPercentage;
    const fatCal = totalCalories * fatPercentage;
    const carbsCal = totalCalories * carbsPercentage;

    const proteinG = proteinCal / 4;
    const fatG = fatCal / 9;
    const carbsG = carbsCal / 4;

    this.nutritionResults = {
      calories: Math.round(totalCalories),
      protein: Math.round(proteinG * 10) / 10,
      fat: Math.round(fatG * 10) / 10,
      carbs: Math.round(carbsG * 10) / 10,
    };

    // Update filtered data to reflect calorie requirements
    this.applyFiltersAndSort();
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

  onDeleteAlimentation(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.alimentationService.deleteAlimentation(id).subscribe({
        next: () => {
          this.alimentationData = this.alimentationData.filter(item => item.idNutrition !== id);
          this.applyFiltersAndSort();
        },
        error: (err) => {
          console.error('Error deleting item:', err);
        }
      });
    }
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

  deficiencyReport: any; // Pour stocker le rapport

getDeficiencyReport(babyId: number): void {
  this.nutritionService.getDeficiencyReport(babyId).subscribe({
    next: (report) => {
      this.deficiencyReport = report;
    },
    error: (err) => {
      this.error = "Échec de récupération du rapport nutritionnel.";
      console.error(err);
    }
  });
}

viewPosts(nutritionId: number): void {
  this.router.navigate(['/poste'], { queryParams: { nutritionId } });
}


}