package kr.withbooks.web.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

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
                 .authorizeHttpRequests((auth) -> auth

                         .requestMatchers("/", "/login","/join", "/shorts/list","/css/**","/image/**","/icon/**","js/**").permitAll()
                         .requestMatchers("/admin").hasRole("ADMIN")
                         .requestMatchers("/my/**").hasAnyRole("ADMIN", "USER")
                         .anyRequest().permitAll()
                 );


             // admin 페이지 이동 시로그인 페이지로 이동하는 설정

          http
                 .formLogin((auth) -> auth.loginPage("/login") //사용자 정의 로그인 ㅔ이지를 설정
                         .loginProcessingUrl("/loginProc") // 로그인 폼의 제출 url을 설정, 이 url을 통해 제출된 사용자 인증 정보를 처리\
                         .usernameParameter("email")
                         .defaultSuccessUrl("/shorts/list",true) //로그인 성공시 이동, 900 erorr 방지
                         .permitAll() // 로그인 페이지와 로그인 처리 url에 대한 인증되지 않은 사용자의 접근을 허용
                 );
//
         http
                 .csrf((auth) -> auth.disable());


        return http.build();
    }
}