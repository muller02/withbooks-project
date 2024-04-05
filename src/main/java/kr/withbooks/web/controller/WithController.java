package kr.withbooks.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("with")
public class WithController {



    @GetMapping("list")
    public  String list(){



        return "/with/list";
    }

    @GetMapping("reg")
    public String reg(){
        System.out.println("테스트");
        System.out.println("테스트");
        System.out.println("테스트");
        System.out.println("123ㄴ테스트");
        System.out.println("123ㄴ테스트");
        System.out.println("재홍 테스트 2");
        return "/with/reg";
    }
}
