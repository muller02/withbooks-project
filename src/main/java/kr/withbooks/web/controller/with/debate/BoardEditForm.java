package kr.withbooks.web.controller.with.debate;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
public class BoardEditForm {

    private Long id;
    //private Long topicId;
    private String title;
    private String content;
    private List<MultipartFile> files = new ArrayList<>();
    private List<Long> deleteFilesId = new ArrayList<>();
}
