package asd.vinted.data.service;
import java.util.List;
import asd.vinted.data.dto.MessageDto;
import asd.vinted.data.entity.Message;

public interface MessageService {

    List<MessageDto> getAllMessages();
    List<MessageDto> getMessage(String id);
    MessageDto addMessage(MessageDto message);
    void delete(Long id);
}
