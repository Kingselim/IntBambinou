package tn.esprit.bambinou.DTO;
import tn.esprit.bambinou.Entity.RecipeType;
import java.util.Date;

public class CreatePostRequest {
    public Date date;
    public int nblike;
    public int nbcomment;
    public RecipeType recipeType;
    public String recipe;
    public String nutritionDescription; // description au lieu de l’ID
}
