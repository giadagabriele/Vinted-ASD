package asd.vinted.data.service;

import java.util.List;

import asd.vinted.data.dto.OrderDto;

public interface PaymentHistoryService {
    List<OrderDto> getPaymentHistoryByUser(long user);
    List<OrderDto> getPaymentHistoryByProduct(String product);
    // List<OrderDto> getPaymentHistory();
    // OrderDto addPaymentHistory(OrderDto paymentHistory);
    void delete(Long id);
 }