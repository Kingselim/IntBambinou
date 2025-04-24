package tn.esprit.bambinou.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Forum;
import tn.esprit.bambinou.Repository.ForumRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
//@RequiredArgsConstructor
public class MedicalAlertServiceImpl implements IMedicalAlertService {

    private final ForumRepository forumRepository;

    @Autowired
    public MedicalAlertServiceImpl(ForumRepository forumRepository) {
        this.forumRepository = forumRepository;
    }


    @Override
    public Map<String, Object> getMedicalAlertMessage(Long idPregnancyTracking) {
        List<Forum> forums = forumRepository.findByPregnancyTracking_IdPregnancyTracking(idPregnancyTracking);

        long highTensionCount = forums.stream()
                .filter(f -> f.getBloodPressure() != null && f.getBloodPressure() > 14)
                .count();

        long highWeightCount = forums.stream()
                .filter(f -> f.getWeight() != null && f.getWeight() > 80)
                .count();

        boolean trigger = highTensionCount >= 2 || highWeightCount >= 2;

        Map<String, Object> result = new HashMap<>();
        result.put("triggerChat", trigger);

        if (trigger) {
            String message = highTensionCount >= 2
                    ? "Votre tension est anormalement élevée. Souhaitez-vous discuter avec notre chatbot médical ?"
                    : "Votre poids est au-dessus de la limite depuis plusieurs mois. Le chatbot peut vous conseiller.";
            result.put("message", message);
        }

        return result;
    }

}
