const React = require('react');
const Layout = require('../layouts/Layout');

function EditProfile({ author, token }) {
  return (
    <Layout token={token}>
      <div className="edit-profile-page">
        <h2 className="edit-profile-heading">Edit Profile</h2>

        <form
          className="edit-profile-form"
          action={`/authors/profile?_method=PUT&token=${token}`}
          method="POST"
          encType="multipart/form-data"
        >
          {/* Top Section with Profile Pic + Name */}
          <div className="edit-profile-top">
            <img
              id="profilePreview"
              src={author.profilePicture || '/images/default-avatar.png'}
              alt="Profile"
              className="edit-profile-avatar"
            />
            <div className="edit-profile-username">
              <strong>{author.name}</strong>
              <div style={{ marginTop: '0.5rem' }}>
                {/* Show visible Choose File input */}
                <input
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  accept="image/*"
                  onChange={() => {
                    const input = document.getElementById('profilePicture');
                    const preview = document.getElementById('profilePreview');
                    if (input.files && input.files[0]) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        preview.src = e.target.result;
                      };
                      reader.readAsDataURL(input.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bio Field */}
          <div className="edit-profile-field">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              id="bio"
              name="bio"
              defaultValue={author.bio}
              placeholder="Write something about yourself"
            />
          </div>

          {/* Save Button */}
          <div className="edit-profile-actions">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

module.exports = EditProfile;
