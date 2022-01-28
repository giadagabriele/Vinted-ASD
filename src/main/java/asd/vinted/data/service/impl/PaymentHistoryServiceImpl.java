package asd.vinted.data.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import asd.vinted.data.dao.orderDao;
import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.entity.Order;
import asd.vinted.data.entity.PaymentHistory;
import asd.vinted.data.service.PaymentHistoryService;

@Service

public class PaymentHistoryServiceImpl implements PaymentHistoryService{

    @Autowired
    private orderDao _orderDao;

    @Autowired
    private ModelMapper modelMapper;

    // @Override
    // public List<OrderDto> getPaymentHistory() {
    //      List<Order> order= _orderDao.findAll();
    //     return Order.stream().map(mess->modelMapper.map(mess, orderDao.class)).collect(Collectors.toList());
    // }

    @Override
    public List<OrderDto> getPaymentHistoryByProduct(String product) {
      List<Order> order = _orderDao.findByproductID(product);
      return order.stream().map(prod->modelMapper.map(prod, OrderDto.class)).collect(Collectors.toList());
    }
    @Override
    public List<OrderDto> getPaymentHistoryByUser(long user) {
      List<Order> order = _orderDao.findByUserID(user);
      return order.stream().map(prod->modelMapper.map(prod, OrderDto.class)).collect(Collectors.toList());
    }
    // @Override
    // public OrderDto addPaymentHistory(OrderDto dto) {
    //     Order order = modelMapper.map(dto, Order.class);
    //     Order saved = _orderDao.save(order);
    //   return modelMapper.map(saved, OrderDto.class);
    // }

    @Override
    public void delete(Long id) {
        OrderDto.delete(id);
    }

}
