package tn.esprit.bambinou.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import tn.esprit.bambinou.Entity.Forum;
import tn.esprit.bambinou.Repository.ForumRepository;
import tn.esprit.bambinou.Service.IMedicalAlertService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ia")
@RequiredArgsConstructor
public class AIController {

    @Autowired
    private ForumRepository forumRepository;

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private IMedicalAlertService medicalAlertService;

    private final String FLASK_API_URL = "http://localhost:5000/predict";

    // 🔵 Endpoint 1 : Analyse d’un forum spécifique (symptômes)
    @GetMapping("/predict-disease-by-forum/{idForum}")
    public ResponseEntity<?> predictDiseaseFromForum(@PathVariable Long idForum) {
        Forum forum = forumRepository.findById(idForum).orElse(null);

        if (forum == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Forum not found.");
        }

        // 🔄 Combinaison des symptômes pertinents
        StringBuilder symptoms = new StringBuilder();
        if (forum.getSymptoms() != null) symptoms.append(forum.getSymptoms()).append(". ");
        if (forum.getPregnancyPain() != null) symptoms.append(forum.getPregnancyPain()).append(". ");
        if (forum.getBreathelessness() != null) symptoms.append(forum.getBreathelessness()).append(". ");

        try {
            // Préparer le corps de la requête
            Map<String, String> payload = new HashMap<>();
            payload.put("text", symptoms.toString());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(payload, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    FLASK_API_URL,
                    requestEntity,
                    Map.class
            );

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur avec l’IA Flask : " + e.getMessage());
        }
    }

    // 🔴 Endpoint 2 : Alerte chatbot si poids ou tension élevés pendant 2 mois
    @GetMapping("/chatbot-alertt/{idTracking}")
    public ResponseEntity<Map<String, Object>> checkForChatbotAlert(@PathVariable Long idTracking) {
        List<Forum> forums = forumRepository.findByPregnancyTracking_IdPregnancyTracking(idTracking);

        long highTensionCount = forums.stream()
                .filter(f -> f.getBloodPressure() != null && f.getBloodPressure() > 14)
                .count();

        long highWeightCount = forums.stream()
                .filter(f -> f.getWeight() != null && f.getWeight() > 80)
                .count();

        boolean trigger = highTensionCount >= 2 || highWeightCount >= 2;

        Map<String, Object> response = new HashMap<>();
        response.put("triggerChat", trigger);

        if (trigger) {
            String msg = highTensionCount >= 2
                    ? "Votre tension est anormalement élevée. Souhaitez-vous discuter avec notre chatbot médical ?"
                    : "Votre poids est au-dessus de la limite depuis plusieurs mois. Le chatbot peut vous conseiller.";
            response.put("message", msg);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/chatbot-alert/{idTracking}")
    public ResponseEntity<Map<String, Object>> getChatbotAlert(@PathVariable Long idTracking) {
        Map<String, Object> result = medicalAlertService.getMedicalAlertMessage(idTracking);
        return ResponseEntity.ok(result);
    }

}
