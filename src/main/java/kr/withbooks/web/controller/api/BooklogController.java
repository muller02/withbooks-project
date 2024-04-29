package kr.withbooks.web.controller.api;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.entity.BooklogLogs;
import kr.withbooks.web.service.BooklogService;

@RequestMapping("api/booklog")
@RestController("apiBooklogController")
public class BooklogController {

    @Autowired
    private BooklogService service;

    @GetMapping
    public int changePublic(Long booklogId, Long publicYn
            ){

        // Long userId = 4L;
        int result = 0;

        result = service.changePublic(booklogId, publicYn);
        
        return result;
    }

    @PostMapping("reg")
    public int reg(
        // @RequestParam(name = "new-file", required = false) MultipartFile imgFile, 
        @RequestBody BooklogLogs logs,
        @RequestParam(required = false) MultipartFile file,
        HttpServletRequest request) throws IOException{

            System.out.println(file);

            // 파일 저장
            // if(imgFile != null && !imgFile.isEmpty())
            // {
            //     fileName = imgFile.getOriginalFilename();

            //     String path = "/image/booklog";

            //     String realPath = request.getServletContext().getRealPath(path);

            //     File pathFile = new File(realPath);

            //     if(!pathFile.exists())
            //         pathFile.mkdirs();

            //     File file = new File(realPath+File.separator+fileName);
            //     imgFile.transferTo(file);
            // }

            // service.addLogs(logs);
            System.out.println(logs.toString());

            
            return 0;
    }
    
}
