import React from 'react';

const Comment = ({ replies }) => {
  console.log(replies);
  return (
    <div>
      {replies.map((reply) => {
        return (
          <div key={reply.id}>
            <div>{reply.author.nickname}</div>
            <div>{reply.reply5}</div>
            <div>{reply.createdAt}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
