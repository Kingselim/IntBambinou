package tn.esprit.bambinou.Controller;

public class FaceMatchResponse {
    private boolean match;
    private double distance;

    // Getters and setters
    public boolean isMatch() {
        return match;
    }

    public void setMatch(boolean match) {
        this.match = match;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }
}
