package kr.withbooks.web.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
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
import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.Shorts;
import kr.withbooks.web.entity.ShortsAttachment;
import kr.withbooks.web.entity.ShortsView;
import kr.withbooks.web.service.BookService;
import kr.withbooks.web.service.ShortsAttachmentService;
import kr.withbooks.web.service.ShrotsService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("shorts")
public class ShortsController {

    @Autowired
    private ShrotsService service;

    @Autowired
    private BookService bookService;


    @Autowired
    private ShortsAttachmentService shortsAttachmentService;


    @GetMapping("list")
    public String list(Model model, @RequestParam(name = "id", required = false) Long bookId) {

        List<ShortsView> list = service.getView(bookId);
        // System.out.println(list);


        for (ShortsView view : list) {
            Long id = view.getId();
            List<ShortsAttachment> attachList = shortsAttachmentService.getListById(id);

            List<String> imgList = new ArrayList<>();
            // null이 아닐 떄는, attachlist만큼의 반복을 돌면서 , list.img에 attahlist의 img를 꺼내서  담아주기
            System.out.println(attachList);
            for (ShortsAttachment shortsAttachment : attachList) {

                imgList.add(shortsAttachment.getImg());
                view.setImg(imgList);
            }
        }

        model.addAttribute("list", list);

        return "shorts/list";
    }

    @GetMapping("reg")
    public String regForm(@RequestParam(name = "content", required = false) String content
    ) {

        return "shorts/reg";
    }


    @PostMapping("reg")
    public String reg ( 
        @RequestParam(name = "files", required = false) List<MultipartFile> files, 
        @RequestParam(name = "text-area", required = false) String content,
        @RequestParam(required = false , name = "book-id") Long bookId,
        HttpServletRequest request) throws IOException {

        System.out.println("files = " + files.size());

        for(MultipartFile file : files){

            System.out.println("복숭아 = " + file.getOriginalFilename());
        }


        Shorts item = Shorts.builder()
                            .bookId(bookId)
                            .userId(1L)
                            .content(content)
                            .build();

        service.add(item);   // 북쇼츠 내용 저장

        // System.out.println("사이즈 = "+files.size());
        // for(MultipartFile f : files){
        //     System.out.println("파일네임 = "+ f.getOriginalFilename());
        // }

        String fileName = null;

     

        for(int i=0; i<files.size(); i++){

            if (!files.get(i).isEmpty()) {

                fileName = files.get(i).getOriginalFilename();

                String path = "/image/shorts";
                String realPath = request.getServletContext().getRealPath(path);
                File file = new File(realPath);
                if(!file.exists())
                    file.mkdirs();              

                File filePath = new File(realPath+File.separator+fileName);
                
                files.get(i).transferTo(filePath);
                
            
                ShortsAttachment shortsAttachment = ShortsAttachment.builder().ShortsId(item.getId()).img(fileName).build();
                //for문을 돌면서 다중 파일 이미지 이름을 db(shorts_attachment)에 저장
                shortsAttachmentService.add(shortsAttachment);
            }
        }
   
        return "redirect:/shorts/list";

    }

    @GetMapping("edit")
    public String editForm(
        @RequestParam(name = "sid") Long shortsId, 
        @RequestParam(name = "bid") Long bookId, 
        Model model) {

        // shortsId 로 수정할 shorts 찾아오기 
        Shorts shorts = service.get(shortsId);
        log.info("shorts = {}", shorts);
        // shortsId 로 수정할 shortsAttachments 찾아오기
        List<ShortsAttachment> shortsAttachments = shortsAttachmentService.getListById(shortsId);
        log.info("shortsAttachments = {}", shortsAttachments);

        Book book = bookService.get(bookId);
        log.info("book = {}", book);
        // model : view로 전달 하는 저장, 
        // 조합하기 - view는 결합이다. 어쩔수 없이 view를 사용한다.
        /*1. 수정하기를 누를 떄 , 쇼츠 섹션에 있는 bookid 와, shots id가 넘어간다.
         * 2. book service를 통해 booId를 념겨서, title을 얻는다.
         * 3. 모델에 booktitle을 담는다.
         * 4. shorts id를 통해 , shorts 테이블에서 해당 shorts 를 얻어온다.
         * 5. shorts를 모델에 담는다.
         * 6.
         */

        // title,  short id 
        
        // model에 담기
        model.addAttribute("shorts", shorts);
        model.addAttribute("shortsAttachments", shortsAttachments);
        model.addAttribute("book", book);


        return "shorts/edit";
    }

    @PostMapping("edit")
    public String edit() {
        

        return "redirect:/shorts/list";
    }

    @PostMapping("delete")
    public String delete(@RequestParam("shorts-id") Long shortsId){

        service.delete(shortsId);


        return "redirect:list";
    }

}

