package kr.withbooks.web.controller.api;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.entity.WithView;
import kr.withbooks.web.service.WithMemberService;
import kr.withbooks.web.service.WithService;


@RestController("apiWithController")
@RequestMapping("api/with")
public class WithController {

    @Autowired
    private WithService service;

    @Autowired
    private WithMemberService memberService;

    @GetMapping
    List<WithView> list(@RequestParam(name = "c", required = false) Long[] categoryIds,
                        @RequestParam(name = "q" ,required = false) String query,
                        @RequestParam(name = "f", required = false) Long faceYn){



        return service.getList(categoryIds,query,faceYn);
    }



    // 위드 이름 중복 확인
    @GetMapping("check-name")
    boolean checkWithName(@RequestParam(name = "n", required = false) String withName){

        // 이름을 전달 받아서, 중복을 확인
            boolean checkName = service.getName(withName);

        return checkName;
    }

    // 위드 가입 신청하기
    @GetMapping("join")
    public int join(
        // @AuthenticationPrincipal CustomUserDetails userDetails,
        Long withId,
        Long userId
        ) {

        // Long userId = userDetails.getId();
        userId = 4L;
        System.out.println("withId: "+withId);
        int result = memberService.join(userId, withId);

        return result;
    }
    
}
