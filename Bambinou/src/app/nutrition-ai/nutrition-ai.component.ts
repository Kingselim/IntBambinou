import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AiNutritionService } from 'src/app/service/ai-nutrition.service';

@Component({
  selector: 'app-nutrition-ai',
  templateUrl: './nutrition-ai.component.html',
  styleUrls: ['./nutrition-ai.component.css']
})
export class NutritionAiComponent implements OnInit {

  nutritionRecommendationForm!: FormGroup;
  recommendation: string = '';

  constructor(
    private fb: FormBuilder,
    private aiService: AiNutritionService
  ) {}

  ngOnInit(): void {
    this.nutritionRecommendationForm = this.fb.group({
      calories: [2000, [Validators.required, Validators.min(1)]],
      protein: [50, [Validators.required, Validators.min(0)]],
      glucide: [300, [Validators.required, Validators.min(0)]],
      lipide: [70, [Validators.required, Validators.min(0)]],
      vitamin: [20, [Validators.required, Validators.min(0)]]
    });
  }

  getRecommendation(): void {
    if (this.nutritionRecommendationForm.valid) {
      this.aiService.generateRecommendation(this.nutritionRecommendationForm.value).subscribe({
        next: (res) => {
          this.recommendation = res.recommendation;
        },
        error: (err) => {
          console.error('Erreur IA:', err);
        }
      });
    }
  }
}
