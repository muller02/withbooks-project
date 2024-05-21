package kr.withbooks.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.service.FreeLikeService;


@RestController("apiFreeLikeController")
@RequestMapping("/api/free-boards/{id}/free-likes")
public class FreeLikeController {

    @Autowired
    private FreeLikeService freeLikeService;
    
    @PostMapping
    public int postLike(
          @PathVariable(name = "id") String freeBoardId
        , @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        if(userDetails == null)
            return 100;

        return freeLikeService.like(Long.parseLong(freeBoardId), userDetails.getId());
    }


    @DeleteMapping
    public int deleteLike(
          @PathVariable(name = "id") String freeBoardId
        , @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        
        if(userDetails == null)
            return 100;

        return freeLikeService.deleteLike(Long.parseLong(freeBoardId), userDetails.getId());
    }
    
}
