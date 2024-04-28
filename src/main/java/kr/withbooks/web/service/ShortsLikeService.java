package kr.withbooks.web.service;


import kr.withbooks.web.entity.ShortsLike;

public interface ShortsLikeService {

    ShortsLike add(ShortsLike shortsLike);

    boolean getLiked(ShortsLike shortsLike);

    int cancle(ShortsLike shortsLike);

    int getCount(Long shortsId);
}
