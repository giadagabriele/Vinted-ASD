package asd.vinted.data.service.impl;


import asd.vinted.data.dao.CategoryDao;
import asd.vinted.data.entity.Category;
import asd.vinted.data.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryDao categoryDao;


    @Override
    public List<Category> getAll() {
        return categoryDao.findAll();
    }
}
