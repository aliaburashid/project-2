const React = require('react');
const Layout = require('../layouts/Layout');

function ShowPost({ post, token }) {
  const commentsCount = post.comments.length;

  return (
    <Layout token={token}>
      <div className="single-post-container">
        <div className="single-post-box">
          {/* Image Section */}
          <div className="single-post-image">
            <img src={post.image} alt="Post" />
          </div>

          {/* Content Section */}
          <div className="single-post-content">

            {/* Author Header */}
            <div className="post-header">
              <img
                src={post.author.profilePicture || '/images/default-avatar.png'}
                alt={post.author.name}
                className="author-avatar"
              />
              <strong className="author-name">{post.author.name}</strong>
            </div>

            {/* Action Icons */}
            <div className="post-actions-bar">
              <i className="far fa-heart"></i>
              <i
                className="far fa-comment"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const comments = document.getElementById('comments-toggle');
                  if (comments) comments.classList.toggle('hidden');
                }}
              ></i>
              <i className="far fa-paper-plane"></i>
              <i className="far fa-bookmark" style={{ marginLeft: 'auto' }}></i>
            </div>

            {/* Likes */}
            <div className="post-likes">
              ❤️ Liked by <strong>some_user</strong> and {post.likeCount} others
            </div>

            {/* Caption */}
            <div className="post-caption">
              <strong>{post.author.name}</strong> {post.caption}
            </div>

            {/* View All Comments Link */}
            {commentsCount > 0 && (
              <div
                className="view-comments-link"
                style={{ color: '#888', cursor: 'pointer', marginTop: '5px' }}
                onClick={() => {
                  const comments = document.getElementById('comments-toggle');
                  if (comments) comments.classList.toggle('hidden');
                }}
              >
                View all {commentsCount} comment{commentsCount > 1 ? 's' : ''}
              </div>
            )}

            {/* Comments Section */}
            <div id="comments-toggle" className="comments-toggle hidden">
              <div className="comments-section">
                {post.comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    <strong>{comment.author.name}</strong> {comment.content}
                  </div>
                ))}
              </div>
            </div>

            {/* Add Comment */}
            <form
              className="comment-form"
              action={`/posts/${post._id}/comments?token=${token}`}
              method="POST"
              style={{ display: 'flex', gap: '5px', marginTop: '10px' }}
            >
              <input
                type="text"
                name="content"
                placeholder="Add a comment..."
                required
              />
              <button type="submit" className="btn btn-primary">Post</button>
            </form>

            {/* Timestamp */}
            <div className="post-timestamp">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>

            {/* Back + Delete Buttons */}
            <div className="post-footer-actions">
              <a href={`/authors/profile?token=${token}`} className="btn btn-secondary">← Back to Profile</a>
              <form
                action={`/posts/${post._id}?_method=DELETE&token=${token}`}
                method="POST"
                style={{ display: 'inline' }}
              >
                <button type="submit" className="btn btn-danger">Delete</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

module.exports = ShowPost;
