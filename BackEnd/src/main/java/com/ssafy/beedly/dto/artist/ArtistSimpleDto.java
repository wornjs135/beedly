package com.ssafy.beedly.dto.artist;

import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.ArtistFavorite;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArtistSimpleDto {

    @ApiModelProperty(notes = "작가 식별자")
    private Long artistId;

    @ApiModelProperty(notes = "작가 프로필이미지")
    private String artistProfileImg;

    @ApiModelProperty(notes = "작가 배경이미지")
    private String artistBgImg;

    @ApiModelProperty(notes = "작가 닉네임")
    private String userNickname;

    @ApiModelProperty(notes = "작가 찜 식별자")
    private Long favoriteId;

    public ArtistSimpleDto(ArtistFavorite artistFavorite) {
        Artist artist = artistFavorite.getArtist();
        this.artistId = artist.getId();
        this.artistProfileImg = artist.getArtistProfileImg();
        this.artistBgImg = artist.getArtistBgImg();
        this.userNickname = artist.getUser().getUserNickname();
        this.favoriteId = artistFavorite.getId();
    }
}
