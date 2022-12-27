package dev.babsang.megabox.services;

import dev.babsang.megabox.entities.movie.MovieCommentEntity;
import dev.babsang.megabox.entities.movie.MovieEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.mappers.IMovieMapper;
import dev.babsang.megabox.vos.movie.MovieCommentVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "dev.babsang.megabox.services.MovieService")
public class MovieService {
    private final IMovieMapper movieMapper;

    @Autowired
    public MovieService(IMovieMapper movieMapper) {
        this.movieMapper = movieMapper;
    }

    public MovieCommentVo getComment(int mid) {
        return this.movieMapper.selectMovieCommentByMid(mid);
    }


    //댓글 insert
    public Enum<? extends IResult> writeComment(MovieCommentEntity comment) {
        return this.movieMapper.insertComment(comment) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }

    //mid 로 MovieCommentEntity select
    //한줄평들 띄우기(유저는 추후 추가)
    public MovieCommentEntity[] getComments(int mid) {
        return this.movieMapper.selectMovieCommentsByMid(mid);
    }

    public MovieEntity getMovie(int mid) {
        return this.movieMapper.selectMovieByIndex(mid);
    }

    public MovieEntity[] getMovieReservation(){
        return this.movieMapper.selectMovieReservation();
    }
}
