package dev.babsang.megabox.enums.bbs;

import dev.babsang.megabox.interfaces.IResult;

public enum ArticleDeleteResult implements IResult {
    NO_SUCH_ARTICLE, // 댓글이 없음
    NOT_ALLOWED // 권한이 없음
}
