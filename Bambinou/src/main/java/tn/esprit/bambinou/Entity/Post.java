package tn.esprit.bambinou.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPost;
    private Date date;
    private int Nblike;
    private int Nbcomment;
    private RecipeType recipeType;
    private String Recipe;


    @ManyToOne
    @JoinColumn(name = "nutrition_id")
    private Nutrition nutrition;

    public Long getIdPost() {
        return idPost;
    }

    public void setIdPost(Long idPost) {
        this.idPost = idPost;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getNblike() {
        return Nblike;
    }

    public void setNblike(int nblike) {
        Nblike = nblike;
    }

    public int getNbcomment() {
        return Nbcomment;
    }

    public void setNbcomment(int nbcomment) {
        Nbcomment = nbcomment;
    }

    public RecipeType getRecipeType() {
        return recipeType;
    }

    public void setRecipeType(RecipeType recipeType) {
        this.recipeType = recipeType;
    }

    public String getRecipe() {
        return Recipe;
    }

    public void setRecipe(String recipe) {
        Recipe = recipe;
    }

//    public Long getIdNutrition() {
//        return IdNutrition;
//    }
//
//    public void setIdNutrition(Long idNutrition) {
//        IdNutrition = idNutrition;
//    }
}
