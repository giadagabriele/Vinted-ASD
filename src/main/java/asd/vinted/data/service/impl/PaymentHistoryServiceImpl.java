package asd.vinted.data.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import asd.vinted.data.dao.PaymentHistoryDao;
import asd.vinted.data.dto.PaymentHistoryDto;
import asd.vinted.data.entity.PaymentHistory;
import asd.vinted.data.entity.PaymentHistory;
import asd.vinted.data.service.PaymentHistoryService;

@Service

public class PaymentHistoryServiceImpl implements PaymentHistoryService{

    @Autowired
    private PaymentHistoryDao paymentHistoryDao;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<PaymentHistoryDto> getPaymentHistory() {
         List<PaymentHistory> PaymentHistory= paymentHistoryDao.findAll();
        return PaymentHistory.stream().map(mess->modelMapper.map(mess, PaymentHistoryDto.class)).collect(Collectors.toList());
    }

    @Override
    public List<PaymentHistoryDto> getPaymentHistoryByProduct(String product) {
      List<PaymentHistory> paymentHistory = paymentHistoryDao.findByProduct(product);
      return paymentHistory.stream().map(prod->modelMapper.map(prod, PaymentHistoryDto.class)).collect(Collectors.toList());
    }
    @Override
    public List<PaymentHistoryDto> getPaymentHistoryByUser(long user) {
      List<PaymentHistory> paymentHistory = paymentHistoryDao.findByUser(user);
      return paymentHistory.stream().map(prod->modelMapper.map(prod, PaymentHistoryDto.class)).collect(Collectors.toList());
    }
    @Override
    public PaymentHistoryDto addPaymentHistory(PaymentHistoryDto dto) {
        PaymentHistory favorite = modelMapper.map(dto, PaymentHistory.class);
        PaymentHistory saved = paymentHistoryDao.save(favorite);
      return modelMapper.map(saved, PaymentHistoryDto.class);
    }
    @Override
    public void delete(Long id) {
      paymentHistoryDao.deleteById(id);
    }

}
