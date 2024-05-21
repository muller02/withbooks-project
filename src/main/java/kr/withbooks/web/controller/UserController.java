package kr.withbooks.web.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
@RequestMapping("user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    @Autowired
    private final UserService service;

    @GetMapping("join")
    public String joinForm(){
        // User user = new User();
        // model.addAttribute("user", user);
        return "user/join";
    }

    // 회원가입 POST요청
    @PostMapping("join")
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


        // if (bindingResult.hasErrors()) {
        //     log.info("errors={}", bindingResult);
        //     return "user/join";
        // }
        // log.info("user={}", user);

        // service.join(user);


        // String -> LocalDateTime
        DateTimeFormatter format = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate date = LocalDate.parse(birthDate, format);
        LocalDateTime birth = date.atStartOfDay();

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setNickname(nickname);
        user.setGender(gender);
        user.setBirthDate(birth);
        user.setIntro(intro);
        int result = service.join(user);

        if(result > 0)
            redirect.addFlashAttribute("message", "회원가입이 성공적으로 완료되었습니다.");
        else
            redirect.addFlashAttribute("message", "회원가입에 실패했습니다. 다시 시도해주세요!");

        return "redirect:/user/login";
    }



    @GetMapping("login")
    public  String login(HttpServletRequest request , HttpServletResponse response, @AuthenticationPrincipal CustomUserDetails userDetails){

        if(userDetails !=null)
            return "redirect:/shorts/list";


        return  "user/login";
    }

}
