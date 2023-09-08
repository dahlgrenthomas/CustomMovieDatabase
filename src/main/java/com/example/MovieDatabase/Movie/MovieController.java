package com.example.MovieDatabase.Movie;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RestController 
@RequestMapping(path="/api/movies") 
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
  @GetMapping(path="/moviesearch")
  public @ResponseBody Iterable<Movie> getMoviesSearch(@RequestParam Map<String, String> params) {
    Integer year = null;
    if(params.get("year").length() > 0){
      year = Integer.parseInt(params.get("year"));

    }

    return movieRepository.movieFind(params.get("movie"), year, params.get("genre"));
  }

    @GetMapping(path="/searching/{title}/{year}/{genre}")
  public @ResponseBody Iterable<Movie> movieSearchTest(@PathVariable("title") String title, @PathVariable("year") int year, @PathVariable("genre") String genre) {

    return movieRepository.movieFind(title, year, genre);
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
