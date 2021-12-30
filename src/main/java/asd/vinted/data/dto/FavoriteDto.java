package asd.vinted.data.dto;
import java.io.Serializable;

public class FavoriteDto implements Serializable {

    private Long id;
    private Long userId;
    private Long productId;
   	private String image;

	public String getImage() {
		return this.image;
	}

	public void setImage(String image) {
		this.image = image;
	}


    public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return this.userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getProductId() {
		return this.productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}
}




