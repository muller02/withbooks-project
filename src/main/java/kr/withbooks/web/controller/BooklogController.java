package kr.withbooks.web.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.entity.Booklog;
import kr.withbooks.web.entity.BooklogLogs;
import kr.withbooks.web.entity.BooklogView;
import kr.withbooks.web.service.BooklogService;

@Controller
@RequestMapping("booklog")
public class BooklogController {
    
    @Autowired
    private BooklogService service;

    @GetMapping("list")
    public String list(Model model){

        //[ ]  제거 예정
        Long id = 4L;
        
        List<BooklogView> list = service.getList(id);

        model.addAttribute("list", list);        
        
        return "booklog/list";
    }

    @GetMapping("detail")
    public String detail(Model model, @RequestParam(name="id", required= false) Long id ){

        BooklogView booklog = service.getById(id);
        List<BooklogLogs> logs = service.getLogs(id);

        for (int i = 0; i < logs.size(); i++) {
            System.out.println(logs.get(i));
        }

        model.addAttribute("booklog", booklog);
        model.addAttribute("logs", logs);
        
        return "booklog/detail";
    }

    @GetMapping("reg")
    public String regForm(){

        return "booklog/reg";
    }

    @PostMapping("reg")
    public String reg(
        @RequestParam(name = "file", required = false) MultipartFile imgFile, 
        @RequestParam(name = "text-area", required = false) String content,
        @RequestParam(name = "book-id", required = false) Long bookId,
        @RequestParam(name = "public-yn", required = false, defaultValue = "0") Integer publicChecked,
        Booklog booklog, BooklogLogs logs,
        HttpServletRequest request) throws IOException {

            // =============== 먼저 북로그를 저장한다 =================
            booklog = Booklog.builder()
                                     .userId(4L)
                                     .bookId(bookId)
                                     .publicYn(publicChecked)
                                     .build();
            service.reg(booklog);
            //========================================================

            // =============== 다음으로 로그를 저장한다 =================
            String fileName = "";
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

            // 받아온 booklog ID로 booklog_logs를 저장한다. 
            logs = BooklogLogs.builder()
                                    .booklogId(booklog.getId())
                                    .content(content)
                                    .img(fileName)
                                    .build();
                                    
            System.out.println("fileName : " + fileName);
            service.addLogs(logs);
            //========================================================

        return "redirect:list";
    }

    @PostMapping("delete")
    public String delete(
                        @RequestParam(name="ids", required= true) List<Integer> ids 
                        ){

        Long userId = null;
        if(ids!=null && ids.size() > 0)
            service.deleteAllByIds(ids, userId);

        return "redirect:list";
    }
}
