package dev.babsang.megabox.enums.bbs;

import dev.babsang.megabox.interfaces.IResult;

public enum IndexResult implements IResult {
    // 0개가 돌아왔다 : 게시글 없음
    // 1개가 돌아왔다 : 이전/이후 게시글 없음
    // 2개가 돌아왔다 :
    //   - 첫번째 객체 index가 두번째 객체 index보다 작을때 : 가장 첫글을 읽었다 (이전은 없고 다음은 있고)
    //   - 첫번째 객체 index가 두번째 객체 index보다 클때 : 가장 마지막글을 읽었다 (이전은 있고 다음은 없고)
    // 3개가 돌아왔다 : 이전/이후 있으니까 그냥 보여주기

    PREV_NEXT_NO_SUCH_ARTICLE,
    FIRST_READ_ARTICLE,
    LAST_READ_ARTICLE,
    ONLY_ONE_ARTICLE

}
