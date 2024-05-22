package kr.withbooks.web.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.Booklog;
import kr.withbooks.web.entity.BooklogLogs;
import kr.withbooks.web.entity.BooklogView;
import kr.withbooks.web.service.BooklogService;


// 북로그 리스트
@Controller
@RequestMapping("booklog")
public class BooklogController {
    
    @Autowired
    private BooklogService service;

    // 북로그 리스트
    @GetMapping("list")
    public String list(Model model,
                       @AuthenticationPrincipal CustomUserDetails userDetails){

        //[ ]  제거 예정
        Long id = 4L;

        // Long id = userDetails.getId();
        
        //TODO 다른 사람의 북리스트 검색시 public_yn 적용 필요

        List<BooklogView> list = service.getList(id);

        model.addAttribute("list", list);
        
        return "booklog/list";
    }

    // 북로그 디테일
    @GetMapping("detail")
    public String detail(Model model, @RequestParam(name="id", required= false) Long id ){

        // 북로그 정보
        BooklogView booklog = service.getById(id);
        // 북로그의 로그들
        List<BooklogLogs> logs = service.getLogs(id);

        model.addAttribute("booklog", booklog);
        model.addAttribute("logs", logs);
        
        return "booklog/detail";
    }
    
    @GetMapping("reg")
    public String regForm(){

        return "booklog/reg";
    }

    // 새 북로그 저장
    @PostMapping("reg")
    public String reg(
        @RequestParam(name = "file", required = false) MultipartFile imgFile, 
        @RequestParam(name = "text-area", required = false) String content,
        @RequestParam(name = "book-id", required = false) Long bookId,
        @RequestParam(name = "booklog-id", required = false) Long booklogId,
        @RequestParam(name = "public-yn", required = false, defaultValue = "0") Integer publicChecked,
        Booklog booklog, BooklogLogs logs,
        HttpServletRequest request,
        HttpServletResponse response,
        @AuthenticationPrincipal CustomUserDetails userDetails) throws IOException {
            
        Long userid = 4L;
        // Long userid = userDetails.getId();

            // =============== 먼저 북로그를 저장한다 ========================================================================
            booklog = Booklog.builder()
                                    .userId(userid)
                                    .bookId(bookId)
                                    .publicYn(publicChecked)
                                    .build();
            service.reg(booklog);

            System.out.println("******북로그 저장 완료********");

            // =============== 다음으로 로그를 저장한다 ========================================================================
            String fileName = null;

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
            if(booklogId == null)
            booklogId = booklog.getId();

            if(content.length() > 0 ){
                content = content.replace("\n", "<br/>");
            }

            // 받아온 booklog ID로 booklog_logs를 저장한다. 
            logs = BooklogLogs.builder()
                                    .booklogId(booklogId)
                                    .content(content)
                                    .img(fileName)
                                    .build();
                                    
            service.addLogs(logs);
            
            System.out.println("로그 저장 완료");
            //=============================================================================================================

        
            try {
            // 리턴 되는 url에 requestURI 정보가 보이지 않게 처리하기 위함
                response.sendRedirect("detail?m=4&id=" + booklogId);
            } catch (IOException e) {
                // 리다이렉트 중 오류가 발생한 경우 처리
                e.printStackTrace();
            }

        return null;
    }

    @PostMapping("delete")
    public String delete(
                        @RequestParam(name = "booklog-id") Long id,
                        HttpServletResponse response
                        ){
        service.delete(id);
        
        try {
            // 리턴 되는 url에 requestURI 정보가 보이지 않게 처리하기 위함
            response.sendRedirect("list?m=4");
        } catch (IOException e) {
            // 리다이렉트 중 오류가 발생한 경우 처리
            e.printStackTrace();
        }

        return null;
    }

    @PostMapping("deletelog")
    public String deletelog(
        @RequestParam(name = "logs-id") Long id,
        @RequestParam(name = "booklog-id") Long booklogId,
        HttpServletResponse response
    ) {
       
        service.deleteLog(id);
        
        try {
            // 리턴 되는 url에 requestURI 정보가 보이지 않게 처리하기 위함
            response.sendRedirect("detail?m=4&id=" + booklogId);
        } catch (IOException e) {
            // 리다이렉트 중 오류가 발생한 경우 처리
            e.printStackTrace();
        }
        return null;
    }
    

    @PostMapping("deleteAllByIds")
    public String deleteAllByIds( 
                            @RequestParam(name="ids", required= true) List<Integer> ids
                            ,@AuthenticationPrincipal CustomUserDetails userDetails,
                            HttpServletResponse response
                            ){
        
    //    Long userId = userDetails.getId();
        if(ids!=null && ids.size() > 0)
            service.deleteAllByIds(ids);

        try {
            // 리턴 되는 url에 requestURI 정보가 보이지 않게 처리하기 위함
            response.sendRedirect("list?m=4");
        } catch (IOException e) {
            // 리다이렉트 중 오류가 발생한 경우 처리
            e.printStackTrace();
        }
        return null;
    }


}
