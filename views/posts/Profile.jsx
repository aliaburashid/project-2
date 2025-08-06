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
                        <a href={`/authors/edit?token=${token}`} className="btn btn-outline-secondary" style={{ marginTop: '10px' }}>
                            <i className="fas fa-edit"></i> Edit Profile
                        </a>

                    </div>
                </div>

                <div className="profile-posts-grid">
                    {profile.posts.map((post) => (
                        <div key={post._id} className="grid-item">
                            <a href={`/posts/${post._id}?token=${token}`}>
                                <img src={post.image} alt="post" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

module.exports = Profile;
