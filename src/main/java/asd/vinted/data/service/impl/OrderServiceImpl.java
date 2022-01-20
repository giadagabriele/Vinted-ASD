package asd.vinted.data.service.impl;

import asd.vinted.data.dao.orderDao;
import asd.vinted.data.dto.OrderDto;
import asd.vinted.data.dto.ProductDto;
import asd.vinted.data.entity.Order;
import asd.vinted.data.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private orderDao _orderDao;

    @Override
    public void saveOrderDetails(OrderDto orderDto) {
        try {
            _orderDao.save(modelMapper.map(orderDto, Order.class));
        }
        catch(Exception ex)
        {
            System.out.println("Error in saving Orders "+ex);

        }
    }
}
