package tn.esprit.bambinou.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.BabysittingReview;
import tn.esprit.bambinou.Service.IBabysittingReviewService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class BabysittingReviewController {

    @Autowired
    private IBabysittingReviewService reviewService;

    // ✅ Add a new review
    @PostMapping("/add")
    public BabysittingReview addReview(@RequestBody BabysittingReview review) {
        return reviewService.addReview(review);
    }

    // ✅ Get all reviews (simple)
    @GetMapping("/all")
    public List<BabysittingReview> getAll() {
        return reviewService.getAllReviews();
    }

    // ✅ Get all reviews (custom display for frontend)
    @GetMapping("/test")
    public List<Map<String, Object>> getTestReviews() {
        List<BabysittingReview> reviews = reviewService.getAllReviews();

        List<Map<String, Object>> result = new ArrayList<>();
        for (BabysittingReview r : reviews) {
            Map<String, Object> map = new HashMap<>();
            map.put("idReview", r.getIdReview());
            map.put("rating", r.getRating());
            map.put("comment", r.getComment());
            map.put("reviewDate", r.getReviewDate());
            map.put("babysittingId", r.getBabysitting() != null ? r.getBabysitting().getIdBabysitting() : null);
            map.put("reviewerId", r.getReviewer() != null ? r.getReviewer().getId() : null);
            result.add(map);
        }

        return result;
    }

    // ✅ Get reviews by babysitting contract
    @GetMapping("/by-babysitting/{id}")
    public List<Map<String, Object>> getByBabysittingTest(@PathVariable("id") Long id) {
        List<BabysittingReview> reviews = reviewService.getReviewsByBabysitting(id);

        List<Map<String, Object>> result = new ArrayList<>();
        for (BabysittingReview r : reviews) {
            Map<String, Object> map = new HashMap<>();
            map.put("idReview", r.getIdReview());
            map.put("rating", r.getRating());
            map.put("comment", r.getComment());
            map.put("reviewDate", r.getReviewDate());
            map.put("babysittingId", r.getBabysitting() != null ? r.getBabysitting().getIdBabysitting() : null);
            map.put("reviewerId", r.getReviewer() != null ? r.getReviewer().getId() : null);
            map.put("reviewerName", r.getReviewer() != null ? r.getReviewer().getName() : "Utilisateur anonyme"); // 🆕

            result.add(map);
        }

        return result;
    }

    // ✅ Delete a review
    @DeleteMapping("/delete/{id}")
    public void deleteReview(@PathVariable("id") Long id) {
        reviewService.deleteReview(id);
    }

    // ✅ Get reviews by babysitter
    @GetMapping("/babysitter/{id}")
    public List<Map<String, Object>> getReviewsByBabysitter(@PathVariable("id") Long id) {
        List<BabysittingReview> reviews = reviewService.getReviewsByBabysitter(id);

        List<Map<String, Object>> result = new ArrayList<>();
        for (BabysittingReview r : reviews) {
            Map<String, Object> map = new HashMap<>();
            map.put("idReview", r.getIdReview());
            map.put("rating", r.getRating());
            map.put("comment", r.getComment());
            map.put("reviewDate", r.getReviewDate());
            map.put("babysittingId", r.getBabysitting() != null ? r.getBabysitting().getIdBabysitting() : null);
            map.put("reviewerId", r.getReviewer() != null ? r.getReviewer().getId() : null);
            map.put("reviewerName", r.getReviewer() != null ? r.getReviewer().getName() : "Utilisateur anonyme");
            result.add(map);
        }

        return result;
    }
    @GetMapping("/average-rating/{babysitterId}")
    public Double getAverageRating(@PathVariable Long babysitterId) {
        return reviewService.calculateAverageRatingForBabysitter(babysitterId);
    }

//    @GetMapping("/by-babysitter/{id}")
//    public ResponseEntity<List<BabysittingReview>> getByBabysitter(@PathVariable Long id) {
//        return ResponseEntity.ok(reviewService.getByBabysitterId(id));
//    }
@GetMapping("/by-babysitter/{id}")
public List<Map<String, Object>> getByBabysitter(@PathVariable("id") Long id) {
    List<BabysittingReview> reviews = reviewService.getByBabysitterId(id);

    List<Map<String, Object>> result = new ArrayList<>();
    for (BabysittingReview r : reviews) {
        Map<String, Object> map = new HashMap<>();
        map.put("idReview", r.getIdReview());
        map.put("rating", r.getRating());
        map.put("comment", r.getComment());
        map.put("reviewDate", r.getReviewDate());
        map.put("babysittingId", r.getBabysitting() != null ? r.getBabysitting().getIdBabysitting() : null);
        map.put("reviewerId", r.getReviewer() != null ? r.getReviewer().getId() : null);
        map.put("reviewerName", r.getReviewer() != null ? r.getReviewer().getName() : "Anonymous"); // 🔥 ici le nom !

        result.add(map);
    }

    return result;
}




}
