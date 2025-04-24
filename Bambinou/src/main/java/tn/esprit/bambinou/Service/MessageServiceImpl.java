package tn.esprit.bambinou.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Conversation;
import tn.esprit.bambinou.Entity.Message;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Repository.ConversationRepository;
import tn.esprit.bambinou.Repository.MessageRepository;
import tn.esprit.bambinou.Repository.UserRepository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class MessageServiceImpl implements IMessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Override
    public List<Message> retrieveAllMessages() {
        return messageRepository.findAll();
    }

    @Override
    public Message retrieveMessage(Long messageId) {
        return messageRepository.findById(messageId).orElse(null);
    }

    @Override
    public Message addMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public void removeMessage(Long messageId) {
        messageRepository.deleteById(messageId);
    }

    @Override
    public Message modifyMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public Message addMessageToConversation(Long conversationId, Long senderId, String content) {
        // Récupérer la conversation par son ID
        Conversation conversation = conversationRepository.findById(conversationId).orElse(null);
        if (conversation == null) {
            throw new RuntimeException("Conversation not found");
        }

        // Récupérer l'utilisateur par son ID
        User sender = userRepository.findById(senderId).orElse(null);
        if (sender == null) {
            throw new RuntimeException("Sender not found");
        }

        // Créer un nouveau message
        Message message = new Message();
        message.setMessage(content);
        message.setSender(sender);
        message.setConversation(conversation);
        message.setTime(new Date());

        // Sauvegarder le message
        return messageRepository.save(message);
    }

    @Override
    public List<Message> getMessagesByConversation(Long conversationId) {
        // Vérifier si la conversation existe
        Conversation conversation = conversationRepository.findById(conversationId).orElse(null);
        if (conversation == null) {
            throw new RuntimeException("Conversation not found");
        }

        // Retourner la liste des messages associés à cette conversation
        return messageRepository.findByConversation(conversation);
    }


}
