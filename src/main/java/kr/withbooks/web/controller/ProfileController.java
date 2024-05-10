package kr.withbooks.web.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.User;
import kr.withbooks.web.entity.User.UserBuilder;
import kr.withbooks.web.service.UserService;

@Controller
@RequestMapping("profile")
public class ProfileController {
    
    @Autowired
    private UserService userService;

    @GetMapping("edit")
    public String editForm(
        @AuthenticationPrincipal CustomUserDetails userDetails,
        Model model){

        Long userId = userDetails.getId();
        User user =  userService.getById(userId);
        
        model.addAttribute("user", user);

        return "profile/edit";
    }

    @PostMapping("edit")
    public String edit(
        String nickname,
        String intro,
        LocalDateTime birthDate,
        int gender,
        String email,
        HttpServletRequest request,
        @RequestParam(name = "profile-img") MultipartFile profileImg,
        @AuthenticationPrincipal CustomUserDetails userDetails,
        Model model
    ){

        UserBuilder userBuilder = User.builder();

        System.out.println("profileImg : " + profileImg);
        // 프로필이미지가 왔으면 서버에 저장
        if(!profileImg.isEmpty())
        {
            // 서버에 이미지를 저장할 경로를 구하기
            String realPath = request
                                .getServletContext()
                                .getRealPath("/image/user");
            
            
            // 서버에 이미지를 저장
            String pathToSave = realPath + File.separator + profileImg.getOriginalFilename();
            File imgFile = new File(pathToSave);
        
            try {
                profileImg.transferTo(imgFile);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }

            // user에 경로 저장
            userBuilder.img("/image/user/" + profileImg.getOriginalFilename());


        }





        Long id = userDetails.getId();

        User user = userBuilder
                        .id(id)
                        .nickname(nickname)
                        .intro(intro)
                        .birthDate(birthDate)
                        .gender(gender)
                        .email(email)
                        .build();

        userService.modify(user);
        userDetails.setImg(user.getImg());

        return "redirect:/profile/edit";
    }
}
