package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.member.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IManagerMapper {

    UserEntity[] selectUserById();

    int selectUserCount(
            @Param(value = "criterion") String criterion,
            @Param(value = "keyword") String keyword);


    UserEntity[] selectUserIdCount(
            @Param(value = "limit") int limit,
            @Param(value = "offset") int offset,
            @Param(value = "criterion") String criterion,
            @Param(value = "keyword") String keyword);


    int deleteUser(@Param(value = "email") String email);

    UserEntity[] selectByEmail(@Param(value = "email") String email);
}
