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
        @RequestParam(name = "booklog-id", required = false) Long bookLogId,
        @RequestParam(name = "public-yn", required = false, defaultValue = "0") Integer publicChecked,
        @RequestParam(name = "addLog", required = false) String addLogValid,
        Booklog booklog, BooklogLogs logs,
        HttpServletRequest request) throws IOException {


            // =============== 먼저 북로그를 저장한다 ========================================================================
            // =============== 이미 생성된 북로그에서 로그 추가일 경우엔 북로그를 저장하지 않는다. ===============================
            if(addLogValid != "addLog"){
                booklog = Booklog.builder()
                                        .userId(4L)
                                        .bookId(bookId)
                                        .publicYn(publicChecked)
                                        .build();
                service.reg(booklog);
                System.out.println("******북로그 저장 완료********");
            }
            //===============================================================================================================

            // =============== 다음으로 로그를 저장한다 ========================================================================
            String fileName = null;
            // 파일 저장

            System.out.println("imgFile : "+imgFile);
            if(imgFile != null && !imgFile.isEmpty())
            {
                fileName = imgFile.getOriginalFilename();
                System.out.println(fileName);

                String path = "/image/booklog";

                String realPath = request.getServletContext().getRealPath(path);

                File pathFile = new File(realPath);

                if(!pathFile.exists())
                    pathFile.mkdirs();

                File file = new File(realPath+File.separator+fileName);
                imgFile.transferTo(file);
            }

            // 새로운 북로그 작성시 앞에서 저장한 북로그의 아이디를 가져와서 로그 저장할 때 사용
            // 저장된 북로그에 로그 추가할 땐 프론트단에서 넘겨주기때문에 이 단계는 패스한다.
            if(bookLogId == null)
                bookLogId = booklog.getId();

            // 받아온 booklog ID로 booklog_logs를 저장한다. 
            logs = BooklogLogs.builder()
                                    .booklogId(bookLogId)
                                    .content(content)
                                    .img(fileName)
                                    .build();
                                    
            System.out.println("fileName : " + fileName);
            service.addLogs(logs);
            //=============================================================================================================

        return "redirect:detail?id="+bookLogId;
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
