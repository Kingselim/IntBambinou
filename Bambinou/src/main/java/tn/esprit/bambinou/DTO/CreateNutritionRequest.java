package tn.esprit.bambinou.DTO;

public class CreateNutritionRequest {
    public String recommendation;
    public String description;
    public int nbFollowers;
    public float calories;
    public float protein;
    public float glucide;
    public float lipide;
    public float vitamin;
    public String userName; // utilisé pour chercher le user
}
