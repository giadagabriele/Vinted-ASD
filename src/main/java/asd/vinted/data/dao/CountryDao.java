package asd.vinted.data.dao;

import asd.vinted.data.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryDao extends JpaRepository<Country,Long> {
}
