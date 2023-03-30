# Leg10n

# Idea
https://miro.com/app/board/uXjVPoxgaGk=/


# Go artifacts
```
solc --abi --bin ./contracts/Leg10n.sol -o build ..=.. --overwrite --allow-paths *,/node_modules/,
abigen --abi="build/Leg10n.abi" --pkg=Leg10n --out="./go/leg10n.go"
```


This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
npx hardhat size-contracts

```


## Description

### 1. Регистрация


Пользователи регистрируются в системе через телеграмм-бота. При регистрации пользователь выбирает кодовое имя. Пользователь всегда должен быть прикреплен к ячейке или к тому, кто его пригласил. Таким образом если пользователь хочет вступить в ячейку Боба, то его имя должно начинаться с «B». Если он хочет создать ячейку под Бобом, то «C».

Таким образом предполагается, что лично знакомы только 5 участников движения одновременно, поэтому в случае предательства сеть теряет только 5 человек максимум

Пользователи всегда должны быть привязаны к чему-то. В случае компрометации кого-то из участников, пользователи могут временно отсоединится от организации и присоединится к другой ячейке в неповрежденном участке сети


При регистрации пользователи записывают в смарт-контракт ассоциацию code_name => User
В объект User включается tgid и публичный ключ

tg_id может быть дополнительно зашифрован ключом бота, для дополнительной приватности
Предполагается, что у пользователей уже есть телеграм зарегистрированный на другой номер и они используют прокси

https://leg10n.vercel.app/requestJoin


### 2. Приватная Коммуникация

В случае, когда пользователю необходимо связаться с другим пользователем (у которого он знает только кодовое имя), то пользователь отправляет запрос боту, который отправляет эту ссылку:

https://leg10n.vercel.app/encrypt

В качестве алгоритмов шифрования используется связка x25519-xsalsa20-poly1305

x25519 – Curve25519 - Стандартная эллиптическая кривая, обеспечивающая 128-битное шифрование при длине ключа 256 бит

Salsa20 – система поточного шифрования (т.н. поточный шифр, используется дли шифрования stream данных передающихся по сети с большой пропускной способностью)

POLY1305-AES – AES стандарт для аутентификации и проверки подлинности сообщения
Первый алгоритм шифрует только само тело сообщения, второй дополнительно шифрует передачу данных по сети, третий служит для дополнительной проверки подписи отправителя и защиты от MITM

Пользователю необходимо написать сообщение и кодовое имя адресата, и просто нажать на кнопку
Интерфейс на frontend вытащит из блокчейна публичный ключ ассоцированный с этим кодовым именем и зашифрует сообщение специально для искомого пользователя
Затем пользователь может отправить зашифрованное сообщение через бота, таким образом не зная с кем именно персонально он контактирует

Пользователь получивший сообщение может его расшифровать используя следующую ссылку: 

https://leg10n.vercel.app/decrypt

### 3. Публичные и групповые каналы


В случае необходимости пользователи организации могут быть подписаны на “публичный” канал или форум, на котором могут оставлять свои сообщения через бота


