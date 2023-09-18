package com.example.MovieDatabase.Movie;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class MovieControllerIntTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MovieRepository movieRepository;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Test the get allMovieFUnction
     * @throws Exception
     */
    @Test
    void testGetAllMovies() throws Exception {
        List<Movie> listOfMovies = new ArrayList<>();
        Movie movie = new Movie();
        movie.setId(1);
        movie.setTitle("movie");
        movie.setPoster("poster.link");
        movie.setOverview("Fun movie");
        movie.setGenre("null");
        movie.setYear(1999);

        Movie movie2 = new Movie();
        movie2.setId(2);
        movie2.setTitle("movie2");
        movie2.setPoster("poster.link2");
        movie2.setOverview("Fun movie2");
        movie.setGenre("null");
        movie.setYear(1999);

        listOfMovies.add(movie);
        listOfMovies.add(movie2);

        Mockito.when(movieRepository.findAll()).thenReturn(listOfMovies);

        ResultActions response = mockMvc.perform(get("/api/movies/all"));

        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()",
                        is(listOfMovies.size())));

    }

    /**
     * Makes sure get movie calls the movie repo for a single ID
     * @throws Exception
     */
    @Test
    void testGetMovie() throws Exception {
        Movie movie = new Movie();
        movie.setId(1);
        movie.setTitle("movie");
        movie.setPoster("poster.link");
        movie.setOverview("Fun movie");

        Mockito.when(movieRepository.findById(movie.getId())).thenReturn(Optional.of(movie));

        ResultActions response = mockMvc.perform(get("/api/movies/{id}", movie.getId()));

        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.title", is(movie.getTitle())))
                .andExpect(jsonPath("$.poster", is(movie.getPoster())))
                .andExpect(jsonPath("$.overview", is(movie.getOverview())));

    }

    @Test
    void testGetRandomMovies() throws Exception {
        List<Movie> listOfMovies = new ArrayList<>();
        Movie movie = new Movie();
        movie.setId(1);
        movie.setTitle("movie");
        movie.setPoster("poster.link");
        movie.setOverview("Fun movie");
        movie.setGenre("null");
        movie.setYear(1999);

        Movie movie2 = new Movie();
        movie2.setId(2);
        movie2.setTitle("movie2");
        movie2.setPoster("poster.link2");
        movie2.setOverview("Fun movie2");
        movie.setGenre("null");
        movie.setYear(1999);

        listOfMovies.add(movie);
        listOfMovies.add(movie2);

        Mockito.when(movieRepository.getRandomMovies()).thenReturn(listOfMovies);

        ResultActions response = mockMvc.perform(get("/api/movies/featured"));

        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()",
                        is(listOfMovies.size())));

    }

    /**
     * Test the movie search function with all parameters in the URL
     * @throws Exception
     */
    @Test
    void getMoviesSearch() throws Exception{
        List<Movie> listOfMovies = new ArrayList<>();
        Movie movie = new Movie();
        movie.setId(1);
        movie.setTitle("movie");
        movie.setPoster("poster.link");
        movie.setOverview("Fun movie");
        movie.setGenre("action");
        movie.setYear(2000);

        Movie movie2 = new Movie();
        movie2.setId(2);
        movie2.setTitle("movie2");
        movie2.setPoster("poster.link2");
        movie2.setOverview("Fun movie2");
        movie.setGenre("drama");
        movie.setYear(2001);

        Movie movie3 = new Movie();
        movie3.setId(2);
        movie3.setTitle("title3");
        movie3.setPoster("poster.link3");
        movie3.setOverview("Fun movie3");
        movie.setGenre("drama");
        movie.setYear(2001);

        listOfMovies.add(movie);
        listOfMovies.add(movie2);
        listOfMovies.add(movie3);

        Mockito.when(movieRepository.movieFind("title", 2001, "drama")).thenReturn(listOfMovies.subList(1,3));

        ResultActions response = mockMvc.perform(get("/api/movies/moviesearch?movie=title&genre=drama&year=2001"));

        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()",
                        is(2)));

    }
    /**
     * Tests the movie search function with no year input
     * @throws Exception
     */
    @Test
    void getMoviesSearchNullYear() throws Exception{
        List<Movie> listOfMovies = new ArrayList<>();
        Movie movie = new Movie();
        movie.setId(1);
        movie.setTitle("movie");
        movie.setPoster("poster.link");
        movie.setOverview("Fun movie");
        movie.setGenre("action");
        movie.setYear(2000);

        Movie movie2 = new Movie();
        movie2.setId(2);
        movie2.setTitle("movie2");
        movie2.setPoster("poster.link2");
        movie2.setOverview("Fun movie2");
        movie.setGenre("drama");
        movie.setYear(2001);

        Movie movie3 = new Movie();
        movie3.setId(2);
        movie3.setTitle("title3");
        movie3.setPoster("poster.link3");
        movie3.setOverview("Fun movie3");
        movie.setGenre("drama");
        movie.setYear(2002);

        listOfMovies.add(movie);
        listOfMovies.add(movie2);
        listOfMovies.add(movie3);

        Mockito.when(movieRepository.movieFind("title", null, "drama")).thenReturn(listOfMovies.subList(1,3));

        ResultActions response = mockMvc.perform(get("/api/movies/moviesearch?movie=title&genre=drama&year="));

        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()",
                        is(2)));

        //Now with no year at all
        ResultActions response2 = mockMvc.perform(get("/api/movies/moviesearch?movie=title&genre=drama"));
        response2.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()",
                        is(2)));

    }


}
