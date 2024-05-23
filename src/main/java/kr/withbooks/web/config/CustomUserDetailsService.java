package kr.withbooks.web.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.User;
import kr.withbooks.web.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email);
        CustomUserDetails userDetails = new CustomUserDetails();

        List<GrantedAuthority> authorities = new ArrayList<>();
        
        authorities.add(new SimpleGrantedAuthority(user.getRole()));

        userDetails.setNickName(user.getNickname());
        userDetails.setId(user.getId());
        userDetails.setPassword(user.getPassword());
        userDetails.setEmail(user.getEmail());
        userDetails.setAuthorities(authorities);
        userDetails.setGender(user.getGender());
        userDetails.setIntro(user.getIntro());
        userDetails.setImg(user.getImg());
        userDetails.setJoinDate(user.getJoinDate());
        userDetails.setBrithDate(user.getBirthDate());

        return userDetails;
    }
}