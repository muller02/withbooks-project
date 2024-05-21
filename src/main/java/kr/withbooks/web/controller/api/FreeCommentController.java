package kr.withbooks.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.service.FreeCommentService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController("apiFreeCommentController")
@RequestMapping("/api/free-comments")
public class FreeCommentController {

    @Autowired
    private FreeCommentService service;

    @DeleteMapping("/{id}")
    public int del(@PathVariable Long id){
        return service.delete(id);
    }

    @PutMapping("/{id}")
    public String put(@PathVariable Long id, @RequestBody String content) {
        
        content = content.replace("\\n", "\r\n");
        
        service.edit(id, content);

        
        
        return "entity";
    }
    
}
