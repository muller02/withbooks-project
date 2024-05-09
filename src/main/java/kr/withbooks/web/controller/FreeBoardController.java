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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.FreeAttachment;
import kr.withbooks.web.entity.FreeBoard;
import kr.withbooks.web.entity.FreeBoardView;
import kr.withbooks.web.entity.FreeCommentView;
import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.FreeAttachmentService;
import kr.withbooks.web.service.FreeBoardService;
import kr.withbooks.web.service.FreeCommentService;
import kr.withbooks.web.service.FreeLikeService;
import kr.withbooks.web.service.UserService;

@Controller
@RequestMapping("/freeboard")
public class FreeBoardController {

    @Autowired
    private FreeBoardService service;

    @Autowired
    private FreeAttachmentService freeAttachmentService;

    @Autowired
    private FreeCommentService freeCommentService;

    @Autowired
    private FreeLikeService freeLikeService;

    @Autowired
    private UserService userService;


    @GetMapping("/list")
    public  String list(
          @RequestParam(name="wid") Long withId
        , @RequestParam(name="p") int page
        , @RequestParam(name="s") String sort
        , Model model){

        List<FreeBoardView> list = service.getList(withId, page, sort);
        int count = service.getCount(withId);


        // 게시글의 \r\n 을 <br> 태그로 치환
        for(FreeBoardView f : list){
          String replacedStr = f.getContent().replace("\r\n", "<br>");
          f.setContent(replacedStr);
        }

       
        model.addAttribute("list", list);
        model.addAttribute("count", count);


        return  "/freeboard/list";
    }


    @GetMapping("/detail")
    public String detailForm(
          @RequestParam(name="fid") Long freeBoardId
        , @AuthenticationPrincipal CustomUserDetails userDetails
        , Model model){


        FreeBoard board = service.getById(freeBoardId);
        User user = userService.getById(board.getUserId());
        List<FreeAttachment> imgs = freeAttachmentService.getList(freeBoardId);
        int commentCnt = freeCommentService.getCount(freeBoardId);
        int likeCnt = freeLikeService.getCount(freeBoardId);
        List<FreeCommentView> commentList = freeCommentService.getList(freeBoardId);
        boolean isLiked = false;

        if(userDetails != null)
          isLiked = freeLikeService.isLiked(freeBoardId, userDetails.getId());  



        // 댓글의 \r\n 을 <br> 태그로 치환
        for(FreeCommentView f : commentList){
          String replacedStr = f.getContent().replace("\r\n", "<br>");
          f.setContent(replacedStr);
        }

        // 게시글의 \r\n 을 <br> 태그로 치환
        {
          String replacedStr = board.getContent().replace("\r\n", "<br>");
          board.setContent(replacedStr);
        }


        
        
        model.addAttribute("board", board);
        model.addAttribute("user", user);
        model.addAttribute("imgs", imgs);
        model.addAttribute("commentCnt", commentCnt);
        model.addAttribute("likeCnt", likeCnt);
        model.addAttribute("commentList", commentList);
        model.addAttribute("isLiked", isLiked);

        return "/freeboard/detail";
    }



    // 이거 FreeCommentController가 해야하는지 FreeBoardController가 해야하는지 잘 모르겠다.
    @PostMapping("/detail")
    public String detail(
          @RequestParam(name="fid") Long freeBoardId
        , @RequestParam String comment
        , @RequestHeader("Referer") String referer
        , @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        
        if(userDetails == null)
          return "로그인을 해 주세요";

        freeCommentService.reg(freeBoardId, userDetails.getId(), comment);

        //  이 부분 수정 필요. redirect가 원하는대로 안된다.
        // return "redirect: /freeboard/detail" + freeBoardId; 을 하면 뒤에 이상한 url이 더 붙는다.
        // 지금 방법도 마찬가지로 뒤에 이상한 url이 더 붙는다.
      return "redirect:" + referer;
    }



    @GetMapping("/reg")
    public String regForm(
        @RequestParam(name="wid") Long withId
      , Model model
    ){

      model.addAttribute("withId", withId);

      return "/freeboard/reg";
    }


    @PostMapping("/reg")
    public String reg(
        String notice
      , String title
      , String content
      , MultipartFile[] imgs
      , HttpServletRequest request
      , @RequestParam(name="with-id") Long withId
      , @AuthenticationPrincipal CustomUserDetails userDetails
    ){

      // 이미지가 왔다면
      // 이미지 파일을 서버에 저장
      if(!imgs[0].isEmpty())
      {
        // 서버에 이미지를 저장할 경로를 구하기
        String realPath = request
                            .getServletContext()
                            .getRealPath("/image/free-board");
  
        File dir = new File(realPath);
        if(!dir.exists())
            dir.mkdirs();


        // 서버에 이미지를 저장
        for(MultipartFile img : imgs){
          String pathToSave = realPath + File.separator + img.getOriginalFilename();
          File imgFile = new File(pathToSave);
    
          try {
            img.transferTo(imgFile);
          } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
          }
        }
      }


      // // 게시글을 DB에 저장
      {
        FreeBoard freeBoard = FreeBoard
                              .builder()
                              .withId(withId)
                              .userId(userDetails.getId())
                              .title(title)
                              .content(content)
                              .noticeYn(notice!=null ? 1 : 0)
                              .build();

        service.reg(freeBoard, imgs);
      }


      return "redirect: /freeboard/list";
    }

}
