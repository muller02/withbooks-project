package kr.withbooks.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.service.UserService;

@RestController("apiUserController")
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService service;

    // /user/join 이메일 중복 체크
    @GetMapping("emailCheck")
    public Integer duplicateCheck(@RequestParam String email){
        Integer result = service.emailCheck(email);
        return result;
    }

    @GetMapping("nicknameCheck")
    public Integer duplicateCheckName(@RequestParam String nickname){
        System.out.println("????");
        Integer result = service.nicknameCheck(nickname);
        return result;
    }
    
}
