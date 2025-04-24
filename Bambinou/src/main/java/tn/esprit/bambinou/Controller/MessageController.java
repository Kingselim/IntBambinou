package tn.esprit.bambinou.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.Message;
import tn.esprit.bambinou.Service.IMessageService;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    private IMessageService messageService;

    // URL pour récupérer tous les messages
    @GetMapping("/retrieve-all-messages")
    public List<Message> getAllMessages() {
        return messageService.retrieveAllMessages();
    }

    // URL pour récupérer un message spécifique par son ID
    @GetMapping("/retrieve-message/{message-id}")
    public Message retrieveMessage(@PathVariable("message-id") Long messageId) {
        return messageService.retrieveMessage(messageId);
    }

    // URL pour ajouter un message
    @PostMapping("/add-message")
    public Message addMessage(@RequestBody Message message) {
        return messageService.addMessage(message);
    }

    // URL pour supprimer un message par son ID
    @DeleteMapping("/remove-message/{message-id}")
    public void removeMessage(@PathVariable("message-id") Long messageId) {
        messageService.removeMessage(messageId);
    }

    // URL pour modifier un message
    @PutMapping("/modify-message")
    public Message modifyMessage(@RequestBody Message message) {
        return messageService.modifyMessage(message);
    }

    @PostMapping("/add-message-to-conversation/{conversation-id}/sender/{user-id}")
    public Message addMessageToConversation(@PathVariable("conversation-id") Long conversationId,
                                            @PathVariable("user-id") Long senderId,
                                            @RequestBody Message message) {
        return messageService.addMessageToConversation(conversationId, senderId, message.getMessage());
    }

    @GetMapping("/conversation/{conversationId}")
    public List<Message> getMessagesByConversation(@PathVariable Long conversationId) {
        return messageService.getMessagesByConversation(conversationId);
    }

}
