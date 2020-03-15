[![Build Status](https://travis-ci.com/rnskv/InfrenoBet.svg?branch=master)](https://travis-ci.com/rnskv/InfrenoBet)

* [Pipelines](https://travis-ci.org/github/rnskv/InfrenoBet/builds)

* [Trello deck](https://trello.com/b/hyBSf4AA/infernobet)

# InfrenoBet
Игровая платформа для проведения мгновенных лотерей.
### Докер
* Публикация образа

1.) Получаем ID образа
```
 docker images
```

2.) Привязываем тэг
```
docker tag {IMAGE_ID} rnskv/${project_name}
```

3.) Пушим
```
docker push rnskv/${project_name}
```

*Запуск образа
```
docker run -p {SERVER_PORT}:${IMAGE_PORT} {IMAGE_NAME}
```
### Запуск development
*  Client
```
 npm run start:dev
```

* Backend
```
 npm run start watch && npm run start:dev
```

* Realtime
```
 npm run start watch && npm run start:dev
```

### ОБЩАЯ АРХИТЕКТУРА
//@todo

### CLIENT
 >Fronted часть приложения
 <img src="https://sun9-23.userapi.com/c857320/v857320832/108f36/6ZD9p4LP0-E.jpg"/>

### BACKEND
 >Backend часть приложения
//@todo

### REALTIME
 >Часть реализующая real-time соединение backend с frontend, а так же обрабатывающая задачи необходимые "здесь и сейчас"
//@todo

### АРХИТЕКТУРА
//@todo

### АРХИТЕКТУРА
//@todo


### Работа с API:
//@todo

### Работа с нотификациями:
Интерфейс нотификации:
```
INotification = {
  type: String, Тип ERROR || SUCCESS
  title: String, Заголовок
  text: String, Содержание уведомления
  date?: Date, Дата отправки в формате Date.now()
  status?: Number, Если серверное уведомление - необходимо указать код статуса ответа.
}
```
Важно! Что бы пользователь своевременно узнавал о всех проблемах которые возникают в любой из частей системы, поэтому все нотификации вынесены в shared логику и используются повсеместно.
Типы нотификаций находятся в `shared/configs/notificationTypes.js`.
Описываются следующим образом: 
```
export const TRANSACTION_SENDING = 'TRANSACTION_SENDING';
```
***Важно сохранять семантику!***

Сами транзакции имеют доступ по их типу. Находятся в `shared/configs/notifications.js`.
Описываются следующим образом:

```
export default {
    .....
    [TRANSACTION_SENDING]: {
        title: 'Системное уведомление',
        text: 'Ваша транзакция успешно поставлена в очередь! Она будет добавлена в игру в течении ~5 сек.',
    },
    ......
}
```

#### CLIENT
Для того что бы добавить нотификацию необходимо получить доступ к методу `dispatch` и используя метод `actions.user.addNotification({ type: NOTIFICATION_TYPE, params: INotification })` задиспатчить уведомление.
* ***type*** - тип траназкции по которой будет получен объект траназкции.
* ***params*** - объект с параметрами которые перезапишут полученные из стандартной нотификации полученной по типу. 
>Например, если для нотификации TRANSACTION_SENDING нужно будет кастомизировать поле ***text***.

#### BACKEND
Для того что бы выбросить из контроллера ошибку, которую увидет пользователь в нотификации, необходимо вызвать метод 
`ctx.throw({ type: YOUR_NOTIFICATION_TYPE })`, при этом необходимо чтоб на клиенте экземпляр данного участка API в обработчике onError вызывал диспатч добавления нотификации.

