// в файле api.js описаны функции для взаимодействия с сервером;
import { renderLoading } from './index.js';

export const currentUserId = '6e340979d9839190a86d236f';

export function uzerAuthorization() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me', {
    headers: {
      authorization: 'c1324e8c-3ffd-41bf-8d8d-d39bc9277f92',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return {
        name: result.name,
        about: result.about,
        avatar: `url('${result.avatar}')`,
      };
    });
}

export function getCardsFromServer() {
  return fetch('https://nomoreparties.co/v1/wff-cohort-2/cards', {
    headers: {
      authorization: 'c1324e8c-3ffd-41bf-8d8d-d39bc9277f92',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      const initialCardsFromServer = Array.from(result);
      return initialCardsFromServer;
    });
}

export function pushMyAuthorizationToServer(name, description) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'c1324e8c-3ffd-41bf-8d8d-d39bc9277f92',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      throw err;
    });
}

export function pushMyCardToServer(cardName, cardLink) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-2/cards ', {
    method: 'POST',
    headers: {
      authorization: 'c1324e8c-3ffd-41bf-8d8d-d39bc9277f92',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      throw err;
    })
    .finally(() => {
      renderLoading(false);
    });
}

export function deleteCardOnServer(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-2/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'c1324e8c-3ffd-41bf-8d8d-d39bc9277f92',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function likeCardOnServer(cardId) {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-2/cards/likes/${cardId}`,
    {
      method: 'PUT',
      headers: {
        authorization: 'c1324e8c-3ffd-41bf-8d8d-d39bc9277f92',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function disLikeCardOnServer(cardId) {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-2/cards/likes/${cardId}`,
    {
      method: 'DELETE',
      headers: {
        authorization: 'c1324e8c-3ffd-41bf-8d8d-d39bc9277f92',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function changeMyAvatar(avatarUrl) {
  return fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me/avatar ', {
    method: 'PATCH',
    headers: {
      authorization: 'c1324e8c-3ffd-41bf-8d8d-d39bc9277f92',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => console.log(`Ошибка: ${res.status}`))
    .finally((res) => renderLoading(false));
}
