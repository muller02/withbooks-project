package kr.withbooks.web.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.entity.Category;
import kr.withbooks.web.repository.AladinAPIRepository;
import kr.withbooks.web.util.AladinJsonParser;

@Service
public class AladinAPIServiceImp implements AladinAPIService {
    
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AladinAPIRepository repository;

    @Autowired
    private AladinJsonParser jsonparser;

    @Override
    public Integer getList(List<Book> list, Integer sort, String queryType, String query, String itemId, Integer page) {
        // TODO Auto-generated method stub
        String apiUrl = repository.urlMaker(sort, queryType, query,itemId,page);
        System.out.println("apiUrl = "+apiUrl);
        String jsonResponse = repository.jsonResponse(apiUrl);
        Integer totalResults = jsonparser.parser(list, jsonResponse);

        return totalResults;
    }
    @Override
    public Book getByISBN13(String isbn13) {
        Map<String, String> map = new HashMap<>();
        map.put("sort", "3");
        map.put("ItemId", isbn13);
        map.put("ItemIdType", "ISBN13");

        List<Category> cList = categoryService.getList(); 
        // String apiUrl = repository.urlMaker(map);
        // Map<String, Object> resultMap = repository.list(apiUrl, cList);

        Book book = new Book();
        // if(resultMap != null)
        //    book  = map.get("list");
        return null;

    }
}
