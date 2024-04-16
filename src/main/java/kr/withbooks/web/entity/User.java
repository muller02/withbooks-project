package kr.withbooks.web.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String intro;
    private String email;
    private String password;
    private int gender;
    private String nickname;
    private Date brithDate;
    private Date joinDate;
    private int withdrawStatus;
    private int notiYn;
    private String role;
 

    
}
