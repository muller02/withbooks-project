package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WithView {
  private long id;
  private int faceYn; // 대면여부
  private String name;
  private String intro;
  private String img;
  private String interval; // 모임주기
  private String location;
  private int personnel; // 정원
  private int memberCnt; // 가입 멤버 수



  private List<String> categoryNames;
}
