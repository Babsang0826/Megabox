package dev.babsang.megabox.services;

import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.*;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.enums.member.RecoverMyPageResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.mappers.IMovieMapper;
import dev.babsang.megabox.utils.CryptoUtils;
import dev.babsang.megabox.vos.movie.MovieCommentVo;
import dev.babsang.megabox.vos.movie.MovieScreenInfoVo;
import dev.babsang.megabox.vos.movie.MovieVo;
import dev.babsang.megabox.vos.movie.SeatVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public MovieVo[] getMovieVosKeyword(String keyword) {
        return this.movieMapper.selectMoviesByKeyword(keyword);
    }

    public MovieVo[] getMovieVos() {
        return this.movieMapper.selectMovieVos();
    }

    public MovieVo[] getMovieVoByList() {
        return this.movieMapper.selectMovieVoByListBox();
    }

    public BookingEntity getMovieVosById(String id) { return this.movieMapper.selectMovieVosById(id); }

    public BookingEntity[] getBookings() {
        return this.movieMapper.selectBooking();
    }

    public SeatVo[] getSeatVos() {
        return this.movieMapper.selectSeatVo();
    }

    public SeatVo[] getSeatVosGroupByColumn() {
        return this.movieMapper.selectSeatVoGroupByColumn();
    }

    public MovieVo[] getMovieByKeyword(String keyword) {
        return this.movieMapper.selectMoviesByKeyword(keyword);
    }

    public Enum<? extends IResult> myPageAuth(UserEntity signedUser) {
        if (signedUser == null) {
            return RecoverMyPageResult.NO_USER;
        }

        return CommonResult.SUCCESS;
    }

    @Transactional
    public Enum<? extends IResult> updateUser(UserEntity signedUser, UserEntity newUser) {
        if (signedUser == null) {
            return RecoverMyPageResult.NO_USER;
        }
        UserEntity userByContact = this.movieMapper.selectUserByContact(newUser.getContact());
        if (userByContact != null && !signedUser.getEmail().equals(userByContact.getEmail())) {
            return RecoverMyPageResult.DUPLICATE;
        }

        signedUser.setContact(newUser.getContact());
        signedUser.setBirthday(newUser.getBirthday());
        signedUser.setName(newUser.getName());
        signedUser.setEmail(newUser.getEmail());
        signedUser.setAddressPostal(newUser.getAddressPostal());
        signedUser.setAddressPrimary(newUser.getAddressPrimary());
        signedUser.setAddressSecondary(newUser.getAddressSecondary());

        return this.movieMapper.updateUser(signedUser) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }

    public Enum<? extends IResult> updatePassword(UserEntity signedUser, UserEntity newUser) {
        if (signedUser == null) {
            return RecoverMyPageResult.NO_USER;
        }

        signedUser.setPassword(CryptoUtils.hashSha512(newUser.getPassword()));

        return this.movieMapper.updateUser(signedUser) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }

    public Enum<? extends IResult> deleteUser(UserEntity user) {

        return this.movieMapper.deleteUser(user) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }
}

