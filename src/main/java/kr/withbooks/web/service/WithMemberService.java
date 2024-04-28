package kr.withbooks.web.service;

import kr.withbooks.web.entity.WithMember;
import kr.withbooks.web.entity.WithMemberView;

import java.util.List;

public interface WithMemberService {

    List<WithMemberView> getViewById(Long withId);
}
