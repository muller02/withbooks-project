package kr.withbooks.web.controller.api;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.entity.BooklogLogs;
import kr.withbooks.web.service.BooklogService;

@RestController("apiBooklogController")
@RequestMapping("api/booklog")
public class BooklogController {

    @Autowired
    private BooklogService service;

    // 공개-비공개 버튼 클릭시 업데이트
    @GetMapping
    public int changePublic(
        Long booklogId
        , Long publicYn
        ){

        // Long userId = 4L;
        int result = 0;

        result = service.changePublic(booklogId, publicYn);
        
        return result;
    } 

    // 새 로그 작성
    @PostMapping("reg")
    public BooklogLogs reg(
        @RequestParam(name="content",required = false) String content,
        @RequestParam(name="booklogId") Long id,
        @RequestParam(name="file",required = false) MultipartFile imgFile,
        HttpServletRequest request,
        BooklogLogs logs) throws IOException{
            
            // 내용 없는 경우 null 대입
            if(content.length() == 0)
                content = null;
            
            String fileName = null;
            // 파일 저장
            if(imgFile != null && !imgFile.isEmpty())
            {
                fileName = imgFile.getOriginalFilename();

                String path = "/image/booklog";

                String realPath = request.getServletContext().getRealPath(path);

                File pathFile = new File(realPath);

                if(!pathFile.exists())
                    pathFile.mkdirs();

                File file = new File(realPath+File.separator+fileName);
                imgFile.transferTo(file);
            }

            logs = BooklogLogs.builder()
                        .content(content)
                        .img(fileName)
                        .booklogId(id)
                        .build();

            service.addLogs(logs);
            
            return logs;
    }

    @PostMapping("deleteByLogId")
    public int delete(@RequestParam(name = "logs-id") Long logId ){

        System.out.println("logId : " + logId);

        int result = service.deleteLog(logId);
        
        return result;

    }
    
}
