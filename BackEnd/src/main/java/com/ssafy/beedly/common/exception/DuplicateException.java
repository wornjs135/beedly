package com.ssafy.beedly.common.exception;

public class DuplicateException extends RuntimeException {

    public static final String PERSONAL_AUCTION_PRODUCT_DUPLICATED = "해당 상품은 이미 경매가 진행되었습니다.";
    public static final String SPECIAL_AUCTION_BOARD_DUPLICATED = "해당 게시글은 이미 경매가 진행되었습니다.";
    public static final String PRODUCT_SOLD_DUPLICATED = "해당 상품은 이미 낙찰되었습니다.";
    public static final String ARTIST_FAVORITE_DUPLICATED = "이미 찜한 작가입니다.";

    public DuplicateException(String message) {
        super(message);
    }
}
