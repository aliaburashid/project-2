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
                        {/* Header with profile and caption on the same line */}
                        {/* Profile picture, name + caption + timestamp aligned cleanly */}
                        <div
                            className="post-header"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1rem',
                            }}
                        >
                            <img
                                src={post.author.profilePicture || '/images/default-avatar.png'}
                                alt={post.author.name}
                                className="author-avatar"
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    marginRight: '0.75rem' // 👈 pushes caption block close to image
                                }}
                            />
                            <div>
                                <div className="post-caption-line">
                                    <strong>{post.author.name}</strong> <span className="caption-only">{post.caption}</span>
                                </div>

                                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                    {new Date(post.createdAt).toLocaleString()}
                                </div>
                            </div>
                        </div>


                        <hr />

                        {/* Post Actions (moved above comment input) */}
                        <div className="post-actions-bar" style={{ marginBottom: '1rem' }}>
                            <i className="far fa-heart"></i>
                            <i className="far fa-comment"></i>
                            <i className="far fa-paper-plane"></i>
                            <i className="far fa-bookmark" style={{ marginLeft: 'auto' }}></i>
                        </div>

                        {/* Comments */}
                        <div className="comments-section">
                            {post.comments.length > 0 ? (
                                post.comments.map((comment) => (
                                    <div key={comment._id} className="comment" style={{ marginBottom: '0.75rem' }}>
                                        <div>
                                            <strong>{comment.author.name}</strong> {comment.content}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '2px' }}>
                                            {new Date(comment.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: '#888' }}>No comments yet</p>
                            )}
                        </div>

                        {/* Comment Input */}
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

                        {/* Footer Buttons */}
                        <div className="post-footer-actions">
                            <a href={`/authors/profile?token=${token}`} className="btn btn-secondary">
                                ← Back to Profile
                            </a>
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
