package asd.vinted.data.dao;

import asd.vinted.data.entity.Message;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageDao extends JpaRepository<Message,Long> {
    Message save(MessageDao p);
}
