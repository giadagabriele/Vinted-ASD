package asd.vinted.dao;

import asd.vinted.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageDao extends JpaRepository<Message,Long> {
}
