package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Nutrition;
import tn.esprit.bambinou.Service.INutritionService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/nutrition")
public class NutritionController {

    @Autowired
    private INutritionService nutritionService;

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
    public Nutrition addNutrition(@RequestBody Nutrition nutrition) {
        return nutritionService.addNutrition(nutrition);
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

    // http://localhost:8089/nutrition/user/{idUser}
  /*  @GetMapping("/user/{idUser}")
    public List<Nutrition> getNutritionsByUser(@PathVariable("idUser") Long idUser) {
        return nutritionService.getNutritionsByUser(idUser);
    }*/
}
