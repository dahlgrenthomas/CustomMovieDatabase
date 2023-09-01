package com.example.MovieDatabase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;


@SpringBootApplication
public class AccessingMovieDatabaseApplication{


  public static void main(String[] args) {
    SpringApplication.run(AccessingMovieDatabaseApplication.class, args);
  }




  // @Bean
	// public WebMvcConfigurer corsConfigurer() {
	// 	return new WebMvcConfigurer() {
	// 		@Override
	// 		public void addCorsMappings(CorsRegistry registry) {
	// 			registry.addMapping("/**").allowedOrigins("http://localhost:8080");
	// 		}
	// 	};
	// }

}
