const React = require('react')

function Layout(props) {
  const { token } = props

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>FlickGallery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />

      </head>
      <body>
        {/* Top Navigation Bar */}
        <header style={{ borderBottom: '1px solid #dbdbdb', background: 'white' }}>
          <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
            {/* Logo - goes to home/feed page */}
            <a href={token ? `/posts?token=${token}` : '/'} style={{ textDecoration: 'none', fontSize: '1.8rem', fontWeight: '700', color: '#262626', fontFamily: "'Dancing Script', cursive" }}>
              FlickGallery
            </a>

            {/* Navigation icons */}
            <nav style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
              {/* Home icon */}
              <a href={token ? `/posts?token=${token}` : '/'}><i className="fas fa-home"></i></a>
              {/* New Post icon */}
              <a href={token ? `/posts/new?token=${token}` : '#'}><i className="fas fa-plus-square"></i></a>
              {/* Profile icon (fixed to correct route) */}
              <a href={token ? `/authors/profile?token=${token}` : '#'}><i className="far fa-user-circle"></i></a>
            </nav>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="app-container" style={{ marginTop: '2rem' }}>
          {props.children}
        </main>
      </body>
    </html>
  )
}

module.exports = Layout
