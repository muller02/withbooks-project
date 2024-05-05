package kr.withbooks.web.controller.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.service.FreeLikeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController("apiFreeLikeController")
@RequestMapping("/api/free-board/free-like")
public class FreeLikeController {

    @Autowired
    private FreeLikeService freeLikeService;
    
    @PostMapping
    public int postLike(
          @RequestBody String freeBoardId
        , @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        if(userDetails == null)
            return 100;

        return freeLikeService.like(Long.parseLong(freeBoardId), userDetails.getId());
    }


    @DeleteMapping
    public int deleteLike(
          @RequestBody String freeBoardId
        , @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        if(userDetails == null)
            return 100;

        return freeLikeService.deleteLike(Long.parseLong(freeBoardId), userDetails.getId());
    }
    
}
