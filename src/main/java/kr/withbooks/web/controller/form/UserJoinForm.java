package kr.withbooks.web.controller.form;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserJoinForm {

    @NotEmpty(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요")
    private String email;

    @NotEmpty(message = "비밀번호는 필수 입력 값입니다.")
    @Length(min = 3 ,max = 16, message = "비밀번호는 3자 이상, 16자 이하로 입력해주세요")
    private String password;

    @NotEmpty(message = "한글,영문,숫자 가능 (20자내로 작성해주세요)")
    private String nickname;

    @NotNull
    private int gender;
    private String intro;

}
