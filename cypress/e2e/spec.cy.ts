describe('My Truck Test', () => {
  it('Visits the trucks create page', () => {
    cy.visit('/trucks/create')
  })
  /*
  it('using the right credentials', () => {
    cy.get('[id="truckId"]').type('1');
    cy.get('[id="registration"]').type('AA-00-AB');
    cy.get('[id="batteryCap"]').type('91329');
    cy.get('[id="maxBatteryCap"]').type('1333');
    cy.get('[id="electricRange"]').type('331');
    cy.get('[id="chargeTime"]').type('22:20');
    cy.get('[id="tareWeight"]').type('77.707');
    cy.get('[type="submit"]').click();
    cy.get('button').should('have.length',8);
  });
  */
})
