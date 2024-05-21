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

    @Autowired
    private WithMemberRepository withMemberRepository;


    @Override
    public List<WithMemberView> getViewById(Long withId) {

        return withMemberViewrepository.findByWithId(withId);
    }



    @Override
    public Integer join(Long userId, Long withId, Long masterYn) {
        return withMemberRepository.add(userId, withId,masterYn);
    }

    @Override
    public Integer getJoinYn(Long withId, Long userId) {
        return withMemberRepository.findJoinYn(withId, userId);
    }



    @Override
    public Integer withdraw(Long withId, Long userId) {
        return withMemberRepository.delete(withId, userId);
    }

    @Override
    public List<WithMember> getWithMembers(Long withId) {
        return withMemberRepository.findAll(withId);
    }
}
