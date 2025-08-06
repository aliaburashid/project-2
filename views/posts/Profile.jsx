const React = require('react');
const Layout = require('../layouts/Layout');

function Profile({ profile, token }) {
  return (
    <Layout token={token}>
      <div className="profile-container">
        <div className="profile-header">
          <img className="profile-avatar" src={profile.profilePicture} alt="avatar" />
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.bio}</p>
            <div className="profile-stats">
              <span><strong>{profile.posts.length}</strong> posts</span>
              <span><strong>{profile.followers.length}</strong> followers</span>
              <span><strong>{profile.following.length}</strong> following</span>
            </div>
          </div>
        </div>

        <div className="profile-posts-grid">
          {profile.posts.map((post) => (
            <div key={post._id} className="grid-item">
              <img src={post.image} alt="post" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

module.exports = Profile;
