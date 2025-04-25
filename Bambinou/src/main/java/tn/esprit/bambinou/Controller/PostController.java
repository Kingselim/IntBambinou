package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.DTO.CreatePostRequest;
import tn.esprit.bambinou.Entity.Nutrition;
import tn.esprit.bambinou.Entity.Post;
import tn.esprit.bambinou.Service.IPostService;
import tn.esprit.bambinou.Repository.PostRepository;
import tn.esprit.bambinou.Repository.NutritionRepository;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/post")
public class PostController {

    @Autowired
    private IPostService postService;

    @Autowired
    private NutritionRepository nutritionRepository;

    @Autowired
    private PostRepository postRepository;

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
    public ResponseEntity<Post> addPost(@RequestBody CreatePostRequest request) {
        Optional<Nutrition> nutritionOpt = nutritionRepository.findByDescription(request.nutritionDescription);

        if (nutritionOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // ou retourne un message explicite
        }

        Nutrition nutrition = nutritionOpt.get();

        Post post = new Post();
        post.setDate(request.date);
        post.setNblike(request.nblike);
        post.setNbcomment(request.nbcomment);
        post.setRecipeType(request.recipeType);
        post.setRecipe(request.recipe);
        post.setNutrition(nutrition); // ✅ le lien est fait ici

        postRepository.save(post);
        return ResponseEntity.ok(post);
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

    @GetMapping("/by-nutrition/{id}")
    public ResponseEntity<List<Post>> getPostsByNutrition(@PathVariable Long id) {
        List<Post> posts = postRepository.findByNutrition_IdNutrition(id);
        return ResponseEntity.ok(posts);
    }


//    // http://localhost:8089/post/nutrition/{idNutrition}
//    @GetMapping("/nutrition/{idNutrition}")
//    public List<Post> getPostsByNutrition(@PathVariable("idNutrition") Long idNutrition) {
//        return postService.getPostsByNutrition(idNutrition);
//    }
}
