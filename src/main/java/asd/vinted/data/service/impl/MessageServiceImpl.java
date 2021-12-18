package asd.vinted.data.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import asd.vinted.data.dao.MessageDao;
import asd.vinted.data.dto.MessageDto;
import asd.vinted.data.entity.Message;
import org.springframework.stereotype.Service;

import asd.vinted.data.service.MessageService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageDao messageDao;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<MessageDto> getAllMessages() {
         List<Message> Message= messageDao.findAll();
        return Message.stream().map(mess->modelMapper.map(mess, MessageDto.class)).collect(Collectors.toList());
    }
    @Override
    public MessageDto getMessage(Long id) {
      Optional<Message> Message = messageDao.findById(id);
      return modelMapper.map(Message, MessageDto.class);
    }

    @Override
    public MessageDto addMessage(MessageDto dto) {
      Message Message = modelMapper.map(dto, Message.class);
      Message saved = ((CrudRepository<Message, Long>) messageDao).save(Message);
      return modelMapper.map(saved, MessageDto.class);
    }
    @Override
    public void delete(Long id) {
      messageDao.deleteById(id);
    }
    @Override
    public Message updateProduct(Long id, MessageDto product) {
      // TODO Auto-generated method stub
      return null;
    }
}
