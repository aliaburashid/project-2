const React = require('react');
const Layout = require('../layouts/Layout');

function ShowPost({ post, token }) {
    return (
        <Layout token={token}>
            <div className="single-post-container">
                <div className="single-post-box">
                    {/* Left - Image */}
                    <div className="single-post-image">
                        <img src={post.image} alt="Post" />
                    </div>

                    {/* Right - Content */}
                    <div className="single-post-content">
                        {/* Header */}
                        <div className="single-post-header">
                            <div className="single-post-author">
                                <img
                                    src={post.author.profilePicture || '/images/default-avatar.png'}
                                    alt={post.author.name}
                                    className="single-post-avatar"
                                />
                                <span className="single-post-author-name">{post.author.name}</span>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="single-post-comments">
                            {post.comments.length > 0 ? (
                                <>
                                    {/* Show comment count */}
                                    <div className="comment-count">
                                        {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                                    </div>
                                    
                                    {/* Show all comments */}
                                    {post.comments.map((comment) => (
                                        <div key={comment._id} className="single-post-comment">
                                            <span className="comment-author">{comment.author.name}</span>{' '}
                                            <span className="comment-content">{comment.content}</span>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p className="no-comments">No comments yet</p>
                            )}
                        </div>

                        {/* Post Actions */}
                        <div className="single-post-actions">
                            <div className="single-post-action-buttons">
                                <button className="single-post-action-btn">
                                    <i className="far fa-heart"></i>
                                </button>
                                <button className="single-post-action-btn">
                                    <i className="far fa-comment"></i>
                                </button>
                                <button className="single-post-action-btn">
                                    <i className="far fa-paper-plane"></i>
                                </button>
                            </div>
                            <button className="single-post-action-btn save-btn">
                                <i className="far fa-bookmark"></i>
                            </button>
                        </div>

                        {/* Likes Count */}
                        <div className="single-post-likes">
                            <span className="single-post-likes-count">{post.likeCount} likes</span>
                        </div>

                        {/* Caption */}
                        <div className="single-post-caption">
                            <span className="single-post-caption-author">{post.author.name}</span>{' '}
                            <span className="single-post-caption-text">{post.caption}</span>
                        </div>

                        {/* Timestamp */}
                        <div className="single-post-timestamp">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </div>

                        {/* Comment Form */}
                        <form
                            className="single-post-comment-form"
                            action={`/posts/${post._id}/comments?token=${token}`}
                            method="POST"
                        >
                            <input
                                type="text"
                                name="content"
                                placeholder="Add a comment..."
                                required
                            />
                            <button type="submit">Post</button>
                        </form>

                        {/* Footer Actions */}
                        <div className="single-post-footer">
                            <a href={`/authors/profile?token=${token}`} className="back-btn">
                                ← Back to Profile
                            </a>
                            <form
                                action={`/posts/${post._id}?_method=DELETE&token=${token}`}
                                method="POST"
                                style={{ display: 'inline' }}
                            >
                                <button type="submit" className="delete-btn">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

module.exports = ShowPost;
