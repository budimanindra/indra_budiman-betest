import request from "supertest";
import mongoose from "mongoose";

import { app } from "../app";

const newUser = {
  "userName": "Indra20",
  "emailAddress": "qasantest20@gmail.com",
  "identityNumber": 121,
  "accountNumber": 212
}

const dataSuccessLoginUser = {
  "userName": "Indra20",
  "emailAddress": "qasantest20@gmail.com"
}

const dataFailedLoginUser = {
  "userName": "Indra20000",
  "emailAddress": "qasantest20@gmail.com"
}

const updateUser = {
  "userName": "Indra",
  "emailAddress": "qasantest@gmail.com",
  "identityNumber": 111,
  "accountNumber": 222
}

let token

describe("POST /api/user/", () => {
  test("should create an user", async () => {
    const res = await request(app).post("/api/user/").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User created successfully');
  });

  test("cannot create an user due to missing username", async () => {
    const res = await request(app).post("/api/user/").send({
      emailAddress: "qasantest27@gmail.com",
      identityNumber: 127,
      accountNumber: 217
    });
    expect(res.body.message).toContain('Users validation failed: userName: Path `userName` is required.');
  });

  test("cannot create an user due to missing identity number", async () => {
    const res = await request(app).post("/api/user/").send({
      userName: "Indra28",
      emailAddress: "qasantest27@gmail.com",
      accountNumber: 217
    });
    expect(res.body.message).toContain('Users validation failed: identityNumber: Path `identityNumber` is required.');
  });
});

describe("POST /api/auth/login", () => {
  test("should properly Login", async () => {
    const res = await request(app).post("/api/auth/login/").send(dataSuccessLoginUser);
    token = res.body.token
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe('login successfully');
  });
  test("cannot login due to wrong username", async () => {
    const res = await request(app).post("/api/auth/login/").send(dataFailedLoginUser);
    expect(res.statusCode).toBe(404)
    expect(res.body.message).toBe('wrong username or email address');
  });
});

describe("GET /api/user/", () => {
  it("cannot get all user due to unauthorized", async () => {
    const res = await request(app).get("/api/user/")
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('Unauthorized Access')
  });
  it("should get all user", async () => {
    const res = await request(app).get("/api/user/").set("authorization-token", token)
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /api/user/account-number/:accountNumber", () => {
  it("cannot get an user by searching accountNumber due to unauthorized", async () => {
    const res = await request(app).get("/api/user/account-number/212")
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('Unauthorized Access')
  });
  it("should get an user by searching its accountNumber", async () => {
    const res = await request(app).get("/api/user/account-number/212").set("authorization-token", token)
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /api/user/identity-number/:identityNumber", () => {
  it("cannot get an user by searching identityNumber due to unauthorized", async () => {
    const res = await request(app).get("/api/user/identity-number/121")
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('Unauthorized Access')
  });
  it("should get an user by searching its identityNumber", async () => {
    const res = await request(app).get("/api/user/identity-number/121").set("authorization-token", token)
    expect(res.statusCode).toBe(200);
  });
});

describe("PATCH /api/user/identity-number/:identityNumber", () => {
  it("cannot update an user by its identityNumber due to unauthorized", async () => {
    const res = await request(app).patch("/api/user/identity-number/121")
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('Unauthorized Access')
  });
  it("should update an user data by its identityNumber", async () => {
    const res = await request(app).patch("/api/user/identity-number/121").send(updateUser).set("authorization-token", token)
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /api/user/identity-number/:identityNumber", () => {
  it("cannot delete an user by its identityNumber due to unauthorized", async () => {
    const res = await request(app).delete("/api/user/identity-number/111")
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('Unauthorized Access')
  });
  it("cannot delete an unknown user by its identityNumber", async () => {
    const res = await request(app).delete("/api/user/identity-number/121").set("authorization-token", token)
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toContain('No user with that Identity Number')
  });
  it("should delete an user data by its identityNumber", async () => {
    const res = await request(app).delete("/api/user/identity-number/111").send(updateUser).set("authorization-token", token)
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("User deleted successfully")
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
})