package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.entities.movie.*;
import dev.babsang.megabox.vos.movie.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IMyPageMapper {
    UserEntity selectUserByContact(@Param(value = "contact") String contact);

    BookingEntity selectMovieVosById(@Param(value = "id") String Id);

    BookingVo[] selectBookingById(@Param(value = "userId") String userId);

    int updateUser(UserEntity user);

    int deleteUser(UserEntity user);

    int deleteBooking(int screenInfoIndex, String userId);

    int selectUserCount(
            @Param(value = "criterion") String criterion,
            @Param(value = "keyword") String keyword);

    int selectMovieCount(@Param(value = "criterion") String criterion,
                         @Param(value = "keyword") String keyword);


    UserEntity[] selectUserIdCount(
            @Param(value = "limit") int limit,
            @Param(value = "offset") int offset,
            @Param(value = "criterion") String criterion,
            @Param(value = "keyword") String keyword);

    MovieEntity[] selectMoviePaging(@Param(value = "limit") int limit,
                                   @Param(value = "offset") int offset,
                                   @Param(value = "criterion") String criterion,
                                   @Param(value = "keyword") String keyword);

    int adminDeleteUser(@Param(value = "email") String email);

    UserEntity[] selectByEmail(@Param(value = "email") String email);

    MovieEntity[] selectMovies();

    int insertMovie(MovieEntity movie);

    int updateMovie(MovieEntity movie);

    MovieEntity selectMovie(@Param(value = "index") int index);

    int deleteMovie(@Param(value = "index") int index);

}
