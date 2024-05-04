package kr.withbooks.web.config;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.ApplicationListener;
import org.springframework.security.core.session.SessionDestroyedEvent;

public class SessionDestroyedListener implements ApplicationListener<SessionDestroyedEvent> {


    @Override
    public void onApplicationEvent(SessionDestroyedEvent event) {
        // 세션 종료 시 실행되는 코드
        HttpServletResponse response = (HttpServletResponse) event.getSecurityContexts().get(0).getAuthentication().getDetails();
        // "lck"라는 이름의 쿠키 생성 후 유효 시간을 0으로 설정하여 삭제
        Cookie cookie = new Cookie("lck", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }
}
