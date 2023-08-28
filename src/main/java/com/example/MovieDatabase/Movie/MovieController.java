package com.example.MovieDatabase.Movie;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

//@CrossOrigin(origins = "*", allowedHeaders = "*")
@CrossOrigin(origins = "http://localhost:4200")
@Controller // This means that this class is a Controller
@RequestMapping(path="/movies") // This means URL's start with /demo (after Application path)
public class MovieController {
  @Autowired // This means to get the bean called userRepository
         // Which is auto-generated by Spring, we will use it to handle the data
  private MovieRepository movieRepository;
 

  @PostMapping(path="/add") // Map ONLY POST Requests
  //@ResponseStatus(code = HttpStatus.OK, reason = "OK")
  @ResponseStatus(value = HttpStatus.CREATED)
  public @ResponseBody Movie addNewMovie (@RequestBody Movie movie) {

    // @RequestParam means it is a parameter from the GET or POST request
    
  
    return movieRepository.save(movie);
  }

  @GetMapping(path="/all")
  public @ResponseBody Iterable<Movie> getAllMovies() {
    // This returns a JSON or XML with the users
    return movieRepository.findAll();
  }

  // @DeleteMapping(value = "/{id}")
	// @ResponseStatus(value = HttpStatus.NO_CONTENT)
	// public void deleteUser(@PathVariable int id) {
	// 	movieRepository.deleteById(id);
	// }
}
