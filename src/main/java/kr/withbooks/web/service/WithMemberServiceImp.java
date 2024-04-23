package kr.withbooks.web.service;


import kr.withbooks.web.entity.WithMember;
import kr.withbooks.web.repository.WithMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WithMemberServiceImp implements WithMemberService{

    @Autowired
    private WithMemberRepository repository;

    @Override
    public List<WithMember> getListById(Long withId) {

        return repository.findByWithId(withId);
    }
}
