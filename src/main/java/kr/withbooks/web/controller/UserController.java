package kr.withbooks.web.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    @Autowired
    private final UserService service;

    @GetMapping("/join")
    public String joinForm(){
        // User user = new User();
        // model.addAttribute("user", user);
        return "user/join";
    }

    @PostMapping("/join")
    public String joinUser(
            // @Validated
            // @ModelAttribute(name = "user") UserJoinForm form,
            // BindingResult bindingResult
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String nickname,
            @RequestParam int gender,
            @RequestParam(name="birth-date") String birthDate,
            @RequestParam String intro,
            RedirectAttributes redirect
            ) {

          if(intro == null || intro == "")
                intro = "안녕하세요 :)";

        // if (bindingResult.hasErrors()) {
        //     log.info("errors={}", bindingResult);
        //     return "user/join";
        // }

        //성공 로직
        // User user = new User();
        // user.setEmail(form.getEmail());
        // user.setPassword(form.getPassword());
        // user.setNickname(form.getNickname());
        // user.setGender(form.getGender());
        // user.setIntro(form.getIntro());

        // log.info("user={}", user);

        // service.join(user);
        redirect.addFlashAttribute("message", "가입성공~");

        return "redirect:/user/login";
    }



    @GetMapping("login")
    public  String login(HttpServletRequest request , HttpServletResponse response, @AuthenticationPrincipal CustomUserDetails userDetails){

        if(userDetails !=null)
            return "redirect:/shorts/list";


        return  "user/login";
    }

}
