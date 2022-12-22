package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.member.EmailAuthEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IMemberMapper {

    int insertEmailAuth(EmailAuthEntity emailAuth);

    UserEntity selectUserByEmail(@Param(value = "email") String email);

    UserEntity selectUserById(@Param(value = "id") String id);

    EmailAuthEntity selectEmailAuthByEmailCodeSalt(@Param(value = "email") String email,
                                                   @Param(value = "code") String code,
                                                   @Param(value = "salt") String salt);


    int updateEmailAuth(EmailAuthEntity emailAuth);

    int insertUser(UserEntity user);

    UserEntity selectUserByEmails(String id, String password);

    UserEntity selectUserByNameBirthdayContact(@Param(value = "name") String name,
                                               @Param(value = "birthday") int birthday,
                                               @Param(value = "contact") String contact);

    UserEntity selectUserByIdNameBirthdayContact(@Param(value = "id") String id,
                                                 @Param(value = "name") String name,
                                                 @Param(value = "birthday") int birthday,
                                                 @Param(value = "contact") String contact,
                                                 @Param(value = "email") String email);

    EmailAuthEntity selectEmailAuthByIndex(@Param(value = "index")int index);


    int updateUser(UserEntity user);
}
