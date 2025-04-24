package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Baby;
import tn.esprit.bambinou.Service.IBabyService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/baby")
public class BabyController {

    @Autowired
    private IBabyService babyService;

    /*
        --------------------- format ajout d'un Baby avec JSON -----------------------

  {
    {
        "idBaby": 1,
        "idUser": 1,
        "name": "test",
        "favoriteActivities": "Playstation",
        "emergencyContact": "92643302",
        "medicalCondition": "none",
        "age": 1,
        "gender": "Male",
        "dateOfBirth": "2024-03-20T09:48:19.000+00:00",
        "specialNeeds": "none"
    }
}


     */

    // http://localhost:8089/baby/retrieve-all
    @GetMapping("/retrieve-all")
    public List<Baby> getAllBabies() {
        return babyService.retrieveAllBabies();
    }

    // http://localhost:8089/baby/retrieve/{id}
    @GetMapping("/retrieve/{id}")
    public Baby getBabyById(@PathVariable("id") Long id) {
        return babyService.retrieveBaby(id);
    }

    // http://localhost:8089/baby/add
    @PostMapping("/add")
    public Baby addBaby(@RequestBody Baby baby) {
        return babyService.addBaby(baby);
    }

    // http://localhost:8089/baby/remove/{id}
    @DeleteMapping("/remove/{id}")
    public void removeBaby(@PathVariable("id") Long id) {
        babyService.removeBaby(id);
    }

    // http://localhost:8089/baby/modify/{id}
    @PutMapping("/modify/{id}")
    public Baby modifyBaby(@RequestBody Baby baby, @PathVariable("id") Long id_baby) {
        baby.setIdBaby(id_baby); // Ensure the ID is set
        return babyService.modifyBaby(baby);
    }

    // http://localhost:8089/baby/user/{idUser}

}