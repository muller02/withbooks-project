package kr.withbooks.web.service;

import java.util.List;

import com.fasterxml.jackson.core.Base64Variant;
import kr.withbooks.web.repository.JoinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.User;
import kr.withbooks.web.repository.UserRepository;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepository repository;



    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder; //암호화

    @Override
    public User getById(Long userId) {
        User user = repository.findById(userId);
        return user;
    }

    @Override
    public void modify(User user) {
        repository.update(user);
    }

    @Override
    public String getNickNameById(Long userId) {


        return repository.findByNickName(userId);
    }

    @Override
    public int join(User user) {

        User encodeUser = user;
        String encodedPassword  = bCryptPasswordEncoder.encode(user.getPassword());
        encodeUser.setPassword(encodedPassword);
        encodeUser.setRole("ROLE_USER");

        return repository.save(encodeUser);
    }

    // /user/join 이메일 중복 체크
    @Override
    public Integer emailCheck(String email){
        return repository.countByEmail(email);
    }

    @Override
    public List<User> get(Long id, String nickname, String email, String birthyear, Integer gender, String startDate,
            String endDate, Integer status) {
        
        return repository.findByAll(id, nickname, email, birthyear, gender, startDate, endDate, status);
    }


}
