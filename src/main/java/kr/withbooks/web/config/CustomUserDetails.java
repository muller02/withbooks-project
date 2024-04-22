package kr.withbooks.web.config;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import kr.withbooks.web.entity.User;

@Setter
public class CustomUserDetails implements UserDetails {


    @Getter
    private LocalDateTime joinDate;
    @Getter
    private Long id;
    @Getter
    private String email;
    @Getter
    private String password;
    @Getter
    private List<GrantedAuthority> authorities;
    @Getter
    private int gender;
    @Getter
    private LocalDateTime brithDate;
    @Getter
    private String intro;
    @Getter
    private String img;

    @Getter
    private  String nickName;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
