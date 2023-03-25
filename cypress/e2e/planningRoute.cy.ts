describe('PlanningRoute Tests', () => {
  it('Visit PlanningRoute page', () => {
    cy.wait(1000);
    cy.visit('/planningRoute')
    cy.wait(3000);
  })

  it('Planning Route in h2', () => {
    cy.get('h2').contains('Planning Route')
  })

  it('PlanningRoute with Best Route Algorithm', () => {
    cy.get('[id="Date"]').type('20221205');
    cy.wait(1000);
    cy.get('[id="Truck"]').type('eTruck01');
    cy.wait(1000);
    cy.get('[id="options"]').select("bestRoute");
    cy.wait(3000);
  })
});
