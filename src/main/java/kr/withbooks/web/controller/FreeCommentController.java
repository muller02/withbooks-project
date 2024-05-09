package kr.withbooks.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.service.FreeCommentService;

@Controller
@RequestMapping("/free-comment")
public class FreeCommentController {

    @Autowired
    private FreeCommentService freeCommentService;


     
    @PostMapping
    public String detail(
          @RequestParam(name="fid") Long freeBoardId
        , @RequestParam String comment
        , @RequestHeader("Referer") String referer
        , @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        
        if(userDetails == null)
          return "로그인을 해 주세요";

        freeCommentService.reg(freeBoardId, userDetails.getId(), comment);

        
      return "redirect:/free-board/detail?fid=" + freeBoardId;
    }
}
