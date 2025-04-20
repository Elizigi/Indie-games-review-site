import  { FC, } from 'react'
import styles from "./PostCard.module.scss"
import { Post } from '../../model/postModel';
interface PostWindowProps{
   post:Post
    onClick:(post:Post)=>void;
}
const PostCard:FC<PostWindowProps> = ({post ,onClick}) => {
   // const {fetchPostWithComments} = PostWindowVM(post.post_id)
 
  return (
    <div className={styles.postWrapper} onClick={() => onClick(post)}>
    <h2>{post.post_title}</h2>
    <h3>{post.post_description}</h3>
    {post.post_img_url && post.post_img_url !== "aaa" && <img src={post.post_img_url} alt={post.post_title} />}
  </div>
  )
}

export default PostCard
