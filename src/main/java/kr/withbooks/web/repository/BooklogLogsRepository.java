package kr.withbooks.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.withbooks.web.entity.BooklogLogs;

@Mapper
public interface BooklogLogsRepository {
    
    List<BooklogLogs> findAll(Long id);
    int save(BooklogLogs booklogs);
    int delete(Long id);

}
