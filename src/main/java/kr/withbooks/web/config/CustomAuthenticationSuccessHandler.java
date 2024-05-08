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
        int sessionMaxInactiveInterval = request.getSession().getMaxInactiveInterval();



        Cookie cookie = new Cookie("lck","1" +
                "");
        cookie.setMaxAge(sessionMaxInactiveInterval);
        cookie.setPath("/");
        response.addCookie(cookie);

        System.out.println("커피 = " +  cookie.getMaxAge());


        response.sendRedirect("/shorts/list");  // 로그인 성공후 갈 페이지

    }
}
