package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.User;

import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserEmail(String userEmail);
    Optional<User> findByKakaoId(Long kakaoId);

    Optional<User> findByUserNickname(String nickname);
}
