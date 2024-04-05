package kr.withbooks.web.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class With {

    private Long id;
    private Long withRegId;
    private List<Long> categoryId;
    private List<String> hashTag;
    private String name;
    private String intro;
    private String img;
    private Date regDate;
    private Boolean blindYn;



}
