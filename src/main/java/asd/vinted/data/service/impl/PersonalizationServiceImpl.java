package asd.vinted.data.service.impl;

import asd.vinted.data.dao.PersonalizationDao;
import asd.vinted.data.entity.Personalization;
import asd.vinted.data.service.PersonalizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PersonalizationServiceImpl implements PersonalizationService {

    @Autowired
    PersonalizationDao personalizationDao;

    @Override
    public List<Personalization> findAllByUserId(Long id) {
        return  personalizationDao.findByUserId(id);
    }

    @Override
    public boolean save(List<Personalization> personalizations) {
        for(Personalization pers: personalizations) {
            try {
                personalizationDao.save(pers);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
        }
        return  true;
    }

    @Override
    public boolean deleteAllByUserId(Long id) {
        try {
            personalizationDao.deletePersonalizations(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }

        return  true;
    }


}
