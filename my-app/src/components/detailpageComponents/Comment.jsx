import React from "react";
import * as S from "../../../../admin/dev5/styles/detailPageStyled";
const Comment = ({ replies, user }) => {
  console.log(replies);
  return (
    <S.CommentContainer>
      {replies.map((reply, index) => {
        return (
          <S.CommentItemContainer key={reply.id} $index={index}>
            <div>
              <span>작성자:{reply.author.nickname}</span>
              <span>
                <div>{reply.reply5}</div>
              </span>
            </div>

            <S.CommentItemRight>
              <span>{reply.createdAt}</span>
              {user?.nickname === reply?.author?.nickname && (
                <S.CommentButtonContainer>
                  <S.CommentButton>수정</S.CommentButton>
                  <S.CommentButton>삭제</S.CommentButton>
                </S.CommentButtonContainer>
              )}
            </S.CommentItemRight>
          </S.CommentItemContainer>
        );
      })}
    </S.CommentContainer>
  );
};

export default Comment;
