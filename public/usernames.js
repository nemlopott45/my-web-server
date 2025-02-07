let User = ["oliver", "hallgat"];
let Code = ["q1w2e3r4t5"];
var i = 0; 

document.addEventListener("DOMContentLoaded", function () {
    const logButton = document.getElementById("log");
    const storedTime = localStorage.getItem("logDisableUntil");

    // Ellenőrizzük, hogy a gombnak tiltva kell-e lennie az oldal betöltésekor
    if (storedTime) {
        const disableUntil = parseInt(storedTime, 10);
        const remainingTime = disableUntil - Date.now();

        if (remainingTime > 0) {
            logButton.disabled = true;
            console.log(`Gomb tiltva marad még ${remainingTime / 1000} másodpercig`);

            // Beállítjuk, hogy a tiltás feloldódjon a megfelelő időben
            setTimeout(() => {
                logButton.disabled = false;
                localStorage.removeItem("logDisableUntil");
                console.log("Gomb újra engedélyezve!");
            }, remainingTime);
        } else {
            // Ha a tiltási idő már lejárt, engedélyezzük a gombot
            logButton.disabled = false;
            localStorage.removeItem("logDisableUntil");
        }
    }
});

function getInput() {
    var username = document.getElementById('name').value;
    var password = document.getElementById('pass').value;
    const logButton = document.getElementById('log');

    if (User.includes(username)) {
        if (Code.includes(password)) {
            window.open("chatindex.html");
        } else {
            alert("Helytelen jelszó!");
            i++;

            if (i === 3) {
                alert("3 próbálkozás megvolt, a bejelentkezés 10 percre tiltva!");

                logButton.disabled = true; // Gomb azonnali tiltása
                const disableUntil = Date.now() + 600000; // Most + 10 perc (600000 ms)
                localStorage.setItem("logDisableUntil", disableUntil);

                // Beállítunk egy időzítőt, amely 10 perc múlva visszakapcsolja a gombot
                setTimeout(() => {
                    logButton.disabled = false;
                    localStorage.removeItem("logDisableUntil");
                    console.log("Gomb újra engedélyezve!");
                }, 600000);
            }
        }
    } else {
        alert("Helytelen felhasználónév!");
    }
}
