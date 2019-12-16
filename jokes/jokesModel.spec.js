const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConfig");

describe("clear out database on each test", () => {
  beforeEach(async () => {
    await db("books").truncate();
  });
});

describe("POST /register", () => {
  it("responds with 200 OK", async done => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "Eden", password: "1234" });
  });
  it("responds with JSON", async done => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "test", password: "test" })
      .expect("Content-Type", /json/i);

    done();
  });
});

describe("POST  to /api/auth/login", () => {
  it("responds with 200 OK", async done => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "Eden", password: "1234" });

    request(server)
      .post("/api/auth/login")
      .send({ username: "Nia", password: "4321" })
      .expect(200);

    done();
  });

  it("responds with JSON", async done => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "daughters", password: "2468" });

    request(server)
      .post("/api/auth/login")
      .send({ username: "sons", password: "abcd" })
      .expect("Content-Type", /json/i);

    done();
  });
});
