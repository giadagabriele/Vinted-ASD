package asd.vinted.data.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import asd.vinted.data.entity.City;

public interface CityDao extends JpaRepository<City,Long> {

}
