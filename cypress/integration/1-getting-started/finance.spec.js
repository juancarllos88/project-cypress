context("Teste para aula", () => {
  beforeEach(() => {
    cy.visit("https://maratona-discover-devfinance.netlify.app/");
    cy.get("#data-table tbody tr").should("have.length", 0);
  });

  it("Cadastrar Entradas", () => {
    cy.get("#transactions .button ").click();
    cy.get("#description ").type("Salario");
    cy.get("#amount ").type("5000");
    cy.get("#date ").type("2021-10-08");
    //cy.get("#form > form > div.input-group.actions > button");
    cy.get("button").contains("Salvar").click();
    cy.get("#data-table tbody tr").should("have.length", 1);
  });

  it("Cadastrar Saídas", () => {
    cy.get("#transactions .button ").click();
    cy.get("#description ").type("Alimentação");
    cy.get("#amount ").type("-1000");
    cy.get("#date ").type("2021-10-08");
    cy.get("button").contains("Salvar").click();
    cy.get("#data-table tbody tr").should("have.length", 1);
  });

  it("Remover Entrada e Saídas", () => {
    const entrada = "Pix";
    const saida = "Aluguel";

    cy.get("#transactions .button ").click();
    cy.get("#description ").type(entrada, { delay: 100 });
    cy.get("#amount ").type("1000");
    cy.get("#date ").type("2021-10-08");
    cy.get("button").contains("Salvar").click();

    cy.get("#transactions .button ").click();
    cy.get("#description ").type(saida, { delay: 100 });
    cy.get("#amount ").type("-500");
    cy.get("#date ").type("2021-10-08");
    cy.get("button").contains("Salvar").click();

    cy.contains(entrada).parent().find("img[onclick*=remove]").click();
    cy.contains(saida).siblings().children("img[onclick*=remove]").click();
    cy.get("#data-table tbody tr").should("have.length", 0);
  });
});
