describe("Teste do moodle inatel ", () => {
    it("Teste de login com falha", () => {
        cy.visit('https://moodle.inatel.br/login/index.php')
        cy.get('#username').type("1107@ges.inatel.br")
        cy.get('#password').type("A@bcde122345")
        cy.get('#loginbtn').click()
        cy.get('.alert').should("contain.text", "Nome de usuário ou senha errados. Por favor tente outra vez.")

    })

    it("Teste de login com sucesso", () => {
        cy.visit('https://moodle.inatel.br/login/index.php')
        cy.get('#username').type("INSIRA SEU EMAIL")
        cy.get('#password').type("INSIRA SUA SENHA")
        cy.get('#loginbtn').click()
        cy.get('#instance-5676-header').should("contain.text", "Resumo dos cursos")

    })

    it("Teste do botão Esqueceu o seu usuário ou senha?", () => {
        cy.visit('https://moodle.inatel.br/login/index.php')
        cy.get('.rui-login-forgot-btn').click()
        cy.get('#id_searchbyusername > legend').should("have.text", "Buscar por identificação de usuário")

    })

    it("Teste para vericar se aparece Graduação e Inatel Maker em todos os cursos ", () => {
        cy.visit('https://moodle.inatel.br/login/index.php')
        cy.acessar("INSIRA SEU EMAIL", "INSIRA SUA SENHA")
        cy.get('.active > .nav-link').click()
        cy.get('[data-categoryid="1"] > .wrapper-fw > .categoryname > .rui-category-link').should("have.text", "Graduação")
        cy.get('[data-categoryid="34"] > .wrapper-fw > .categoryname > .rui-category-link').should("have.text", "Inatel Maker")
    })

    it("Teste para verivicar se teve Física IV no 1º semestre de 2024 ", () => {
        cy.visit('https://moodle.inatel.br/login/index.php')
        cy.acessar("INSIRA SEU EMAIL", "INSIRA SUA SENHA")
        cy.get('.active > .nav-link').click()
        cy.get('[data-categoryid="1"] > .wrapper-fw > .categoryname').click()
        cy.get('[data-categoryid="117"] > .wrapper-fw > .categoryname').click()
        cy.get('[data-categoryid="118"] > .wrapper-fw > .categoryname').click()
        cy.get('[data-categoryid="119"] > .wrapper-fw > .categoryname > .rui-category-link').click()
        cy.get('.rui-page-title').should("have.text", "F004 - Física IV - 1º semestre de 2024")

    })

    it("Teste para deslogar do moodle", () => {
        cy.visit('https://moodle.inatel.br/login/index.php')
        cy.acessar("INSIRA SEU EMAIL", "INSIRA SUA SENHA")
        cy.get('.userbutton').click()
        cy.get(':nth-child(11) > .dropdown-item').click()
        cy.get('.rui-login-logo')

    })


})