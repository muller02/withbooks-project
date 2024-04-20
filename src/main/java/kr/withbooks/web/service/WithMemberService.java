package kr.withbooks.web.service;

import kr.withbooks.web.entity.WithMember;

import java.util.List;

public interface WithMemberService {

    List<WithMember> getListById(Long withId);
}
