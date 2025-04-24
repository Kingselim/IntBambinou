package tn.esprit.bambinou.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/chatbot")
public class ChatbotMedController {

    private final RestTemplate restTemplate;
    private static final String FLASK_CHATBOT_URL = "http://localhost:5000/chat";

    @Autowired
    public ChatbotMedController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @PostMapping("/ask")

    public ResponseEntity<?> askQuestion(@RequestBody Map<String, String> payload) {
        try {
            String question = payload.get("question");

            if (question == null || question.isBlank()) {
                return ResponseEntity.badRequest().body("La question est vide.");
            }

            Map<String, String> requestPayload = new HashMap<>();
            requestPayload.put("question", question);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(requestPayload, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    FLASK_CHATBOT_URL,
                    requestEntity,
                    Map.class
            );

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            e.printStackTrace(); // 🔍 voir le stack trace exact dans la console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la communication avec l’IA : " + e.getMessage());
        }
    }
}
