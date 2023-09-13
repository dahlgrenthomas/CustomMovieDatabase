package com.example.MovieDatabase.User;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
public class UserController {

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
  public @ResponseBody void removeFromList(@PathVariable("id") Integer movieId, @CurrentSecurityContext(expression = "authentication?.name") String userId) {

    movieUserMovieListRepository.removeByUserIdAndMovieId(userId, movieId);
  }

  @GetMapping(path = "/userlist")
  public @ResponseBody Iterable<Movie> getAllMovies(@CurrentSecurityContext(expression = "authentication?.name") String userId) {
    List<UserMovieList> list = movieUserMovieListRepository.findByUserId(userId);
    
    List<Integer> ids = list.stream().map(UserMovieList::getMovieId).collect(Collectors.toList());

    return movieRepository.findAllById(ids);
  }

  @GetMapping(path = "/loggedstatus")
  public @ResponseBody Boolean getLogStatus(@CurrentSecurityContext(expression = "authentication?.name") String userId) {
    if(userId != "anonymousUser"){
      return true;
    }

    return false;
  }

  @GetMapping(path = "/usermovies")
  public @ResponseBody List<Integer> getUserList(@CurrentSecurityContext(expression = "authentication?.name") String userId) {
    List<UserMovieList> list = movieUserMovieListRepository.findByUserId(userId);
    
    List<Integer> ids = list.stream().map(UserMovieList::getMovieId).collect(Collectors.toList());

    return ids;
  }

}
