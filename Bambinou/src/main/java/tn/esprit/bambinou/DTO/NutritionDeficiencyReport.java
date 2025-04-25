package tn.esprit.bambinou.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class NutritionDeficiencyReport {
    private boolean lowVitamin;
    private boolean lowCalories;
    private boolean unbalancedMacronutrients;

    private float totalCalories;
    private float totalProtein;
    private float totalGlucide;
    private float totalLipide;
    private float totalVitamin;

    private String recommendation;

    public NutritionDeficiencyReport(
            boolean lowVitamin,
            boolean lowCalories,
            boolean unbalancedMacronutrients,
            float totalCalories,
            float totalProtein,
            float totalGlucide,
            float totalLipide,
            float totalVitamin,
            String recommendation) {
        this.lowVitamin = lowVitamin;
        this.lowCalories = lowCalories;
        this.unbalancedMacronutrients = unbalancedMacronutrients;
        this.totalCalories = totalCalories;
        this.totalProtein = totalProtein;
        this.totalGlucide = totalGlucide;
        this.totalLipide = totalLipide;
        this.totalVitamin = totalVitamin;
        this.recommendation = recommendation;
    }

    public boolean isLowVitamin() {
        return lowVitamin;
    }

    public void setLowVitamin(boolean lowVitamin) {
        this.lowVitamin = lowVitamin;
    }

    public boolean isLowCalories() {
        return lowCalories;
    }

    public void setLowCalories(boolean lowCalories) {
        this.lowCalories = lowCalories;
    }

    public boolean isUnbalancedMacronutrients() {
        return unbalancedMacronutrients;
    }

    public void setUnbalancedMacronutrients(boolean unbalancedMacronutrients) {
        this.unbalancedMacronutrients = unbalancedMacronutrients;
    }

    public float getTotalCalories() {
        return totalCalories;
    }

    public void setTotalCalories(float totalCalories) {
        this.totalCalories = totalCalories;
    }

    public float getTotalProtein() {
        return totalProtein;
    }

    public void setTotalProtein(float totalProtein) {
        this.totalProtein = totalProtein;
    }

    public float getTotalGlucide() {
        return totalGlucide;
    }

    public void setTotalGlucide(float totalGlucide) {
        this.totalGlucide = totalGlucide;
    }

    public float getTotalLipide() {
        return totalLipide;
    }

    public void setTotalLipide(float totalLipide) {
        this.totalLipide = totalLipide;
    }

    public float getTotalVitamin() {
        return totalVitamin;
    }

    public void setTotalVitamin(float totalVitamin) {
        this.totalVitamin = totalVitamin;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }
}
