const React = require('react');
const Layout = require('../layouts/Layout');

function ShowPost({ post, token }) {
    return (
        <Layout token={token}>
            <div className="app-container">
                <div className="post-card single-post">
                    {/* Post Header */}
                    <div className="post-header">
                        <div className="post-author">
                            <img
                                src={post.author.profilePicture || '/images/default-avatar.png'}
                                alt={post.author.name}
                                className="author-avatar"
                            />
                            <span className="author-name">{post.author.name}</span>
                        </div>
                    </div>

                    {/* Post Image */}
                    <div className="post-image">
                        <img src={post.image} alt="Post" />
                    </div>

                    {/* Post Actions */}
                    <div className="post-actions-bar">
                        <div className="action-buttons">
                            <i className="far fa-heart"></i>

                            {/* Comment Toggle Button */}
                            <button
                                type="button"
                                className="action-btn"
                                onClick={() => {
                                    const commentsBox = document.getElementById(`comments-${post._id}`);
                                    if (commentsBox) commentsBox.classList.toggle('hidden');
                                }}
                            >
                                <i className="far fa-comment"></i>
                            </button>

                            <i className="far fa-paper-plane"></i>
                        </div>
                        <i className="far fa-bookmark"></i>
                    </div>

                    {/* Like count */}
                    <div className="post-likes">
                        {post.likeCount} likes
                    </div>

                    {/* Caption */}
                    <div className="post-caption">
                        <strong>{post.author.name}</strong> {post.caption}
                    </div>

                    {/* Timestamp */}
                    <div className="post-timestamp">
                        {new Date(post.createdAt).toLocaleDateString()}
                    </div>

                    {/* Comments + Form (Initially Hidden) */}
                    <div id={`comments-${post._id}`} className="comments-toggle hidden">
                        {/* Comments */}
                        <div className="comments-section">
                            {post.comments.length > 0 ? (
                                post.comments.map((comment) => (
                                    <div key={comment._id} className="comment">
                                        <strong>{comment.author.name}</strong>: {comment.content}
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: '#888' }}>No comments yet</p>
                            )}
                        </div>

                        {/* Comment Form */}
                        <form
                            className="comment-form"
                            action={`/posts/${post._id}/comments?token=${token}`}
                            method="POST"
                        >
                            <input
                                type="text"
                                name="content"
                                placeholder="Add a comment..."
                                required
                            />
                            <button type="submit" className="btn btn-primary">Post</button>
                        </form>
                    </div>

                    {/* Back to Profile + Delete Buttons */}
                    <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                        {/* Back to Profile Icon/Button */}
                        <a href={`/authors/profile?token=${token}`} className="btn btn-secondary">
                            <i className="fas fa-arrow-left"></i> Back to Profile
                        </a>

                        {/* Delete Button */}
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
        </Layout>
    );
}

module.exports = ShowPost;
