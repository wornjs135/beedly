package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.domain.type.SoldStatus;
import com.ssafy.beedly.dto.personal.product.request.CreatePersonalProductRequest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter @Setter
@Table(name = "PERSONAL_PRODUCT")
public class PersonalProduct extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_product_id")
    private Long id;

    @Column(name = "p_product_name")
    private String productName;

    @Column(name = "p_product_desc")
    private String productDesc;

    @Column(name = "p_start_price")
    private Integer startPrice;

    @Column(name = "p_product_h")
    private Integer height;

    @Column(name = "p_product_w")
    private Integer width;

    @Column(name = "p_product_d")
    private Integer depth;

    @Column(name = "p_favorite_count")
    private Integer favoriteCount;

    @Enumerated(EnumType.STRING)
    @Column(name = "p_sold_status")
    private SoldStatus soldStatus;

    @Column(name = "p_start_time")
    private LocalDateTime startTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "personalProduct")
    private List<PersonalProductImg> productImgs = new ArrayList<>();

    @OneToOne(mappedBy = "personalProduct")
    private PersonalSold personalSold;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @Column(name = "p_brightness")
    private Integer brightness;

    @Column(name = "p_saturation")
    private Integer saturation;

    @Column(name="p_temperature")
    private Integer temperature;

    @OneToMany(mappedBy = "personalProduct")
    private List<PersonalSearchTag> searchTags = new ArrayList<>();
        

    public PersonalProduct(String productName) {
        this.productName = productName;
    }

    @Override
    public String toString() {
        return "PersonalProduct{" +
                "id=" + id +
                ", productName='" + productName + '\'' +
                ", productDesc='" + productDesc + '\'' +
                ", startPrice=" + startPrice +
                ", height=" + height +
                ", width=" + width +
                ", depth=" + depth +
                ", soldStatus=" + soldStatus +
                ", startTime=" + startTime +
                ", category=" + category +
                ", user=" + user +
                ", productImgs=" + productImgs +
                ", personalSold=" + personalSold +
                ", temperature=" +temperature+
                ", brightness=" + brightness+
                ", saturation=" + saturation+
                '}';
    }

    public static PersonalProduct createPersonalProduct(CreatePersonalProductRequest request, Category category, User user, Artist artist) {
        PersonalProduct personalProduct = new PersonalProduct();
        personalProduct.productName = request.getProductName();
        personalProduct.productDesc = request.getProductDesc();
        personalProduct.startPrice = request.getStartPrice();
        personalProduct.height = request.getHeight();
        personalProduct.width = request.getWidth();
        personalProduct.depth = request.getDepth();
        personalProduct.soldStatus = SoldStatus.STANDBY;
        personalProduct.startTime = request.getStartTime();
        personalProduct.category = category;
        personalProduct.user = user;
        personalProduct.artist = artist;
        personalProduct.brightness = request.getBrightness();
        personalProduct.saturation = request.getSaturation();
        personalProduct.temperature = request.getTemperature();
        personalProduct.favoriteCount = 0;

        return personalProduct;
    }

    public void updateSoldStatus(SoldStatus s) {
        this.soldStatus = s;
    }


    public void updatePersonalProduct(CreatePersonalProductRequest request, Category findCategory) {
        this.productName = request.getProductName();
        this.productDesc = request.getProductDesc();
        this.startPrice = request.getStartPrice();
        this.height = request.getHeight();
        this.width = request.getWidth();
        this.depth = request.getDepth();
        this.startTime = request.getStartTime();
        this.category = findCategory;
        this.brightness = request.getBrightness();
        this.saturation = request.getSaturation();
        this.temperature = request.getTemperature();
    }

    public void addFavoriteCount() {
        this.favoriteCount += 1;
    }

    public void minusFavoriteCount() {
        if (this.favoriteCount >= 1) {
            this.favoriteCount -= 1;
        }
    }
}
