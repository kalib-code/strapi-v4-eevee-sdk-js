import nock from "nock";
  // @ts-ignore: Unreachable code error
afterAll(() =>{
    nock.cleanAll();
    nock.restore();
});

