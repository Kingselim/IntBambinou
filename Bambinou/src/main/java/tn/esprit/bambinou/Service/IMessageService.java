package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Message;

import java.util.List;

public interface IMessageService {
    public List<Message> retrieveAllMessages();
    public Message retrieveMessage(Long messageId);
    public Message addMessage(Message message);
    public void removeMessage(Long messageId);
    public Message modifyMessage(Message message);
    public Message addMessageToConversation(Long conversationId, Long senderId, String content);
    List<Message> getMessagesByConversation(Long conversationId);

}
