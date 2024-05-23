package kr.withbooks.web.controller.form;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
public class BoardForm {

    private Long topicId;
    private String title;
    private String content;
    private List<MultipartFile> files = new ArrayList<>();

}
