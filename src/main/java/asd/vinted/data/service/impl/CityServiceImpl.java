package asd.vinted.data.service.impl;

import asd.vinted.data.dao.CityDao;
import asd.vinted.data.entity.City;
import asd.vinted.data.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CityServiceImpl implements CityService {

    @Autowired
    CityDao cityDao;


    @Override
    public List<City> findAll() {
        return  cityDao.findAll();
    }
}
