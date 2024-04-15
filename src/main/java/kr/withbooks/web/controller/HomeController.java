// package kr.withbooks.web.controller;

// import java.util.Collection;
// import java.util.Iterator;

// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.GetMapping;

// import kr.withbooks.web.controller.dto.CustomUserDetails;
// import kr.withbooks.web.entity.User;


// @Controller
// public class HomeController {
    
//     @GetMapping("/")
//     public String home(Model model){
//         //사용자 이름 -> 이메일 
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String email = authentication.getName();        // 컨텍스트에서 이메일 가지고오기 

//         //userdetails에 getNickname을 오버라이딩 해서 꺼내옴  굿 !!! 
//         UserDetails user = (UserDetails)authentication.getPrincipal();
//         CustomUserDetails customUserDetails =    (CustomUserDetails)user;
        
//         String nickname = customUserDetails.getNickName();

//         // 권한들 
//         Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//         Iterator<? extends GrantedAuthority> iter = authorities.iterator();
//         GrantedAuthority auth = iter.next();
//         String role = auth.getAuthority();

//         model.addAttribute("email", email);
//         model.addAttribute("role", role);
//         model.addAttribute("nickname", nickname);

        
//         return "home";
//     }
    
// }
