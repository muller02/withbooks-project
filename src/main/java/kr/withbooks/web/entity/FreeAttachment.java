package kr.withbooks.web.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FreeAttachment {
    private Long id;
    private Long boardId;
    private String img;
}
