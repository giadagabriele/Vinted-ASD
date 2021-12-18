package asd.vinted.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import asd.vinted.data.dto.FavoriteDto;
import asd.vinted.data.entity.Favorite;
import asd.vinted.data.service.FavoriteService;

import java.util.List;

@RestController
@RequestMapping("/") //the root path for products
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class FavoriteController {

  @Autowired
  private FavoriteService favoriteService;

  @GetMapping("favorite")
  public ResponseEntity<List<FavoriteDto>> all() {
    return ResponseEntity.ok(favoriteService.getAllFavorites());
  }

  @GetMapping("favorite/{id}")
  public ResponseEntity<FavoriteDto> all(@PathVariable("id") Long id) {
    // FavoriteDto favorite = favoriteService.getFavorite(id);
    return ResponseEntity.ok(favoriteService.getFavorite(id));
  }

  @PostMapping("favorite")
  public ResponseEntity<FavoriteDto> add(@RequestBody FavoriteDto Favorite) {
    FavoriteDto p = favoriteService.addFavorite(Favorite);
    return ResponseEntity.ok(p);
  }

  @DeleteMapping("favorite/{id}")
  public HttpStatus delete(@PathVariable Long id) {
    favoriteService.delete(id);
    return HttpStatus.OK;
  }
}
