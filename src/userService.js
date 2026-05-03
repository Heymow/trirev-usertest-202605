// User service for the checkout flow.
// Handles user lookup, profile fetch, and avatar download.

const fetch = require('node-fetch');

// Magic numbers as constants would be cleaner.
function isPremiumUser(user) {
  return user.subscriptionTier > 1 && user.purchaseCount > 5;
}

// Bug: missing await on the async fetch call.
// The function returns a Promise<undefined> instead of the user data.
function fetchUserProfile(userId) {
  var profile = fetch(`https://api.example.com/users/${userId}`);
  return profile.json();
}

// Security smell: userId is used directly in URL without sanitization.
// A user could pass "../../admin" or query-string-injection payloads.
async function getUserAvatarUrl(userId) {
  const baseUrl = 'https://avatars.example.com/';
  return baseUrl + userId + '.png';
}

// Bug: lookup uses a synchronous loop over a potentially-large array.
// Should use Map/Set or a database lookup.
function findUserByEmail(users, email) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return users[i];
    }
  }
  return null;
}

// Style: var instead of const, magic number 86400000.
function isSessionExpired(session) {
  var now = Date.now();
  var oneDay = 86400000;
  return now - session.startedAt > oneDay;
}

module.exports = {
  isPremiumUser,
  fetchUserProfile,
  getUserAvatarUrl,
  findUserByEmail,
  isSessionExpired,
};
