const TMDB = "32f8536c291f6f7caf302e318e0aee9d";
const DATABASE_URL =
  "postgres://prakadznfwmpra:b2fae46a60b388ee17f1110cd5db31d1cf57dfd9f454086cc7d0516ce56f921e@ec2-52-20-166-21.compute-1.amazonaws.com:5432/da18h9bm0kcn3j";
const RECAPTCHA = "6Ldv1u4gAAAAAFkJDEmm4BUYagiAbktAVbbXn_wG";
const CREDENTIALS1 = JSON.stringify({
  web: {
    client_id:
      "71143494084-8radob2255r2j0bvk9u6umnfl0tn75q7.apps.googleusercontent.com",
    project_id: "film-review-web",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_secret: "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",
    redirect_uris: ["https://review-film-backend.herokuapp.com/callback"],
  },
});
module.exports = {
  TMDB: TMDB,
  DATABASE_URL: DATABASE_URL,
  RECAPTCHA: RECAPTCHA,
  CREDENTIALS1: CREDENTIALS1,
};
