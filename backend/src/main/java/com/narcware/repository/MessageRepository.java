package com.narcware.repository;

import com.narcware.model.MessageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<MessageModel, Long> {
    List<MessageModel> findByConversationId(String conversationId);
    List<MessageModel> findByCaseNumber(String caseNumber);
    List<MessageModel> findByFlaggedTrue();
}
