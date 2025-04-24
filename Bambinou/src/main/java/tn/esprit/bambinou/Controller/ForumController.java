package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import tn.esprit.bambinou.Entity.Forum;
import tn.esprit.bambinou.Service.IForumService;

import java.util.List;

@RestController
//@AllArgsConstructor
@RequestMapping("/forum")
public class ForumController {

    //@Autowired
   // private IForumService forumService;

      @Autowired
    private  IForumService forumService;
    private final RestTemplate restTemplate;

    // ✅ Constructeur complet pour l'injection
    public ForumController( RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    // http://localhost:8089/forum/retrieve-all
    @GetMapping("/retrieve-all")
    public List<Forum> getAllForums() {
        return forumService.retrieveAllForums();
    }

    // http://localhost:8089/forum/retrieve/{id}
    @GetMapping("/retrieve/{id}")
    public Forum getForum(@PathVariable("id") Long id) {
        return forumService.retrieveForum(id);
    }

    // http://localhost:8089/forum/add
    @PostMapping("/add")
    public ResponseEntity<Forum> addForum(@RequestBody Forum f) {
        System.out.println("DANS ADD FORUM AHHAHAHA -------"+f);
        Forum savedForum = forumService.addForum(f);
        return ResponseEntity.ok(savedForum);
    }

    // http://localhost:8089/forum/remove/{id}
    @DeleteMapping("/remove/{id}")
    public void removeForum(@PathVariable("id") Long id) {
        forumService.removeForum(id);
    }

    // http://localhost:8089/forum/modify
   /* @PutMapping("/modify")
    public Forum modifyForum(@RequestBody Forum f) {
        return forumService.modifyForum(f);
    }*/
    // http://localhost:8089/forum/modify/{id}
    @PutMapping("/modify/{id}")
    public ResponseEntity<Forum> modifyForum(@PathVariable("id") Long id, @RequestBody Forum f) {
        f.setIdForum(id); // S'assurer que l'ID de l'entité correspond à celui de l'URL
        Forum updatedForum = forumService.modifyForum(f);
        return ResponseEntity.ok(updatedForum);
    }
    // http://localhost:8089/forum/by-pregnancy/{id}
    @GetMapping("/by-pregnancy/{id}")
    public List<Forum> getForumsByPregnancy(@PathVariable("id") Long idPregnancyTracking) {
        return forumService.getForumsByPregnancy(idPregnancyTracking);
    }


/*
{
        "idForum": 1,
        "idPregnancyTracking": 1,
        "bloodPressure": 12.0,
        "description": "non cv",
        "pregnancyCravings": "good",
        "moodSwings": "allgood",
        "weight": 58.0,
        "symptoms": "fievres",
        "pregnancyPain": "good",
        "breathelessness": "complique"
    }
 */
}