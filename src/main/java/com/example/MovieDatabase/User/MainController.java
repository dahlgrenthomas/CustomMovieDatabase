package com.example.MovieDatabase.User;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.MovieDatabase.Movie.Movie;
import com.example.MovieDatabase.Movie.MovieRepository;
import com.example.MovieDatabase.UserMovieList.UserMovieList;
import com.example.MovieDatabase.UserMovieList.UserMovieListRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

//@CrossOrigin(origins = "*", allowedHeaders = "*")
@CrossOrigin(origins = "http://localhost:4200")
@RestController // This means that this class is a Controller
@RequestMapping(path="/api/user") // This means URL's start with /demo (after Application path)
public class MainController {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private MovieRepository movieRepository;

  @Autowired
  private UserMovieListRepository movieUserMovieListRepository;
 

  @GetMapping(path="/movieadd/{id}")
  public @ResponseBody void getMoviesSearch(@PathVariable("id") Integer movieId, @CurrentSecurityContext(expression = "authentication?.name") String userId) {
    UserMovieList userMovie = new UserMovieList();
    userMovie.setUserId(userId);
    userMovie.setMovieId(movieId);

    movieUserMovieListRepository.save(userMovie);
  }


  @DeleteMapping(value = "/removefromlist/{id}")
  //@GetMapping(path="/removefromlist/{id}")
  public @ResponseBody void removeFromList(@PathVariable("id") Integer movieId, @CurrentSecurityContext(expression = "authentication?.name") String userId) {

    movieUserMovieListRepository.removeByUserIdAndMovieId(userId, movieId);
  }

  @GetMapping(path = "/userlist")
  public @ResponseBody Iterable<Movie> getAllMovies(@CurrentSecurityContext(expression = "authentication?.name") String userId) {
    List<UserMovieList> list = movieUserMovieListRepository.findByUserId(userId);
    
    List<Integer> ids = list.stream().map(UserMovieList::getMovieId).collect(Collectors.toList());

    
    return movieRepository.findAllById(ids);
  }

    // @GetMapping(path="/all")
  // public @ResponseBody String getAllUsers(@CurrentSecurityContext(expression = "authentication?.name") String username) {
  //   // This returns a JSON or XML with the users
  //   return username;
  // }

  // @DeleteMapping(value = "/{id}")
	// @ResponseStatus(value = HttpStatus.NO_CONTENT)
	// public void deleteUser(@PathVariable int id) {
	// 	userRepository.deleteById(id);
	// }

    // @PostMapping(path="/add") // Map ONLY POST Requests
  // //@ResponseStatus(code = HttpStatus.OK, reason = "OK")
  // @ResponseStatus(value = HttpStatus.CREATED)
  // public @ResponseBody User addNewUser (@RequestBody User user) {

  //   // @RequestParam means it is a parameter from the GET or POST request
    
  
  //   return userRepository.save(user);
  // }

}
