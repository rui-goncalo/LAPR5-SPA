describe('Order Tests', () => {
    it('Create Order page', () => {
      cy.visit('/orders/create')
    })

  it('Create a route', () => {
    cy.get('[id="orderDescription"]').type('Testing cypress');
    cy.wait(1000);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
  });

    it('Orders in h3', () => {
      cy.visit('/orders/create')
      cy.get('h3').contains('create')
    })

    it('Edit Order page', () => {
      cy.visit('/orders/edit')
    })

  it('Edit description in Order', () => {
    cy.get('[id="buttonEdit"]').contains("Edit").click();
    cy.wait(1000);
    cy.get('[id="orderDescription"]').clear();
    cy.wait(1000);
    cy.get('[id="orderDescription"]').type('Updating description');
    cy.wait(1000);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
  });

    it('Edit in h3', () => {
      cy.visit('/orders/edit')
      cy.get('h3').contains('edit')
    })

    it('List Orders page', () => {
      cy.visit('/orders/list')
    })

    it('Listing in h3', () => {
      cy.visit('/orders/list')
      cy.get('h3').contains('listing')
    })
  })
