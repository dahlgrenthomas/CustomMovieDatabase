package com.example.MovieDatabase.Movie;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

@CrossOrigin(origins = "http://localhost:4200")
@RestController 
@RequestMapping(path="/movies") 
public class MovieController {
  @Autowired 
  private MovieRepository movieRepository;
 
  // @PostMapping(path="/add") // Map ONLY POST Requests
  // //@ResponseStatus(code = HttpStatus.OK, reason = "OK")
  // @ResponseStatus(value = HttpStatus.CREATED)
  // public @ResponseBody Movie addNewMovie (@RequestBody Movie movie) {

  //   // @RequestParam means it is a parameter from the GET or POST request
    
  //   return movieRepository.save(movie);
  // }

  @GetMapping(path="/all")
  public @ResponseBody Iterable<Movie> getAllMovies() {
    // This returns a JSON or XML with the movies
    return movieRepository.findAll();
  }

  @GetMapping(path="/featured")
  public @ResponseBody Iterable<Movie> getRandomMovies() {
    // This returns a JSON or XML with the movies
    return movieRepository.getRandomMovies();
  }
  @GetMapping(path="/moviesearch/{movie}")
  public @ResponseBody Iterable<Movie> getMoviesSearch(@PathVariable("movie") String movieName) {
    // This returns a JSON or XML with the movies
    return movieRepository.findByName(movieName);
  }

  @GetMapping(path="/{id}")
  public @ResponseBody Optional<Movie> getMovie(@PathVariable("id") int id) {
    // This returns a JSON or XML with the movie
    return movieRepository.findById(id);
  }

  // @DeleteMapping(value = "/{id}")
	// @ResponseStatus(value = HttpStatus.NO_CONTENT)
	// public void deleteUser(@PathVariable int id) {
	// 	movieRepository.deleteById(id);
	// }
}
