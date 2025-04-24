package tn.esprit.bambinou.Controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Conversation;
import tn.esprit.bambinou.Service.IConversationService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/conversation")
public class ConversationController {
    @Autowired
    private IConversationService conversationService;

    @GetMapping("/retrieve-all-conversations")
    public List<Conversation> getConversations() {
        return conversationService.retrieveAllConversations();
    }

    // http://localhost:8089/conversation/retrieve-conversation/{conversation-id}
    @GetMapping("/retrieve-conversation/{conversation-id}")
    public Conversation retrieveConversation(@PathVariable("conversation-id") Long conversationId) {
        return conversationService.retrieveConversation(conversationId);
    }

    // http://localhost:8089/conversation/add-conversation
    @PostMapping("/add-conversation")
    public Conversation addConversation(@RequestBody Conversation conversation) {
        return conversationService.addConversation(conversation);
    }

    @DeleteMapping("/remove-conversation/{conversation-id}")
    public void removeConversation(@PathVariable("conversation-id") Long conversationId) {
        conversationService.removeConversation(conversationId);
    }

    @PutMapping("/modify-conversation")
    public Conversation modifyConversation(@RequestBody Conversation conversation) {
        return conversationService.modifyConversation(conversation);
    }

    @PostMapping("/add-user/{conversation-id}/user/{user-id}")
    public Conversation addUserToConversation(@PathVariable("conversation-id") Long conversationId,
                                              @PathVariable("user-id") Long userId) {
        return conversationService.addUserToConversation(conversationId, userId);
    }

    @GetMapping("/user/{userId}")
    public List<Conversation> getConversationsByUser(@PathVariable Long userId) {
        return conversationService.getConversationsByUser(userId);
    }

    @DeleteMapping("/remove-user/{conversationId}/user/{userId}")
    public ResponseEntity<?> removeUserFromConversation(@PathVariable Long conversationId, @PathVariable Long userId) {
        try {
            conversationService.removeUserFromConversation(conversationId, userId);
            return ResponseEntity.ok().body("User removed from conversation");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
