module.exports = {
  reactStrictMode: true,
  // Penting: Deno Deploy static nggak bisa optimasi image otomatis lewat server
  images: {
    loader: 'imgix',
    path: '',
    unoptimized: true,
  },
  // Memaksa pakai Webpack 5 (bawaan Next 11)
  webpack5: true,
}
