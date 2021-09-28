package com.devianwahyu.jetpackdicoding.ui.detail

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Observer
import com.devianwahyu.jetpackdicoding.data.MovieEntity
import com.devianwahyu.jetpackdicoding.data.source.TMDBRepository
import com.devianwahyu.jetpackdicoding.utils.DataDummy
import junit.framework.Assert.assertEquals
import junit.framework.Assert.assertNotNull
import org.junit.Before
import org.junit.Rule
import org.junit.Test

import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.Mockito.`when`
import org.mockito.Mockito.verify
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class DetailViewModelTest {

    private lateinit var viewModel: DetailViewModel
    private val dummyMovie = DataDummy.generateDummyMovies()[0]
    private val id = dummyMovie.id

    @get:Rule
    var instantTaskExecutorRule = InstantTaskExecutorRule()

    @Mock
    private lateinit var tmdbRepository: TMDBRepository

    @Mock
    private lateinit var movieObserver: Observer<MovieEntity>

    @Before
    fun setUp() {
        viewModel = DetailViewModel(tmdbRepository)
        viewModel.setSelectedMovie(id)
    }

    @Test
    fun getMovieById() {
        val movie = MutableLiveData<MovieEntity>()
        movie.value = dummyMovie

        `when`(tmdbRepository.getMovieById(id)).thenReturn(movie)
        val movieEntity = viewModel.getMovieById().value as MovieEntity
        verify(tmdbRepository).getMovieById(id)
        assertNotNull(movieEntity)
        assertEquals(dummyMovie.id, movieEntity.id)
        assertEquals(dummyMovie.release_date, movieEntity.release_date)
        assertEquals(dummyMovie.vote_average, movieEntity.vote_average)
        assertEquals(dummyMovie.original_language, movieEntity.original_language)
        assertEquals(dummyMovie.title, movieEntity.title)
        assertEquals(dummyMovie.overview, movieEntity.overview)
        assertEquals(dummyMovie.adult, movieEntity.adult)
        assertEquals(dummyMovie.poster_path, movieEntity.poster_path)

        viewModel.getMovieById().observeForever(movieObserver)
        verify(movieObserver).onChanged(dummyMovie)
    }
}