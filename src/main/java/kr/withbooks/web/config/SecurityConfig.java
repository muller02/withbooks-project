package kr.withbooks.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

         http
                .csrf(csrf->csrf.disable())
                .authorizeHttpRequests((requests) -> requests
                    .requestMatchers("/user/**", "/shorts/list", "/css/**","/image/**","/icon/**","js/**")
                    .permitAll()
                    .requestMatchers("/bookmark/**", "/booklog/**", "/my/**","/calendar/**", "/free-board/**", "/debate/**")
                    .hasAnyRole("USER", "ADMIN")
                    .requestMatchers("/admin/**")
                    .hasRole("ADMIN")
                    .anyRequest()
                    .permitAll()
                )

             // admin 페이지 이동 시로그인 페이지로 이동하는 설정

                .formLogin((auth) -> 
                    auth.loginPage("/user/login") //사용자 정의 로그인 ㅔ이지를 설정
                    .loginProcessingUrl("/loginProc") // 로그인 폼의 제출 url을 설정, 이 url을 통해 제출된 사용자 인증 정보를 처리\
                    .usernameParameter("email")
                //  .defaultSuccessUrl("/shorts/list",true) //로그인 성공시 이동, 900 erorr 방지
                    .successHandler(new CustomAuthenticationSuccessHandler())
                    .failureHandler(new CustomAuthenticationFailureHandler())
                    .permitAll() // 로그인 페이지와 로그인 처리 url에 대한 인증되지 않은 사용자의 접근을 허용
                 )

                .logout((logout) -> logout
                    .logoutUrl("/user/logout")
                    .logoutSuccessUrl("/")
                    .addLogoutHandler(new CustomLogoutHandler())
                    .invalidateHttpSession(true) // 로그아웃 후 세션 초기화 설정
                    .deleteCookies("JSESSIONID") // 로그아웃 후 쿠기 삭제 설정
                    .deleteCookies("lck")
                    .permitAll()
                );

        return http.build();
    }

    @Bean
    public LogoutHandler logoutSuccessHandler() {
        return new CustomLogoutHandler(); // 로그아웃 핸들러 등록
    }
}