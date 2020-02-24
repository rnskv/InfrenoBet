# InfrenoBet
Игровая платформа для проведения мгновенных лотерей. 


### Добавление нотификаций пользовтаелю:

Для того что бы добавить нотификацию необходимо получить доступ к методу `dispatch` и используя метод `actions.user.addNotification({ notification })` отправить уведомление.

```
INotification = {
  type: String,
  title: String,
  text: String,
  date: Date
}
```

 Все **types** находятся в `shared/configs/notificationTypes.js`
