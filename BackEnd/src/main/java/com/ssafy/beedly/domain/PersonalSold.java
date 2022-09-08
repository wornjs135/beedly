package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Table(name = "PERSONAL_SOLD")
public class PersonalSold extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_sold_id")
    private Long id;

    @Column(name = "p_end_time")
    private LocalDateTime endTime;

    @Column(name = "p_final_price")
    private Integer finalPrice;

    @Column(name = "p_paid_flag")
    private Boolean paidFlag;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "p_product_id")
    private PersonalProduct personalProduct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public static PersonalSold createPersonalSold(Integer finalPrice, PersonalProduct p, User u) {
        PersonalSold personalSold = new PersonalSold();
        personalSold.endTime = LocalDateTime.now();
        personalSold.finalPrice = finalPrice;
        personalSold.paidFlag = false;
        personalSold.personalProduct = p;
        personalSold.user = u;

        return personalSold;
    }

    public void updatePaidFlag() {
        this.paidFlag = true;
    }
}
