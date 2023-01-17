package dev.babsang.megabox.services;

import dev.babsang.megabox.entities.member.UserEntity;
import dev.babsang.megabox.enums.CommonResult;
import dev.babsang.megabox.interfaces.IResult;
import dev.babsang.megabox.mappers.IManagerMapper;
import dev.babsang.megabox.models.PagingModel;
import org.springframework.stereotype.Service;

@Service(value = "dev.babsang.megabox.services.ManagerService")

public class ManagerService {

    private final IManagerMapper managerMapper;

    public ManagerService(IManagerMapper managerMapper) {
        this.managerMapper = managerMapper;
    }

//    @Transactional
//    public UserEntity[] getUserList() {
//        return this.managerMapper.selectUserById();
//    }

    public int getArticleCount(String criterion, String keyword) {
        return this.managerMapper.selectUserCount(criterion, keyword);
    }

    public UserEntity[] getArticles(PagingModel paging, String criterion, String keyword) {
        return this.managerMapper.selectUserIdCount(
                paging.countPerPage,
                (paging.requestPage - 1) * paging.countPerPage, criterion, keyword);
    }

//    public Enum<? extends IResult> deleteUser(UserEntity user) {
//
//        return this.managerMapper.deleteUser(user.getEmail()) > 0
//                ? CommonResult.SUCCESS
//                : CommonResult.FAILURE;
//    }

    //user 정보 가져옴

    public Enum<? extends IResult> deleteUser(UserEntity user) {
        UserEntity[] existingUser = this.managerMapper.selectByEmail(user.getEmail());
        if (existingUser == null) {
            return CommonResult.FAILURE;
        }


        return this.managerMapper.deleteUser(user.getEmail()) > 0
                ? CommonResult.SUCCESS
                : CommonResult.FAILURE;
    }
}
