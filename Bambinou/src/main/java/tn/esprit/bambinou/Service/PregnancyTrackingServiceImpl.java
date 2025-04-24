package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Forum;
import tn.esprit.bambinou.Entity.PregnancyTracking;
import tn.esprit.bambinou.Repository.ForumRepository;
import tn.esprit.bambinou.Repository.PregnancyTrackingRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class PregnancyTrackingServiceImpl implements IPregnancyTrackingService {
    @Autowired
    private PregnancyTrackingRepository pregnancyTrackingRepository;
    @Autowired
    private ForumRepository forumRepository;

    @Override
    public List<PregnancyTracking> retrieveAllPregnancyTrackings() {
        return pregnancyTrackingRepository.findAll();
    }

    @Override
    public PregnancyTracking retrievePregnancyTracking(Long pregnancyTrackingId) {
        return pregnancyTrackingRepository.findById(pregnancyTrackingId).orElse(null);
    }


    @Override
    public PregnancyTracking addPregnancyTracking(PregnancyTracking pregnancyTracking) {
        return pregnancyTrackingRepository.save(pregnancyTracking);
    }

    @Override
    public void removePregnancyTracking(Long pregnancyTrackingId) {
        pregnancyTrackingRepository.deleteById(pregnancyTrackingId);
    }

    @Override
    /*public PregnancyTracking modifyPregnancyTracking(PregnancyTracking pregnancyTracking) {
        return pregnancyTrackingRepository.save(pregnancyTracking);
    }*/

    public PregnancyTracking modifyPregnancyTracking(PregnancyTracking pregnancyTracking) {
        if (pregnancyTrackingRepository.existsById(pregnancyTracking.getIdPregnancyTracking())) {
            return pregnancyTrackingRepository.save(pregnancyTracking);
        } else {
            throw new RuntimeException("Tracking ID " + pregnancyTracking.getIdPregnancyTracking() + " not found.");
        }
    }
    @Override
    public String interpretTrackingValues(Long idTracking) {
        List<Forum> forums = forumRepository.findByPregnancyTracking_IdPregnancyTracking(idTracking);

        if (forums.isEmpty()) {
            return "Aucune donnée disponible pour ce suivi.";
        }

        long highTension = forums.stream()
                .filter(f -> f.getBloodPressure() != null && f.getBloodPressure() > 14)
                .count();

        long highWeight = forums.stream()
                .filter(f -> f.getWeight() != null && f.getWeight() > 80)
                .count();

        if (highTension >= 2) {
            return "⚠️ Votre tension est élevée depuis plusieurs mois. Consultez un professionnel.";
        }

        if (highWeight >= 2) {
            return "⚠️ Votre poids est au-dessus de la limite recommandée. Un suivi nutritionnel est conseillé.";
        }

        return "✅ Vos données de santé semblent stables. Continuez à prendre soin de vous.";
    }

}