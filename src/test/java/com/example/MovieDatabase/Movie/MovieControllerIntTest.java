package com.example.MovieDatabase.Movie;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class MovieControllerIntTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup(){
        movieRepository.deleteAll();
    }

    @Test
    void testGetAllMovies() throws Exception {
        List<Movie> listOfMovies = new ArrayList<>();
        Movie movie = new Movie();
        movie.setId(1);
        movie.setTitle("movie");
        movie.setPoster("poster.link");
        movie.setOverview("Fun movie");

        Movie movie2 = new Movie();
        movie2.setId(2);
        movie2.setTitle("movie2");
        movie2.setPoster("poster.link2");
        movie2.setOverview("Fun movie2");

        listOfMovies.add(movie);
        listOfMovies.add(movie2);

        movieRepository.saveAll(listOfMovies);

        ResultActions response = mockMvc.perform(get("/movies/all"));

        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()",
                        is(listOfMovies.size())));

    }

    @Test
    void testGetMovie() throws Exception {
        Movie movie = new Movie();
        movie.setId(1);
        movie.setTitle("movie");
        movie.setPoster("poster.link");
        movie.setOverview("Fun movie");
        movieRepository.save(movie);

        ResultActions response = mockMvc.perform(get("/movies/{id}", movie.getId()));

        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.title", is(movie.getTitle())))
                .andExpect(jsonPath("$.poster", is(movie.getPoster())))
                .andExpect(jsonPath("$.overview", is(movie.getOverview())));

    }


}
