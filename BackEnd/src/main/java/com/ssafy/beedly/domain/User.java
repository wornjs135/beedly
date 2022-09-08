package com.ssafy.beedly.domain;

import com.ssafy.beedly.domain.common.BaseEntity;
import com.ssafy.beedly.domain.type.Gender;
import com.ssafy.beedly.domain.type.UserRole;

import com.ssafy.beedly.dto.user.kakao.KakaoAuccount;
import com.ssafy.beedly.dto.user.kakao.KakaoUserResponse;
import com.ssafy.beedly.dto.user.request.UserUpdateRequest;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Random;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter @Setter
@Table(name = "USER")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

//    private String userPw;

    @Column(name = "kakao_id")
    private Long kakaoId;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_nickname")
    private String userNickname;

    @Column(name = "user_gender")
    @Enumerated(EnumType.STRING)
    private Gender userGender;

    @Column(name = "user_tel")
    private String userTel;

    @Column(name = "user_addr")
    private String userAddr;

    @Column(name = "user_bday")
    private LocalDate userBirthday;

    @Column(name = "user_brightness")
    private Integer userBrightness;

    @Column(name = "user_saturation")
    private Integer userSaturation;

    @Column(name = "user_temperature")
    private Integer userTemperature;


//    private LocalDateTime userDeleteDate;
//
//    @Enumerated(EnumType.STRING)
//    private YN userDeletedYn;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

//    public static User createUser_temp(String email, String pw, String name){
//        User user = new User();
//        user.userEmail = email;
//        user.userPw = pw;
//        user.userName = name;
//        user.userRole = UserRole.ROLE_USER;
//        return user;
//    }

    public static User createUser(KakaoUserResponse kakao){
        User user = new User();
        KakaoAuccount kakaoAuccount = kakao.getKakao_account();

        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        user.kakaoId = kakao.getId();
        user.userName = random.ints(leftLimit,rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        user.userEmail = kakaoAuccount.getEmail();
        user.userGender = kakaoAuccount.getGender().equals("male") ? Gender.M : Gender.F;
        user.userRole = UserRole.ROLE_USER;
        user.userBrightness = 0;
        user.userSaturation = 0;
        user.userTemperature = 0;

        return user;
    }

    public void updateUser(UserUpdateRequest request) {
        this.userName = request.getName();
        this.userNickname = request.getNickname();
        this.userTel = request.getTel();
        this.userAddr = request.getAddr();
        this.userBirthday = request.getBirthday();
    }

    public void updateScore(Integer brightness, Integer saturation, Integer temperature) {
        this.userBrightness = brightness;
        this.userSaturation = saturation;
        this.userTemperature = temperature;
    }

    // 테스트용 생성자
    public User(Long id) {
        this.id = id;
    }
}
