package asd.vinted.dao;

import asd.vinted.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryDao extends JpaRepository<Country,Long> {
}
