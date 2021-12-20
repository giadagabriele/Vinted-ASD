package asd.vinted.data.dao;

import asd.vinted.data.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteDao extends JpaRepository<Favorite,Long> {
    Favorite save(FavoriteDao p);
}
