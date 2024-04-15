package kr.withbooks.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import kr.withbooks.web.entity.User;
import kr.withbooks.web.repository.JoinRepository;

@Service
public class JoinServiceImp implements JoinService {

    @Autowired
    private JoinRepository repository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder; //암호화 

    @Override
    public void join(User user) {
        
        User encodeUser = user;
        String encodedPassword  = bCryptPasswordEncoder.encode(user.getPassword());
        encodeUser.setPassword(encodedPassword);
        encodeUser.setRole("ROLE_USER");

        System.out.println("복숭아 = " + encodeUser);

        repository.save(encodeUser);
    }

    
    
    
}
