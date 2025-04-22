export interface CommentModel {
  comment_id: number;
  comment_description: string;
  comment_responding_to: number | null;
  user_name: string;
  replies?: CommentModel[];
}
