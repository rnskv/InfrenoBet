# InfrenoBet
Игровая платформа для проведения мгновенных лотерей. 

### ОБЩАЯ АРХИТЕКТУРА
//@todo

### CLIENT
 >Fronted часть приложения
//@todo

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

### Добавление нотификаций пользовтаелю:

Для того что бы добавить нотификацию необходимо получить доступ к методу `dispatch` и используя метод `actions.user.addNotification({ type: NOTIFICATION_TYPE, params: INotification })` отправить уведомление.
* ***type*** - тип траназкции по которой будет получен объект траназкции.
* ***params*** - объект с параметрами которые перезапишут полученные из стандартной нотификации полученной по типу. 
>Например, если для нотификации TRANSACTION_SENDING нужно будет кастомизировать поле ***text***.

Интерфейс нотификации:
```
INotification = {
  type: String,
  title: String,
  text: String,
  date: Date
}
```

Типы транзакций находятся в `shared/configs/notificationTypes.js`.
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
