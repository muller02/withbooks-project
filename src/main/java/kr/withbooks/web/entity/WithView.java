package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WithView {
  private long id;
  private int blindYn;
  private Long withRegId;
  private int faceYn; // 대면여부
  private String name;
  private String intro;
  private String img;
  private String interval; // 모임주기
  private String location; // 모임장소
  private int personnel; // 정원
  private LocalDateTime regDate;
  private int memberCnt; // 가입 멤버 수
  private String sido; // 모임장소-시도
  private String sigungu; // 모임장소-시군구

  private List<String> categoryNames;


  private String withTop; //위드장
}
