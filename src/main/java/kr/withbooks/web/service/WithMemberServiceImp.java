package kr.withbooks.web.service;


import kr.withbooks.web.entity.WithMember;
import kr.withbooks.web.entity.WithMemberView;
import kr.withbooks.web.repository.WithMemberRepository;
import kr.withbooks.web.repository.WithMemberViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WithMemberServiceImp implements WithMemberService{

    @Autowired
    private WithMemberViewRepository withMemberViewrepository;


    @Override
    public List<WithMemberView> getViewById(Long withId) {

        return withMemberViewrepository.findByWithId(withId);
    }
}
