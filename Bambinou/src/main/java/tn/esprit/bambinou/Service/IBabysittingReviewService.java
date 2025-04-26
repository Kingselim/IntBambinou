package tn.esprit.bambinou.Service;
import tn.esprit.bambinou.Entity.BabysittingReview;

import java.util.List;
public interface IBabysittingReviewService {
    BabysittingReview addReview(BabysittingReview review);
    List<BabysittingReview> getAllReviews();
    List<BabysittingReview> getReviewsByBabysitting(Long babysittingId);
    List<BabysittingReview> getReviewsByBabysitter(Long id);
    void deleteReview(Long id);
    Double calculateAverageRatingForBabysitter(Long babysitterId);
    List<BabysittingReview> getByBabysitterId(Long id);

}
