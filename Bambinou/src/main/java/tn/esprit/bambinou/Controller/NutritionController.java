package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.DTO.CreateNutritionRequest;
import tn.esprit.bambinou.DTO.NutritionDeficiencyReport;
import tn.esprit.bambinou.Entity.Nutrition;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Service.INutritionService;
import tn.esprit.bambinou.Repository.UserRepository;
import tn.esprit.bambinou.Repository.NutritionRepository;


import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/nutrition")
@CrossOrigin(origins = "http://localhost:4200")
public class NutritionController {

    @Autowired
    private INutritionService nutritionService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NutritionRepository nutritionRepository;

    /*
        --------------------- format ajout d'une Nutrition avec JSON -----------------------

    {
        "idNutrition": 1,
        "idUser": 1,
        "recommendation": "Manger équilibré",
        "description": "Un régime adapté pour les sportifs",
        "nbFollowers": 100,
        "calories": 2000.0,
        "protein": 150.0,
        "glucide": 250.0,
        "lipide": 50.0,
        "vitamin": 30.0
    }

     */

    // http://localhost:8089/nutrition/retrieve-all
    @GetMapping("/retrieve-all")
    public List<Nutrition> getAllNutritions() {
        return nutritionService.retrieveAllNutritions();
    }

    // http://localhost:8089/nutrition/retrieve/{id}
    @GetMapping("/retrieve/{id}")
    public Nutrition getNutritionById(@PathVariable("id") Long id) {
        return nutritionService.retrieveNutrition(id);
    }

    // http://localhost:8089/nutrition/add
    @PostMapping("/add")
    public ResponseEntity<?> addNutrition(@RequestBody CreateNutritionRequest request) {
       Optional<User> userOpt = userRepository.findByName(request.userName);

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Utilisateur introuvable");
        }

        User user = userOpt.get();

        // ✅ Vérification si une nutrition existe déjà pour cet utilisateur
        if (nutritionRepository.findByUser_Id(user.getId()) != null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Une nutrition existe déjà pour cet utilisateur.");
        }

        Nutrition nutrition = new Nutrition();
        nutrition.setRecommendation(request.recommendation);
        nutrition.setDescription(request.description);
        nutrition.setNbFollowers(request.nbFollowers);
        nutrition.setCalories(request.calories);
        nutrition.setProtein(request.protein);
        nutrition.setGlucide(request.glucide);
        nutrition.setLipide(request.lipide);
        nutrition.setVitamin(request.vitamin);
        nutrition.setUser(user);

        nutritionRepository.save(nutrition);
        return ResponseEntity.ok(nutrition);
    }



    // http://localhost:8089/nutrition/remove/{id}
    @DeleteMapping("/remove/{id}")
    public void removeNutrition(@PathVariable("id") Long id) {
        nutritionService.removeNutrition(id);
    }

    // http://localhost:8089/nutrition/modify/{id_nutrition}
    @PutMapping("/modify/{id_nutrition}")
    public Nutrition modifyNutrition(@RequestBody Nutrition nutrition, @PathVariable("id_nutrition") Long id_nutrition) {
        nutrition.setIdNutrition(id_nutrition);
        return nutritionService.modifyNutrition(nutrition);
    }

    @GetMapping(value = "/deficiency-report/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<NutritionDeficiencyReport> getDeficiencyReport(@PathVariable int userId) {
        NutritionDeficiencyReport report = nutritionService.generateDeficiencyReport(userId);
        return ResponseEntity.ok(report);
    }

    // http://localhost:8089/nutrition/user/{idUser}
  /*  @GetMapping("/user/{idUser}")
    public List<Nutrition> getNutritionsByUser(@PathVariable("idUser") Long idUser) {
        return nutritionService.getNutritionsByUser(idUser);
    }*/
}
