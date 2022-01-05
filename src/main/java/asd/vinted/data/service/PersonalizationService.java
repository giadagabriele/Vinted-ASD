package asd.vinted.data.service;

import asd.vinted.data.entity.Personalization;

import java.util.List;

public interface PersonalizationService {


    List<Personalization> findAllByUserId(Long id);
    boolean save(List<Personalization> personalizations);
    boolean deleteAllByUserId(Long id);

}
