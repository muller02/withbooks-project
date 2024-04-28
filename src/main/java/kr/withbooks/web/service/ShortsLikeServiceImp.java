package kr.withbooks.web.service;

import kr.withbooks.web.entity.ShortsLike;
import kr.withbooks.web.repository.ShortsLikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShortsLikeServiceImp implements ShortsLikeService {

    @Autowired
   private ShortsLikeRepository repository;

    @Override
    public ShortsLike add(ShortsLike shortsLike) {

        int it =  repository.save(shortsLike);

        System.out.println(it);


        return shortsLike;
    }

    @Override
    public boolean getLiked(ShortsLike shortsLike) {

        ShortsLike shortsLike1 =  repository.findByLiked(shortsLike);
            if(shortsLike1 ==null)
                return false;

            //좋아요 이미 했으면 true 반환
        return  true;
    }

    @Override
    public int cancle(ShortsLike shortsLike) {


        return  repository.delete(shortsLike);
    }

    @Override
    public int getCount(Long shortsId) {

        int count =  repository.findByShortsId(shortsId);
        return count;
    }
}
