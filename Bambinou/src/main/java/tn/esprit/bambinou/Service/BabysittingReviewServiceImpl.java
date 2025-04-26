package tn.esprit.bambinou.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Babysitting;
import tn.esprit.bambinou.Entity.BabysittingReview;
import tn.esprit.bambinou.Repository.BabysittingRepository;
import tn.esprit.bambinou.Repository.BabysittingReviewRepository;

import java.util.Date;
import java.util.List;
@Service
@RequiredArgsConstructor
public class BabysittingReviewServiceImpl implements IBabysittingReviewService {
    @Autowired
    private BabysittingReviewRepository reviewRepository;
    @Autowired
    private BabysittingRepository babysittingRepository;
    @Autowired
    private BabysittingReviewRepository babysittingReviewRepository;



    @Override
    public BabysittingReview addReview(BabysittingReview review) {
        if (review.getBabysittingId() != null) {
            Babysitting babysitting = babysittingRepository.findById(review.getBabysittingId())
                    .orElseThrow(() -> new RuntimeException("Contrat babysitting introuvable"));
            review.setBabysitting(babysitting);
        }

        review.setReviewDate(new Date());
        return reviewRepository.save(review);
    }



    @Override
    public List<BabysittingReview> getAllReviews() {
        List<BabysittingReview> all = reviewRepository.findAll();
        System.out.println("✅ Reviews récupérées : " + all.size()); // 🟢 Ajoute cette ligne
        return all;
    }

    @Override
    public List<BabysittingReview> getReviewsByBabysitting(Long babysittingId) {
        return reviewRepository.findByBabysitting_IdBabysitting(babysittingId);
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
    @Override
    public List<BabysittingReview> getReviewsByBabysitter(Long id) {
        return babysittingReviewRepository.findByBabysitterId(id);
    }
    //calcule de la moyenne des avis
    @Override
    public Double calculateAverageRatingForBabysitter(Long babysitterId) {
        List<BabysittingReview> reviews = babysittingReviewRepository.findByBabysitting_Babysitter_Id(babysitterId);

        if (reviews.isEmpty()) {
            return 0.0;
        }

        double total = reviews.stream()
                .mapToDouble(BabysittingReview::getRating)
                .sum();

        return Math.round((total / reviews.size()) * 10.0) / 10.0;
    }

    @Override
    public List<BabysittingReview> getByBabysitterId(Long id) {
        return reviewRepository.findByBabysitterId(id);
    }


}
