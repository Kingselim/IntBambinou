package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Conversation;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Repository.ConversationRepository;
import tn.esprit.bambinou.Repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class ConversationServiceImpl implements IConversationService{
    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Conversation> retrieveAllConversations() {
        return conversationRepository.findAll();
    }

    @Override
    public Conversation retrieveConversation(Long conversationId) {
        return conversationRepository.findById(conversationId).orElse(null);
    }

    @Override
    public Conversation addConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    @Override
    public void removeConversation(Long conversationId) {
        conversationRepository.deleteById(conversationId);
    }

    @Override
    public Conversation modifyConversation(Conversation conversation) {
        return conversationRepository.save(conversation);
    }

    @Override
    public Conversation addUserToConversation(Long conversationId, Long userId) {
        // Récupérer la conversation par son ID
        Conversation conversation = conversationRepository.findById(conversationId).orElse(null);
        if (conversation == null) {
            throw new RuntimeException("Conversation not found");
        }

        // Récupérer l'utilisateur par son ID
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Ajouter l'utilisateur à la conversation (si ce n'est pas déjà fait)
        if (!conversation.getUsers().contains(user)) {
            conversation.getUsers().add(user);
        }

        // Ajouter la conversation à l'utilisateur (si ce n'est pas déjà fait)
        if (!user.getConversations().contains(conversation)) {
            user.getConversations().add(conversation);
        }

        // Sauvegarder la conversation et l'utilisateur
        conversationRepository.save(conversation);
        userRepository.save(user);

        return conversation;
    }

    @Override
    public List<Conversation> getConversationsByUser(Long userId) {
        return conversationRepository.findConversationsByUserId(userId);
    }


    @Override
    public Conversation removeUserFromConversation(Long conversationId, Long userId) {
        // Récupérer la conversation par son ID
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        // Récupérer l'utilisateur par son ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Vérifier si l'utilisateur fait bien partie de la conversation
        if (!conversation.getUsers().contains(user)) {
            throw new RuntimeException("User is not part of this conversation");
        }

        // Supprimer l'utilisateur de la conversation
        conversation.getUsers().remove(user);

        // Supprimer la conversation de la liste de l'utilisateur
        user.getConversations().remove(conversation);

        // Sauvegarder les changements
        conversationRepository.save(conversation);
        userRepository.save(user);

        return conversation;
    }


}
