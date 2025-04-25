package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.DTO.NutritionDeficiencyReport;
import tn.esprit.bambinou.Entity.Nutrition;
import java.util.List;

public interface INutritionService {
    public List<Nutrition> retrieveAllNutritions();
    public Nutrition retrieveNutrition(Long id);
    public Nutrition addNutrition(Nutrition nutrition);
    public void removeNutrition(Long id);
    public Nutrition modifyNutrition(Nutrition nutrition);
    public NutritionDeficiencyReport generateDeficiencyReport(int userId);
}