export interface Comment {
    comment_id: number;
    comment_description: string;
    user_name: string;
    comment_responding_to?: number | null;
  }