import React from 'react';
import styles from './CommentSection.module.scss';
import { CommentModel } from '../../model/commentModel';
import { UserModel } from '../../model/userModel';


interface CommentsProps {
  postComments: CommentModel[];
  userRole: UserModel;
  setReplyTo: (commentId: number) => void;
}

const CommentsSection: React.FC<CommentsProps> = ({ postComments, userRole, setReplyTo }) => {
   const organizeComments = (comments: CommentModel[]): CommentModel[] => {
    const commentMap: Record<number, CommentModel> = {};
    const rootComments: CommentModel[] = [];
    
     comments.forEach(comment => {
      const commentCopy = { ...comment, replies: [] };
      commentMap[comment.comment_id] = commentCopy;
    });
    
     comments.forEach(comment => {
      if (comment.comment_responding_to) {
         if (commentMap[comment.comment_responding_to]) {
          commentMap[comment.comment_responding_to].replies?.push(commentMap[comment.comment_id]);
        }
      } else {
         rootComments.push(commentMap[comment.comment_id]);
      }
    });
    
    return rootComments;
  };

   const organizedComments = organizeComments(postComments);
  
   const CommentItem: React.FC<{
    comment: CommentModel;
    level?: number;
  }> = ({ comment, level = 0 }) => {
     const nestedLevelClass = level > 0 ? styles[`nested-level-${Math.min(level, 3)}`] : '';
    
    return (
      <div 
        className={`${styles['comment-container']} ${nestedLevelClass}`}
        style={{ marginLeft: `${level * 20}px` }}
      >
        <p className={styles['comment-user']}>{comment.user_name}</p>
        <h3 className={styles['comment-text']}>{comment.comment_description}</h3>
        {userRole.user && (
          <button 
            className={styles['reply-button']} 
            onClick={() => setReplyTo(comment.comment_id)}
          >
            ↩
          </button>
        )}
        
         {comment.replies && comment.replies.length > 0 && (
          <div className={styles['replies-container']}>
            {comment.replies.map(reply => (
              <CommentItem 
                key={reply.comment_id} 
                comment={reply} 
                level={level + 1} 
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles['comments-section']}>
      {organizedComments.length > 0 ? (
        organizedComments.map(comment => (
          <CommentItem 
            key={comment.comment_id} 
            comment={comment} 
          />
        ))
      ) : (
        <p className={styles['no-comments']}>No comments yet</p>
      )}
    </div>
  );
};

export default CommentsSection;