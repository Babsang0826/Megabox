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
}
