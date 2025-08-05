const React = require('react');
const Layout = require('../layouts/Layout');

function Feed(props) {
  const { posts, token } = props

  return (
    <Layout token={token}>
      <div className="app-container">
        <div className="feed-header" style={{ padding: '1rem 0' }}>
          <h1 style={{ fontWeight: 400 }}>FlickGallery</h1>
          <a href={`/posts/new?token=${token}`} className="new-post-btn">
            <i className="fas fa-plus"></i> New Post
          </a>
        </div>

        <div className="posts-container">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              {/* Post Header with Author Info */}
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
              <div className="post-likes" style={{ padding: '0 16px', marginBottom: '0.5rem' }}>
                <span className="likes-count">{post.likeCount} likes</span>
              </div>

              {/* Caption */}
              <div className="post-caption">
                <span className="caption-author">{post.author.name}</span>{' '}
                <span className="caption-text">{post.caption}</span>
              </div>

              {/* Timestamp */}
              <div className="post-timestamp" style={{ padding: '0 16px', fontSize: '0.8rem', color: '#999' }}>
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

module.exports = Feed
