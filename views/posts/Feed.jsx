const React = require('react');
const Layout = require('../layouts/Layout');

function Feed(props) {
    const { posts, token } = props;

    return (
        <Layout token={token}>
            <div className="app-container">
                {/* All Posts */}
                <div className="posts-container">
                    {posts.map((post) => (
                        <div key={post._id} className="post-card">
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
                                    <button className="action-btn like-btn">
                                        <i className="far fa-heart"></i>
                                    </button>
                                    <button className="action-btn">
                                        <i className="far fa-comment"></i>
                                    </button>
                                    <button className="action-btn">
                                        <i className="far fa-paper-plane"></i>
                                    </button>
                                </div>
                                <button className="action-btn save-btn">
                                    <i className="far fa-bookmark"></i>
                                </button>
                            </div>

                            {/* Likes Count */}
                            <div className="post-likes">
                                <span className="likes-count">{post.likeCount} likes</span>
                            </div>

                            {/* Caption */}
                            <div className="post-caption">
                                <span className="caption-author">{post.author.name}</span>{' '}
                                <span className="caption-text">{post.caption}</span>
                            </div>

                            {/* Timestamp */}
                            <div className="post-timestamp">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </div>

                            {/* Comments Section */}
                            <div className="comments-section">
                                {post.comments.length > 0 ? (
                                    <>
                                        {/* Show first 2 comments */}
                                        {post.comments.slice(0, 2).map((comment) => (
                                            <div key={comment._id} className="post-caption">
                                                <span className="caption-author">{comment.author.name}</span>{' '}
                                                <span className="caption-text">{comment.content}</span>
                                            </div>
                                        ))}
                                        
                                        {/* Show "View more comments" if there are more than 2 comments */}
                                        {post.comments.length > 2 && (
                                            <div className="view-more-comments" style={{ display: 'none' }}>
                                                {post.comments.slice(2).map((comment) => (
                                                    <div key={comment._id} className="post-caption">
                                                        <span className="caption-author">{comment.author.name}</span>{' '}
                                                        <span className="caption-text">{comment.content}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                        {/* View more button */}
                                        {post.comments.length > 2 && (
                                            <button 
                                                className="view-more-btn" 
                                                onClick="toggleFeedComments(this)"
                                                data-post-id={post._id}
                                            >
                                                View all {post.comments.length} comments
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <p className="no-comments">No comments yet</p>
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
                                <button type="submit">Post</button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

module.exports = Feed;
