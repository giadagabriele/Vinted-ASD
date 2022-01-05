package asd.vinted.util;

import javax.persistence.*;
import java.io.Serializable;
@Embeddable
public class PersonalizationValue implements Serializable {

    @Column(name = "user_id")
    Long userId;

    @Column(name = "category_id")
    Long categoryId;

    @Column(name = "value")
    String value;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}
