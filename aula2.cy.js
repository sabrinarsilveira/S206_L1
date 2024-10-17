///<reference = cypress>

describe("Teste da criação, registro e login", () => {
  it("Teste de criação de usuário com sucesso", () => {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type("Sabrina")
    cy.get('#Text1').type("Sabrina")
    cy.get('#username').type("Sabrina")
    cy.get('#password').type("Sabrina")
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should("contain.text", "Registration successful")
  })



  it("Teste de criação de usuário com falha", () => {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type("Sabrina")
    cy.get('#Text1').type("Sabrina")
    cy.get('#username').type("Sabrina")
    cy.get('.btn-primary').should("be.disabled")
  })

  it("Teste de login com sucesso", () => {
    let infos = criarUser()
    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should("contain.text", infos[0])
  })

  it("Teste de login após o delete", () => {
    let infos = criarUser();  // Essa função vai retornar o ID e a Senha
    let ID = infos[0];
    let Senha = infos[1];

    cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    logarUser(ID, Senha)
    cy.get('.ng-binding > a').click()
    cy.get('.btn').click()
    logarUser(ID, Senha)
    cy.get('.ng-binding').should("contain.text", "Username or password is incorrect")


  })

  it("Delete com sucesso", () => {
    let infos = criarUser()
    cy.login(infos[0], infos[1])
    cy.get('.ng-binding > a').click()
    cy.get('.btn').click()
    cy.login(infos[0], infos[1])
    cy.get('.ng-binding').should("have.text", "Username or password is incorrect")


  })


})

function criarUser() {
  let hora = new Date().getHours().toString()
  let minuto = new Date().getMinutes().toString()
  let segundo = new Date().getSeconds().toString()
  let ID = hora + minuto + segundo + "ID"
  let Senha = hora + minuto + segundo + "Senha"
  let infos = [ID, Senha]

  cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(ID)
  cy.get('#Text1').type(ID)
  cy.get('#username').type(ID)
  cy.get('#password').type(Senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should("contain.text", "Registration successful")
  return infos
}

function logarUser(ID, Senha) {
  // Acessar a página de login
  cy.visit('https://www.globalsqa.com/angularJs-protractor/registration-login-example/#/login')

  // Preencher o campo de usuário e senha com as informações fornecidas
  cy.get('#username').type(ID)
  cy.get('#password').type(Senha)

  // Clicar no botão de login
  cy.get('.btn-primary').click()

  // Verificar se o login foi bem-sucedido, checando uma mensagem ou elemento que aparece após o login
  //cy.get('.ng-binding').should("contain.text", "Hi " + ID)

  // Retornar uma mensagem de sucesso
  //return "Login successful"
}

