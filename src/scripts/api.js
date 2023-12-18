export const currentUserId = '6e340979d9839190a86d236f';
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: 'c1324e8c-3ffd-41bf-8d8d-d39bc9277f92',
    'Content-Type': 'application/json',
  },
};

export function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function uzerAuthorization() {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(checkResponse)
    .then((result) => {
      return {
        name: result.name,
        about: result.about,
        avatar: `url('${result.avatar}')`,
      };
    });
}

export function getCardsFromServer() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkResponse)
    .then((result) => {
      const initialCardsFromServer = Array.from(result);
      return initialCardsFromServer;
    });
}

export function pushMyAuthorizationToServer(name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  });
}

export function pushMyCardToServer(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then(checkResponse);
}

export function deleteCardOnServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  });
}

export function likeCardOnServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({}),
  }).then(checkResponse);
}

export function disLikeCardOnServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({}),
  }).then(checkResponse);
}

export function changeMyAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(checkResponse);
}
