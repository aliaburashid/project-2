const React = require('react');

function SignUp({ error, success }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Sign Up - FlickGallery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
      </head>

      <body>
        <div id="wrapper">
          <div className="container d-flex justify-content-center align-items-center flex-column flex-md-row mt-5">
            <div className="phone-app-demo d-none d-md-block me-5">
              {/* Optional image here */}
            </div>

            <div className="form-data p-4 shadow rounded bg-white">
              {/* Flash Messages */}
              {error ? (
                <div className="alert alert-danger">{error}</div>
              ) : success ? (
                <div className="alert alert-success">{success}</div>
              ) : null}

              <form action="/authors" method="POST">
                <div className="logo text-center mb-3">
                  <h1 style={{ fontFamily: '"Dancing Script", cursive', fontSize: '2.8rem', fontWeight: '700', color: '#262626' }}>FlickGallery</h1>
                </div>

                {/* Full Name */}
                <input
                  className="form-control mb-2"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                />

                {/* Email */}
                <input
                  className="form-control mb-2"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                />

                {/* Password */}
                <div className="mb-2 position-relative">
                  <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <i
                    className="fas fa-eye position-absolute top-50 end-0 translate-middle-y me-3"
                    id="togglePassword"
                    style={{ cursor: 'pointer' }}
                  ></i>
                </div>

                {/* Bio */}
                <textarea
                  name="bio"
                  className="form-control mb-3"
                  placeholder="Tell us something about yourself..."
                  rows="2"
                ></textarea>

                <button className="btn btn-primary w-100 mb-3" type="submit">
                  Sign Up
                </button>

                <div className="text-center text-muted small">
                  By signing up, you agree to our <a href="#">Terms</a>,{' '}
                  <a href="#">Privacy Policy</a>, and{' '}
                  <a href="#">Cookies Policy</a>.
                </div>
              </form>

              <div className="sign-up text-center mt-4">
                Have an account? <a href="/authors/login">Log in</a>
              </div>

              <div className="get-the-app text-center mt-3">
                <span>Get the app</span>
                <div className="badge d-flex justify-content-center mt-2">
                  <img
                    className="me-2"
                    style={{ height: '40px' }}
                    src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                    alt="Android App"
                  />
                  <img
                    style={{ height: '40px' }}
                    src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
                    alt="iOS App"
                  />
                </div>
              </div>
            </div>
          </div>

          <footer className="text-center mt-5">
            <nav className="footer-nav">
              <ul className="list-inline">
                <li className="list-inline-item"><a href="#">About Us</a></li>
                <li className="list-inline-item"><a href="#">Support</a></li>
                <li className="list-inline-item"><a href="#">Jobs</a></li>
                <li className="list-inline-item"><a href="#">Privacy</a></li>
                <li className="list-inline-item"><a href="#">Terms</a></li>
                <li className="list-inline-item"><a href="#">Profiles</a></li>
                <li className="list-inline-item"><a href="#">Languages</a></li>
              </ul>
            </nav>
            <div className="text-muted">&copy; 2025 FlickGallery</div>
          </footer>
        </div>

        <script src="/passToggle.js"></script>
        <script src="/flashMessages.js"></script>
      </body>
    </html>
  );
}

module.exports = SignUp;
