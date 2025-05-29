import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
  stages: [
    { duration: "20s", target: 20 },
    { duration: "1m40s", target: 20 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<1000"],

    http_req_failed: ["rate<0.01"],

    checks: ["rate>0.99"],
  },
};

const BASE_URL = "http://lojaebac.ebaconline.art.br";

const productSlugs = [
  "abominable-hoodie",
  "astronaut-star-projector",
  "wordpress-pennant",
];

const users = [
  { user: "user1_ebac", pass: "psw!ebac@test" },
  { user: "user2_ebac", pass: "psw!ebac@test" },
  { user: "user3_ebac", pass: "psw!ebac@test" },
  { user: "user4_ebac", pass: "psw!ebac@test" },
  { user: "user5_ebac", pass: "psw!ebac@test" },
];

export default function () {
  group("Caso de Teste 1: Acessar Home Page EBAC Shop", () => {
    const res = http.get(BASE_URL + "/");
    check(res, {
      "Home: status é 200": (r) => r.status === 200,
      'Home: contém texto "EBAC Shop" ou um título esperado': (r) =>
        r.body.includes("EBAC Shop") ||
        r.body.includes("<title>EBAC Shop</title>"), 
    });
    sleep(Math.random() * 2 + 1);
  });

  group("Caso de Teste 2: Acessar Página de Produto EBAC Shop", () => {
    const randomProductSlug =
      productSlugs[Math.floor(Math.random() * productSlugs.length)];
    if (randomProductSlug) {
      const productURL = `${BASE_URL}/product/${randomProductSlug}/`;
      const res = http.get(productURL);
      check(res, {
        [`Produto (${randomProductSlug}): status é 200`]: (r) =>
          r.status === 200,
        [`Produto (${randomProductSlug}): contém botão "Comprar"`]: (r) =>
          r.body.includes("Comprar") ||
          r.body.includes("Adicionar ao carrinho"),
      });
    }
    sleep(Math.random() * 3 + 1);
  });
}
