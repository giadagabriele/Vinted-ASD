package asd.vinted.data.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import asd.vinted.core.Exception.ItemNotFoundException;
import asd.vinted.data.dao.FavoriteDao;
import asd.vinted.data.dto.FavoriteDto;
import asd.vinted.data.entity.Favorite;
import asd.vinted.data.service.FavoriteService;

@Service

public class FavoriteServiceImpl implements FavoriteService{

    @Autowired
    private FavoriteDao favoriteDao;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<FavoriteDto> getAllFavorites() {
         List<Favorite> Favorite= favoriteDao.findAll();
        return Favorite.stream().map(mess->modelMapper.map(mess, FavoriteDto.class)).collect(Collectors.toList());
    }
    @Override
    public FavoriteDto getFavorite(Long id) {
        Favorite favorite = favoriteDao.findById(id).orElseThrow(() -> new ItemNotFoundException(id));
      return modelMapper.map(favorite, FavoriteDto.class);
    }

    @Override
    public FavoriteDto addFavorite(FavoriteDto dto) {
      Favorite favorite = modelMapper.map(dto, Favorite.class);
      Favorite saved = favoriteDao.save(favorite);
      return modelMapper.map(saved, FavoriteDto.class);
    }
    @Override
    public void delete(Long id) {
      favoriteDao.deleteById(id);
    }

}
