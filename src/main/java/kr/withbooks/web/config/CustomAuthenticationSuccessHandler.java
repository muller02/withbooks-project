package kr.withbooks.web.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationSuccessHandler  implements AuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 인증에 성공한 경우 쿠키 추가
        System.out.println("로그아웃 헨들러 ");
        Cookie cookie = new Cookie("lck", "1"); // 로그인 성공 했다는 인증 쿠키 , 이것을 통해 북쇼츠 또는 다른 댓글을 쓸 떄, 로그인 된 사용자가
                                                // 작성 가능하도록 하기
        cookie.setMaxAge(24 * 60 * 60); //  쿠키 유효기간 설정
        cookie.setPath("/");  // 쿠키 저장 경로 설정 모든 경로
        response.addCookie(cookie);
        request.getSession().setAttribute("errorMessage", null);



        response.sendRedirect("/shorts/list");  // 로그인 성공후 갈 페이지

    }
}
