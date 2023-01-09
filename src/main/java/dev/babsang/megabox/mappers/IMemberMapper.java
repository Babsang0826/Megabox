package dev.babsang.megabox.mappers;

import dev.babsang.megabox.entities.member.EmailAuthEntity;
import dev.babsang.megabox.entities.member.KakaoUserEntity;
import dev.babsang.megabox.entities.member.UserEntity;
import org.apache.catalina.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface IMemberMapper {

    int insertEmailAuth(EmailAuthEntity emailAuth);

    UserEntity selectUserByEmail(@Param(value = "email") String email);

    UserEntity selectUserById(@Param(value = "id") String id);
    KakaoUserEntity selectKakaoUserById(@Param(value = "id") String id);
    int insertKakaoUser(KakaoUserEntity user);

    EmailAuthEntity selectEmailAuthByEmailCodeSalt(@Param(value = "email") String email,
                                                   @Param(value = "code") String code,
                                                   @Param(value = "salt") String salt);


    int updateEmailAuth(EmailAuthEntity emailAuth);

    int insertUser(UserEntity user);

    UserEntity selectUserByEmails(String id, String password);

    UserEntity selectUserByNameBirthdayContact(@Param(value = "name") String name,
                                               @Param(value = "birthday") String birthday,
                                               @Param(value = "contact") String contact);

    UserEntity selectUserByIdNameBirthdayContact(@Param(value = "id") String id,
                                                 @Param(value = "name") String name,
                                                 @Param(value = "birthday") String birthday,
                                                 @Param(value = "contact") String contact,
                                                 @Param(value = "email") String email);

    EmailAuthEntity selectEmailAuthByIndex(@Param(value = "index")int index);


    int updateUser(UserEntity user);

    // 연락처 중복 확인
    UserEntity selectUserByContact(@Param(value = "contact") String contact);
}
