package kr.withbooks.web.service;

import kr.withbooks.web.entity.DebateBoard;
import kr.withbooks.web.entity.DebateBoardView;
import kr.withbooks.web.repository.DebateBoardRepository;
import kr.withbooks.web.repository.DebateBoardViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DebateBoardServiceImp implements DebateBoardService {

    @Autowired
    private DebateBoardViewRepository debateBoardViewRepository;

    @Autowired
    private DebateBoardRepository debateBoardRepository;

    @Override
    public List<DebateBoardView> getList(Long roomId, Long topicId) {

        List<DebateBoardView> list = debateBoardViewRepository.findAllById(roomId, topicId);

        return list;
    }

    @Override
    public DebateBoardView getById(Long id) {

        DebateBoardView DebateBoardView = debateBoardViewRepository.findById(id);

        return DebateBoardView;
    }

    @Override
    public Long save(DebateBoard debateBoard) {

        debateBoardRepository.save(debateBoard);
        return debateBoard.getId();
    }


}
