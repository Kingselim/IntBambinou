package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Nutrition;
import tn.esprit.bambinou.Repository.NutritionRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class NutritionServiceImpl implements INutritionService {
    @Autowired
    private NutritionRepository nutritionRepository;

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
