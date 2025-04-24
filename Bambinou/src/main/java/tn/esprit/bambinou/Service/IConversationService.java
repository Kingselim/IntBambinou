package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Conversation;

import java.util.List;

public interface IConversationService {
    public List<Conversation> retrieveAllConversations();
    public Conversation retrieveConversation(Long conversationId);
    public Conversation addConversation(Conversation conversation);
    public void removeConversation(Long conversationId);
    public Conversation modifyConversation(Conversation conversation);
    public Conversation addUserToConversation(Long conversationId, Long userId);
    public List<Conversation> getConversationsByUser(Long userId);
    public Conversation removeUserFromConversation(Long conversationId, Long userId);
}
