package kr.withbooks.web.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private UrlInterceptor urlInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(urlInterceptor).order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**", "/image/**", "/js/**", "/icon/**", "/*.ico", "/error");
    }


}
