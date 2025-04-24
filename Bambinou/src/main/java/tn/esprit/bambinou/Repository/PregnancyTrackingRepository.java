package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.bambinou.Entity.PregnancyTracking;

public interface PregnancyTrackingRepository extends JpaRepository<PregnancyTracking, Long> {
}