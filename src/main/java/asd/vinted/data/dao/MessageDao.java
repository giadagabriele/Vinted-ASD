package asd.vinted.data.dao;

import asd.vinted.data.entity.Message;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageDao extends JpaRepository<Message,Long> {
    Message save(MessageDao p);
    List<Message> findByRecieverId(String recieverId);
    List<Message> findBySenderId(String senderId);
}
