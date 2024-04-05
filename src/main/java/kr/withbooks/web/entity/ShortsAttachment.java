package kr.withbooks.web.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShortsAttachment {

   private Long id;
   private Long ShortsId;
   private String img;

}
