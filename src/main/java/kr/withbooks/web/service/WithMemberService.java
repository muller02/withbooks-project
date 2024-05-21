package kr.withbooks.web.service;

import java.util.List;

import kr.withbooks.web.entity.WithMember;
import kr.withbooks.web.entity.WithMemberView;

public interface WithMemberService {

    List<WithMemberView> getViewById(Long withId);

    Integer join(Long userId, Long withId, Long masterYn);

    Integer getJoinYn(Long withId, Long userId);

    Integer withdraw(Long withId, Long userId);

    List<WithMember> getWithMembers(Long withId);
}
