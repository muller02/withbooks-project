package kr.withbooks.web.entity;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    private Long id;
    private String intro;
    private String email;
    private String password;
    private Integer gender;
    private String nickname;
    private LocalDateTime birthDate;
    private LocalDateTime joinDate;
    private Integer withdrawStatus;
    private Integer notiYn;
    private String role;
    private String img;

}
