package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.Babysitting;
import tn.esprit.bambinou.Entity.BabysittingReview;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Repository
public interface BabysittingRepository extends JpaRepository<Babysitting, Long> {
    @Query("SELECT b FROM Babysitting b JOIN b.babies baby " +
            "WHERE baby.idBaby = :babyId " +
            "AND b.endDate >= :startDate AND b.startDate <= :endDate")
    List<Babysitting> findConflictingBabysittings(
            @Param("babyId") Long babyId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );
    List<Babysitting> findByUser_Id(Long id);
    List<Babysitting> findByBabysitterId(Long babysitterId);


}
