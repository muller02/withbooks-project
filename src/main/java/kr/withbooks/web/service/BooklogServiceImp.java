package kr.withbooks.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.Booklog;
import kr.withbooks.web.entity.BooklogLogs;
import kr.withbooks.web.entity.BooklogView;
import kr.withbooks.web.repository.BooklogLogsRepository;
import kr.withbooks.web.repository.BooklogRepository;

@Service
public class BooklogServiceImp implements BooklogService{

    @Autowired
    private BooklogRepository repository;

    @Autowired
    private BooklogLogsRepository logsRepository;

    @Override
    public List<BooklogView> getList(Long id) {
        return repository.findAll(id);
    }

    @Override
    public BooklogView getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public void reg(Booklog booklog) {
        repository.save(booklog);
    }

    @Override
    public void delete(Long booklogId) {
        repository.deleteBooklog(booklogId);
    }

    @Override
    public void update(Booklog bookLog) {
    }

    @Override
    public void deleteAllByIds(List<Integer> ids, Long userId) {
        repository.deleteAllByIds(ids, userId);
    }

    @Override
    public int addLogs(BooklogLogs logs) {
        return logsRepository.save(logs);
    }

    @Override
    public List<BooklogLogs> getLogs(Long id) {
        return logsRepository.findAll(id);
    }

    @Override
    public int changePublic(Long booklogId, Long publicYn) {
        return repository.updatePublic(booklogId, publicYn);
    }

    @Override
    public int deleteLog(Long logId) {
        return logsRepository.delete(logId);
    }

    @Override
    public BooklogLogs getLog(Long id) {
        return logsRepository.findById(id);
    }
    
}
