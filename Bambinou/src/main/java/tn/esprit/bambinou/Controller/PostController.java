package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Post;
import tn.esprit.bambinou.Service.IPostService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/post")
public class PostController {

    @Autowired
    private IPostService postService;

    /*
        --------------------- format ajout d'un Post avec JSON -----------------------

    {
        "id": 1,
        "date": "2025-03-12",
        "Nblike": 100,
        "Nbcomment": 20,
        "TypeRecepie": "Plat",
        "Recipe": "Recette saine",
        "calories": 500,
        "idNutrition": 1
    }

     */

    // http://localhost:8089/post/retrieve-all
    @GetMapping("/retrieve-all")
    public List<Post> getAllPosts() {
        return postService.retrieveAllPosts();
    }

    // http://localhost:8089/post/retrieve/{id}
    @GetMapping("/retrieve/{id}")
    public Post getPostById(@PathVariable("id") Long id) {
        return postService.retrievePost(id);
    }

    // http://localhost:8089/post/add
    @PostMapping("/add")
    public Post addPost(@RequestBody Post post) {
        return postService.addPost(post);
    }

    // http://localhost:8089/post/remove/{id}
    @DeleteMapping("/remove/{id}")
    public void removePost(@PathVariable("id") Long id) {
        postService.removePost(id);
    }

    // http://localhost:8089/post/modify/{id_post}
    @PutMapping("/modify/{id_post}")
    public Post modifyPost(@RequestBody Post post, @PathVariable("id_post") Long id_post) {
        post.setIdPost(id_post);
        return postService.modifyPost(post);
    }

//    // http://localhost:8089/post/nutrition/{idNutrition}
//    @GetMapping("/nutrition/{idNutrition}")
//    public List<Post> getPostsByNutrition(@PathVariable("idNutrition") Long idNutrition) {
//        return postService.getPostsByNutrition(idNutrition);
//    }
}
