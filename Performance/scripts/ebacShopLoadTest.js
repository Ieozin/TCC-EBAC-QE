import http from "k6/http";
import { check, sleep, group } from "k6";
import { Trend } from "k6/metrics";

const homePageDuration = new Trend("duration_homepage_load");
const productPageDuration = new Trend("duration_productpage_load");
const loginPageGetDuration = new Trend("duration_loginpage_get");
const loginActionDuration = new Trend("duration_login_action");

export const options = {
  stages: [
    { duration: "20s", target: 20 },
    { duration: "1m40s", target: 20 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<5000"],
    http_req_failed: ["rate<0.01"],
    checks: ["rate>=0.99"],
    duration_homepage_load: ["p(95)<5000"],
    duration_productpage_load: ["p(95)<5500"],
    duration_loginpage_get: ["p(95)<4000"],
    duration_login_action: ["p(95)<3500"],
  },
};

const BASE_URL = "http://lojaebac.ebaconline.art.br";
const productSlugs = ["abominable-hoodie", "aether-gym-pant"];
const users = [
  { user: "user1_ebac", pass: "psw!ebac@test" },
  { user: "user2_ebac", pass: "psw!ebac@test" },
  { user: "user3_ebac", pass: "psw!ebac@test" },
  { user: "user4_ebac", pass: "psw!ebac@test" },
  { user: "user5_ebac", pass: "psw!ebac@test" },
];

export default function () {
  const randomUser = users[Math.floor(Math.random() * users.length)];

  group("Scenario: Acessar Home Page", () => {
    const res = http.get(BASE_URL + "/");
    const homeCheck = check(res, {
      "Home: status é 200": (r) => r.status === 200,
      "Home: corpo não é nulo": (r) => r.body != null,
    });
    if (homeCheck && res.timings) {
      homePageDuration.add(res.timings.duration);
    }
    sleep(1);
  });

  group("Scenario: Acessar Página de Produto", () => {
    const randomProductSlug =
      productSlugs[Math.floor(Math.random() * productSlugs.length)];
    const productURL = `${BASE_URL}/product/${randomProductSlug}/`;
    const res = http.get(productURL);
    const productCheck = check(res, {
      [`Produto (${randomProductSlug}): status é 200`]: (r) => r.status === 200,
    });
    if (productCheck && res.timings) {
      productPageDuration.add(res.timings.duration);
    }
    sleep(1);
  });

  group("Scenario: Realizar Login", () => {
    const myAccountPageRes = http.get(BASE_URL + "/minha-conta/");

    const getPageCheck = check(myAccountPageRes, {
      "Login Page (GET): status é 200": (r) => r.status === 200,
      "Login Page (GET): corpo da resposta não é nulo": (r) => r.body != null,
    });
    if (getPageCheck && myAccountPageRes.timings) {
      loginPageGetDuration.add(myAccountPageRes.timings.duration);
    }

    if (myAccountPageRes.status !== 200 || !myAccountPageRes.body) {
      return;
    }

    let loginNonce = null;
    const nonceMatch = myAccountPageRes.body.match(
      /name="woocommerce-login-nonce"\s*value="([^"]+)"/
    );
    if (nonceMatch && nonceMatch[1]) {
      loginNonce = nonceMatch[1];
    }

    if (!loginNonce) {
      console.error(
        `VU ${__VU} Iteração ${__ITER}: Não foi possível extrair o woocommerce-login-nonce. O login provavelmente falhará.`
      );
      sleep(1);
      return;
    }
    sleep(1);

    const loginPayload = {
      username: randomUser.user,
      password: randomUser.pass,
      login: "Login",
      "woocommerce-login-nonce": loginNonce,
      _wp_http_referer: "/minha-conta/",
    };

    const loginActionRes = http.post(BASE_URL + "/minha-conta/", loginPayload, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      tags: { name: "LoginPostAttempt" },
    });

    let loginSuccess = false;
    const loginStatusCheck = check(loginActionRes, {
      "Login Action (POST): status é 200": (r) => r.status === 200,
      "Login Action (POST): URL é /minha-conta/": (r) =>
        r.url.endsWith("/minha-conta/"),
    });

    if (loginStatusCheck && loginActionRes.body) {
      const greetingFound =
        loginActionRes.body.includes("Olá,") ||
        loginActionRes.body.includes(randomUser.user.split("_")[0]);
      check(loginActionRes, {
        "Login Action (POST): contém saudação": () => greetingFound,
      });
      if (!greetingFound) {
        console.warn(
          `VU ${__VU} Iteração ${__ITER}: Falha ao encontrar saudação para ${
            randomUser.user
          }. Resposta: ${loginActionRes.body.substring(0, 300)}`
        );
      }
      loginSuccess = greetingFound;
    } else if (loginActionRes) {
      console.warn(
        `VU ${__VU} Iteração ${__ITER}: Login POST falhou status/url. Status: ${loginActionRes.status}, URL: ${loginActionRes.url}`
      );
    }

    if (loginSuccess && loginActionRes.timings) {
      loginActionDuration.add(loginActionRes.timings.duration);
    }
    sleep(Math.random() * 2 + 1);
  });
}
