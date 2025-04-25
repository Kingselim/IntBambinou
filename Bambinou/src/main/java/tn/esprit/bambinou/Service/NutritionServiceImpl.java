package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.DTO.NutritionDeficiencyReport;
import tn.esprit.bambinou.Entity.Nutrition;
import tn.esprit.bambinou.Repository.NutritionRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class NutritionServiceImpl implements INutritionService {
    @Autowired
    private NutritionRepository nutritionRepository;

    @Override
    public NutritionDeficiencyReport generateDeficiencyReport(int userId) {
        Nutrition nutrition = nutritionRepository.findByUser_Id(userId);

        if (nutrition == null) {
            return new NutritionDeficiencyReport(
                    true, true, true, 0, 0, 0, 0, 0,
                    "Aucune donnée nutritionnelle trouvée."
            );
        }

        boolean lowVitamin = nutrition.getVitamin() < 10;
        boolean lowCalories = nutrition.getCalories() < 800;
        boolean unbalancedMacros = !(
                nutrition.getProtein() >= 10 &&
                        nutrition.getGlucide() >= 45 &&
                        nutrition.getLipide() >= 25
        );

        return new NutritionDeficiencyReport(
                lowVitamin,
                lowCalories,
                unbalancedMacros,
                nutrition.getCalories(),
                nutrition.getProtein(),
                nutrition.getGlucide(),
                nutrition.getLipide(),
                nutrition.getVitamin(),
                "Vérifiez l'équilibre nutritionnel du bébé."
        );
    }

    @Override
    public List<Nutrition> retrieveAllNutritions() {
        return nutritionRepository.findAll();
    }

    @Override
    public Nutrition retrieveNutrition(Long id) {
        return nutritionRepository.findById(id).orElse(null);
    }

    @Override
    public Nutrition addNutrition(Nutrition nutrition) {
        return nutritionRepository.save(nutrition);
    }

    @Override
    public void removeNutrition(Long id) {
        nutritionRepository.deleteById(id);
    }

    @Override
    public Nutrition modifyNutrition(Nutrition nutrition) {
        return nutritionRepository.save(nutrition);
    }

}
