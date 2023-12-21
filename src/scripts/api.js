export let currentUserId;
const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-2';
const authorizationToken = 'c1324e8c-3ffd-41bf-8d8d-d39bc9277f92';

const config = {
  headers: {
    authorization: authorizationToken,
    'Content-Type': 'application/json',
  },
};

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function authorizeUser() {
  return request(`${baseUrl}/users/me`, { headers: config.headers }).then(
    (result) => {
      currentUserId = result._id;
      return {
        name: result.name,
        about: result.about,
        avatar: `url('${result.avatar}')`,
        _id: currentUserId,
      };
    }
  );
}

export function getCardsFromServer() {
  return request(`${baseUrl}/cards`, { headers: config.headers }).then(
    (result) => {
      const initialCardsFromServer = Array.from(result);
      return initialCardsFromServer;
    }
  );
}

export function pushMyAuthorizationToServer(name, description) {
  return request(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  });
}

export function pushMyCardToServer(cardName, cardLink) {
  return request(`${baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  });
}

export function deleteCardOnServer(cardId) {
  return request(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  });
}

export function likeCardOnServer(cardId) {
  return request(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({}),
  });
}

export function disLikeCardOnServer(cardId) {
  return request(`${baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
    body: JSON.stringify({}),
  });
}

export function updateUserAvatar(avatarUrl) {
  return request(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  });
}

export function fetchUserDataAndCards() {
  return Promise.all([authorizeUser(), getCardsFromServer()]).then(
    ([userData, cardsData]) => {
      return { userData, cardsData };
    }
  );
}
