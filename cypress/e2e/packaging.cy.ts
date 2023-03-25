describe('Packaging Tests', () => {
  it('Create Packaging page', () => {
    cy.visit('/packaging/create')
    cy.wait(1000);
  })
  it('Create a packaging', () => {
    cy.get('[id="packagingX"]').type('2');
    cy.wait(1000);
    cy.get('[id="packagingY"]').type('1');
    cy.wait(1000);
    cy.get('[id="packagingZ"]').type('3');
    cy.wait(1000);
    cy.get('[id="truckId"]').type('1');
    cy.wait(1000);
    cy.get('[type="submit"]').click();
   // cy.get('[id="packagingButton"]').should('have.length',1);
    cy.wait(1000);
});
  it('Packaging in h3', () => {
    cy.visit('/packaging/create')
    cy.get('h3').contains('create')
    cy.wait(1000);
})
  it('Edit Packaging page', () => {
    cy.visit('/packaging/edit')
    cy.wait(1000);

    it('Edit Y in Packaging', () => {
      cy.get('[id="buttonEdit"]').contains("Edit").click();
      cy.wait(1000);
      cy.get('[id="packagingY"]').clear();
      cy.wait(1000);
      cy.get('[id="packagingY"]').type('5');
      cy.wait(1000);
      cy.get('[type="submit"]').click();
      cy.wait(1000);
    });
})
  it('Edit in h3', () => {
    cy.visit('/packaging/edit')
    cy.get('h3').contains('edit')
    cy.wait(1000);
  })

  /* it('Edit a packaging', () => {
    //clicar no botao edit
   //cy.get('[type="submit"]').click();
    cy.get('[id="packagingEditButton"]').click();
    //preenche os campos com os valores
    //edita
    //apaga anterior
        cy.get('[id="packagingButton"]');

    //e cria novo com a info editada

    cy.get('[id="packagingX"]').type('2');
    cy.get('[id="packagingY"]').type('1');
    cy.get('[id="packagingZ"]').type('3');
    cy.get('[id="truckId"]').type('1');
    cy.get('[type="submit"]').click();
    cy.wait(3000);
  }); */

  it('List Packagings page', () => {
    cy.visit('/packaging/list')
    cy.wait(1000);
})
  it('Listing in h3', () => {
    cy.visit('/packaging/list')
    cy.get('h3').contains('listing')
  })

  it('Change Items per page to 10', () => {
    cy.wait(1000);
    cy.get('[id="itemsoptions"]').select('10');
    cy.wait(1000);
  })

  it('Change Items per page to 5', () => {
    cy.wait(1000);
    cy.get('[id="itemsoptions"]').select('5');
    cy.wait(1000);
  })

  it('Next page', () => {
    cy.wait(1000);
    cy.get('[class="pagination-next"]').click();
    cy.wait(1000);
  })
})


