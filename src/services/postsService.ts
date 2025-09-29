// services/postService.ts
export const postService = {
  // Like/Unlike post
  async toggleLike(postId: number, userId: number): Promise<{ success: boolean; likes_count: number }> {
    // First check if already liked
    const checkResponse = await fetch(`http://127.0.0.1:8000/check-post-like?post_id=${postId}&user_id=${userId}`);
    const isLiked = await checkResponse.json();
    
    let response;
    if (isLiked) {
      response = await fetch('http://127.0.0.1:8000/unlike-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      });
    } else {
      response = await fetch('http://127.0.0.1:8000/like-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      });
    }
    
    if (!response.ok) throw new Error('Failed to toggle like');
    
    // Get updated likes count
    const postsResponse = await fetch('http://127.0.0.1:8000/get-all-posts');
    const posts = await postsResponse.json();
    const post = posts.find((p: any) => p.id === postId);
    
    return { 
      success: true, 
      likes_count: post?.likes_count || 0 
    };
  },

  // Add comment
  async addComment(postId: number, userId: number, text: string): Promise<any> {
    const response = await fetch('http://127.0.0.1:8000/create-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        post_id: postId,
        user_id: userId,
        text: text,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to add comment');
    return await response.json();
  },

  // Toggle comment like
  async toggleCommentLike(commentId: number, userId: number): Promise<{ success: boolean; likes_count: number }> {
    const response = await fetch('http://127.0.0.1:8000/like-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comment_id: commentId,
        user_id: userId,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to toggle comment like');
    
    return { success: true, likes_count: 0 }; // You might need to adjust this based on your API
  },
};