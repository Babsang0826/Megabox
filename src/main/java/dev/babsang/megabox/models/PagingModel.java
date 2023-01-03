package dev.babsang.megabox.models;

public class PagingModel {
    public final int countPerPage; // 페이지당 표시할 게시글 개수
    public final int totalCount; //전체 게시글 개수
    public final int requestPage; // 요청한 페이지 번호
    public final int maxPage; // 이동 가능한 최대 페이지
    public final int minPage; // 이동 가능한 최소 페이지
    public final int startPage; // 표시 시작 페이지
    public final int endPage; // 표시 끝 페이지

    public PagingModel(int totalCount, int requestPage) {
        this(10, totalCount, requestPage);
    }

    public PagingModel(int countPerPage, int totalCount, int requestPage) {
        this.countPerPage = countPerPage;
        this.totalCount = totalCount;
        this.requestPage = requestPage;
        this.minPage = 1;
        this.maxPage = (totalCount - 1) / countPerPage + 1;
        this.startPage = ((countPerPage -1) /10) * 10 + 1;
        this.endPage = Math.min(startPage + 9, maxPage);
    }

}
