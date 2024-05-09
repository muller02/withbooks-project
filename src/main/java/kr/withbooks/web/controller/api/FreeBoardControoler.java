package kr.withbooks.web.controller.api;


import kr.withbooks.web.entity.FreeBoardView;
import kr.withbooks.web.service.FreeBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


// @RequestMapping("/api/with/free")
// @RestController("freeBoardControllerapi")
// public class FreeBoardControoler {


//     @Autowired
//     private FreeBoardService service;


    
//     @GetMapping
//     public List<FreeBoardView> list(@RequestParam(name = "id") Long withId){

//        List<FreeBoardView> list =  service.getViewById(withId);

//         return  list;
//     }


// }
