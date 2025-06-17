import { app } from "./app";
import request from "supertest";

describe("App", () => {
  it("should be defined", () => {
    expect(app).toBeDefined();
  });

  it("should respond to GET / with Hello World!", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello World!");
  });
});
