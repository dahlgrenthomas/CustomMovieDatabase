package com.example.MovieDatabase;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SpringSecurity {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((requests) -> requests
                                .requestMatchers("/").permitAll()
                                .requestMatchers("**.js").permitAll()
                                .requestMatchers("**.css").permitAll()
                                .requestMatchers("**.ico").permitAll()
                                .requestMatchers("/index.html").permitAll()
                                .requestMatchers("/urlNotFound").permitAll()
                                .requestMatchers("/api/movies/**").permitAll()
                                .requestMatchers("/movies/**").permitAll()
                                .requestMatchers("/search/**").permitAll()
                                .requestMatchers("/api/user/loggedstatus").permitAll()
                                //.requestMatchers("/demo/").permitAll()
                                .requestMatchers("/demo").hasAnyRole("USER", "ADMIN")
                                .requestMatchers("/api/user").hasAnyRole("USER", "ADMIN")
 
                                //.requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                                //.requestMatchers("/admin/**").hasAnyRole("ADMIN")
                                .anyRequest().authenticated()
                )
                .oauth2Login(withDefaults())
                .logout((logout) -> logout.permitAll())
                .exceptionHandling(handling -> handling.accessDeniedPage("/access-denied"));
        return http.build();
    }
}
