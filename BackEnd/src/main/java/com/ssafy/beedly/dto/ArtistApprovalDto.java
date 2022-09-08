package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.ArtistApproval;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArtistApprovalDto {

	Long userId;
	String userEmail;
	String userNickname;
	String userName;

	public ArtistApprovalDto(ArtistApproval artistApproval){
		this.userId = artistApproval.getUser().getId();
		this.userEmail = artistApproval.getUser().getUserEmail();
		this.userNickname = artistApproval.getUser().getUserNickname();
		this.userName = artistApproval.getUser().getUserName();
	}
}
