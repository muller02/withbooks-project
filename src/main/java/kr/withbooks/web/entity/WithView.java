package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WithView {
  private long id;
  private String name;
  private String intro;
  private String img;
  private String location;
  private int faceYn;
  private int memberCnt; // 가입 멤버 수
  private int personnel; // 정원
  private String categoryName;
}
