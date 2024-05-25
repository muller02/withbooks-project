package kr.withbooks.web.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.BookshortsView;
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
    public Integer nicknameCheck(String nickname) {
        return repository.countByNickname(nickname);
    }
    
    // ================================ admin/user ===================================
    @Override
    public List<User> get(Map<String, String> params) {
        
        int size = 6;
        int page = Integer.parseInt(params.get("p"));
        int offset = (page-1)*size;
        
        return repository.findByAll(params, size,offset);
    }
    
    @Override
    public Integer getCount(Map<String, String> params) {
                
        return repository.count(params);
    }
    
    @Override
    public Integer updateWithdrawStatus(Integer status, List<Integer> ids) {
        
        return repository.updateWithdrawStatus(status, ids);
        
    }
    // =================================================================================
    
}
