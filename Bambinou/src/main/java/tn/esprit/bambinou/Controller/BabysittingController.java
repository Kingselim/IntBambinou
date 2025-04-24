package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Babysitting;
import tn.esprit.bambinou.Service.IBabysittingService;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@AllArgsConstructor
@RequestMapping("/babysitting")
public class BabysittingController {

    @Autowired
    private IBabysittingService babysittingService;

    /*
        --------------------- format ajout d'un Babysitting avec JSON -----------------------

    {
        {
        "idBabysitting": 5,
        "duration": 20,
        "status": "Actif",
        "startDate": "2025-03-12T15:23:39.000+00:00",
        "endDate": "2025-03-21T09:51:56.000+00:00",
        "salary": 5000.0
        }
    }

     */

    // http://localhost:8089/babysitting/retrieve-all
    @GetMapping("/retrieve-all")
    public List<Babysitting> getAllBabysittings() {
        return babysittingService.retrieveAllBabysittings();
    }

    // http://localhost:8089/babysitting/retrieve/{id}
    @GetMapping("/retrieve/{id}")
    public Babysitting getBabysittingById(@PathVariable("id") Long id) {
        return babysittingService.retrieveBabysitting(id);
    }

    // http://localhost:8089/babysitting/add
    @PostMapping("/add")
    public Babysitting addBabysitting(@RequestBody Babysitting babysitting) {
        return babysittingService.addBabysitting(babysitting);
    }

    // http://localhost:8089/babysitting/remove/{id}
    @DeleteMapping("/remove/{id}")
    public void removeBabysitting(@PathVariable("id") Long id) {
        babysittingService.removeBabysitting(id);
    }

    // http://localhost:8089/babysitting/modify/{id}
    @PutMapping("/modify/{id}")
    public Babysitting modifyBabysitting(@RequestBody Babysitting babysitting, @PathVariable("id") Long id_babysitting) {
        babysitting.setIdBabysitting(id_babysitting); // Ensure the ID is set
        return babysittingService.modifyBabysitting(babysitting);
    }

    // http://localhost:8089/babysitting/user/{idUser}
//    @GetMapping("/user/{idUser}")
//    public List<Babysitting> getBabysittingsByUser(@PathVariable("idUser") Long idUser) {
//        return babysittingService.getBabysittingsByUser(idUser);
//    }
}