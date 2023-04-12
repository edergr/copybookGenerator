const { assert } = require('chai');
const sinon = require('sinon');
const { LoginService } = require('../../../lib/services/login');
const { FakeMongoClient } = require('../../helpers/fakes/FakeMongoClient');
const { FakeTokenClient } = require('../../helpers/fakes/FakeTokenClient');
const { InternalError } = require('../../../lib/errors');

describe('Teste unitário Login - Casos de sucesso', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('deve chamar getCollection e retornar corretamente a collection', async () => {
    const fakeGetCollectionReturn = { test: 'collectionTest' };
    const fakeCollection = 'user';

    const fakeMongoClient = new FakeMongoClient();

    const getCollectionStub = sandbox.stub(fakeMongoClient, 'getCollection')
      .returns(fakeGetCollectionReturn);

    const loginService = new LoginService(fakeMongoClient);

    const collection = loginService._getCollection();

    sandbox.assert.calledOnceWithExactly(getCollectionStub, fakeCollection);
    assert.deepStrictEqual(collection, fakeGetCollectionReturn);
  });

  it('deve checar se o usuário já existe', async () => {
    const fakeEmail = 'teste@teste.com.br';
    const fakeResponse = {
      _id: '63b8853793a1fb0746c5deb1',
      email: 'teste@teste.com.br',
      password: 'Teste12345'
    };

    const collectionMockImplementation = () => {
      const mockContext = {};
      mockContext.findOne = sandbox.stub().resolves(fakeResponse);
      return mockContext;
    };

    const collectionMock = collectionMockImplementation();
    const fakeMongoClient = new FakeMongoClient(collectionMock);

    const loginService = new LoginService(fakeMongoClient);

    const expectedResult = await loginService.getUserIfExists(fakeEmail);

    sandbox.assert.calledOnce(collectionMock.findOne);
    assert.isNotNull(expectedResult);
    assert.deepStrictEqual(expectedResult, fakeResponse);
  });

  it('deve salvar o token no usuário', async () => {
    const fakeToken = '$2a$10$zt.4b9yltyKDYMXZxKugu/elpl7MydjeMDpgC';
    const fakeId = '63b865ae22735e0fbe2a553c';

    const collectionMockImplementation = () => {
      const mockContext = {};
      mockContext.findOneAndUpdate = sandbox.stub().resolves({ value: true });
      return mockContext;
    };

    const collectionMock = collectionMockImplementation();
    const fakeMongoClient = new FakeMongoClient(collectionMock);
    const loginService = new LoginService(fakeMongoClient);

    await loginService.saveTokenIntoUserDocument(fakeToken, fakeId);

    sandbox.assert.calledOnce(collectionMock.findOneAndUpdate);
  });

  it('deve encontrar e retornar o usuario', async () => {
    const fakeUserExists = {
      _id: '63b8853793a1fb0746c5deb1',
      email: 'teste@teste.com.br',
      password: '$2y$10$z7zGGDFBIWWJO06bEVyBG.ICCkIeTLHXmsBKXEcZjyMVvB2Owg0YK'
    };
    const fakeUserInserted = { value: true };
    const fakeToken = '$2a$10$zt.4b9yltyKDYMXZxKugu/elpl7MydjeMDpgC';

    const fakeMongoClient = new FakeMongoClient();
    const fakeTokenClient = new FakeTokenClient();

    const fakeInput = {
      email: 'teste@teste.com.br',
      password: 'Teste12345'
    };

    const loginService = new LoginService(fakeMongoClient, fakeTokenClient);

    const getUserIfExists = sandbox.stub(loginService, 'getUserIfExists')
      .returns(fakeUserExists);
    const fakeTokenClientStub = sandbox.stub(fakeTokenClient, 'create')
      .returns(fakeToken);
    const saveTokenIntoUserDocumentStub = sandbox.stub(loginService, 'saveTokenIntoUserDocument')
      .returns(fakeUserInserted);

    const expectedResult = await loginService.authentication(fakeInput);

    sandbox.assert.calledOnce(getUserIfExists);
    sandbox.assert.calledOnce(fakeTokenClientStub);
    sandbox.assert.calledOnce(saveTokenIntoUserDocumentStub);
    assert.isNotNull(expectedResult);
    assert.deepStrictEqual(expectedResult, fakeUserExists);
  });
});

describe('Teste unitário Login - Casos de falha', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('deve retornar erro ', async () => {
    const fakeUserExists = undefined;

    const fakeMongoClient = new FakeMongoClient();
    const fakeTokenClient = new FakeTokenClient();

    const fakeInput = {
      email: 'teste@teste.com.br',
      password: 'Teste12345'
    };

    const loginService = new LoginService(fakeMongoClient, fakeTokenClient);

    const getUserIfExists = sandbox.stub(loginService, 'getUserIfExists')
      .returns(fakeUserExists);

    let capturedError;
    try {
      await loginService.authentication(fakeInput);
    } catch (error) {
      capturedError = error;
    } finally {
      assert.isOk(capturedError);
    }

    sandbox.assert.calledOnce(getUserIfExists);
    assert.instanceOf(capturedError, InternalError);
  });

  it('deve retornar erro ao tentar autenticar sem sucesso', async () => {
    const fakeUserExists = {
      _id: '63b8853793a1fb0746c5deb1',
      email: 'teste@teste.com.br',
      password: '$2y$10$z7zGGDFBIWWJO06bEVyBG.ICCkIeTLHXmsBKXEcZjyMVvB2Owg0YK'
    };

    const fakeMongoClient = new FakeMongoClient();
    const fakeTokenClient = new FakeTokenClient();

    const fakeInput = {
      email: 'teste@teste.com.br',
      password: 'Teste12345'
    };

    const loginService = new LoginService(fakeMongoClient, fakeTokenClient);

    const getUserIfExists = sandbox.stub(loginService, 'getUserIfExists')
      .returns(fakeUserExists);

    sandbox.stub(loginService, 'saveTokenIntoUserDocument')
      .rejects(new Error('error'));

    let capturedError;
    try {
      await await loginService.authentication(fakeInput);
    } catch (error) {
      capturedError = error;
    } finally {
      assert.isOk(capturedError);
    }

    sandbox.assert.calledOnce(getUserIfExists);
    assert.instanceOf(capturedError, InternalError);
  });
});
