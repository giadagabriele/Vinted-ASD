package asd.vinted.data.service;

import asd.vinted.data.dto.OrderDto;

import javax.persistence.SecondaryTable;

public interface OrderService {
    public void saveOrderDetails(OrderDto orderDto);

}
