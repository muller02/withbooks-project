package kr.withbooks.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import kr.withbooks.web.config.CustomUserDetails;
import kr.withbooks.web.entity.User;
import kr.withbooks.web.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {


        System.out.println("사과 = " + email);
        User user = userRepository.findByEmail(email);
        System.out.println("user = " + user);
        CustomUserDetails userDetails = new CustomUserDetails();

        userDetails.setNickName(user.getNickname());
        userDetails.setId(user.getId());
        userDetails.setPassword(user.getPassword());
        userDetails.setEmail(user.getEmail());
        userDetails.setGender(user.getGender());
        userDetails.setIntro(user.getIntro());
        userDetails.setImg(user.getImg());
        userDetails.setJoinDate(user.getJoinDate());
        userDetails.setBrithDate(user.getBirthDate());

        userDetails.setBrithDate(user.getBirthDate());


//        if (user != null) {
//
//            return new CustomUserDetails(user);
//        }

        return userDetails;
    }
}