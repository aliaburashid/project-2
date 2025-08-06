const React = require('react');
const Layout = require('../layouts/Layout');

function EditProfile({ author, token }) {
  return (
    <Layout token={token}>
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>

        <form action={`/authors/profile?_method=PUT&token=${token}`} method="POST" encType="multipart/form-data">
          {/* Profile Picture Preview */}
          <img src={author.profilePicture || '/images/default-avatar.png'} alt="avatar" className="edit-avatar" />

          {/* Profile Picture Upload */}
          <div>
            <label>Profile Picture</label>
            <input type="file" name="profilePicture" />
          </div>

          {/* Bio Field */}
          <div>
            <label>Bio</label>
            <input type="text" name="bio" defaultValue={author.bio} />
          </div>

          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </Layout>
  );
}

module.exports = EditProfile;
