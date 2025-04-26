package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.Babysitting;
import tn.esprit.bambinou.Entity.BabysittingReview;

import java.util.List;

@Repository
public interface BabysittingReviewRepository extends JpaRepository<BabysittingReview, Long> {

    // 🔄 Trouver tous les avis liés à un contrat précis
    List<BabysittingReview> findByBabysitting_IdBabysitting(Long id);

    // ⭐ Trouver tous les avis liés à un babysitter donné
    @Query("SELECT r FROM BabysittingReview r WHERE r.babysitting.babysitter.id = :id")
    List<BabysittingReview> findByBabysitterId(@Param("id") Long id);

    List<BabysittingReview> findByBabysitting_Babysitter_Id(Long babysitterId);
    //
    BabysittingReview findByBabysitting(Babysitting babysitting);


}
