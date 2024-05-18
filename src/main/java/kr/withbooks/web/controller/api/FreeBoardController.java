package kr.withbooks.web.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.withbooks.web.service.FreeBoardService;

@RestController("apiFreeBoardController")
@RequestMapping("api/free-boards")
public class FreeBoardController {

    @Autowired
    private FreeBoardService service;
    

    @DeleteMapping("/{id}")
    public Long del(@PathVariable Long id){
        return service.delete(id);
    }

}
