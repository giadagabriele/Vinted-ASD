package asd.vinted.data.service;

import java.util.List;

import asd.vinted.data.dto.FavoriteDto;
import asd.vinted.data.entity.Favorite;

public interface FavoriteService {
    List<FavoriteDto> getAllFavorites();
    FavoriteDto getFavorite(Long id);
    FavoriteDto addFavorite(FavoriteDto favorite);
    void delete(Long id);
}
