package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.PregnancyJournal;

import java.util.List;


@Repository
public interface PregnancyJournalRepository extends JpaRepository<PregnancyJournal, Long> {
    // List<PregnancyJournal> findByIdPregnancyTracking(Long id);
    List<PregnancyJournal> findByPregnancyTracking_IdPregnancyTracking(Long id);

}
