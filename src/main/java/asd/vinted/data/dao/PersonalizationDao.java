package asd.vinted.data.dao;

import asd.vinted.data.entity.Personalization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
@Repository
public interface PersonalizationDao extends JpaRepository<Personalization, Long> {

    List<Personalization> findByUserId(Long id);
    @Modifying
    @Transactional
    @Query("delete from Personalization p where p.user.id=:id")
    void deletePersonalizations(@Param("id") Long id);

}
