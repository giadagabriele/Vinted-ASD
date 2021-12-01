package asd.vinted.dao;

import asd.vinted.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteDao extends JpaRepository<Favorite,Long> {
}
