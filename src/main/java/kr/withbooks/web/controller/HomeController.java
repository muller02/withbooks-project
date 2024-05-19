 package kr.withbooks.web.controller;

 import java.util.Collection;
 import java.util.Iterator;
 import java.util.List;

 import kr.withbooks.web.entity.BookshortsView;
 import kr.withbooks.web.service.BookshortsServiceImp;
 import kr.withbooks.web.service.BookshrotsService;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.security.core.Authentication;
 import org.springframework.security.core.GrantedAuthority;
 import org.springframework.security.core.annotation.AuthenticationPrincipal;
 import org.springframework.security.core.context.SecurityContextHolder;
 import org.springframework.security.core.userdetails.UserDetails;
 import org.springframework.stereotype.Controller;
 import org.springframework.ui.Model;

 import kr.withbooks.web.config.CustomUserDetails;
 import kr.withbooks.web.entity.User;
 import org.springframework.web.bind.annotation.GetMapping;


 @Controller
 public class HomeController {



     @Autowired
     private BookshrotsService bookshrotsService;

     @GetMapping("/")
     public String home(Model model){

         // 북쇼츠 랜덤 10개 추출
       List<BookshortsView> bookshortsList =  bookshrotsService.getRandView();

        model.addAttribute("bookshortsList",bookshortsList);
         System.out.println("햄버거" + bookshortsList);
         return "home";
     }
    
 }
