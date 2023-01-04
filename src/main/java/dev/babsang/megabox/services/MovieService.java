package dev.babsang.megabox.services;

import dev.babsang.megabox.entities.movie.*;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.enums.bbs.WriteResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.mappers.IMovieMapper;
import dev.babsang.megabox.vos.movie.MovieCommentVo;
import dev.babsang.megabox.vos.movie.MovieScreenInfoVo;
import dev.babsang.megabox.vos.movie.MovieVo;
import dev.babsang.megabox.vos.movie.SeatVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

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

    public MovieEntity[] getMovies() {
        return this.movieMapper.selectMovies();
    }

    public RegionEntity getRegion() {
        return this.movieMapper.selectRegion();
    }

    public BranchEntity[] getBranches() {
        return this.movieMapper.selectBranches();
    }

    public MovieScreenInfoVo[] getScreenInfos() {
        return this.movieMapper.selectScreenInfos();
    }

    public MovieVo[] getCommingMovies() {
        return this.movieMapper.selectCommingMovies();
    }

    public MovieVo getMovieVo(int mid) {
        return this.movieMapper.selectMovieVo(mid);
    }

    public MovieVo[] getMovieVosByMid(int mid) {
        return this.movieMapper.selectMovieVosByMid(mid);
    }

    public MovieVo[] getMovieVos() {
        return this.movieMapper.selectMovieVos();
    }

    public BookingEntity[] getBookings() {
        return this.movieMapper.selectBooking();
    }

    public SeatVo[] getSeatVos() {
        return this.movieMapper.selectSeatVo();
    }

    public SeatVo[] getSeatVosGroupByColumn() {
        return this.movieMapper.selectSeatVoGroupByColumn();
    }
}

