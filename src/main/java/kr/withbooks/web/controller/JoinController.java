package kr.withbooks.web.controller;

import kr.withbooks.web.controller.form.UserJoinForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import kr.withbooks.web.entity.User;
import kr.withbooks.web.service.JoinService;
import kr.withbooks.web.service.JoinServiceImp;

@Slf4j
@Controller
@RequiredArgsConstructor
public class JoinController {

    private final JoinService service;
 
    @GetMapping("join")
    public String joinForm(Model model){
        User user = new User();
        model.addAttribute("user", user);
        return "join/join2";
    }

    @PostMapping("/join")
    public String joinUser(
            @Validated
            @ModelAttribute(name = "user") UserJoinForm form,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            log.info("errors={}", bindingResult);
            return "join/join2";
        }

        //성공 로직
        User user = new User();
        user.setEmail(form.getEmail());
        user.setPassword(form.getPassword());
        user.setNickname(form.getNickname());
        user.setGender(form.getGender());
        user.setIntro(form.getIntro());

        log.info("user={}", user);

        service.join(user);

        return "redirect:/login";
    }

}
