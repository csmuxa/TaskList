# TaskList

##Backend

## Сервер разработки
Чтобы запустить проект должен быть установлен [JDK11] (https://www.oracle.com/technetwork/java/javase/downloads/) и [Apache Maven] (https://maven.apache.org/download.cgi)
После установки JDK11 перейдите в директорию с проектом, затем в папку target и введите команду: java -jar <jar-file-name>.jar 
После успешного запуска перейдите к сборке и запуску Frontend.


## Сборка
Введите команду `mvn install` в директории с проектом, чтобы собрать проект. Собранный проект будет расположен в папке `/target`.







##Frontend

## Сервер разработки
Чтобы запустить проект должен быть установлен [NodeJS](https://nodejs.org/en/download/)
После установки NodeJS перейдите в директорию с проектом и введите команду: `npm i` чтобы установить зависимости и запустить проект у себя на машине.
Чтобы запустить проект введите команду `ng serve` для старта дев серверва. После успешного запуска в браузере перейдите по адресу: [`http://localhost:4200/`](http://localhost:4200/)
 
## Сборка
Введите команду `ng build` чтобы собрать проект. Собранный проект будет расположен в папке `/dist`. Используйте флажок `--prod` для продакшн сборки (`ng build --prod`).
 
