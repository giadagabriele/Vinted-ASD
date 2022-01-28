package asd.vinted.data.service;

import java.util.List;

import asd.vinted.data.dto.PaymentHistoryDto;

public interface PaymentHistoryService {
    List<PaymentHistoryDto> getPaymentHistoryByUser(long user);
    List<PaymentHistoryDto> getPaymentHistoryByProduct(String product);
    List<PaymentHistoryDto> getPaymentHistory();
    PaymentHistoryDto addPaymentHistory(PaymentHistoryDto paymentHistory);
    void delete(Long id);
 }