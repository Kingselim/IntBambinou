package tn.esprit.bambinou.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.CloseStatus;
import tn.esprit.bambinou.Controller.WebRTCHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


public class WebRTCHandler extends TextWebSocketHandler {

    // Pour stocker les sessions des utilisateurs
    private Map<String, WebSocketSession> usersSessions = new HashMap<>();



    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Convertir le message en JSON
        String payload = message.getPayload();

        // Utilisation d'ObjectMapper pour parser le JSON reçu
        ObjectMapper objectMapper = new ObjectMapper();



        // Supposons que le message contient un champ "username"
        String username = objectMapper.readTree(payload).get("from").asText();
        String type = objectMapper.readTree(payload).get("type").asText();


        // Simple log pour l'enregistrement de l'utilisateur
        System.out.println("Enregistrement de l'utilisateur: " + username);

        // Réponse au client
        session.sendMessage(new TextMessage("Utilisateur enregistré: " + username));

            // Si c'est une offre
        if ("offer".equals(type)) {
            String from = objectMapper.readTree(payload).get("from").asText();
            String to = objectMapper.readTree(payload).get("to").asText();
            String offer = objectMapper.readTree(payload).get("offer").asText();

            // Trouver la session de l'utilisateur destinataire (ici "to" correspond à Yacine)
            WebSocketSession recipientSession = usersSessions.get(to);


            if (recipientSession != null) {
                // Créer un map pour l'objet à envoyer
                Map<String, Object> message2 = Map.of(
                        "type", "offer",
                        "from", from,
                        "to", to,
                        "offer", offer
                );

                // Convertir le message en JSON
                String jsonMessage = objectMapper.writeValueAsString(message2);
                // Envoyer l'offre à Yacine (ou un autre utilisateur)
                recipientSession.sendMessage(new TextMessage(jsonMessage));
            } else {
                System.out.println("Utilisateur " + to + " non trouvé");
            }
        }


    }


    // Quand une connexion WebSocket est établie
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Ajoute la session de l'utilisateur connecté
        String username = (String) session.getAttributes().get("username");
        usersSessions.put(username, session);
    }






}
