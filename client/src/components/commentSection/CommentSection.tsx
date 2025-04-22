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
  // Organize comments into a hierarchical structure
  const organizeComments = (comments: CommentModel[]): CommentModel[] => {
    const commentMap: Record<number, CommentModel> = {};
    const rootComments: CommentModel[] = [];
    
    // First pass: map comments by ID
    comments.forEach(comment => {
      const commentCopy = { ...comment, replies: [] };
      commentMap[comment.comment_id] = commentCopy;
    });
    
    // Second pass: organize into hierarchy
    comments.forEach(comment => {
      if (comment.comment_responding_to) {
        // This is a reply, add it to its parent's replies
        if (commentMap[comment.comment_responding_to]) {
          commentMap[comment.comment_responding_to].replies?.push(commentMap[comment.comment_id]);
        }
      } else {
        // This is a root comment
        rootComments.push(commentMap[comment.comment_id]);
      }
    });
    
    return rootComments;
  };

  // Create organized comments structure
  const organizedComments = organizeComments(postComments);
  
  // Recursive component to render comments and their replies
  const CommentItem: React.FC<{
    comment: CommentModel;
    level?: number;
  }> = ({ comment, level = 0 }) => {
    // Determine nested level class (for different styling per nesting level)
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
        
        {/* Render replies */}
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