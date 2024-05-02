package kr.withbooks.web.controller.with;


import kr.withbooks.web.entity.FreeBoard;
import kr.withbooks.web.entity.FreeBoardView;
import kr.withbooks.web.service.FreeBoardService;
import org.springframework.boot.Banner;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/with/freeboard")
public class FreeBoardControoler {

    private FreeBoardService service;


    @GetMapping("/list")
    public  String list(Model model){

        return  "/with/freeboard/list";
    }

    @GetMapping("/detail")
    public String detail(@RequestParam Long boardId){

        System.out.println("토토토 = ");

        return "/with/freeboard/detail";


    }
}
