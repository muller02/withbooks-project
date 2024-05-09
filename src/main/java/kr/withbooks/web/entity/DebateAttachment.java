package kr.withbooks.web.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DebateAttachment {
    private Long id;
    private Long boardId;
    private String originalImg;
    private String saveImg; // webapp/image/debate/board 에 저장한 파일명
}
